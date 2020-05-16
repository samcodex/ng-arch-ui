import { Injectable, ComponentFactoryResolver, ViewContainerRef, Type, Inject } from '@angular/core';
import { cloneDeep, merge } from 'lodash-es';

import { ArchUiElement, ArchDesktop, ArchUiRoot, ArchUiContainer } from '../models/ng-arch-ui-model';
import { ArchUiComponent, ArchUiType, ArchPartTheme, ArchUiTheme } from '../models/ng-arch-ui-meta';
import { NgArchUiContentComponent } from '../ng-arch-ui.interface';
import { NgArchUiOptions, NgArchUiElementOptions, NgArchUiComponentsToken, ComponentMapDefinition } from '../models/ng-arch-ui-options';
import { archUiThemeConfig } from './../models/ng-arch-ui-options';
import { ArchUiDock } from '../models/ng-arch-ui-dock';

// const archUiTypeComponentMapping: { [key in ArchUiType]?: string } = {
//   [ ArchUiType.UiRoot ]: 'NgArchUiComponent',
//   [ ArchUiType.Desktop ]: 'ArchDesktopComponent',
//   [ ArchUiType.Window ]: 'ArchWindowComponent',
//   [ ArchUiType.Panel ]: 'ArchPanelComponent',
// };

@Injectable()
export class NgArchUiService {
  private uiDock: ArchUiDock;
  private uiRoot: ArchUiRoot;
  private contentResolver: ComponentFactoryResolver;
  private contextResolver: ComponentFactoryResolver;

  private theMostTopWindow: ArchUiContainer;
  private theMostTopElement: ArchUiElement;
  private themes = cloneDeep(archUiThemeConfig);

  private options: NgArchUiOptions = {
    alwaysRefresh: true
  };

  constructor(
    @Inject(NgArchUiComponentsToken) private mapContextComponent: ComponentMapDefinition
  ) {
    this.uiDock = new ArchUiDock();
    this.createUiRoot();
  }

  get archDesktop(): ArchDesktop {
    return this.uiRoot.desktop;
  }

  get archUiDock(): ArchUiDock {
    return this.uiDock;
  }

  __init(contextResolver: ComponentFactoryResolver, contextRootViewContainerRef: ViewContainerRef) {
    this.contextResolver = contextResolver;
    this.uiRoot.__assignContextViewContainerRef(contextRootViewContainerRef);
  }

  __destroy() {
    const { alwaysRefresh } = this.options;

    if (alwaysRefresh) {
      this.createUiRoot();
      this.contentResolver = null;
      this.contextResolver = null;
      this.theMostTopElement = null;
      this.theMostTopWindow = null;
    }
  }

  appendUiElementTo(uiElement: ArchUiElement, parent?: ArchUiContainer) {
    const container = parent || this.theMostTopWindow;
    container.__appendChildUiElement(uiElement);

    if (container === this.archDesktop) {
      this.uiDock.appendUiElement(uiElement);
    }
  }

  appendUiElementToDesktop(uiElement: ArchUiElement) {
    this.archDesktop.__appendChildUiElement(uiElement);

    this.uiDock.appendUiElement(uiElement);
  }

  assignDesktopComponentClass(clazz: Type<any>) {
    this.archDesktop.assignContentComponentClass(clazz);
  }

  assignOptions(options: NgArchUiOptions) {
    this.options = options;
  }

  changeTheme(themes: ArchUiTheme) {
    merge(this.themes, themes);
  }

  changeWindowTheme(theme: ArchPartTheme) {
    merge(this.themes[ArchUiType.Window], theme);
  }

  changePanelTheme(theme: ArchPartTheme) {
    merge(this.themes[ArchUiType.Panel], theme);
  }

  getTheme(uiType: ArchUiType): ArchPartTheme {
    return this.themes[uiType];
  }

  registerResolver(resolver: ComponentFactoryResolver) {
    this.contentResolver = resolver;
  }

  /**
   * render desktop content component
   * @param transferData - desktop transfer data
   */
  __render(transferData?: any) {
    this.uiRoot.desktop.traversal(this, this.renderArchUiElement.bind(this), transferData);
  }

  renderArchUiElement(uiElement: ArchUiElement, transferData: object = null,
      uiElementOptions?: NgArchUiElementOptions, uiElementTheme?: ArchPartTheme) {
    if (!this.validateService()) {
      return;
    }

    // render context
    const uiType = uiElement.__uiType;

    // const contextComponentName = archUiTypeComponentMapping[uiType];
    // const contextFactory = getComponentFactoryByName(this.contextResolver, contextComponentName);
    const contextClass = this.mapContextComponent[uiType];
    const contextFactory = this.contextResolver.resolveComponentFactory(contextClass);

    const contextViewContainerRef = uiElement.__getParentViewContainerRef();
    const contextComponentRef = contextViewContainerRef.createComponent(contextFactory);
    const contextComponent = contextComponentRef.instance as ArchUiComponent;

    uiElement.__assignContextViewContainerRef(contextComponent.getChildrenContainerRef());
    contextComponent.archUiElement = uiElement;
    if (uiElementOptions) {
      contextComponent.elementOptions = uiElementOptions;
    }
    if (uiElementTheme) {
      contextComponent.partThemes = cloneDeep(this.getTheme(uiType));
      merge(contextComponent.partThemes, uiElementTheme);
    }

    // render content
    const component: Type<any> = uiElement.contentComponentClass;
    const mainRef = contextComponent.getMainContainerRef();

    let factory: any;
    try {
      factory = this.contentResolver.resolveComponentFactory(component);
    } catch (err) {
      throw new Error(('Cannot find the content component. Please check if declare in entryComponents and assign to NgArchUiService'));
    }

    const componentRef = mainRef.createComponent(factory);
    const contentComponent = componentRef.instance as NgArchUiContentComponent;

    // assign data to the content component
    if (transferData) {
      Object.keys(transferData).forEach((key) => {
        contentComponent[key] = transferData[key];
      });
    }

    // connect context output event with content event handler
    if (contextComponent.hasOwnProperty('resizing') && contextComponent.resizing
        && 'archOnResize' in contentComponent) {
      contextComponent.resizing.subscribe((data: any) => {
        contentComponent.archOnResize.call(contentComponent, data);
      });
    }

    // update the most top reference
    this.updateTheMostTops(uiElement);

    // update the references
    uiElement.assignContentViewContainerRef(mainRef);
    uiElement.__assignContextComponentRef(contextComponentRef);
    uiElement.assignContentComponentRef(componentRef);
  }

  renderElementOnTop(uiElement: ArchUiElement, transferData: object = null,
      elementOptions?: NgArchUiElementOptions, uiElementTheme?: ArchPartTheme) {
    this.appendUiElementTo(uiElement);
    this.__moveUiElementOnTop(uiElement);

    this.renderArchUiElement(uiElement, transferData, elementOptions, uiElementTheme);
  }

  renderElementOnDesktop(uiElement: ArchUiElement, transferData: object = null,
      elementOptions?: NgArchUiElementOptions, uiElementTheme?: ArchPartTheme) {
    this.appendUiElementToDesktop(uiElement);
    this.__moveUiElementOnTop(uiElement);

    this.renderArchUiElement(uiElement, transferData, elementOptions, uiElementTheme);
  }

  __closeWindow(uiElement: ArchUiElement) {
    const contentComponentRef = uiElement.contentComponentRef;
    const contextComponentRef = uiElement.contextComponentRef;

    try {
      contentComponentRef.destroy();
      contextComponentRef.destroy();
    } catch (e) {}

    uiElement.__deleteContentComponentRef();
    uiElement.__deleteContextComponentRef();

    uiElement.__removeIt();

    this.updateTheMostTops(uiElement.__parent);
  }

  __moveUiElementOnTop(uiElement: ArchUiElement) {
    if (!uiElement.__isLastChild) {
      uiElement.__moveToTop();
    }

    this.updateTheMostTops(uiElement);
  }

  private validateService(): boolean {
    let valid = true;
    if (!this.contentResolver) {
      console.error('Please invoke "NgArchUiService.registerResolver" in ngOnInit to register your ComponentFactoryResolver');
      valid = false;
    }

    return valid;
  }

  private createUiRoot() {
    this.uiRoot = new ArchUiRoot('Ng Arch Ui');
  }

  // TODO
  private updateTheMostTops(uiElement: ArchUiElement) {
    if (this.theMostTopElement) {
      this.theMostTopElement.changeTopest(false);
    }
    uiElement.changeTopest(true);

    if (uiElement instanceof ArchUiContainer) {
      this.theMostTopWindow = this.theMostTopElement = uiElement;
    } else {
      this.theMostTopElement = uiElement;
    }

    // if (uiElement instanceof ArchUiContainer) {
    //   if (this.theMostTopWindow) {
    //     this.theMostTopWindow.chnageTopest(false);
    //   }
    //   if (this.theMostTopElement) {
    //     this.theMostTopElement.chnageTopest(false);
    //   }

    //   uiElement.chnageTopest(true);

    //   this.theMostTopWindow = this.theMostTopElement = uiElement;
    // } else if (uiElement instanceof ArchUiElement) {
    //   const parent = uiElement.__parent;
    //   if (this.theMostTopWindow === parent) {
    //     if (this.theMostTopElement) {
    //       this.theMostTopElement.chnageTopest(false);
    //     }
    //     uiElement.chnageTopest(true);

    //     this.theMostTopElement = uiElement;
    //   }
    // }
  }
}

// function getComponentFactoryByName(resolver: ComponentFactoryResolver, name: string) {
//   const factories = Array.from(resolver['_factories'].keys());
//   const factoryClass = <Type<any>>factories.find((x: any) => x.name === name);

//   let contextFactory = null;
//   if (factoryClass) {
//     try {
//       contextFactory = resolver.resolveComponentFactory(factoryClass);
//     } catch (err) {
//  console.error(`Cannot find the context component(${name}) factory. Please check if assign the component and add into entryComponents`);
//       console.error(err);
//     }
//   }

//   return contextFactory;
// }

// function getComponentFactoryBySelector(resolver: ComponentFactoryResolver, name: string) {
//   const factories = Array.from(resolver['_factories'].values());
//   const contextFactory = <ComponentFactory<any>>factories.find((x: any) => x.componentType.name === name);
//   return contextFactory;
// }

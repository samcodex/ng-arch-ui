import { Injectable, ComponentFactoryResolver, ViewContainerRef, Type } from '@angular/core';

import { ArchUiElement, ArchDesktop, ArchUiRoot, ArchUiContainer, ArchUiType } from '../models/ng-arch-ui-model';
import { ArchUiComponent } from '../models/ng-arch-ui-meta';
import { NgArchUiContentComponent } from '../ng-arch-ui.interface';
import { NgArchUiOptions, NgArchUiElementOptions } from '../models/ng-arch-ui-options';

const archUiTypeComponentMapping: { [key in ArchUiType]?: string } = {
  [ ArchUiType.UiRoot ]: 'NgArchUiComponent',
  [ ArchUiType.Desktop ]: 'ArchDesktopComponent',
  [ ArchUiType.Window ]: 'ArchWindowComponent',
  [ ArchUiType.Panel ]: 'ArchPanelComponent',
};

@Injectable({
  providedIn: 'root'
})
export class NgArchUiService {

  private uiRoot: ArchUiRoot;
  private contentResolver: ComponentFactoryResolver;
  private contextResolver: ComponentFactoryResolver;

  private theMostTopWindow: ArchUiContainer;
  private theMostTopElement: ArchUiElement;

  private options: NgArchUiOptions = {
    alwaysRefresh: true
  };

  constructor(
  ) {
    this.createUiRoot();
  }

  get archDesktop(): ArchDesktop {
    return this.uiRoot.desktop;
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
    uiElement.__appendTo(parent || this.theMostTopWindow);
  }

  appendUiElementToDesktop(uiElement: ArchUiElement) {
    uiElement.__appendTo(this.archDesktop);
  }

  assignDesktopComponentClass(clazz: Type<any>) {
    this.archDesktop.assignContentComponentClass(clazz);
  }

  assignOptions(options: NgArchUiOptions) {
    this.options = options;
  }

  registerResolver(resolver: ComponentFactoryResolver) {
    this.contentResolver = resolver;
  }

  __render() {
    this.uiRoot.desktop.traversal(this, this.renderArchUiElement.bind(this));
  }

  renderArchUiElement(uiElement: ArchUiElement, transferData: object = null, elementOptions?: NgArchUiElementOptions) {
    if (!this.validateService()) {
      return;
    }

    // render context
    const uiType = uiElement.__uiType;

    const contextComponentName = archUiTypeComponentMapping[uiType];
    const contextFactory = getComponentFactoryByName(this.contextResolver, contextComponentName);

    const contextViewContainerRef = uiElement.__getParentViewContainerRef();
    const contextComponentRef = contextViewContainerRef.createComponent(contextFactory);
    const contextComponent = contextComponentRef.instance as ArchUiComponent;

    uiElement.__assignContextViewContainerRef(contextComponent.getChildrenContainerRef());
    contextComponent.archUiElement = uiElement;
    if (elementOptions) {
      contextComponent.elementOptions = elementOptions;
    }

    // render content
    const component: Type<any> = uiElement.contentComponentClass;
    const mainRef = contextComponent.getMainContainerRef();

    let factory: any;
    try {
      factory = this.contentResolver.resolveComponentFactory(component);
    } catch (err) {
      throw new Error(('Please assign the content component'));
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
        contentComponent.archOnResize(data);
      });
    }

    // update the most top reference
    this.updateTheMostTops(uiElement);

    // update the references
    uiElement.assignContentViewContainerRef(mainRef);
    uiElement.__assignContextComponentRef(contextComponentRef);
    uiElement.assignContentComponentRef(componentRef);
  }

  renderElementOnTop(uiElement: ArchUiElement, transferData: object = null, elementOptions?: NgArchUiElementOptions) {
    this.appendUiElementTo(uiElement);
    this.__moveUiElementOnTop(uiElement);

    this.renderArchUiElement(uiElement, transferData, elementOptions);
  }

  renderElementOnDesktop(uiElement: ArchUiElement, transferData: object = null, elementOptions?: NgArchUiElementOptions) {
    this.appendUiElementToDesktop(uiElement);
    this.__moveUiElementOnTop(uiElement);

    this.renderArchUiElement(uiElement, transferData, elementOptions);
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

  private updateTheMostTops(uiElement: ArchUiElement) {
    if (uiElement instanceof ArchUiContainer) {
      if (this.theMostTopWindow) {
        this.theMostTopWindow.__isMostTop = false;
      }
      if (this.theMostTopElement) {
        this.theMostTopElement.__isMostTop = false;
      }

      uiElement.__isMostTop = true;

      this.theMostTopWindow = this.theMostTopElement = uiElement;
    } else if (uiElement instanceof ArchUiElement) {
      const parent = uiElement.__parent;
      if (this.theMostTopWindow === parent) {
        if (this.theMostTopElement) {
          this.theMostTopElement.__isMostTop = false;
        }
        uiElement.__isMostTop = true;

        this.theMostTopElement = uiElement;
      }
    }
  }
}

function getComponentFactoryByName(resolver: ComponentFactoryResolver, name: string) {
  const factories = Array.from(resolver['_factories'].keys());
  const factoryClass = <Type<any>>factories.find((x: any) => x.name === name);
  const contextFactory = resolver.resolveComponentFactory(factoryClass);
  return contextFactory;
}

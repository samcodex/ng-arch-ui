import { ViewContainerRef, Type, ComponentRef } from '@angular/core';

import { ArchUiComponent } from './ng-arch-ui-meta';

export enum ArchUiType {
  UiRoot = 'uiRoot',
  Desktop = 'desktop',
  Window = 'window',
  Panel = 'panel',
  Header = 'header',
  Footer = 'footer',
  Action = 'action',
  Status = 'status'
}

/**
 * context: means NgArchUi
 * content: means the consumer of NgArchUi
 */
export abstract class ArchUiElement {
  name: string;
  __parent?: ArchUiContainer;
  __isMostTop = true;

  __uiType: ArchUiType;
  private _contentComponentClass: Type<any>;

  private _contextViewContainerRef: ViewContainerRef;
  private _contentViewContainerRef: ViewContainerRef;
  private _contextComponentRef: ComponentRef<ArchUiComponent>;
  private _contentComponentRef: ComponentRef<any>;

  constructor(name: string, uiType: ArchUiType) {
    this.name = name;
    this.__uiType = uiType;
  }

  get contentComponentClass(): Type<any> {
    return this._contentComponentClass;
  }

  get contentViewContainerRef(): ViewContainerRef {
    return this._contentViewContainerRef;
  }

  get contentComponentRef(): ComponentRef<any> {
    return this._contentComponentRef;
  }

  get contextViewContainerRef(): ViewContainerRef {
    return this._contextViewContainerRef;
  }

  get contextComponentRef(): ComponentRef<any> {
    return this._contextComponentRef;
  }

  get __isLastChild(): boolean {
    const parent = this.__parent;
    const children = parent.__children;
    const index = children.indexOf(this);
    return index > -1 && index === children.length - 1;
  }

  assignContentComponentClass(component: Type<any>) {
    this._contentComponentClass = component;
  }

    assignContentViewContainerRef(ref: ViewContainerRef) {
    this._contentViewContainerRef = ref;
  }

  assignContentComponentRef(ref: ComponentRef<any>) {
    this._contentComponentRef = ref;
  }

  __assignContextViewContainerRef(viewContainerRef: ViewContainerRef) {
    this._contextViewContainerRef = viewContainerRef;
  }

  __assignContextComponentRef(ref: ComponentRef<any>) {
    this._contextComponentRef = ref;
  }

  __appendTo(parent: ArchUiContainer) {
    parent.__appendChildUiElement(this);
  }

  __getParentViewContainerRef(): ViewContainerRef {
    return this.__parent._contextViewContainerRef;
  }

  __deleteContextComponentRef() {
    // this._contextComponentRef.destroy();
    delete this._contextComponentRef;
  }

  __deleteContentComponentRef() {
    // const index = this._contentViewContainerRef.indexOf(this._contentComponentRef);
    // this._contentComponentRef.destroy();
    delete this._contentComponentRef;
  }

  __moveToTop() {
    // maintain data
    const parent = this.__parent;
    const children = parent.__children;
    const index = children.indexOf(this);
    if (index > -1) {
      const element = children.splice(index, 1)[0];
      children.push(element);
    }

    // maintain HTML
    // move the element(html DOM) to the last DOM inside the parent
    const contextElement = this._contextComponentRef.location.nativeElement;
    contextElement.parentNode.insertBefore(contextElement, null);
  }

  __removeIt() {
    this.__parent.__removeChild(this);
  }
}

export abstract class ArchUiContainer extends ArchUiElement {
  __parent?: ArchUiContainer;
  __children?: ArchUiElement[];

  constructor(name: string, uiType: ArchUiType) {
    super(name, uiType);
    this.__children = [];
  }

  __appendChildUiElement(uiElement: ArchUiElement) {
    this.__children.push(uiElement);
    uiElement.__parent = this;
  }

  traversal(that: any, callback: Function) {
    callback.call(that, this);

    this.__children.forEach((child: ArchUiElement) => {
      if (child instanceof ArchUiContainer) {
        child.traversal(that, callback);
      } else {
        callback.call(that, child);
      }
    });
  }

  __removeChild(child: ArchUiElement) {
    const index = this.__children.indexOf(child);
    if (index >= 0) {
      this.__children.splice(index, 1);
    }
  }

}

export class ArchUiRoot extends ArchUiContainer {
  constructor(name: string) {
    super(name, ArchUiType.UiRoot);
    this.__appendChildUiElement(ArchUi.createArchDesktop('Arch Ui Desktop'));
  }

  get desktop(): ArchDesktop {
    return this.__children[0] as ArchDesktop;
  }
}

export class ArchWindow extends ArchUiContainer {
  constructor(name: string) {
    super(name, ArchUiType.Window);
  }
}

export class ArchDesktop extends ArchUiContainer {
  constructor(name: string) {
    super(name, ArchUiType.Desktop);
  }
}

export class ArchPanel extends ArchUiElement {
  constructor(name: string) {
    super(name, ArchUiType.Panel);
  }
}

export namespace ArchUi {
  export function createArchDesktop(title: string) {
    return new ArchDesktop(title);
  }

  /**
   *
   * @param title window title
   * @param component content component class
   */
  export function createWindowWithContentComponent(title: string, component: Type<any>) {
    const window = new ArchWindow(title);
    window.assignContentComponentClass(component);
    return window;
  }

  export function createPanelWithContentComponent(title: string, component: Type<any>) {
    const panel = new ArchPanel(title);
    panel.assignContentComponentClass(component);
    return panel;
  }
}

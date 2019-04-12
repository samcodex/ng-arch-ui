import { ViewContainerRef, Type, ComponentRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ArchUiComponent, ArchUiType } from './ng-arch-ui-meta';

/**
 * context: means NgArchUi
 * content: means the consumer of NgArchUi
 */
export abstract class ArchUiElement {
  name: string;
  __zIndex: number;

  __parent?: ArchUiContainer;
  __isTopest = new BehaviorSubject(true);

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

  changeTopest(flag: boolean) {
    this.__isTopest.next(flag);
  }

  getTopest(): Observable<boolean> {
    return this.__isTopest.asObservable();
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

    // TODO
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
  __children?: ArchUiElement[];
  __lastChildIndex: number;

  constructor(name: string, uiType: ArchUiType) {
    super(name, uiType);
    this.__children = [];
    this.__lastChildIndex = 0;
  }

  __appendChildUiElement(uiElement: ArchUiElement) {
    uiElement.__zIndex = this.__lastChildIndex + 1;
    uiElement.__parent = this;
    ++this.__lastChildIndex;

    this.__children.push(uiElement);
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

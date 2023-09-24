import { ApplicationRef, Injectable, Injector, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  list: any[];

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
    this.list = [];
  }

  removeItem(component, host) {
    const list = this.list;
    const count = list.length;

    for (let i = 0; i < count; i++) {
      if (list[i].component === component && list[i].host === host) {
        this.list.splice(i, 1);
        break;
      }
    }
  }

  findComponent(component) {
    const list = this.list;
    const count = list.length;

    for (let i = 0; i < count; i++) {
      if (list[i].component === component) {
        return i;
      }
    }

    return -1;
  }

  create(component, host?: ViewContainerRef, nodes?: any[]) {
    const container = host ? host : this.appRef.components[0].instance.popupContainer;
    const index = this.findComponent(component);

    if (index !== -1) {
      this.list[index].popup.instance.dismiss();
      this.list[index].popup.destroy();
      this.list.splice(index, 1);
    }

    const popup = nodes ?
      container.createComponent(component, this.injector, 0, nodes) :
      container.createComponent(component);

    this.list.push({
      popup,
      host,
      component
    });

    popup.instance.close.subscribe(() => {
      this.removeItem(host, component);

      popup.destroy();
    });

    return popup.instance;
  }
}

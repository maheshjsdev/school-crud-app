import { Injectable, signal, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  visible = signal(false);

  title = signal('');

  component = signal<Type<any> | null>(null);

  placement = signal<
    'left' | 'right' | 'top' | 'bottom'
  >('right');

  open(
    title: string,
    component: Type<any>,
    placement:
      | 'left'
      | 'right'
      | 'top'
      | 'bottom' = 'right'
  ): void {

    this.title.set(title);

    this.component.set(component);

    this.placement.set(placement);

    this.visible.set(true);
  }

  close(): void {

    this.visible.set(false);
  }
}
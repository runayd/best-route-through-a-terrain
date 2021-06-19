import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[freeDraggingHandle]'
})
export class FreeDraggingHandleDirective {

  constructor(public elementRef: ElementRef<HTMLElement>) {}

}

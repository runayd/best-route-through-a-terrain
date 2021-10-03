import { trigger, transition, query, animateChild } from "@angular/animations";

export const parent = trigger('parent', [
    transition('* <=> *', [
      query('@*', animateChild())
    ])
  ]);
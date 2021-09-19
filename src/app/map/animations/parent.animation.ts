import { trigger, transition, query, animateChild } from "@angular/animations";

export const parent = trigger('parent', [
    transition(':enter, :leave', [
      query('@*', animateChild())
    ])
  ]);
import { trigger, transition, animate, state, style } from "@angular/animations";

export const appear = trigger('appear', [
    state('void', style({
        opacity: 0
    })),
    transition('void <=> *', [
        animate('1s ease')
    ])
  ]);
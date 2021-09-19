import { trigger, state, style, transition, animate, stagger } from "@angular/animations";


export const welcomeCard = trigger('welcomeCard', [
    state('void', style({
      opacity: 0
    })),
    state('*', style({
      opacity: 1
    })),
    transition('void <=> *', 
        animate(`0.5s ease-in-out`)
    )
  ]);
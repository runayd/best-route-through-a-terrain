import { trigger, state, style, transition, animate, stagger } from "@angular/animations";


export const cardOpen = (time: string = '1s', delay: string = '0s') =>  trigger('cardOpen', [
    state('void', style({
      transform: 'scale(0)',
    })),
    state('*', style({
      transform: 'scale(2)',
    })),
    transition('void <=> *', 
        animate(`${time} ${delay} ease-out`)
    )
  ]);
import { trigger, transition, animate, state, style } from "@angular/animations";

export const appear = trigger('appear', [
    state('void', style({
        opacity: 0
    })),
    transition('void <=> *', [
        animate('{{ duration }} {{ delay }} ease')
    ],
    { params: {duration: '1s', delay: '0s'}})
  ]);


  export const appearWithJustInDelay = trigger('appearWithJustInDelay', [
    state('void', style({
        opacity: 0
    })),
    transition('void => *', [
        animate('{{ duration }} {{ delay }} ease')
    ],
    { params: {duration: '1s', delay: '0s'}}),
    
    transition('* => void', [
        animate('{{ duration }} 0s ease')
    ],
    { params: {duration: '1s', delay: '0s'}})
  ]);
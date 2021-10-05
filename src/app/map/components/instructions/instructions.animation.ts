import { animate, animateChild, group, query, stagger, state, style, transition, trigger } from "@angular/animations";

export const insOnTop = trigger('insOnTop', [
    state('void', style({
        width: '50rem',
        height: '30rem',
        transform: 'translate( 100%, 2rem)',
        opacity: 0
    })),
    state('firstInstructions', style({
        width: '50rem',
        height: '30rem',
        transform: 'translate(-9rem, 2rem)',
        opacity: 1
    })),
    state('secondInstructions', style({
        width: '32rem',
        height: '8rem',
        transform: 'translate(0rem, 0rem)'
    })),
    transition( 'void => firstInstructions, firstInstructions => secondInstructions', [
        animate('1s ease')
    ])
]);

export const insBelow = trigger('insBelow', [
    state('firstInstructions', style({
        transform: 'translateY(100%)',
        opacity: 0
    })),
    state('secondInstructions', style({
        transform: 'translateY(0)',
        opacity: 1
    })),
    transition('firstInstructions => secondInstructions', 
      animate('1s {{delay}} ease'),
      {params: {delay: '0s'}}
    )
]);

export const instructionContainer = trigger('instructionContainer', [
    state('void', style({
      opacity: 0,
      transform: 'translateX(100%)'
    })),
    transition('void => *', [
      group([
        query('@*', animateChild(), { optional: true }),
        animate(`0.5s {{ showInstructionDelay }} ease`, style({
          opacity: 1,
          transform: 'translateX(0)'
        }))
      ])
    ],
    { params: { showInstructionDelay: '0s' } }),
    transition('* => void', [
      group([
        query('@*', animateChild()),
        animate(`0.5s ease`, style({
          opacity: 0
        }))
      ])
    ])
  ]);

import { trigger, state, style, transition, animate, stagger, animateChild, query, group } from "@angular/animations";

export const welcomeCard = trigger('welcomeCard', [
    state('void', style({
      opacity: 0
    })),
    transition('void => *',
      animate(`0.5s 0.5s ease`)
    ),
    transition('slideRight => void',
        animate(`0.5s ease`,
          style({
            transform: 'translateX(100%)',
            opacity: 0
          })
        )
    ),
    transition('slideLeft => void',
        animate(`0.5s ease`,
          style({
            transform: 'translateX(-100%)',
            opacity: 0
          })
        )
    )
  ]);
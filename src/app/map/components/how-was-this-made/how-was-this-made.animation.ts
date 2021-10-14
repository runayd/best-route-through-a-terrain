import { animate, animateChild, group, query, state, style, transition, trigger } from "@angular/animations";

export const buildingInfoContainer = trigger('buildingInfoContainer', [
    state('void', style({
        opacity: 0
    })),
    transition('void => *',
        group([
            query('@*', animateChild(), { optional: true }),
            animate('0.5s 0.5s ease')
    ])),
    transition('* => void',
    group([
        query('@*', animateChild(), { optional: true }),
        animate('0.5s ease')
    ]))
]);

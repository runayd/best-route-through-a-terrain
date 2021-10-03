import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { parent } from '../../animations';
import { cardOpen } from './card-open.animation';
import { Store } from '../../store';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    cardOpen('1s'),
    parent
  ]
})
export class CardComponent implements OnInit {

  showCard$ = this.store.get('showCard');
  content$ = this.store.get('content');

  constructor(private store: Store) { }

  ngOnInit(): void {}

}

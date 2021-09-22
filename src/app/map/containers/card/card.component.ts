import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { cardOpen, parent, welcomeCard } from '../../animations';
import { Store } from '../../store';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    cardOpen('1s'),
    parent,
    welcomeCard
  ]
})
export class CardComponent implements OnInit {

  showCard = this.store.get('showCard');


  constructor(private store: Store) { }

  ngOnInit(): void {}

}

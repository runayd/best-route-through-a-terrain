import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';

@Component({
  selector: 'welcome-card',
  templateUrl: './welcome-card.component.html',
  styleUrls: ['./welcome-card.component.scss']
})
export class WelcomeCardComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  closeCard(): void {
    this.store.setState({
      showCard: false,
      showMenu: true
    });
  }
}

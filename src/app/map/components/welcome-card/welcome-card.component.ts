import { Component, OnInit } from '@angular/core';
import { welcomeCard } from './welcome-card.animation';
import { Store } from '../../store';

@Component({
  selector: 'welcome-card',
  templateUrl: './welcome-card.component.html',
  styleUrls: ['./welcome-card.component.scss'],
  animations: [
    welcomeCard
  ]
})
export class WelcomeCardComponent implements OnInit {

  leaveAnimation = 'slideRight';

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  closeCard(): void {
    this.store.setState({
      showCard: false,
      showMenu: true
    });
  }

  updateLeaveAnimationStateToSlideLeft() {
    this.leaveAnimation = 'slideLeft';
  }

  updateLeaveAnimationStateToSlideRight() {
    this.leaveAnimation = 'slideRight';
  }

  showInstructions(): void {
    this.store.setState({
      content: 'instructions'
    });
  }
}

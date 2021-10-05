import { Component, OnInit } from '@angular/core';
import { appear } from '../../animations';
import { Store } from '../../store';
import { aboutmeContainer } from './about-me.animation';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [
    aboutmeContainer,
    appear
  ]
})
export class AboutMeComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  closeAboutMe(): void {
    this.store.setState({
      showCard: false,
      showMenu: true
    });
  }

}

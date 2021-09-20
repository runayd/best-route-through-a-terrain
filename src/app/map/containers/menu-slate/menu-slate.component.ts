import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { cardOpen, parent, welcomeCard } from '../../animations';
import { CommunicateService } from '../../services/communicate.service';
import { Store } from '../../store';

@Component({
  selector: 'menu-slate',
  templateUrl: './menu-slate.component.html',
  styleUrls: ['./menu-slate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    cardOpen('1s'),
    parent,
    welcomeCard
  ]
})
export class MenuSlateComponent implements OnInit {

  @ViewChild('scroll', { static: false })
  set scrollElement(content: ElementRef) {
    this.scroll = content;
  }
  scroll: ElementRef;

  run: any;

  showMenu = false;
  scrollRight = true;
  showCard = true;
  animateAction = true;
  buttonText: 'Find Route' | 'Clear Route' = 'Find Route';
  @Output() emitAction: EventEmitter<boolean>  = new EventEmitter<boolean>();
  @Output() emitResetEndpointsToDefaultPositions: EventEmitter<boolean>  = new EventEmitter<boolean>();

  constructor(private communication: CommunicateService,
              private store: Store) { }

  ngOnInit(): void {
    this.subscribeToStore();
  }

  emitActionForMap(): void {
    this.communication.operateOnMap({id: 'path', value: this.animateAction});
    this.updateButtonText(!this.animateAction);
  }

  emitResetEndpoints(): void {
    this.updateButtonText(true);
    this.communication.operateOnMap({id: 'reset'});
  }

  scrollRightOrLeft(): void {
    const value = this.scrollRight ? 480 : -480;
    this.scroll.nativeElement.scrollLeft += value;
    this.scrollRight = !this.scrollRight;
  }

  updateButtonText(animateAction: boolean): void {
    this.animateAction = animateAction;
    this.buttonText = this.animateAction ? 'Find Route' : 'Clear Route';
  }

  openCard(): void {
    this.store.setState({
      showCard: true,
      showMenu: false
    });
    this.scrollRight = true;
  }

  subscribeToStore(): void {
    this.store.get('showMenu').subscribe( showMenu => this.showMenu = showMenu);
    this.store.get('showCard').subscribe( showCard => this.showCard = showCard);
  }

}

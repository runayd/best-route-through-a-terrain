import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { CommunicateService } from '../services/communicate.service';

@Component({
  selector: 'menu-slate',
  templateUrl: './menu-slate.component.html',
  styleUrls: ['./menu-slate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuSlateComponent implements OnInit {

  @ViewChild('scroll', { static: true })
  scroll: ElementRef;

  scrollRight = true;
  showCard = true;
  animateAction = true;
  buttonText: 'Find Route' | 'Clear Route' = 'Find Route';
  @Output() emitAction: EventEmitter<boolean>  = new EventEmitter<boolean>();
  @Output() emitResetEndpointsToDefaultPositions: EventEmitter<boolean>  = new EventEmitter<boolean>();

  constructor(private communication: CommunicateService) { }

  ngOnInit(): void {}

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

  updateButtonText(animateAction: boolean) {
    this.animateAction = animateAction;
    this.buttonText = this.animateAction ? 'Find Route' : 'Clear Route';
  }

  closeCard(): void {
    this.showCard = false;
  }

  openCard(): void {
    this.showCard = true;
  }

}

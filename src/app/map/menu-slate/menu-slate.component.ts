import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommunicateService } from '../services/communicate.service';

@Component({
  selector: 'menu-slate',
  templateUrl: './menu-slate.component.html',
  styleUrls: ['./menu-slate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuSlateComponent implements OnInit {

  showCard = true;
  animateAction = true;
  buttonText: 'Animate Path' | 'Clear Map' = 'Animate Path';
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

  updateButtonText(animateAction: boolean) {
    this.animateAction = animateAction;
    this.buttonText = this.animateAction ? 'Animate Path' : 'Clear Map';
  }

  closeCard(): void {
    this.showCard = false;
  }

  openCard(): void {
    this.showCard = true;
  }

}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'menu-slate',
  templateUrl: './menu-slate.component.html',
  styleUrls: ['./menu-slate.component.scss']
})
export class MenuSlateComponent implements OnInit {

  animateAction = true;
  buttonText: 'Animate Path' | 'Clear Map' = 'Animate Path';
  @Output() emitAction: EventEmitter<boolean>  = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  emitActionForMap(): void {
    this.emitAction.emit(this.animateAction);
    this.animateAction = !this.animateAction;
    this.buttonText = this.animateAction ? 'Animate Path' : 'Clear Map';
  }

}

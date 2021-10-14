import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'slate-button',
  templateUrl: './slate-button.component.html',
  styleUrls: ['./slate-button.component.scss']
})
export class SlateButtonComponent implements OnInit {

  @Input() value = '';
  @Input() dynamicWidth = false;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  buttonClicked(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }

}

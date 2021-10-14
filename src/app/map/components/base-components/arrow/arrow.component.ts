import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss']
})
export class ArrowComponent implements OnInit {

  @Input('showShadow')
  set shadow(show: boolean) {
    this.setShadow(show);
  }
  boxShadow = 'none';

  constructor() { }

  ngOnInit(): void {
  }

  setShadow(show: boolean) {
    if (show) {
      this.boxShadow = '0rem 0.1rem 0.5rem rgba(0, 0, 0, 0.25)';
    }
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'endpoint',
  templateUrl: './endpoint.component.svg',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit {

  @Input() stroke: string = 'black';
  @Input() fill: string = 'red';
  @Input() name: string = 'endpoint';

  constructor() { }

  ngOnInit(): void {
  }

}

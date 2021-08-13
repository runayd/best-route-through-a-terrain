import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}
  
}

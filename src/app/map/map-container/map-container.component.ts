import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MAP_INITIAL_HEIGHT, MAP_INITIAL_WIDTH } from '../constants';

@Component({
  selector: 'map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapContainerComponent implements OnInit {

  alignCenter = false;
  nodeSize: number = 0.5;

  constructor() {
    this.setMapDimensions();
  }

  ngOnInit(): void {}
  
  setMapDimensions(): void {
    const screenHeight = window.innerHeight;
    let factor = 1;
    for (; screenHeight > MAP_INITIAL_HEIGHT * factor; factor += 0.05) {
      if (factor == 2) { break; }
    }

    const screenWidth = window.innerWidth;
    if (screenWidth > MAP_INITIAL_WIDTH * factor) {
      this.alignCenter = true;
    }

    this.nodeSize = this.nodeSize * factor;
  }
}

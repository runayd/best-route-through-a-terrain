import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MAP_INITIAL_HEIGHT, MAP_INITIAL_WIDTH } from '../../constants';

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
    let verticalFactor = 1;
    for (; screenHeight > MAP_INITIAL_HEIGHT * verticalFactor; verticalFactor += 0.05) {
      if (verticalFactor == 3) { break; }
    }

    const screenWidth = window.innerWidth;
    let horizontalFactor = 1;
    for (; screenWidth > MAP_INITIAL_WIDTH * horizontalFactor; horizontalFactor += 0.05) {
      if (horizontalFactor == 3) { break; }
    }

    const finalFactor = horizontalFactor > verticalFactor ? horizontalFactor : verticalFactor;

    if (screenWidth > MAP_INITIAL_WIDTH * finalFactor) {
      this.alignCenter = true;
    }

    this.nodeSize = this.nodeSize * finalFactor;
  }
}

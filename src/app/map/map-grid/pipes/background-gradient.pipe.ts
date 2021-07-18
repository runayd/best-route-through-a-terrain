import { Pipe, PipeTransform } from '@angular/core';
import { ALTITUDE_COLOR, GRADIENT_DIRECTION_COLUMN, GRADIENT_DIRECTION_ROW } from '../constants';

@Pipe({
  name: 'backgroundGradient'
})
export class BackgroundGradientPipe implements PipeTransform {

  transform(
    backgroundColorArray: any,
    nodeSize: number, 
    radialGradientPosition: any[],
  ): string {

    let background = '';
    for(let i = 0; i < backgroundColorArray.length; i+=2) {
      background += 
      this.getGradientForEachCornerAndSide(
        nodeSize, 
        backgroundColorArray[i], backgroundColorArray[i+1], 
        radialGradientPosition);
    }
    return background.replace(/,\s*$/, '');
  }

  getGradientForEachCornerAndSide(nodeSize: number, directionIndex: number, colorIndex: number, radialGradientPosition: any): string {
    const gradientPosition = radialGradientPosition[1 + GRADIENT_DIRECTION_ROW[directionIndex]][1 + GRADIENT_DIRECTION_COLUMN[directionIndex]];
    return `radial-gradient(${nodeSize}rem ${nodeSize}rem at ${gradientPosition}, ${ALTITUDE_COLOR[colorIndex]}, transparent 50%),`;
  }
}

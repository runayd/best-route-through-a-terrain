import { Position } from "../../types";

export const RADIAL_GRADIENT_POSITION: Position[][] = [
    [{x: 0, y: 0}, {x: 0.5, y: 0}, {x: 1, y: 0}],
    [{x: 0, y: 0.5}, {x: 0.5, y: 0.5}, {x: 1, y: 0.5}],
    [{x: 0, y: 1}, {x: 0.5, y: 1}, {x: 1, y: 1}]
];

export const GRADIENT_DIRECTION_ROW =  [+1,+1, 0,-1,-1,-1, 0,+1,0];
export const GRADIENT_DIRECTION_COLUMN=[ 0,-1,-1,-1, 0,+1,+1,+1,0];
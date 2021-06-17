import { Position } from "./position";

export interface Node {
    nodeId: number;
    altitude: number;
    position: Position;
    style: any;
}
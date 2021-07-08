import { Position } from "./position";

export interface Node {
    nodeId: number;
    altitude: number;
    position: Position;
    color: string;
    boxShadow: string;
    borderRadius: string;
    zIndex: string;
    animation: string;
    pseudoAnimaiton: string;
}
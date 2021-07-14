import { Position } from "./position";

export interface Node {
    nodeId: number;
    altitude: number;
    position: Position;
    color: string;
    boxShadow: string;
    borderRadius: string;
    animation: string;
    pseudoAnimaiton: string;
    isStartNode: boolean;
    isEndNode: boolean;
    cursor: string;
}
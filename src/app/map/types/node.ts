import { Position } from "./position";

export interface Node {
    nodeId: number;
    id: number;
    alt: number;
    pos: Position;
    color: string;
    borderRadius: string;
    animation: string;
    isStartNode: boolean;
    isEndNode: boolean;
}
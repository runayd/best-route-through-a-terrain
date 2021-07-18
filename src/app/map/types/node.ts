import { Position } from "./position";

export interface Node {
    nodeId: number;
    id: number;
    altitude: number;
    alt: number;
    position: Position;
    pos: any;
    color: string;
    boxShadow: string;
    borderRadius: string;
    animation: string;
    pseudoAnimaiton: string;
    isStartNode: boolean;
    isEndNode: boolean;
    cursor: string;
    background: string;
    key: string;
}
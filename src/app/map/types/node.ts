import { Position } from "./position";

export interface Node {
    id : number;
    alt : number;
    pos : Position;
    color ?: string;
    borderRadius ?: string;
    animation ?: string;
}
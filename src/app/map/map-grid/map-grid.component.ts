import { Component, OnInit } from '@angular/core';
import { Queue } from '../../data-structures';
import { Node, Position } from '../types';
import { ALTITUDE_COLOR, INITIAL_MAP } from './constants';

const NO_OF_ROWS: number = 90;
const NO_OF_COLUMNS: number = 180; 

@Component({
  selector: 'map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.scss']
})
export class MapGridComponent implements OnInit {

  map: Node[][] = [];
  path: Position[][] = [];
  startNode: Node | undefined;
  endNode: Node | undefined;  

  constructor() {}

  ngOnInit(): void {
    this.initializeTheMap();
  }

  initializeTheMap() {
    this.map = INITIAL_MAP;
  }

  trackNode(index: any, node: any): any {
    return index;
  }

  getNodeColor(args: any): string {
    return ALTITUDE_COLOR[args];
  }

  nodeIsClicked(i: number, j: number): boolean {
    return ((this.startNode?.position?.row == i && this.startNode?.position?.column == j) ||
           (this.endNode?.position?.row == i && this.endNode?.position?.column == j));
  }

  pickTheNode(row: number, column: number): void {
    if (!this.startNode) {
      this.startNode = this.map[row][column];
      this.map[row][column] = {...this.map[row][column], color: 'grey'};
      return;
    } else if (!this.endNode) {
      this.endNode = this.map[row][column];
      this.map[row][column] = {...this.map[row][column], color: 'black'};
      const array:Node[][] = this.findDestination(this.startNode);
      this.animateBreadthFirstSearch(array);
      this.buildAndAnimateShortestPathForBFS();
      return;    
    } else {
      this.startNode = undefined;
      this.endNode = undefined;
      this.initializeTheMap();
      return;
    }
  }

  buildAndAnimateShortestPathForBFS() {
    const shortestPath = [];
    for(let x=this.endNode?.position; x != undefined; x = this.path[x.row][x.column]) {
      shortestPath.unshift(this.map[x.row][x.column]);
    }
    shortestPath.shift();

    let j = 0;
    for(const current of shortestPath) {
      let color: string = 'rgb(192,192,192)';
      let animation: string = '0.5s linear 0s elevate';
      setTimeout(() =>{
        if (current.nodeId == this.endNode?.nodeId) {
          color = 'black';
          animation = '2s linear 0s elevate';
        }
        this.map[current.position.row][current.position.column] = {...this.map[current.position.row][current.position.column], color, animation};
      }, 10 * ++j);
    }
  }

  delayForBreadthFirstSearch(j: number, array: Node[], map: Node[][], endNodeId: number | undefined) {
    let animation = '0.5s linear 0s elevate';
    setTimeout(() =>{
      for(const current of array) {
        if (current.nodeId == this.endNode?.nodeId) {
          animation = '2s linear 0s elevate';
        }
        map[current.position.row][current.position.column] = {...map[current.position.row][current.position.column], animation};
      }
    }, 10*j);
  }

  zeroDelay(j: number, current: Node, map: Node[][], endNodeId: number | undefined){
    let animation = '0.5s linear 0s elevate';
    if (current.nodeId == this.endNode?.nodeId) {
      animation = '2s linear 0s elevate';
    }
    map[current.position.row][current.position.column] = {...map[current.position.row][current.position.column], animation};
  }

  animateBreadthFirstSearch(array:Node[][]) {
    for(let i = 1; i < array.length; i+=2) {
      this.delayForBreadthFirstSearch(i, array[i], this.map, this.endNode?.nodeId);
    }
  }

  findDestination(startNode: Node): Node[][]  {
    let destinationFound: boolean= false;
    const allVisitedArray: Node[][] = []
    this.path = this.intializeArray<Position>(NO_OF_ROWS, NO_OF_COLUMNS);
    const queue = new Queue<Node>();
    let visited: Set<number> = new Set<number>();
    visited.add(startNode.nodeId);
    queue.push(startNode);
    while(!queue.isEmpty()) {
      const visitedArray: Node[] = [];
      const size = queue.size();
      for(var k = 0; k < size; ++k) {
        let current: Node = queue.poll();
        if (!destinationFound) destinationFound = current.nodeId === this.endNode?.nodeId;
        visitedArray.push(current);
        this.visitNeigbours(current, visited, queue);
      }
      allVisitedArray.push(visitedArray);
      if (destinationFound) return allVisitedArray;
    }

    return allVisitedArray;
  }

  visitNeigbours(node: Node, visited: Set<number>, queue: Queue<Node>): void {
    /**
     * direction vectors: first we will visit the top,right,bottom,left nodes and 
     * then the diagnols to achieve the more intiutive shortest path later
     */
    const direction_row = [-1,0,+1,0,-1,-1,+1,+1];
    const direction_column = [0,+1,0,-1,-1,+1,+1,-1];
    
    for(let i = 0; i < 9; ++i) {
      this.visitNeighbour(
        node.position.row + direction_row[i],
        node.position.column + direction_column[i],
        visited, queue, node.position);
    }
  }

  visitNeighbour(i: number, j: number, visited: Set<number>, queue: Queue<Node>, parent: Position): void {
    if (!this.isValidNode(i,j)) return;
    const currentNeighbour = this.map[i][j];
    if (!visited.has(currentNeighbour.nodeId)) {
      queue.push(currentNeighbour);
      visited.add(currentNeighbour.nodeId);
      this.path[i][j] = parent;
    }
  }
  
  isValidNode(i: number, j: number): boolean {
    return (i >= 0 && i < NO_OF_ROWS) && (j >= 0 && j < NO_OF_COLUMNS);
  }

  intializeArray<T>(rowLength: number, columnLength: number): T[][] {
    const array: T[][] = [];
    for(let i = 0; i < rowLength; ++i) {
      array.push(new Array<T>(columnLength));
    }
    return array;
  }

}

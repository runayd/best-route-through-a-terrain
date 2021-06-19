import { Component, OnInit } from '@angular/core';
import { Queue } from '../../data-structures';
import { Node, Position } from '../types';


const NO_OF_ROWS: number = 70;
const NO_OF_COLUMNS: number = 140; 

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
  visited: Set<number> = new Set<number>();

  constructor() {}

  ngOnInit(): void {
    this.initializeTheMap();
  }

  initializeTheMap() {
    this.visited = new Set<number>();
    let id = 0;
    for(let i = 0; i < NO_OF_ROWS; ++i) {
      this.map[i] = [];
      for(let j = 0; j < NO_OF_COLUMNS; ++j) {
        const style = {'background-color': 'rgb(173, 216, 230)', 'animation': 'none'};
        const position = {row: i, column: j};
        this.map[i][j] = {nodeId: id++, altitude: 0, position, style};
      }
    }
  } 

  trackNode(index: any, node: any): any {
    return index;
  }

  highlightTheNode(i: number,j: number): void {
    if (this.nodeIsClicked(i,j)) return;
    const style = {'background-color': 'rgb(73,158,238)'};
    this.map[i][j] = {...this.map[i][j], style};
  }

  unhighlightTheNode(i: number,j: number): void {
    if (this.nodeIsClicked(i,j)) return;
    if (this.visited?.has(this.map[i][j].nodeId)) return;
    const style = {'background-color': 'rgb(173, 216, 230)'};
    this.map[i][j] = {...this.map[i][j], style};
  }

  nodeIsClicked(i: number, j: number): boolean {
    return ((this.startNode?.position?.row == i && this.startNode?.position?.column == j) ||
           (this.endNode?.position?.row == i && this.endNode?.position?.column == j));
  }

  pickTheNode(row: number, column: number) {
    let style = {'background-color': 'rgb(173, 216, 230)'};
    if (!this.startNode) {
      style = {'background-color': 'red'};
      this.startNode = this.map[row][column];
      this.map[row][column] = {...this.map[row][column], style};
      return;
    } else if (!this.endNode) {
      style = {'background-color': 'green'};
      this.endNode = this.map[row][column];
      this.map[row][column] = {...this.map[row][column], style};
      const array:Node[][] = this.findDestination(this.startNode);
      this.animateBreadthFirstSearch(array);
      this.buildAndAnimateShortestPathForBFS();
      return;    
    } else {
      this.map[this.startNode.position.row][this.startNode.position.column].style = style;
      this.startNode = undefined;
      this.map[this.endNode.position.row][this.endNode.position.column].style = style;
      this.endNode = undefined;
      this.initializeTheMap();
      this.map[row][column] = {...this.map[row][column], style};
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
      setTimeout(() =>{
        let style = {'background-color': 'yellow', 'animation': 'elevate 1s'};
        if (current.nodeId == this.endNode?.nodeId) style = {'background-color': 'green', 'animation': 'elevate 3s'};
        this.map[current.position.row][current.position.column] = {...this.map[current.position.row][current.position.column], style};
      }, 10 * ++j);
    }
  }

  delayForBreadthFirstSearch(j: number, array: Node[], map: Node[][], endNodeId: number | undefined) {
    setTimeout(() =>{
      for(const current of array) {
        let style = {'background-color': 'rgb(173, 216, 230)', 'animation': 'elevate 1s'};
        if (current.nodeId == this.endNode?.nodeId) style = {'background-color': 'green', 'animation': 'elevate 3s'};
        map[current.position.row][current.position.column] = {...map[current.position.row][current.position.column], style};
      }
    }, 10*j);
  }

  zeroDelay(j: number, current: Node, map: Node[][], endNodeId: number | undefined){
    let style = {'background-color': 'rgb(173, 216, 230)', 'animation': 'elevate 1s'};
    if (current.nodeId == this.endNode?.nodeId) style = {'background-color': 'green', 'animation': 'elevate 3s'};
    map[current.position.row][current.position.column] = {...map[current.position.row][current.position.column], style};
  }

  animateBreadthFirstSearch(array:Node[][]) {
    for(let i = 1; i < array.length; ++i) {
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
    const direction_row = [-1,-1,-1,0,+1,+1,+1,0];
    const direction_column = [-1,0,+1,+1,+1,0,-1,-1];
    
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

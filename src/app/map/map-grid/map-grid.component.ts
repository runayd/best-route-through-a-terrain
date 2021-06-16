import { Component, OnInit } from '@angular/core';
import { Queue } from 'src/app/data-structures/implementation/queue';

interface Position {
  row: number;
  column: number;
}

interface Node {
  nodeId: number;
  position: Position;
  style: any;
}

const NO_OF_ROWS: number = 70;
const NO_OF_COLUMNS: number = 140; 

@Component({
  selector: 'app-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.scss']
})
export class MapGridComponent implements OnInit {

  map: Node[][] = [];
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
        this.map[i][j] = {nodeId: id++, position, style};
      }
    }
  } 

  trackNode(index: any, node: any) {
    return index;
  }

  highlightTheNode(i: number,j: number) {
    if (this.nodeIsClicked(i,j)) return;
    const style = {'background-color': 'rgb(73,158,238)'};
    this.map[i][j] = {...this.map[i][j], style};
  }

  unhighlightTheNode(i: number,j: number) {
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
      style = {'background-color': 'yellow'};
      this.startNode = this.map[row][column];
      this.map[row][column] = {...this.map[row][column], style};
      return;
    } else if (!this.endNode) {
      style = {'background-color': 'green'};
      this.endNode = this.map[row][column];
      this.map[row][column] = {...this.map[row][column], style};
      const array:Node[] = this.findDestination(this.startNode);
      this.animate(array);
      console.log('found');
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

  delay(j: number, current: Node, map: Node[][], endNodeId: number | undefined) {
    // TODO- we may want a for loop inside to render the animation in groups
    setTimeout(() =>{
      let style = {'background-color': 'rgb(173, 216, 230)', 'animation': 'elevate 1s'};
      if (current.nodeId == this.endNode?.nodeId) style = {'background-color': 'green', 'animation': 'elevate 3s'};
      map[current.position.row][current.position.column] = {...map[current.position.row][current.position.column], style};
    }, 10*j);
  }

  zeroDelay(j: number, current: Node, map: Node[][], endNodeId: number | undefined){
    let style = {'background-color': 'rgb(173, 216, 230)', 'animation': 'elevate 1s'};
    if (current.nodeId == this.endNode?.nodeId) style = {'background-color': 'green', 'animation': 'elevate 3s'};
    map[current.position.row][current.position.column] = {...map[current.position.row][current.position.column], style};
  }

  animate(array:Node[]) {
    for(let i = 1; i < array.length; ++i) {
      this.delay(i, array[i], this.map, this.endNode?.nodeId);
    }
  }

  findDestination(startNode: Node): Node[]  {
    const visitedArray: Node[] = []
    const queue = new Queue<Node>();
    let visited: Set<number> = new Set<number>();
    visited.add(startNode.nodeId);
    queue.push(startNode);
    while(!queue.isEmpty()) {
      const size = queue.size();
      for(var k = 0; k < size; ++k) {
        let current: Node = queue.poll();
        const desitinationFound: boolean= current.nodeId == this.endNode?.nodeId;
        // TODO- you have to push into the array in a such way that it creates desired wave form animation
        visitedArray.push(current);
        if (desitinationFound) return visitedArray;
        this.visitNeigbours(current, visited, queue);
      }
    }

    return visitedArray;
  }

  visitNeigbours(node: Node, visited: Set<number>, queue: Queue<Node>): void {
     this.visitNeighbour(node.position.row-1, node.position.column-1, visited, queue);
     this.visitNeighbour(node.position.row-1, node.position.column, visited, queue);
     this.visitNeighbour(node.position.row-1, node.position.column+1, visited, queue);
     this.visitNeighbour(node.position.row, node.position.column+1, visited, queue);
     this.visitNeighbour(node.position.row+1, node.position.column+1, visited, queue);
     this.visitNeighbour(node.position.row+1, node.position.column, visited, queue);
     this.visitNeighbour(node.position.row+1, node.position.column-1, visited, queue);
     this.visitNeighbour(node.position.row, node.position.column-1, visited, queue);
  }

  visitNeighbour(i: number, j: number, visited: Set<number>, queue: Queue<Node>): void {
    if (!this.isValidNode(i,j)) return;
    const currentNeighbour = this.map[i][j];
    if (!visited.has(currentNeighbour.nodeId)) {
      queue.push(currentNeighbour);
      visited.add(currentNeighbour.nodeId);
    }
  }
  
  isValidNode(i: number, j: number): boolean {
    return (i >= 0 && i < NO_OF_ROWS) && (j >= 0 && j < NO_OF_COLUMNS);
  }

}

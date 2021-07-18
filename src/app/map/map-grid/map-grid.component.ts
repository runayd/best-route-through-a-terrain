import { Component, OnInit } from '@angular/core';
import { HashMap, PriorityQueue } from '../../data-structures';
import { Node, Position, NextBestNode } from '../types';
import { 
  ALTITUDE_COLOR,
  INITIAL_MAP,
  TURN_COST,
  NO_OF_ROWS,
  NO_OF_COLUMNS,
  START_POSITION,
  END_POSITION,
  RADIAL_GRADIENT_POSITION, 
  ALTITUDE_COLOR_GRADIENT_MAPPING} from './constants';


@Component({
  selector: 'map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.scss']
})
export class MapGridComponent implements OnInit {

  map: Node[][] = [];
  parent: Position[][] = [];
  startNode: Node | undefined;
  endNode: Node | undefined;
  mouseDown: boolean = false;
  currentNodeDragged: Node | undefined;
  startNodeDragEvent: boolean;
  nodeSize: number = 0.55;
  nodeModification: any;
  animationDelayCount: number = 0;
  mapIntitialized = false;
  shortestPath: Node[];
  radialGradientPosition: string[][] = [];
  altitudeGradientMapping = new HashMap<string>();
  

  constructor() {
    this.intializeRadialGradientPositionForThisNodeSize();
    this.initializeTheMap();
  }

  ngOnInit(): void {
    this.intializeStartAndEndNodes();
  }

  initializeTheMap(): void {
    this.map = JSON.parse(JSON.stringify(INITIAL_MAP));
    this.altitudeGradientMapping = new HashMap<any>(
      ALTITUDE_COLOR_GRADIENT_MAPPING?._hashmap, 
      ALTITUDE_COLOR_GRADIENT_MAPPING?._size);
  }

  intializeStartAndEndNodes(): void {
    if (this.startNode) {
      const { x, y }: Position = this.startNode?.pos;
      delete this.map[x][y]['isStartNode'];
    }
    this.startNode = this.map[START_POSITION.x][START_POSITION.y];
    this.startNode.isStartNode = true;

    if (this.endNode) {
      const { x, y }: Position = this.endNode?.pos;
      delete this.map[x][y]['isEndNode'];
    }
    this.endNode = this.map[END_POSITION.x][END_POSITION.y];
    this.endNode.isEndNode = true;
  }

  intializeRadialGradientPositionForThisNodeSize() {
    for(let i = 0; i < 3; ++i) {
      this.radialGradientPosition.push(new Array<string>());
      for(let j = 0; j < 3; ++j) {
        const x: number = this.nodeSize * RADIAL_GRADIENT_POSITION[i][j]?.x;
        const y: number = this.nodeSize * RADIAL_GRADIENT_POSITION[i][j]?.y;
        const gradientPosition: string = `${x}rem ${y}rem`;
        this.radialGradientPosition[i].push(gradientPosition);
      }
    }
  }

  updateStartOrEndNode(currentNodeDragged: Node) {
    if (currentNodeDragged?.isStartNode) {
      this.startNode = currentNodeDragged;
    } else if (currentNodeDragged?.isEndNode) {
      this.endNode = currentNodeDragged;
    }
  }

  setStartNodeDragEvent(node: Node): void {
    this.mouseDown = true;
    if (node?.isStartNode || node?.isEndNode) {
      this.startNodeDragEvent = node?.isStartNode;
    }
  }

  setCurrentNodeDragged(node: Node): void {
    this.mouseDown = false;
    if (!node?.isStartNode && !node?.isEndNode) {
      if (this.startNodeDragEvent) {
        node.isStartNode = true;
        node.isEndNode = false;
      } else {
        node.isStartNode = false;
        node.isEndNode = true;
      }
      this.updateStartOrEndNode(node);
    }
  }

  revertFromCurrentNodeDragged(node: Node): void {
    if (this.mouseDown) {
      node.isStartNode = node.isEndNode = false;
    }
  }

  animateAction(animate: boolean): void {
    if (animate) {
      this.findDestinationUsingDijkstrasAlgorithm();
      this.reconstructAndAnimateShortestPath();
    } else {
      this.revertShortestPathMarked();
      this.intializeStartAndEndNodes();
    }
  }
  

  


  findDestinationUsingDijkstrasAlgorithm(): void {
    const startPosition: Position = this.startNode?.pos;
    const endPosition: Position = this.endNode?.pos;

    this.parent = this.intializeArray<Position>(NO_OF_ROWS, NO_OF_COLUMNS);
    const MAX_VALUE = NO_OF_COLUMNS * NO_OF_ROWS * 25;
    const minCostArray = this.intializeArray<number>(NO_OF_ROWS, NO_OF_COLUMNS, MAX_VALUE);
    const visited = new Set<number>();

    const comparator = (a:NextBestNode, b:NextBestNode) => { return a?.cost > b?.cost;}
    const nextBestNode = new PriorityQueue<NextBestNode>(comparator);

    // initialize the queue
    nextBestNode.insert({pos: startPosition, cost: 0});
    minCostArray[startPosition?.x][startPosition?.y] = 0;

    while(!nextBestNode.isEmpty()) {
      const {pos, cost }: NextBestNode = nextBestNode.pop();
      const { id }: Node = this.map[pos?.x][pos?.y];
      visited.add(id);
      if (endPosition?.x === pos?.x && endPosition?.y === pos?.y) return;
      if (cost > minCostArray[pos?.x][pos?.y]) continue;
      this.visitNeigboursForDijkstrasAlgorithm(pos, visited, nextBestNode, minCostArray);
    }
  }

  
  visitNeigboursForDijkstrasAlgorithm(current: Position,
    visited: Set<number>, nextBestNode: PriorityQueue<NextBestNode>,
    minCostArray: number[][]): void {
    const direction_row =  [-1,+1,0,0,-1,-1,+1,+1];
    const direction_column=[0,0,-1,+1,-1,+1,-1,+1];
    
    for(let m = 0; m < 9; ++m) {
      const childRow = current?.x + direction_row[m];
      const childColumn = current?.y + direction_column[m];

      if (!this.isValidNode(childRow,childColumn)) continue;
      const {id, pos}: Node = this.map[childRow][childColumn];
      if (visited.has(id)) continue;

      const costToReachCurrentNode = minCostArray[current?.x][current?.y];
      const costToReachNextPossibleNode = this.costToReachNextNodeFromCurrentNode(current, pos);
      const newCost  = costToReachCurrentNode + costToReachNextPossibleNode;

      if (newCost < minCostArray[childRow][childColumn]) {
        minCostArray[childRow][childColumn] = newCost;
        this.parent[childRow][childColumn] = current;
        nextBestNode.insert({pos, cost: newCost});
      }
     
    }
  }

  costToReachNextNodeFromCurrentNode(currentNode: Position, childNode: Position ): number {
  /* TODO - maintain a README.md explaining this code instead of these comment*/
  /*
    There are 3 cost to consider for us to calculate the total cost to reach the next node
    1. Horizontal (planar) cost
    2. Vertical cost
    3. Turn cost
  */

  /*
  1. Horizontal (planar) cost:
    On a horizontal plane, the cost to travel between adjacent nodes will be proportional to the
    distance the centers' of the two nodes. Since the size of all nodes on map is same, the distance between centers 
    of any node will always equal and further be proportional to length of side of node.
    We can assume the length of side of node as of 1 unit
  */
    const horizontalCost = 1;

  /*
  2. Vertical cost
    vertical cost will be the cost to climb up or climb down a unit alt differnce between two nodes.
    On that note, vertical cost will be proportional to the difference of alt of two nodes.
    For simplicity we will assume the cost to climb up and climb down to be same, hence we will take absolute difference
  */
    const currentNodeAltitude = this.map[currentNode?.x][currentNode?.y]?.alt;
    const childNodeAltitude = this.map[childNode?.x][childNode?.y]?.alt;
    const verticalCost = Math.abs(currentNodeAltitude - childNodeAltitude);

  /*
  3. Turn cost
    If there are multile shortest path to reach a destination, of all those paths we want a path with minimum turns. 
    To take a turn means we change our direction from our current direction of movement. Physically speaking (postulating)
    there will be a cost associated with changing the direction since we would be decelerating to make that happen. Also,
    logically speaking a straight line is more intuitive shortest path then a zig-zag line of same distance
  */
    const turnCost = this.getTurnCostToReachNextNode(currentNode?.x, currentNode?.y, childNode?.x, childNode?.y);

    
    return horizontalCost + verticalCost + turnCost;
  }

  getTurnCostToReachNextNode(currentRow:number, currentColumn:number, childRow:number, childColumn:number) {
  /*
    if (current node) and (parent of current node) and the (next/child node of current node)
    are in straight line that means there is we will be still travelling in the same pervious direction (turn cost will be zero).
    if they are not in straight line, that means while going tot next node we changed our direction, which means
    we took a turn, which will contriubute a cost.
    If there is no parent to currentNode that means current node is startnode and
    there is no prvious direction we were travelling, hence in direction we move we won't be
    taking a turn. hence, we return 0 as turn cost
  */
    if (!this.parent[currentRow][currentColumn]) return 0;

    const parentRow = this.parent[currentRow][currentColumn].x;
    const parentColumn = this.parent[currentRow][currentColumn].y;

    const isAlignedWestToEast = (parentColumn === currentColumn) && (currentColumn === childColumn);
    const isAlignedNorthToSouth = (parentRow === currentRow) && (currentRow === childRow);
    const isAlignedNorthWestToSouthEast = (parentRow+1 === currentRow) && (currentRow === childRow-1) && 
                                          (parentColumn+1 === currentColumn) && (currentColumn === childColumn-1);
    const isAlignedNorthEastToSouthWest = (parentRow+1 === currentRow) && (currentRow === childRow-1) && 
                                          (parentColumn-1 === currentColumn) && (currentColumn === childColumn+1);

    const allThreeNodesAreInStraightLine = isAlignedNorthToSouth || isAlignedWestToEast || isAlignedNorthEastToSouthWest || isAlignedNorthWestToSouthEast;

    return allThreeNodesAreInStraightLine ? 0 : TURN_COST;
  }

  reconstructAndAnimateShortestPath(): void {
    this.reconstructShortestPath();
    this.animateShortestPath();
  }

  reconstructShortestPath(): void {
    this.shortestPath = [];
    for(let x=this.endNode?.pos; x != undefined; x = this.parent[x.x][x.y]) {
      this.shortestPath.unshift(this.map[x.x][x.y]);
    }

    // exclude start node from animation
    this.shortestPath.shift();
    if (this.shortestPath?.length) this.shortestPath.pop();
  }

  revertShortestPathMarked(): void {
    if (!this.shortestPath?.length) return;
    for(let node of this.shortestPath) {
      const { x, y }: Position = node?.pos;
      this.map[x][y].animation = 'none';
      this.map[x][y].pseudoAnimaiton = 'none'; // JSON.parse(JSON.stringify(INITIAL_MAP[x][y]));
    }
    this.shortestPath = [];
  }

  animateShortestPath(): void {
    this.animationDelayCount = 0;
    for(const current of this.shortestPath) {
      let delay: number = 0.1 * ++this.animationDelayCount;
      let animation: string = `elevate 0.25s ease-in-out ${delay}s normal 1 forwards running`;
      let pseudoAnimaiton: string = `appear 5s linear ${delay}s normal 1 forwards running`;
      this.map[current.pos.x][current.pos.y] = {...this.map[current.pos.x][current.pos.y],
        animation,
        pseudoAnimaiton}
    }
  }




  /* Utils */

  trackNode(index: any, node: any): any {
    return index;
  }

  getNodeColor(args: any): string {
    return ALTITUDE_COLOR[args];
  }

  isValidNode(i: number, j: number): boolean {
    return (i >= 0 && i < NO_OF_ROWS) && (j >= 0 && j < NO_OF_COLUMNS);
  }

  intializeArray<T>(rowLength: number, columnLength: number, intialValue: any = undefined): T[][] {
    const array: T[][] = [];
    for(let i = 0; i < rowLength; ++i) {
      array.push(new Array<T>(columnLength));
      if (intialValue) {
        for(let j = 0; j < columnLength; ++j) {
          array[i][j] = intialValue;
        }
      }
    }
    return array;
  }

}

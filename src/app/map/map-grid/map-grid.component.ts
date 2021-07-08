import { Component, OnInit } from '@angular/core';
import { PriorityQueue, Queue } from '../../data-structures';
import { Node, Position, NextBestNode } from '../types';
import { ALTITUDE_COLOR, INITIAL_MAP, TURN_COST, NO_OF_ROWS, NO_OF_COLUMNS } from './constants';


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
  nodeSize: string = '0.55rem';
  nodeModification: any;

  constructor() {}

  ngOnInit(): void {
    this.initializeTheMap();
    this.intializeNodeModificationToHighlightPath();
  }

  initializeTheMap(): void {
    this.map = JSON.parse(JSON.stringify(INITIAL_MAP));
  } 

  intializeNodeModificationToHighlightPath(): void {
    this.nodeModification = {
      boxShadow: 'none',
      zIndex: 35
    };
  }

  pickTheNode(row: number, column: number): void {
    if (!this.startNode) {
      /* mark start node */
      this.startNode = this.map[row][column];
      this.map[row][column] = {...this.map[row][column],
        color: 'grey', ...this.nodeModification
      };
    } else if (!this.endNode) {
      /* mark end node */
      this.endNode = this.map[row][column];
      this.map[row][column] = {...this.map[row][column],
        color: 'black', ...this.nodeModification
      };
      this.findDestinationUsingDijkstrasAlgorithm();
      this.reconstructAndAnimateShortestPath();
    } else {
      /* clear map */
      this.startNode = undefined;
      this.endNode = undefined;
      this.initializeTheMap();
    }
  }
  

  


  findDestinationUsingDijkstrasAlgorithm() {
    const startPosition: Position = this.startNode?.position;
    const endPosition: Position = this.endNode?.position;

    this.parent = this.intializeArray<Position>(NO_OF_ROWS, NO_OF_COLUMNS);
    const MAX_VALUE = NO_OF_COLUMNS * NO_OF_ROWS * 25;
    const minCostArray = this.intializeArray<number>(NO_OF_ROWS, NO_OF_COLUMNS, MAX_VALUE);
    const visited = new Set<number>();

    const comparator = (a:NextBestNode, b:NextBestNode) => { return a?.cost > b?.cost;}
    const nextBestNode = new PriorityQueue<NextBestNode>(comparator);

    // initialize the queue
    nextBestNode.insert({position: startPosition, cost: 0});
    minCostArray[startPosition?.row][startPosition?.column] = 0;

    while(!nextBestNode.isEmpty()) {
      const {position, cost }: NextBestNode = nextBestNode.pop();
      const { nodeId }: Node = this.map[position?.row][position?.column];
      visited.add(nodeId);
      if (endPosition?.row === position?.row && endPosition?.column === position?.column) return;
      if (cost > minCostArray[position?.row][position?.column]) continue;
      this.visitNeigboursForDijkstrasAlgorithm(position, visited, nextBestNode, minCostArray);
    }
  }

  
  visitNeigboursForDijkstrasAlgorithm(current: Position,
    visited: Set<number>, nextBestNode: PriorityQueue<NextBestNode>,
    minCostArray: number[][]): void {
    const direction_row =  [-1,+1,0,0,-1,-1,+1,+1];
    const direction_column=[0,0,-1,+1,-1,+1,-1,+1];
    
    for(let m = 0; m < 9; ++m) {
      const childRow = current?.row + direction_row[m];
      const childColumn = current?.column + direction_column[m];

      if (!this.isValidNode(childRow,childColumn)) continue;
      const {nodeId, position}: Node = this.map[childRow][childColumn];
      if (visited.has(nodeId)) continue;

      const costToReachCurrentNode = minCostArray[current?.row][current?.column];
      const costToReachNextPossibleNode = this.costToReachNextNodeFromCurrentNode(current, position);
      const newCost  = costToReachCurrentNode + costToReachNextPossibleNode;

      if (newCost < minCostArray[childRow][childColumn]) {
        minCostArray[childRow][childColumn] = newCost;
        this.parent[childRow][childColumn] = current;
        nextBestNode.insert({position, cost: newCost});
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
    vertical cost will be the cost to climb up or climb down a unit altitude differnce between two nodes.
    On that note, vertical cost will be proportional to the difference of altitude of two nodes.
    For simplicity we will assume the cost to climb up and climb down to be same, hence we will take absolute difference
  */
    const currentNodeAltitude = this.map[currentNode?.row][currentNode?.column]?.altitude;
    const childNodeAltitude = this.map[childNode?.row][childNode?.column]?.altitude;
    const verticalCost = Math.abs(currentNodeAltitude - childNodeAltitude);

  /*
  3. Turn cost
    If there are multile shortest path to reach a destination, of all those paths we want a path with minimum turns. 
    To take a turn means we change our direction from our current direction of movement. Physically speaking (postulating)
    there will be a cost associated with changing the direction since we would be decelerating to make that happen. Also,
    logically speaking a straight line is more intuitive shortest path then a zig-zag line of same distance
  */
    const turnCost = this.getTurnCostToReachNextNode(currentNode?.row, currentNode?.column, childNode?.row, childNode?.column);

    
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

    const parentRow = this.parent[currentRow][currentColumn].row;
    const parentColumn = this.parent[currentRow][currentColumn].column;

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
    const shortestPath: Node[] = this.reconstructShortestPath();
    this.animateShortestPath(shortestPath);
  }

  reconstructShortestPath(): Node[] {
    const shortestPath: Node[] = [];
    for(let x=this.endNode?.position; x != undefined; x = this.parent[x.row][x.column]) {
      shortestPath.unshift(this.map[x.row][x.column]);
    }

    // exclude start node from animation
    shortestPath.shift();
    if (shortestPath?.length) shortestPath.pop();

    return shortestPath;
  }

  animateShortestPath(shortestPath: Node[]): void {
    let j = 0;
    for(const current of shortestPath) {
      let delay: number = 0.1 * ++j;
      let animation: string = `elevate 0.25s ease-in-out ${delay}s normal 1 forwards running`;
      let pseudoAnimaiton: string = `appear 5s linear ${delay}s normal 1 forwards running`;
      if (current.nodeId == this.endNode?.nodeId) {
        animation = `0.5s ease-in-out forwards ${delay}s elevate`;
        pseudoAnimaiton = `5s forwards ${delay}s appear`;
      }
      this.map[current.position.row][current.position.column] = {...this.map[current.position.row][current.position.column],
        animation,
        pseudoAnimaiton,
        ...this.nodeModification}
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

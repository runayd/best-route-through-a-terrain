
/**
 Postulation for the Turn Cost: 
    Say there are two path with same distance, but one is straight line and other is zig zag.
    Theoratically, considering both are of the same distance, the cost to reach the destination will be same.
    But whenever we change the direction (take a turn) we physically decelerate to make that angle. Therefore we can assume there is cost 
    associated with it.
 Determining the Turn Cost: 
    Considering the usage in Path Finding Algorithm (A valid path is where a point/node are not repeated or visited again along the path),
    the total sum of turn cost in a path with most possible number of turns in the map
    should never exceed the cost of smallest move in the map. Otherwise it could get accounted as a cost of actual move 
    resulting in inaccuracy calculating the shortest path between two points on the map
 Value of the Turn Cost:
    Say 'T' is the highest possible number of turns we can take in a map for hypothetically longest path.
    Let 'N' be the number of nodes/points on map.
    Intuitively 'T' will never exceed 'N'. In other words 0 <= T < N. Now for sake of calculating
    the best value of TURN_COST which will not hamper the accuracy of the path alogrithm, we will mark 'T' = 'N'.
    Let 'm' be the cost of smallest move on the map. The smallest possible cost of path/move will be between two nodes/points
    which are on same altitude and are adjacent to each other.
    Therefore, 'm' = 1;  (the cost of horizaontally move to adjacent cell will be directly porpotional length
                          of side of a node. Here Assuming that length to be 1)
    Now, to maintain the accuracy of the pathe finding algorithm, the total turn cost should never exceed 'm'
    i.e 'm' >>> ['T' * TURN_COST].    (here 'T' is equal to 'N' and therefore in range of 16000) 
    Therefore from above the TURN_COST ≈ 'm'/'T' ≈ 1/16000
 */

export const TURN_COST = 0.000001;
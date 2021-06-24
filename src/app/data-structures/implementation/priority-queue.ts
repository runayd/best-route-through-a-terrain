
import { IPriorityQueue } from '../interface/ipriority-queue';

export class PriorityQueue<T> implements IPriorityQueue<T> {

    private _priorityQueue: T[] = [];
    private _comparator: (parent: T, child: T) => boolean = (parent: T, child:T) => {return false};

    /**
     * @param comparator function argument which will return true
     * if the priority-queue still needs heapify-ing
     */
    constructor(comparator: (a: T, b: T) => boolean) {
        this._comparator = comparator;
    }

    public insert(item: T): void {
        this._priorityQueue.push(item);
        this.bottomUpHeapify();
    }

    public peek(): T {
        if (this._priorityQueue?.length) return this._priorityQueue[0];
        return null;
    }

    public pop(): T {
        if (this._priorityQueue?.length == 1) return this._priorityQueue.pop();
        const top = this._priorityQueue[0];
        const last = this._priorityQueue.pop();
        this._priorityQueue[0] = last;
        this.topDownHeapify();
        return top;
    }

    public size(): number {
        return this._priorityQueue?.length;
    }

    public isEmpty(): boolean {
        return this._priorityQueue?.length === 0;
    }

    private leftChild(index: number): number {
        return (2*index)+1;
    }

    private rightChild(index: number): number {
        return (2*index)+2;
    }

    private topDownHeapify(): void {
        if (this._priorityQueue?.length === 1) return;
        let parent = 0;
        let left = this.leftChild(parent);
        let right = this.rightChild(parent);
        while(left < this._priorityQueue?.length) {
            let contender = left;
            if (right < this._priorityQueue?.length &&
                this._comparator(this._priorityQueue[left],
                    this._priorityQueue[right])) {
                        contender = right;
                    }
            if (this._comparator(this._priorityQueue[parent],
                this._priorityQueue[contender])) {
                    this.swap(contender, parent);
                }
            parent = contender;
            left = this.leftChild(parent);
            right = this.rightChild(parent);
        }
    }

    private bottomUpHeapify(): void {
        if (this._priorityQueue?.length === 1) return;
        let index = this._priorityQueue?.length-1;
        let parent = Math.floor((index-1)/2);
        while(this._comparator(
                this._priorityQueue[parent],
                this._priorityQueue[index]) && 
                index > 0
            ) {
                this.swap(parent, index);
                index = parent;
                parent = Math.floor((index-1)/2);
        }
    }

    private swap(i: number, j: number): void {
        const temp = this._priorityQueue[i];
        this._priorityQueue[i] = this._priorityQueue[j];
        this._priorityQueue[j] = temp;
    }
}
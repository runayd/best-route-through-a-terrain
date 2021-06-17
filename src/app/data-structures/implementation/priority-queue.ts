
export class PriorityQueue<T> implements IPriorityQueue<T> {

    private _priorityQueue: T[] = [];
    private _comparator: (a: T, b: T) => boolean = (a: T, b:T) => {return false};

    /*
    * @param comparator - function which return true if the element insert is
    *                     still not reached its correct position in heap
    */
    constructor(comparator: (a: T, b: T) => boolean) {
        this._comparator = comparator;
    }

    public insert(item: T): void {
        this._priorityQueue.push(item);
        this.heapify();
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
        this.heapify();
        return top;
    }

    public size(): number {
        return this._priorityQueue?.length;
    }

    public isEmpty(): boolean {
        return this._priorityQueue?.length === 0;
    }

    private heapify(): void {
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
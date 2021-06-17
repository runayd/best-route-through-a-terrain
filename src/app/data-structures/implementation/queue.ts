import { IQueue } from "../interface/iqueue";

const CAPACITY_REACHED: string = 'Queue has reached max capacity, you cannot add more items';

export class Queue<T> implements IQueue<T> {
    private _queue: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
  
    public push(item: T): {success: boolean, message?: string} {
      if (this.size() === this.capacity) {
        return {success: false, message: CAPACITY_REACHED}
      }
      this._queue.push(item);
      return {success: true}
    }

    public poll(): any {
      return this._queue.shift();
    }

    public peek(): T | undefined {
        return this._queue[0];
    }

    public size(): number {
      return this._queue.length;
    }

    public isEmpty(): boolean {
        return this._queue.length === 0;
    }

    clear(): void {
      this._queue = [];
    }
  }
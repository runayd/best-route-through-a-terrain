import { IQueue } from "../interface/iqueue";

const CAPACITY_REACHED: string = 'Queue has reached max capacity, you cannot add more items';

export class Queue<T> implements IQueue<T> {
    private queue: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
  
    public push(item: T): {success: boolean, message?: string} {
      if (this.size() === this.capacity) {
        return {success: false, message: CAPACITY_REACHED}
      }
      this.queue.push(item);
      return {success: true}
    }

    public poll(): any {
      return this.queue.shift();
    }

    public peek(): T | undefined {
        return this.queue[0];
    }

    public size(): number {
      return this.queue.length;
    }

    public isEmpty(): boolean {
        return this.queue.length === 0;
    }

    clear(): void {
      this.queue = [];
    }
  }
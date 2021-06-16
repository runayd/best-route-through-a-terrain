export interface IQueue<T> {
    push(item: T): void;
    poll(): T | undefined;
    peek(): T | undefined;
    size(): number;
    isEmpty(): boolean;
    clear(): void;
  }
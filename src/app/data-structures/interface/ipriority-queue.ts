interface IPriorityQueue<T> {
    insert(item: T): void;
    peek(): T;
    pop(): T;
    size(): number;
    isEmpty(): boolean;
  }
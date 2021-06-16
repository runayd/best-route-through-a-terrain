import { IHashMap } from "../interface/ihashmap";

export class HashMap<Z> {
    private _hashmap: IHashMap<Z> = {};
    private _size: number = 0;

    constructor() {}

    public put(key: string, value: Z): void {
        this._hashmap[key] = value;
        ++this._size;
    }

    public get(key: string): Z {
        return this._hashmap[key];
    }

    public remove(key: string): void {
        delete this._hashmap[key];
        --this._size;
    }

    public size(): number {
        return this._size;
    }
}
import { IHashMap } from "../interface/ihashmap";

export class HashMap<Z> {
    private _hashmap: IHashMap<Z> = {};
    private _size: number = 0;

    constructor(_hashmap: IHashMap<Z> = {}, _size: number = 0) {
        this._hashmap = _hashmap;
        this._size = _size;
    }

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
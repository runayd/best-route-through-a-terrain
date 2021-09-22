import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Action } from '.';
import { ApplicationState, INITIAL_STATE } from './store.type';

@Injectable({
    providedIn: 'root'
})
export class Store {

  private _store$: BehaviorSubject<ApplicationState>;

  private _action$: Subject<Action>;

  public get state(): ApplicationState {
    return this._store$.getValue();
  }
  
  public get action$(): Observable<Action> {
    return this._action$.asObservable();
  }

  constructor() {
    this._store$ = new BehaviorSubject<ApplicationState>(INITIAL_STATE);
    this._action$ = new Subject<Action>();
  }

  private select<K>(mapFn: (state: ApplicationState) => K): Observable<K> {
    return this._store$.asObservable().pipe(
      map((state: ApplicationState) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  public get(...keys: string[]): Observable<any> {
    const length = keys?.length;

    if (!length) {
      return null;
    }

    if (length == 1) {
      return this.select( (state: any) => state[keys[0]]);
    }

    return this.select( (state: any) => {
      let wrapper: {[k: string]: any} = {};
      for (let i = 0; i < length; ++i) {
        const key = keys[i];
        wrapper[key] = state[key];
      }
      return wrapper;
    });
    
  }

  public setState(newState: Partial<ApplicationState>) {
    this._store$.next({
      ...this.state,
      ...newState,
    });
  }

  public sendAction(action: Action): void {
    this._action$.next(action);
  }
}
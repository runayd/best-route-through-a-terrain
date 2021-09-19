import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ApplicationState, INITIAL_STATE } from './store.type';

@Injectable({
    providedIn: 'root'
})
export class Store {
  private _store$: BehaviorSubject<ApplicationState>;

  public get state(): ApplicationState {
    return this._store$.getValue();
  }

  constructor() {
    this._store$ = new BehaviorSubject<ApplicationState>(INITIAL_STATE);
  }

  private select<K>(mapFn: (state: ApplicationState) => K): Observable<K> {
    return this._store$.asObservable().pipe(
      map((state: ApplicationState) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  public get(key: string): Observable<any> {
    return this.select( (state: any) => state[key]);
  }

  public setState(newState: Partial<ApplicationState>) {
    this._store$.next({
      ...this.state,
      ...newState,
    });
  }
}
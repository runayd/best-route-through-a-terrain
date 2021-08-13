import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {

  public operationOnMap: Subject<any>;

  constructor() {
    this.operationOnMap = new Subject<any>();
  }

  public operateOnMap(action: any): void {
    this.operationOnMap.next(action);
  }
}

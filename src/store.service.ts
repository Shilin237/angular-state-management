import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ElementList } from './element-list';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  //interface test {name:string,class:string}
  constructor() {}

  public storeSubject = new BehaviorSubject<ElementList>(
    null
  );

  public get getData() {
    return this.storeSubject.value;
  }

  public set setData(obj:ElementList) {
    console.log(obj)
    this.storeSubject.next(obj);
  }

  public get store$() {
    return this.storeSubject.asObservable();
  }
}

import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { StoreService } from './store.service';
import { map } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs';
import { ElementList } from './element-list';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
    <div style="min-height:300px; display:flex;border:1px solid black;background-color:yellow;">
    {{newState|json}}
    </div>
    <div   *ngIf= "cartItem$ | async;let user ">
    {{user.id | json }}
    {{user.value | json }}
    </div>
  `,
})
export class App implements OnInit {
  constructor(private store: StoreService) {}
  data: ElementList = { speciality: null, expertise: null, bio: null };
  ngOnInit() {
    this.data.speciality = { id: 1, value: false };
    this.data.expertise = { id: 19, value: false };
    this.data.bio = { id: 21, value: false };

    this.store.setData = this.data;
    this.data = this.store.getData;
  }
  name = 'Angular';

  state = [1, 5, 3, 5, 6];

  newState = {
    ...this.state,
    items: [].concat(this.state, [7, 8, 9]),
  };
  public cartItem$ = this.store.store$.pipe(
    map((x) => x.expertise),
    distinctUntilChanged()
  );
}

bootstrapApplication(App);

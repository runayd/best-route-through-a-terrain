import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Action, Store } from '../../store';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('scroll', { static: false })
  set scrollElement(content: ElementRef) {
    this.scroll = content;
  }
  scroll: ElementRef;

  showMenu = false;
  scrollRight = true;
  findPath = true;
  findPathButtonLabel: 'Find Route' | 'Clear Route' = 'Find Route';

  subscription$: Subscription;

  


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscribeToStore();
  }

  ngOnDestroy(): void {
    this.unsubscribeAllSubscription();
  }




  openCard(): void {
    this.store.setState({
      showCard: true,
      showMenu: false
    });
    this.scrollRight = true;
  }

  findOrClearPath(): void {
    const action: Action = this.findPath ? Action.findPath : Action.clearPath;
    this.store.sendAction(action);

    this.store.setState({
      findPath:  !this.findPath,
    });
  }

  resetEndpoints(): void {
    this.store.sendAction(Action.resetEndpoints);

    this.store.setState({
      findPath:  true,
    });
  }

  updateFindPathButtonLabel(findPath: boolean): void {
    this.findPath = findPath;
    this.findPathButtonLabel = findPath ? 'Find Route' : 'Clear Route';
  }

  scrollRightOrLeft(): void {
    const value = this.scrollRight ? 480 : -480;
    this.scroll.nativeElement.scrollLeft += value;
    this.scrollRight = !this.scrollRight;
  }



  
  subscribeToStore(): void {
    this.intializeSubscription();
    this.subscribeToShowMenu();
    this.subscribeToFindPath();
  }

  
  intializeSubscription(): void {
    this.subscription$ = new Subscription();
  }

  subscribeToShowMenu(): void {
    const subscription$$ = this.store.get('showMenu').subscribe(
      showMenu => this.showMenu = showMenu
    );
    this.subscription$.add(subscription$$);
  }

  subscribeToFindPath(): void {
    const subscription$ = this.store.get('findPath').subscribe( findPath => {
      this.updateFindPathButtonLabel(findPath);
    });
    this.subscription$.add(subscription$);
  }

  unsubscribeAllSubscription(): void {
    this.subscription$.unsubscribe();
  }

}

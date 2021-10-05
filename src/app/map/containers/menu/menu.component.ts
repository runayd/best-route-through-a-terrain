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
  speed: number;
  speedLabel: string;

  subscription$: Subscription;

  


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscribeToStore();
  }

  ngOnDestroy(): void {
    this.unsubscribeAllSubscription();
  }




  openInstructionCard(): void {
    this.store.setState({
      showCard: true,
      showMenu: false,
      content: 'instructions',
      showInstructionDelay: '0.5s'
    });
    this.scrollRight = true;
  }

  openAboutMeCard(): void {
    this.store.setState({
      showCard: true,
      showMenu: false,
      content: 'about-me'
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

  updateSpeed(): void {
    const speed = (this.speed + 1) % 3;

    this.store.setState({
      speed
    });
  }
  

  setSpeedLabel(speed: number): void {
    this.speed = speed;
    
    switch(this.speed) {
      case 0: {
        this.speedLabel = 'Low Speed';
        break;
      }
      case 1: {
        this.speedLabel = 'Medium Speed';
        break;
      }
      case 2: {
        this.speedLabel = 'Fast Speed';
        break;
      }
    }
  }



  
  subscribeToStore(): void {
    this.intializeSubscription();
    this.subscribeToShowMenu();
    this.subscribeToFindPath();
    this.subscribeToSpeed();
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

  subscribeToSpeed(): void {
    const subscription$ = this.store.get('speed').subscribe( speed => {
      this.setSpeedLabel(speed);
    })
    this.subscription$.add(subscription$);
  }

  unsubscribeAllSubscription(): void {
    this.subscription$.unsubscribe();
  }

}

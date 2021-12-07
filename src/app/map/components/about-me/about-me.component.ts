import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { appear } from '../../animations';
import { Store } from '../../store';
import { aboutmeContainer } from './about-me.animation';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [
    aboutmeContainer,
    appear
  ]
})
export class AboutMeComponent implements OnInit, AfterViewInit, OnDestroy {

  jobTitleAliases = ['rontend + Backend En', 'ull Stack Engineer '];
  i = 0;
  j = 0;
  currentAlias: any[] = [];
  isDeleting = false;
  isEnd = false;

  jobTitleSubject = new Subject<string>();
  jobTitle$ = this.jobTitleSubject.asObservable();

  timer: any;



  constructor(private store: Store) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.typing();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }



  closeAboutMe(): void {
    this.store.setState({
      showCard: false,
      showMenu: true
    });
  }

  

  typing = (): void => {
    this.isEnd = false;

    this.jobTitleSubject.next(this.currentAlias.join(''));
    
    if ( this.i < this.jobTitleAliases?.length) {

      if (!this.isDeleting && this.j <= this.jobTitleAliases[this.i]?.length) {
        this.currentAlias.push(this.jobTitleAliases[this.i][this.j]);
        this.j++;
      }

      if (this.isDeleting && this.j <= this.jobTitleAliases[this.i]?.length) {
        this.currentAlias.pop();
        this.j--;
      }

      if (this.j === this.jobTitleAliases[this.i]?.length) {
        this.isEnd = true;
        this.isDeleting = true;
      }

      if (this.isDeleting && this.j === 0) {
        this.currentAlias = [];
        this.isDeleting = false;
        this.i++;
        if (this.i === this.jobTitleAliases?.length) {
          this.i = 0;
        }
      }
    }
    const speedUp = Math.random() * (80 - 50) + 50;
    const normalSpeed = Math.random() * (200 - 150) + 150;
    const endTime = this.i !== 0 ? 2000 : 50;
    const time = this.isEnd ? endTime : this.isDeleting ? speedUp : normalSpeed;

    this.timer = setTimeout(this.typing, time);
  }

}

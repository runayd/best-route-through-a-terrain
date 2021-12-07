import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { appear, parent } from '../../animations';
import { Store } from '../../store';
import { buildingInfoContainer } from './how-was-this-made.animation';
import { HOW_I_MADE_THIS, ROW_OF_CONTENT } from './how-was-this-made.constant';

@Component({
  selector: 'how-was-this-made',
  templateUrl: './how-was-this-made.component.html',
  styleUrls: ['./how-was-this-made.component.scss'],
  animations: [
    buildingInfoContainer,
    appear,
    parent
  ]
})
export class HowWasThisMadeComponent implements OnInit {

  @ViewChild('scroll', { static: true})
  set scrollElement(content: ElementRef) {
    this.scrollIndex = content;
  }
  scrollIndex: ElementRef;

  @ViewChildren('contentScroll')
  content!: QueryList<ElementRef>;

  howImadeThis: any = [];
  rowOfContent: any = [];

  atLeftEnd = true;
  atRightEnd = false;

  constructor(private store: Store) {
    this.initalizeVariables();
  }

  ngOnInit(): void {}

  initalizeVariables() {
    this.howImadeThis = HOW_I_MADE_THIS;
    this.rowOfContent = ROW_OF_CONTENT;
  }

  closeHowImadeThis(): void {
    this.store.setState({
      showCard: false,
      showMenu: true
    });
  }

  scrollIndexLeft(): void {    
    this.scrollIndex.nativeElement.scrollLeft -= 200;
    this.atRightEnd = false;

    if (this.scrollIndex.nativeElement.scrollLeft <= 10) {
      this.atLeftEnd = true;
    }
  }

  scrollIndexRight(): void {
    this.scrollIndex.nativeElement.scrollLeft += 200;
    this.atLeftEnd = false;

    if (this.scrollIndex.nativeElement.scrollLeft >= 1800) {
      this.atRightEnd = true;
    }
  }

  scrollToTitle(index: number): void {
    this.content.toArray()[index]
      .nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

}

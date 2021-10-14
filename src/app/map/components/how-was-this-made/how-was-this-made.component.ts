import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { appear, parent } from '../../animations';
import { Store } from '../../store';
import { buildingInfoContainer } from './how-was-this-made.animation';

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

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.setHowImadeThis();
    this.setRowOfContent();
  }

  setHowImadeThis(): void {
    this.howImadeThis = [
      {
        title: 'Runay',
        details: [
          'Some free text explaining the tile and some other details. and some more detasils. Some free text explaining the tile and some other details. and some more detasils. Some free text explaining the tile and some other details. and some more detasils.',
          'Some free text explaining the tile and some other details. and some more detasils.'
        ]
      },
      {
        title: 'Ramdas',
        details: [
          'Some free text explaining the tile and some other details. and some more detasils. Some free text explaining the tile and some other details. and some more detasils. Some free text explaining the tile and some other details. and some more detasils.',
          'Some free text explaining the tile and some other details. and some more detasils.'
        ]
      },
      {
        title: 'Dhaygude',
        details: [
          'Some free text explaining the tile and some other details. and some more detasils. Some free text explaining the tile and some other details. and some more detasils. Some free text explaining the tile and some other details. and some more detasils.',
          'Some free text explaining the tile and some other details. and some more detasils.'
        ]
      }
    ]
  }

  setRowOfContent(): void {
    this.rowOfContent = [
      'Runay',
      'Ramdas',
      'Dhaygude',
      'IntroductionIntroduction',
      'IntroductionIntroduction',
      'IntroductionIntroduction'
    ]
  }

  closeHowImadeThis(): void {
    this.store.setState({
      showCard: false,
      showMenu: true
    });
  }

  scrollIndexLeft(): void {
    this.scrollIndex.nativeElement.scrollLeft -= 100;
  }

  scrollIndexRight(): void {
    this.scrollIndex.nativeElement.scrollLeft += 100;
  }

  scrollToTitle(index: number): void {
    this.content.toArray()[index]
      .nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

}

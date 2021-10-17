import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { appear, appearWithJustInDelay, wiggleAnimation } from '../../animations';
import { Store } from '../../store';
import { insOnTop, insBelow, instructionContainer } from './instructions.animation';

@Component({
  selector: 'instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    instructionContainer,
    insOnTop,
    insBelow,
    appear,
    appearWithJustInDelay
  ]
})
export class InstructionsComponent implements OnInit {

  @ViewChild('scrollMenu', { static: false })
  set scrollMenuElement(content: ElementRef) {
    this.scrollMenu = content;
  }
  scrollMenu: ElementRef;

  @ViewChild('scrollIns', { static: false })
  set scrollInsElement(content: ElementRef) {
    this.scrollIns = content;
  }
  scrollIns: ElementRef;

  scrollRight = true;
  scrollRightAnimation: string;
  insState = 'firstInstructions';
  showInstructionAction = true;
  showInstructionDelay$ = this.store.get('showInstructionDelay');

  subscription: Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.setScrollRightAnimation();
  }
  

  scrollRightOrLeft(): void {
    if (this.scrollRightAnimation !== 'none') {
      this.scrollRightAnimation = 'none';
    }

    const scrollValue = this.scrollRight ? 528 : -528;
    this.scrollMenu.nativeElement.scrollLeft += scrollValue;
    this.scrollIns.nativeElement.scrollLeft += scrollValue;
    
    this.scrollRight = !this.scrollRight;
    this.showInstructionAction = !this.scrollRight;
  }

  showNextOrCloseInstruction(): void {
    if (this.insState === 'firstInstructions') {
      this.insState = 'secondInstructions';
      this.showInstructionAction = false;
    } else {
      this.store.setState({
        showCard: false,
        showMenu: true
      });
    }
  }

  setScrollRightAnimation(): void {
    this.scrollRightAnimation = wiggleAnimation;
  }

}

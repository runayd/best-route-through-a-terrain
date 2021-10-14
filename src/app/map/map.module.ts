import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import {
  MapContainerComponent,
  MapGridComponent,
  MenuComponent,
  CardComponent,
  InstructionsComponent,
  AboutMeComponent,
  WelcomeCardComponent,
  SlateButtonComponent,
  EndpointComponent,
  ArrowComponent,
  DragComponent,
  FreeDraggingDirective,
  FreeDraggingHandleDirective } from '.';
import { HowWasThisMadeComponent } from './components/how-was-this-made/how-was-this-made.component';
  


@NgModule({
  declarations: [
    MapGridComponent,
    CardComponent,
    FreeDraggingDirective,
    FreeDraggingHandleDirective,
    InstructionsComponent,
    AboutMeComponent,
    MapContainerComponent,
    SlateButtonComponent,
    EndpointComponent,
    ArrowComponent,
    DragComponent,
    WelcomeCardComponent,
    MenuComponent,
    HowWasThisMadeComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserAnimationsModule
  ]
})
export class MapModule { }

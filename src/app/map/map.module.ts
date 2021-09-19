import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import {
  MapContainerComponent,
  MapGridComponent,
  MenuSlateComponent,
  InstructionsComponent,
  AboutMeComponent,
  WelcomeCardComponent,
  SlateButtonComponent,
  EndpointComponent,
  ArrowComponent,
  DragComponent,
  FreeDraggingDirective,
  FreeDraggingHandleDirective } from '.';
  


@NgModule({
  declarations: [
    MapGridComponent,
    MenuSlateComponent,
    FreeDraggingDirective,
    FreeDraggingHandleDirective,
    InstructionsComponent,
    AboutMeComponent,
    MapContainerComponent,
    SlateButtonComponent,
    EndpointComponent,
    ArrowComponent,
    DragComponent,
    WelcomeCardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserAnimationsModule
  ]
})
export class MapModule { }

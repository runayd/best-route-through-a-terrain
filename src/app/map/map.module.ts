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
import { FindPathDiagramComponent } from './components/base-components/find-path-diagram/find-path-diagram.component';
import { ResetDiagramComponent } from './components/base-components/reset-diagram/reset-diagram.component';
import { ChangeSpeedDiagramComponent } from './components/base-components/change-speed-diagram/change-speed-diagram.component';
import { InstructionDiagramComponent } from './components/base-components/instruction-diagram/instruction-diagram.component';
import { ConstructionDiagramComponent } from './components/base-components/construction-diagram/construction-diagram.component';
import { AboutMeDiagramComponent } from './components/base-components/about-me-diagram/about-me-diagram.component';
  


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
    HowWasThisMadeComponent,
    FindPathDiagramComponent,
    ResetDiagramComponent,
    ChangeSpeedDiagramComponent,
    InstructionDiagramComponent,
    ConstructionDiagramComponent,
    AboutMeDiagramComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserAnimationsModule
  ]
})
export class MapModule { }

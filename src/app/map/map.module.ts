import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapGridComponent } from './map-grid/map-grid.component';
import { MenuSlateComponent } from './menu-slate/menu-slate.component';
import { FreeDraggingDirective } from './directive/free-dragging.directive';
import { FreeDraggingHandleDirective } from './directive/free-dragging-handle.directive';
import { FormsModule } from '@angular/forms';
import { BackgroundGradientPipe } from './map-grid/pipes/background-gradient.pipe';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { AboutMeComponent } from './components/about-me/about-me.component';


@NgModule({
  declarations: [
    MapGridComponent,
    MenuSlateComponent,
    FreeDraggingDirective,
    FreeDraggingHandleDirective,
    BackgroundGradientPipe,
    InstructionsComponent,
    AboutMeComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class MapModule { }

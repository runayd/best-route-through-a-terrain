import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapGridComponent } from './map/map-grid/map-grid.component';
import { MapModule } from './map/map.module';

const routes: Routes = [
  {path: '', component: MapGridComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CurrentDayComponent} from "./components/current-day/current-day.component";

const routes: Routes = [
  {path: "", component: CurrentDayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

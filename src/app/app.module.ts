import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentDayComponent } from './components/current-day/current-day.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FutureDaysComponent } from './components/future-days/future-days.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentDayComponent,
    SidebarComponent,
    FutureDaysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

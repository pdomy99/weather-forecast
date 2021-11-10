import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  aDate = new Date
  date: Date[] = [];

  constructor(private router: Router) {
    this.date.push(new Date())
    for (let i = 0; i < 4; i++) {
      this.date.push(new Date())
      this.date[i+1].setHours(this.date[i].getHours() + ((i+1) * 24))
      console.log(this.date[i])
    }
  }

  ngOnInit(): void {
  }

  changeDisplayDay(day:string) {
    this.router.navigate(['/' + day])
  }

}

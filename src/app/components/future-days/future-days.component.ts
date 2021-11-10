import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ForecastService} from "../../services/forecast.service";

@Component({
  selector: 'app-future-days',
  templateUrl: './future-days.component.html',
  styleUrls: ['./future-days.component.scss']
})
export class FutureDaysComponent implements OnInit {

  selectedHour:any;
  locationError = false
  city = "";
  timeline: any = [];
  currentTime = new Date();
  dayThreshold = ({
    start: new Date(),
    end: new Date()
  });

  location: any;
  weatherNow: any;

  date: string = this.route.snapshot.params['dateIndex'];

  constructor(private forecastService: ForecastService,
              private route: ActivatedRoute) {
    for (let i = this.currentTime.getHours(); i < 24; i++) {
      console.log(i)
      this.timeline.push(i)
      console.log(this.timeline.length)
    }
  }

  ngOnInit(): void {
    this.forecastService.getWeatherForecast(this.city).subscribe(data => {
        this.getCurrentDayForecast(data);
      },
      error => {})
  }

  getCurrentDayForecast(data:any) {

  }

  selectCity() {

  }

}

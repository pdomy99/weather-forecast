import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ForecastService} from "../../services/forecast.service";

@Component({
  selector: 'app-future-days',
  templateUrl: './future-days.component.html',
  styleUrls: ['./future-days.component.scss']
})
export class FutureDaysComponent implements OnInit {

  selectedHour: any;
  locationError = false
  city = "";
  timeline: any = [];
  currentTime = new Date();

  location: any;
  weatherArray: any;
  dayN: number;


  constructor(private forecastService: ForecastService,
              private route: ActivatedRoute) {
    this.dayN = this.route.snapshot.params['dateIndex'];
  }

  ngOnInit(): void {
    this.selectCity()
    this.currentTime.setDate(this.currentTime.getDate() + (+this.dayN));
  }

  selectCity() {
    this.locationError = false;
    this.forecastService.getHourlyForecast(this.city).subscribe(data => {
        // this.getCurrentDayForecast(data);
      },
      error => {
        this.locationError = true;
      });
    this.forecastService.getWeatherForecast(this.city).subscribe(data => {
        this.getFutureDayForecast(data);
      },
      error => {
        this.locationError = true;
      });
  }

  getFutureDayForecast(data: any) {
    console.log(data)
    this.location = data.city;
    const timelineTemp = []

    this.weatherArray = data.list.slice(this.dayN * 8, 8 + (this.dayN * 8))
    for (const forecast of data.list.slice(8, 16)) {
      timelineTemp.push({
        time: forecast.dt_txt
      });
    }
    this.timeline = timelineTemp;
  }

}

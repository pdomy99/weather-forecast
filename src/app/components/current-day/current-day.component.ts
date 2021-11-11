import {Component, OnInit, ViewChild} from '@angular/core';
import {ForecastService} from "../../services/forecast.service";

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss']
})
export class CurrentDayComponent implements OnInit {

  selectedHour:any;
  locationError = false
  city = "";
  timeline: any = [];
  currentTime = new Date();
  location: any;


  //Adat tárolók
  weatherArray: any;

  constructor(private forecastService: ForecastService) {
    for (let i = this.currentTime.getHours(); i < 24; i++) {
      this.timeline.push(i)
    }
  }

  ngOnInit(): void {
    this.selectCity()
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
        this.getCurrentDayForecast(data);
      },
      error => {
        this.locationError = true;
      });
  }

  // getCurrentDayForecast(data: any) {
  //   console.log(data)
  //   console.log(this.currentTime.getHours())
  //   this.location = data.city
  //   for (let datum of data.hourly) {
  //     const apiDate = new Date(datum.dt_txt).getDate();
  //     if (apiDate > this.dayThreshold.start.getDate()){
  //       console.log(datum.dt_txt)
  //     }
  //   }
  //   this.hourlyWeatherArray = data.hourly
  // }

  getCurrentDayForecast(data: any) {
    console.log(data)
    this.location = data.city;
    const timelineTemp = []

    this.weatherArray = data
    for (const forecast of data.list.slice(0, 8)) {
      let forecastDate = new Date(forecast.dt_txt).getDate();
      if (forecastDate == this.currentTime.getDate()) {
        timelineTemp.push({
          time: forecast.dt_txt
        });
      }
    }
    this.timeline = timelineTemp;
  }
}

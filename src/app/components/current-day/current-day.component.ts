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
  dayThreshold = ({
    start: new Date(),
    end: new Date()
  });
  location: any;


  //Adat tárolók
  hourlyWeatherArray: any;
  dailyWeatherArray: any;
  locationArray: any = []

  constructor(private forecastService: ForecastService) {
    this.dayThreshold.start.setHours(0, 0, 0);
    this.dayThreshold.end.setDate(this.dayThreshold.start.getDate()+1);
    this.dayThreshold.end.setHours(0, 0, 0);
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
        this.getCurrentDayForecast(data);
      },
      error => {
        this.locationError = true;
      });
    this.forecastService.getWeatherForecast(this.city).subscribe(data => {
        // this.getCurrentDayForecast(data);
      },
      error => {
        this.locationError = true;
      });
  }

  dateRange() {
    const start = new Date();
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);

    return {start, to}
  }

  getCurrentDayForecast(data: any) {
    console.log(data)
    console.log(this.currentTime.getHours())
    this.location = data.city
    for (let datum of data.hourly) {
      const apiDate = new Date(datum.dt_txt).getDate();
      if (apiDate > this.dayThreshold.start.getDate()){
        console.log(datum.dt_txt)
      }
    }
    this.hourlyWeatherArray = data.hourly
  }

  // getCurrentDayForecast(data: any) {
  //   this.location = data.city;
  //   const timelineTemp = []
  //
  //   for (const forecast of data.list.slice(0, 8)) {
  //     timelineTemp.push({
  //       time: forecast.dt_txt,
  //       temp: forecast.main.temp,
  //       weather: forecast.weather.main
  //     });
  //     const apiDate = new Date(forecast.dt_txt).getTime();
  //
  //
  //
  //     if (this.dateRange().start.getTime() <= apiDate && this.dateRange().to.getTime() >= apiDate) {
  //       this.weatherNow = forecast;
  //       console.log(this.weatherNow)
  //       console.log(data.list[0])
  //     }
  //   }
  //   this.timeline = timelineTemp;
  // }

  consoleLog() {
    console.log(this.hourlyWeatherArray[0].temp)
  }

}

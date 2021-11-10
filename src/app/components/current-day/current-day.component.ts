import {Component, OnInit} from '@angular/core';
import {ForecastService} from "../../services/forecast.service";

@Component({
  selector: 'app-current-day',
  templateUrl: './current-day.component.html',
  styleUrls: ['./current-day.component.scss']
})
export class CurrentDayComponent implements OnInit {

  locationError = false
  city = "";
  timeline: any = [];
  currentTime = new Date();

  location: any;

  //Jelenlegi időjárás, ebből van kiemelve az oldalon megjelenő adatok
  weatherNow: any;

  constructor(private forecastService: ForecastService) {
  }

  ngOnInit(): void {
    this.forecastService.getWeatherForecast(this.city).subscribe(data => {
        this.getCurrentDayForecast(data);
      },
      error => {
        this.locationError = true;
      })
  }

  selectCity() {
    this.locationError = false;
    this.forecastService.getWeatherForecast(this.city).subscribe(data => {
        this.getCurrentDayForecast(data);
      },
      error => {
        console.log(error)
        this.locationError = true;
      })
  }

  dateRange() {
    const start = new Date();
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);

    return {start, to}
  }

  getCurrentDayForecast(data: any) {
    this.location = data.city;
    console.log(data)
    const timelineTemp = []

    for (const forecast of data.list.slice(0, 8)) {
      timelineTemp.push({
        time: forecast.dt_txt,
        temp: forecast.main.temp,
        weather: forecast.weather.main
      });
      const apiDate = new Date(forecast.dt_txt).getTime();



      if (this.dateRange().start.getTime() <= apiDate && this.dateRange().to.getTime() >= apiDate) {
        this.weatherNow = forecast;
        console.log(this.weatherNow)
      }
    }
    this.timeline = timelineTemp;
  }

  consoleLog() {
    console.log(this.locationError)
  }

}

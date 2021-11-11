import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private httpClient: HttpClient) {
  }

  getWeatherForecast(city: string) {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position)
        },
        (error) => {
          observer.next(error)
        }
      )
    }).pipe(
      map((value: any) => {

        if (city != null && city != "") {
          return new HttpParams()
            .set('q', city)
            .set('units', 'metric')
            .set('appid', 'e2c5e18210da776f410326379a1f0e9c')
        } else {
          return new HttpParams()
            .set('lon', value.coords.longitude)
            .set('lat', value.coords.latitude)
            .set('units', 'metric')
            .set('appid', 'e2c5e18210da776f410326379a1f0e9c')
        }
      }),
      switchMap((values) => {
        return this.httpClient.get('https://api.openweathermap.org/data/2.5/forecast', {params: values})
      })
    )
  }
}

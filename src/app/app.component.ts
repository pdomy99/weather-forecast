import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather-forecast';

  ngOnInit() {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`)
      })
    }
  }
}

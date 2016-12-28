import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  moduleId: module.id,
  selector: 'weather',
  templateUrl: 'weather.component.html',
  providers: [WeatherService]
})

export class WeatherComponent {
  weatherConditions: any;

  constructor(private weatherService: WeatherService) {
    'ngInit';
  }

  ngOnInit() {
    this.fetchCurrentWeather('toronto,on').then(response => {
      this.weatherConditions = response;
    }, err => {
      console.log(err);
    });
  }

  fetchCurrentWeather(location: string) {
    let promise = new Promise((resolve, reject) => {
      this.weatherService.getCurent(location).subscribe(resp => {
        resolve(resp);
      }, err => {
        reject(err);
      });
    });
    return promise;
  }
}

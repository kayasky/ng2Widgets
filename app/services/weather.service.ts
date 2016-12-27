import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class WeatherService {
  constructor(private http: Http) {
    console.log('WeatherService init');
  }

  getWeather(base: string) {

  }
}

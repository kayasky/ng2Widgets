import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

const basePath = 'http://api.openweathermap.org/data/2.5';
const appid = 'b9ec610b4f86466f14269dac1d6aa0ec';
const queryTypes = ['weather', 'forecast'];

@Injectable()

export class WeatherService {
  constructor(private http: Http) {
    console.log('WeatherService init');
  }

  _getWeather(queryType: string, location: string) {
    if (!~queryTypes.indexOf(queryType) || !location) {
      return null;
    }
    let params = new URLSearchParams();
    params.set('q', location);
    params.set('appid', appid);
    return this.http.get(`${basePath}/${queryType}`, {
      search: params
    }).map(res => res.json());
  }

  getCurent(location: string) {
    return this._getWeather('weather', location);
  }

  getForecast(location: string) {
    return this._getWeather('forecast', location);
  }
}

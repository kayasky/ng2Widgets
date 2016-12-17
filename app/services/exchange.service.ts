import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ExchangeService {
  constructor(private http: Http) {
    console.log('ExchangeService init');
  }

  getRates(base: string) {
    let params = new URLSearchParams();
    params.set('base', base);
    return this.http.get('http://api.fixer.io/latest', {
      search: params
    }).map(res => res.json());
  }
}

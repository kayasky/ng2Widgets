import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';

const basePath = 'http://api.fixer.io/latest'

@Injectable()

export class ExchangeService {

  constructor(private http: Http) {
  }

  getRates(base: string) {
    let params = new URLSearchParams();
    params.set('base', base);
    return this.http.get(basePath, {
      search: params
    }).map(res => res.json()).publishLast().refCount();
  }
}

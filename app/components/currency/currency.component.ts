import { Component } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';

const precision = 2;

@Component({
  moduleId: module.id,
  selector: 'currency',
  templateUrl: 'currency.component.html',
  providers: [ExchangeService]
})

export class CurrencyComponent {
  amountOne: number;
  amountTwo: number;
  currencyOne: string;
  currencyTwo: string;
  currencies: string[];

  constructor(private exchangeService: ExchangeService) {
    'ngInit';
  }

  ngOnInit() {
    this.amountOne = 1;
    this.amountTwo = 0;
    this.currencyOne = 'CAD';
    this.currencyTwo = 'USD';
    this.currencies = ['CAD', 'USD', 'EUR'];
    this.convertSecond(this.amountOne, this.currencyOne);
  }

  convert(amount: number = 0, fromCurrency: string, toCurrency: string) {
    let promise = new Promise((resolve, reject) => {
      this.exchangeService.getRates(fromCurrency).subscribe(resp => {
        let converted = resp.rates[toCurrency] * amount;
        resolve(converted.toFixed(precision));
      }, err => {
        reject(err);
      });
    });
    return promise;
  }

  convertFirst(amount: number, currency: string) {
    if (currency === this.currencyOne) {
      this.amountTwo = this.amountOne;
    } else {
      this.convert(amount, currency, this.currencyOne).then(response => {
        this.amountOne = response;
      });
    }
  }

  convertSecond(amount: number, currency: string) {
    if (currency === this.currencyTwo) {
      this.amountOne = this.amountTwo;
    } else {
      this.convert(amount, currency, this.currencyTwo).then(response => {
        this.amountTwo = response;
      });
    }
  }
}

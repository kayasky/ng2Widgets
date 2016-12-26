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
  amounts: Amount[];
  currencies: string[];

  constructor(private exchangeService: ExchangeService) {
    'ngInit';
  }

  ngOnInit() {
    this.amounts = [
      {
        value: 1,
        currency: 'CAD'
      }, {
        value: 0,
        currency: 'USD'
      }
    ];

    this.currencies = ['CAD', 'USD', 'EUR'];
    this.convertAmount(0, this.amounts, this.amounts[0].value, this.amounts[0].currency);
  }

  convert(fromCurrency: string) {
    let promise = new Promise((resolve, reject) => {
      this.exchangeService.getRates(fromCurrency).subscribe(resp => {
        resolve(resp);
      }, err => {
        reject(err);
      });
    });
    return promise;
  }

  convertAmount(index: number, amounts: Amount[], fromValue: number, fromCurrency: string) {
    this.convert(fromCurrency).then(response => {
      amounts.forEach((item: any, i) => {
        if (i !== index) {
          item.value = 0;
          if (item.currency === fromCurrency) {
            item.value = fromValue;
          } else {
            let converted = response.rates[item.currency] * fromValue;
            item.value = converted.toFixed(precision);
          }
        }
      });
    });
  }
}

interface Amount {
  value: number;
  currency: string;
}

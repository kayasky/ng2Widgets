import { Component } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';

const precision = 2; // How many decimal places do we want
const cr = {
  eur: 'EUR',
  cad: 'CAD',
  usd: 'USD',
  aud: 'AUD',
  gbp: 'GBP',
  inr: 'INR',
  jpy: 'JPY'
}; // Store all currency codes in this constant

@Component({
  moduleId: module.id,
  selector: 'currency',
  templateUrl: 'currency.component.html',
  providers: [ExchangeService]
})

export class CurrencyComponent {
  amounts: Amount[];
  currencies: string[];
  exchangeRates: any;

  constructor(private exchangeService: ExchangeService) {
    'ngInit';
  }

  ngOnInit() {
    this.amounts = [
      {
        value: 1,
        currency: cr.cad
      }, {
        value: 0,
        currency: cr.usd
      }, {
        value: 0,
        currency: cr.eur
      }, {
        value: 0,
        currency: cr.aud
      }, {
        value: 0,
        currency: cr.gbp
      }
    ];
    this.currencies = [cr.cad, cr.usd, cr.eur, cr.aud, cr.gbp];
    this.convertAmount(0, this.amounts, this.amounts[0].value, this.amounts[0].currency);
  }

  getExchangeRates(fromCurrency: string) {
    let promise = new Promise((resolve, reject) => {
      this.exchangeService.getRates(fromCurrency).subscribe(resp => {
        resolve(resp);
      }, err => {
        reject(err);
      });
    });
    return promise;
  }

  convertAmountArray(index: number, amounts: Amount[], fromValue: number, fromCurrency: string) {
    amounts.forEach((item: any, i) => {
      if (i !== index) {
        item.value = 0;
        if (item.currency === fromCurrency) {
          item.value = fromValue;
        } else {
          let converted = this.exchangeRates.rates[item.currency] * fromValue;
          item.value = converted.toFixed(precision);
        }
      }
    });
  }

  convertAmount(index: number, amounts: Amount[], fromValue: number, fromCurrency: string) {
    if (this.exchangeRates && (this.exchangeRates.base === fromCurrency)) {
      this.convertAmountArray(index, amounts, fromValue, fromCurrency);
      return;
    }
    this.getExchangeRates(fromCurrency).then(response => {
      this.exchangeRates = response;
      this.convertAmountArray(index, amounts, fromValue, fromCurrency);
    });
  }
}

interface Amount {
  value: number;
  currency: string;
}

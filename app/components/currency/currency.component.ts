import { Component } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';

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

  constructor(private exchangeService: ExchangeService) {
    this.amountOne = 0;
    this.amountTwo = 0;
    this.currencyOne = 'CAD';
    this.currencyTwo = 'USD';
  }

  convertFirst(amount: number, currency: string) {
    console.log(amount, currency);
    this.exchangeService.getRates(currency).subscribe(resp => {
      this.amountOne = resp.rates[this.currencyOne] * amount;
    });
  }

  convertSecond(amount: number, currency: string) {
    this.exchangeService.getRates(currency).subscribe(resp => {
      this.amountTwo = resp.rates[this.currencyTwo] * amount;
    });
  }
}

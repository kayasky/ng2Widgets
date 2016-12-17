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
    this.exchangeService.getRates('USD').subscribe(rates => {
      console.log(rates);
    })
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { TemperaturePipe } from './pipes/temperature.pipe';
import { AppComponent }  from './app.component';
import { CurrencyComponent }  from './components/currency/currency.component';
import { WeatherComponent }  from './components/weather/weather.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, MaterialModule.forRoot()],
  declarations: [AppComponent, CurrencyComponent, WeatherComponent, TemperaturePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

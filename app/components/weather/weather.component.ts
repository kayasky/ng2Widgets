import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  moduleId: module.id,
  selector: 'weather',
  templateUrl: 'weather.component.html',
  providers: [WeatherService]
})

export class WeatherComponent {

  constructor(private weatherService: WeatherService) {
    'ngInit';
  }

  ngOnInit() {
      // init
  }
}

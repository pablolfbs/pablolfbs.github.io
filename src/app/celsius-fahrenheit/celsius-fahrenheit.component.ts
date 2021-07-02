import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-celsius-fahrenheit',
  templateUrl: './celsius-fahrenheit.component.html',
  styleUrls: ['./celsius-fahrenheit.component.css']
})
export class CelsiusFahrenheitComponent implements OnInit {
  title = 'celsiusFahrenheit';
  
  celsius: number | undefined
  fahrenheit: number | undefined

  constructor() { }

  ngOnInit(): void {
    // C = 5/9 x (F-32)
    // F = C x 1,8 + 32
  }

  celsiusToFahrenheit() {
    this.fahrenheit = this.celsius! * 1.8 + 32
  }

  fahrenheitToCelsius() {
    this.celsius = 5 / 9 * (this.fahrenheit! - 32)
  }

}

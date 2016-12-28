import { Pipe, PipeTransform } from '@angular/core';
/*
 * Converts temperature value from Kelvin to Degrees C/F
 * Takes a unit argument that can either C or F (Defaults to C)
 * Usage:
 *   value | temperature:'C'
 * Example:
 *   300 | temperature:'C'
 *   formats to: 27°C
*/
@Pipe({ name: 'temperature' })
export class TemperaturePipe implements PipeTransform {
  transform(value: number, unit: string = 'C'): string {
    let normalizedUnit = unit.toUpperCase();
    let temp: string;
    if (normalizedUnit === 'C') {
      temp = (value - 273.15).toFixed(0);
    } else if (normalizedUnit === 'F') {
      temp = ((value * 9 / 5) - 459.67).toFixed(0);
    }
    return `${temp}°${normalizedUnit}`;
  }
}

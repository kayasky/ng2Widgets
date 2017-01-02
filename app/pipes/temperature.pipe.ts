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
    let tempNum: number;
    let tempStr: string;

    if (normalizedUnit === 'C') {
      tempNum = value - 273.15;
    } else if (normalizedUnit === 'F') {
      tempNum = (value * 9 / 5) - 459.67;
    }

    // Make sure there never a negative zero value
    tempNum = ((-0.5 < tempNum) && (tempNum < 0.5)) ? Math.abs(tempNum) : tempNum;

    // Remove any decimals
    tempStr = (tempNum).toFixed(0);
    return `${tempStr}°${normalizedUnit}`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantity',
})
export class QuantityPipe implements PipeTransform {

  transform(number: any): unknown {
    return `Qty:${number}`;
  }

}

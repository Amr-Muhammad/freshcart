import { Pipe, PipeTransform } from '@angular/core';
import { productsInterface } from '../interfaces/products';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {

  transform(array: productsInterface[], searchValue: string): productsInterface[] {
    return array.filter((el) =>
      el.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    )
  }


}

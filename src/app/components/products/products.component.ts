import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  mama: string = ''

  addPhrase() {
    this.mama = 'هويدا عبدالله محمد'
  }

  delete(){
    this.mama=''
  }

}

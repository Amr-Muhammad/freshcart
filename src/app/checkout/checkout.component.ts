import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  deliveryFlag: boolean = false

  constructor(private _cartService: CartService, private _ActivatedRoute: ActivatedRoute) {

  }

  checkoutFormDelivery: FormGroup = new FormGroup(({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, Validators.required),
  }))

  checkoutFormCash: FormGroup = new FormGroup(({
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }))

  delivery() {
    this.deliveryFlag = true
    document.getElementById('delivery')?.classList.add('active');
    document.getElementById('cash')?.classList.remove('active');
  }

  cash() {
    this.deliveryFlag = false
    document.getElementById('cash')?.classList.add('active');
    document.getElementById('delivery')?.classList.remove('active');

  }

  cartForm(cartForm: FormGroup) {
    
    (document.querySelector('.proceedToPay') as HTMLElement).innerText = 'Prossessing...';
    this._ActivatedRoute.params.subscribe(id => {
      this._cartService.checkoutOnline(id['id'], cartForm.value).subscribe({
        next: (response) => {
          window.location.href = response.session.url
        }
        ,
        error: (err) => {
          console.log(err);
        },
      })
    });
  }

}


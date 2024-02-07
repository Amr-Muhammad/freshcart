import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { allCart } from '../interfaces/allCart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  deliveryFlag: boolean = true
  cartData: allCart | null = null

  constructor(private _cartService: CartService, private _ActivatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this._cartService.getAllCart().subscribe({
      next: (response) => {
        this.cartData = response
      }
    })

  }

  checkoutFormDelivery: FormGroup = new FormGroup(({
    name: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, Validators.required),
  }))

  checkoutFormStore: FormGroup = new FormGroup(({
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }))

  delivery() {
    this.deliveryFlag = true
    document.getElementById('delivery')?.classList.add('active');
    document.getElementById('store')?.classList.remove('active');
    this.checkoutFormDelivery.reset()
  }

  store() {
    this.deliveryFlag = false
    document.getElementById('store')?.classList.add('active');
    document.getElementById('delivery')?.classList.remove('active');
    this.checkoutFormStore.reset()
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


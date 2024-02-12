import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AllordersComponent } from './allorders/allorders.component';

const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: 'full' },
  { path: 'home', canActivate: [authGuardGuard], component: HomeComponent },
  { path: 'cart', canActivate: [authGuardGuard], component: CartComponent },
  { path: 'wishlist', canActivate: [authGuardGuard], component: WishlistComponent },
  { path: 'products', canActivate: [authGuardGuard], component: ProductsComponent },
  { path: 'productDetails/:id', canActivate: [authGuardGuard], component: ProductDetailsComponent },
  { path: 'categories', canActivate: [authGuardGuard], component: CategoriesComponent },
  { path: 'brands', canActivate: [authGuardGuard], component: BrandsComponent },
  { path: 'checkout/:id', canActivate: [authGuardGuard], component: CheckoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'allorders', component: AllordersComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', useHash: false })]
  ,
  exports: [RouterModule]
})
export class AppRoutingModule { }

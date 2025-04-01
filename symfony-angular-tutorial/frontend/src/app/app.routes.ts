import { Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products/:id', component: ProductDetailComponent }
];

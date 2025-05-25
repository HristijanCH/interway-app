import { Routes } from '@angular/router';
import { ProductsPageComponent } from './components/products-page/products-page.component';

export const routes: Routes = [
  { path: '', component: ProductsPageComponent },
  { path: 'products', component: ProductsPageComponent },
//  { path: 'products/new', component: AddEditProductComponent },
//  { path: 'products/edit/:id', component: AddEditProductComponent },
];

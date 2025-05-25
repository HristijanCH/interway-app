import { Routes } from '@angular/router';
import {ProductsPageComponent} from './components/products-page/products-page.component';
import {AddEditProductComponent} from './components/add-edit-product/add-edit-product.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsPageComponent,
  },
  {
    path: 'products/new',
    component: AddEditProductComponent,
  },
  {
    path: 'products/edit/:id',
    component: AddEditProductComponent,
  },
];

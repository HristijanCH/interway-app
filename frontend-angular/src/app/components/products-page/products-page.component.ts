import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';

import { ProductService } from '../../products/services/product.service';
import {ProductDetailsDialogComponent} from '../product-details-dialog/product-details-dialog.component';
import {Product} from '../../products/types/product.types';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent {
  private productService = inject(ProductService);
  private router = inject(Router);
  private dialog = inject(Dialog);

  products: any[] = [];
  page = 1;
  pageSize = 5;
  totalPages = 1;
  nameSearch = '';
  categorySearch = '';
  isSearching = false;

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts(this.page - 1, this.pageSize).subscribe((data) => {
      this.products = data.content;
      this.totalPages = data.totalPages;
    });
  }

  searchProducts() {
    if (!this.nameSearch && !this.categorySearch) return;
    this.isSearching = true;
    this.productService.searchProducts(this.nameSearch, this.categorySearch).subscribe((data) => {
      this.products = data;
    });
  }

  resetSearch() {
    this.isSearching = false;
    this.nameSearch = '';
    this.categorySearch = '';
    this.fetchProducts();
  }

  viewDetails(product: Product) {
    console.log(product)
    this.dialog.open(ProductDetailsDialogComponent, {
      data: { productId: product.id },
    });
  }

  editProduct(product: any) {
    this.router.navigate(['/products/edit', product.id]);
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.fetchProducts();
      });
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchProducts();
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchProducts();
    }
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.page = 1;
    this.fetchProducts();
  }
}

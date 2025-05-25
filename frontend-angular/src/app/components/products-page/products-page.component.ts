import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

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
    const params = {
      page: this.page - 1,
      size: this.pageSize,
    };
    this.http.get<any>('api/products', { params }).subscribe((data) => {
      this.products = data.content;
      this.totalPages = data.totalPages;
    });
  }

  searchProducts() {
    if (!this.nameSearch && !this.categorySearch) return;
    this.isSearching = true;
    const params = {
      name: this.nameSearch,
      category: this.categorySearch,
    };
    this.http.get<any>('api/products/search', { params }).subscribe((data) => {
      this.products = data;
    });
  }

  resetSearch() {
    this.isSearching = false;
    this.nameSearch = '';
    this.categorySearch = '';
    this.fetchProducts();
  }

  viewDetails(product: any) {
    // Implement modal logic here
  }

  editProduct(product: any) {
    this.router.navigate(['/products/edit', product.id]);
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.http.delete(`api/products/${id}`).subscribe(() => {
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

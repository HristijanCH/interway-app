import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFormData } from '../types/product.types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = '/api/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number, size: number): Observable<any> {
    return this.http.get(`${this.baseUrl}`, {
      params: new HttpParams().set('page', page).set('size', size),
    });
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProduct(data: ProductFormData): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  updateProduct(id: string, data: ProductFormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  uploadProductImage(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.put(`${this.baseUrl}/${id}/image`, formData);
  }

  searchProducts(name?: string, category?: string): Observable<any> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (category) params = params.set('category', category);
    return this.http.get(`${this.baseUrl}/search`, { params });
  }
}

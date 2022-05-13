import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  rootUrl = 'http://localhost:4201';
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get<Products[]>(`${this.rootUrl}/products`);
  }
  getProduct(id: number) {
    return this.http.get<Products>(`${this.rootUrl}/products/${id}`);
  }
}

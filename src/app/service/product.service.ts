import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  rootUrl = 'http://localhost:4201'; //I associate my API with a variable
  constructor(private http: HttpClient) {} //HttpClient amount to be able to make multiple multiple calls

  /**
   *I create a get () method to retrieve data from a server.
   * @returns array with API objects of thype 'Products' inside
   */
  get() {
    return this.http.get<Products[]>(`${this.rootUrl}/products`);
  }

  /**
   * @param id is the ID of selected element
   * @returns a Url with the ID number in the API Url
   */
  getProduct(id: number) {
    return this.http.get<Products>(`${this.rootUrl}/products/${id}`);
  }
}

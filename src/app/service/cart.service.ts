import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartCount: Products[] = [];
  counterCart: number = 0;
  sub = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) {}

  addCart(addedProduct: Products) {
    this.cartCount.push(addedProduct);
    this.counterCart = this.cartCount.length;
    this.sub.next(this.counterCart);
  }

  clearCart() {
    this.cartCount.length = 0;
    this.counterCart = 0;
    this.sub.next(this.counterCart);
  }

  removeCartItem(index: number) {
    this.cartCount.splice(index, 1);
    this.counterCart--;
    this.sub.next(this.counterCart);
  }
}

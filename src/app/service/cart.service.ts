import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartCount: Products[] = []; //array tipizzato dall'interface products.ts
  counterCart: number = 0; //variabile contatore del carrello che parte da 0
  sub = new BehaviorSubject<number>(0); //BehaviorSubject è un tipo di Subject che permette di gestire e contenere un dato molto più facilmente. Il dato che dovrà contenere è un number uguale a 0
  constructor(private http: HttpClient) {}

  //metodo addCart()
  addCart(addedProduct: Products) {
    this.cartCount.push(addedProduct);
    this.counterCart = this.cartCount.length;
    this.nextSub();
  }

  clearCart() {
    this.cartCount.length = 0;
    this.counterCart = 0;
    this.nextSub();
  }

  removeCartItem(index: number) {
    this.cartCount.splice(index, 1);
    this.counterCart--;
    this.nextSub();
  }

  //gestisto la sub
  nextSub() {
    this.sub.next(this.counterCart);
  }
}

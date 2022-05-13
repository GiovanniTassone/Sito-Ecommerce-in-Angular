import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartCount: Products[] = []; //"products.ts" interface array
  counterCart: number = 0; //counter variable of cart start from 0
  sub = new BehaviorSubject<number>(0); //BehaviorSubject is a type of Subject that allows you to manage and contain data much more easily
  constructor(private http: HttpClient) {}

  /**
   *This method push the element 'addedProduct' into the cart counter
   * @param addedProduct method push the element into the cart counter Products type elementi
   * The length of the array is attributed to the counter cart
   */
  addCart(addedProduct: Products) {
    this.cartCount.push(addedProduct);
    this.counterCart = this.cartCount.length;
    this.nextSub();
  }

  /**
   * This method clears the 'cartCount' variable
   * and clears the 'counterCart'
   */
  clearCart() {
    this.cartCount.length = 0;
    this.counterCart = 0;
    this.nextSub();
  }

  /**
   *This method is called when a single item is removed from the cart
   * @param index is the index of selected element
   * through the "splice()" method, I remove the element associated with the index
   * with 'this.counterCart--' I reduce of a one unity the counter cart variable
   */
  removeCartItem(index: number) {
    this.cartCount.splice(index, 1);
    this.counterCart--;
    this.nextSub();
  }

  /**
   * This method saves me from repeating code
   */
  nextSub() {
    this.sub.next(this.counterCart);
  }
}

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

  //metodo addCart() dove passo come parametro un elemento di tipo Products
  addCart(addedProduct: Products) {
    this.cartCount.push(addedProduct); //pusho all'interno dell'array l'elemento selezionato
    this.counterCart = this.cartCount.length; //il contatotre del carrello è uguale alla lunghezza dell'array che contiene tutti i prodotti del carrello
    this.nextSub();
  }

  //metodo richiamato in fase di invio del form che riazzera l'array dei prodotti
  clearCart() {
    this.cartCount.length = 0; //riazzera la variabile contentente la lunghezza dell'array
    this.counterCart = 0; //riazzera la variabile  del contatore
    this.nextSub();
  }

  //metodo richiamato in fase di rimozione di un singolo elemento dal carrello
  removeCartItem(index: number) {
    this.cartCount.splice(index, 1); //effettuo la rimozione tramite splice dell'elemento associato all'indice
    this.counterCart--; //riduco di un unità la variabile  del contatore
    this.nextSub();
  }

  nextSub() {
    this.sub.next(this.counterCart);
    //uso Next per inviare messaggi a un osservabile che vengono quindi inviati a tutti i componenti (observers) di quell'osservabile (observable) ed evitare ripetizioni di codice
  }
}

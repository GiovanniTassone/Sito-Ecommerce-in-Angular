import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  rootUrl = 'http://localhost:4201'; //associo la mia API ad una variabile
  constructor(private http: HttpClient) {} //importo HttpClient per poterr effettuare diverse chiamate multiple

  //creo un metodo get() per recuperare i dati da un server.
  //Esso restituirà un array con al suo interno gli oggetti dell'API tipitizzandoli grazie all'interface
  get() {
    return this.http.get<Products[]>(`${this.rootUrl}/products`);
  }
  //metodo per recuperare i dati da un server di UNO specifico oggetto.
  getProduct(id: number) {
    return this.http.get<Products>(`${this.rootUrl}/products/${id}`);
  }
}

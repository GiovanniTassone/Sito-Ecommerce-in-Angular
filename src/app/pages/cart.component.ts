import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Products } from '../models/products';

@Component({
  selector: 'app-cart',
  template: `
    <div
      class="container-fluid w-50 mx-auto text-center mt-4"
      *ngIf="productsGroupCart.length == 0 && !purcaseMade"
    >
      <h1>Il tuo carrello è vuoto</h1>
      <p class="fs-4">
        Visita il nostro ecomerce per aggiungere prodotti al tuo carrello
      </p>
      <button [routerLink]="['/']" class="btn btn-danger text-light fw-bold">
        Visita l'Ecommerce
      </button>
    </div>
    <div
      class="container-fluid w-50"
      *ngIf="!purcaseMade && productsGroupCart.length > 0"
    >
      <h2>Articoli</h2>
      <ul class="list-group">
        <li
          *ngFor="let product of productsGroupCart; let i = index"
          class="list-group-item d-flex justify-content-between align-items-start"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ product.name }}</div>
          </div>

          <span class="badge bg-danger fs-6 rounded-pill">{{
            product.price | currency: 'EUR'
          }}</span>
          <i
            class="bi bi-trash3-fill ms-3 fs-6 bg-dark rounded-pill text-light p-1"
            (click)="cancelCartItem(i)"
          ></i>
        </li>
        <li
          class="list-group-item d-flex justify-content-between align-items-start bg-danger text-light"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold fs-5">Totale Carrello:</div>
          </div>
          <span class="badge bg-dark rounded-pill fs-6">{{
            finalAmount | currency: 'EUR'
          }}</span>
        </li>
      </ul>

      <h2 class="mt-3">Completa Ordine</h2>
      <form (ngSubmit)="submitForm(f)" #f="ngForm">
        <div class="form-group row">
          <div class="col-6">
            <label for="userName" class="form-label">Nome</label>
            <input
              type="text"
              id="userName"
              ngModel
              name="userName"
              required
              class="w-100 form-control"
              #userName="ngModel"
            />
            <p *ngIf="userName.invalid && userName.touched" id="errorMessage">
              <i class="bi bi-x-octagon-fill"></i> Inserisci un Nome valido
            </p>
            <p *ngIf="userName.valid" id="correctInput">
              <i class="bi bi-check-circle-fill"></i> Campo Valido
            </p>
          </div>
          <div class="col-6">
            <label for="userName" class="form-label">Cognome</label>
            <input
              type="text"
              id="userSurname"
              ngModel
              name="userSurname"
              required
              class="w-100 form-control"
              #userSurname="ngModel"
            />
            <p
              *ngIf="userSurname.invalid && userSurname.touched"
              id="errorMessage"
            >
              <i class="bi bi-x-octagon-fill"></i> Inserisci un Cognome valido
            </p>
            <p *ngIf="userSurname.valid" id="correctInput">
              <i class="bi bi-check-circle-fill"></i> Campo Valido
            </p>
          </div>
        </div>
        <div class="form-group mt-3">
          <label for="userEmail">Email</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            ngModel
            required
            email
            class="w-100 form-control"
            #userEmail="ngModel"
          />
          <p *ngIf="userEmail.invalid && userEmail.touched" id="errorMessage">
            <i class="bi bi-x-octagon-fill"></i> Inserisci un Email valida
          </p>
          <p *ngIf="userEmail.valid" id="correctInput">
            <i class="bi bi-check-circle-fill"></i> Campo Valido
          </p>
        </div>
        <div class="form-group mt-3">
          <label for="userAddres">Indirizzo</label>
          <input
            type="text"
            id="userAddres"
            name="userAddres"
            ngModel
            class="w-100 form-control"
            required
            #userAddres="ngModel"
          />
          <p *ngIf="userAddres.invalid && userAddres.touched" id="errorMessage">
            <i class="bi bi-x-octagon-fill"></i> Inserisci un Indirizzo valida
          </p>
          <p *ngIf="userAddres.valid" id="correctInput">
            <i class="bi bi-check-circle-fill"></i> Campo Valido
          </p>
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="btn btn-success mt-2 text-center"
            id="confirmForm"
            [disabled]="f.invalid"
          >
            Completa Acquisto
          </button>
        </div>
      </form>
    </div>
    <div class="container-fluid w-50 text-center pt-3" *ngIf="purcaseMade">
      <img src="../../assets/dj_end.png" class="rounded-pill img-thumbnail" />
      <h2 class="fs-1">Acquisto effettuato con successo!</h2>
      <p class="fs-4">
        Grazie per aver acquistato sul nostro sito,presto riceverai un email di
        conferma con tutte le informazioni riguardanti la spedizione e il
        tracciamento del tuo ordine!
      </p>
      <button [routerLink]="['/']" class="btn btn-danger text-light fw-bold">
        Torna alla HomePage
      </button>
    </div>
  `,
  styles: [
    `
      #errorMessage {
        color: red;
        margin-bottom: 0.3em;
      }
      #correctInput {
        color: green;
        margin-bottom: 0.3em;
      }
      input.ng-invalid.ng-touched {
        border: 1px solid red;
      }
      input.ng-valid {
        border: 1px solid green;
      }
    `,
  ],
})
export class CartComponent implements OnInit {
  productsGroupCart!: Products[]; //array dei prodotti all'interno del carrello
  finalAmount = 0; //costo dell'intero carrello finale
  purcaseMade = false; //variabile che mi consente di rendere visibile un messaggio di conferma dell'acquisto

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.productsGroupCart = this.cartService.cartCount; //associo l'array del carrello allo stesso array del service
    for (let i = 0; i < this.productsGroupCart.length; i++) {
      this.finalAmount += this.productsGroupCart[i].price;
    } //creo un ciclo for che mi permette di aumentare il valore del carrello finale in base al prezzo degli elementi presenti nel carrello
  }

  //metodo usato all'invio del form
  submitForm(form: any) {
    this.cartService.clearCart(); //utilizzo il metodo clearCart() del cartService, che azzera il contentuto dell'array dei prodotti
    this.purcaseMade = true; //cambio il valore della variabile che mi mostrama il messaggio di conferma dell'acquisto
  }

  //metodo richiamato in fase di rimozione di un singolo elemento dal carrello
  cancelCartItem(id: number) {
    this.cartService.removeCartItem(id); //rimuove l'elemento associato all'id clickato
    this.finalAmount = 0; //riazzero costo dell'intero carrello finale
    for (let i = 0; i < this.productsGroupCart.length; i++) {
      this.finalAmount += this.productsGroupCart[i].price;
    } //mostro la somma solamente degli elementi presenti nel carrello dopo la rimozione
  }
}

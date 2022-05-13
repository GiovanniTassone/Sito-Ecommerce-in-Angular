import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Products } from '../models/products';

@Component({
  selector: 'app-cart',
  template: `
    <!-- Content that will be shown in case of an empty cart -->
    <div
      class="container-fluid w-50 mx-auto text-center mt-4"
      *ngIf="productsGroupCart.length == 0 && !purcaseMade"
    >
      <h1>Il tuo carrello è vuoto</h1>
      <p class="fs-4">
        Visita il nostro ecommerce per aggiungere prodotti al tuo carrello
      </p>
      <button
        [routerLink]="['/productList']"
        class="btn btn-danger text-light fw-bold"
      >
        Visita l'Ecommerce
      </button>
    </div>

    <!-- Shopping cart and compilation form to proceed with the purchase -->
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

      <!-- Form for filling in personal data to proceed with the purchase -->
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
              pattern="^[a-zA-Z]*$"
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
              pattern="^[a-zA-Z]*$"
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
            pattern="[a-zA-Z0-9]+@[a-zA-Z]+.(com|edu|net|it)"
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
            <i class="bi bi-x-octagon-fill"></i> Inserisci un Indirizzo valido
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

    <!-- Content that will be shown after purchase -->
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
  productsGroupCart!: Products[]; //array of products inside the cart
  finalAmount = 0; //final price of the whole cart
  purcaseMade = false; //variable that allows me to make a purchase confirmation message visible

  constructor(private cartService: CartService) {}

  /**
   *I associate the cart array to the same array as the service
   *and I create a for loop that allows me to increase the value of the
    final cart based on the price of the items in the cart
   */
  ngOnInit(): void {
    this.productsGroupCart = this.cartService.cartCount;
    for (let i = 0; i < this.productsGroupCart.length; i++) {
      this.finalAmount += this.productsGroupCart[i].price;
    }
  }

  /**
   * Method used to submit the form
   * @param form is the name of the form to submit
   * I use the clearCart() method of the cartService,
   * which clears the contents of the products array
   * And I change the value of the 'this.purcaseMade' that show the purchase confirmation message
   */
  submitForm(form: any) {
    this.cartService.clearCart();
    this.purcaseMade = true;
  }

  /**
   * Method invoked when removing a single item from the cart
   * @param id is the ID of the selected elemento to eliminate
   * the removeCartItem(id) removes the element associated with the clicked ID,
   * Reset the cost of the final cart and I show the sum of the items in the cart after removal
   */
  cancelCartItem(id: number) {
    this.cartService.removeCartItem(id);
    this.finalAmount = 0;
    for (let i = 0; i < this.productsGroupCart.length; i++) {
      this.finalAmount += this.productsGroupCart[i].price;
    }
  }
}

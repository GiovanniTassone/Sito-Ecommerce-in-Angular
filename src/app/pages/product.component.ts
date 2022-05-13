import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../models/products';
import { CartService } from '../service/cart.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product',
  template: `
    <div class="container text-center">
      <!-- Contenuto che verrà mostrato in fase di caricamento della pagina -->
      <h2 *ngIf="!loading" class="mt-5">Caricamento...</h2>
      <img
        src="https://www.metronic.com/assistenza-documentazione/front/img/loader-small.gif"
        *ngIf="!loading"
      />
      <!-- Dettagli del prodotto selezionato -->
      <div class="card mb-3 mt-5 fw-bold fs-4" *ngIf="loading">
        <div class="card-header position-relative">
          <!-- Bottone per tornare alla lisya di prodotti -->
          <button
            class="btn btn-secondary btn-lg d-inline-block float-start position-absolute start-0 mt-1 ms-2 "
            [routerLink]="['/productList']"
          >
            <i class="bi bi-arrow-left-square"></i> Torna ai prodotti
          </button>
          <h3 class="display-6">Dettagli Prodotto</h3>
        </div>
        <div class="card-body d-flex justify-content-center row">
          <div class="w-25 align-self-center">
            <img
              src="{{ chooseProduct.url }}"
              class="img-fluid rounded-start"
            />
          </div>
          <div class="my-auto">
            <h5 class="card-title fs-1">{{ chooseProduct.name }}</h5>
            <h6 class="fs-3 card-title">
              {{ chooseProduct.price | currency: 'EUR' }}
            </h6>
            <p class="card-text fs-4 px-5">
              {{ chooseProduct.description }}
            </p>
            <button class="btn btn-success btn-lg" (click)="addToCart()">
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
      <!-- Alert che avvisa l'utente della corretta aggiunte del prodotto nel carrello -->
      <div
        class="alert alert-success d-flex align-items-center"
        role="alert"
        *ngIf="correctAlert"
      >
        <i class="bi bi-check-circle-fill "></i>
        <div class="ms-3">
          Hai aggiunto {{ chooseProduct.name }} nel tuo carrello!
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductComponent implements OnInit {
  chooseProductId!: number; //variabile che mi permette di usare l'id dell'elemento molto piu comodamente
  chooseProduct!: Products;
  loading = false; //variable utilizzata per la generazione di una pagina di caricamento
  correctAlert = false; //variable utilizzata per la generazione di un alert di corretta aggiunta al carrello
  constructor(
    private productService: ProductService, //collego il service legato ai prodotti
    private route: ActivatedRoute,
    private cartService: CartService //collego il service legato al carrello
  ) {}

  ngOnInit(): void {
    this.chooseProductId = this.route.snapshot.params['id']; //associo l'Id del prodotto a un route.snapshot cos' che la rotta varia in base all'Id dell'elemento scelto

    //utilizzo il metodo getProduct() del service dei prodotti, che mi ritorna un url caratterizzato dal numero dell'id del prodotto
    this.productService.getProduct(this.chooseProductId).subscribe((ris) => {
      this.chooseProduct = ris; //associo la risposta ottentuda
      this.loading = true; //modifico il parametro della variabile che mi genera il caricamento della pagina
    });
  }

  addToCart() {
    this.cartService.addCart(this.chooseProduct); //richiamo il metodo addCart() dal service CartService e al suo interno passo l'elemento scelto tramite 'chooseProduct'

    this.correctAlert = true; //cambio valore alla variabile che mi permette di visualizare un avviso di coretta aggiunta al carrello del prodotto

    setTimeout(() => {
      this.correctAlert = false;
    }, 1500); //dopo 1 secondo e mezzo riporto il valore della variabile in false così da far scomparire l'avviso
  }
}

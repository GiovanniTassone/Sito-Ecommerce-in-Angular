import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../models/products';
import { CartService } from '../service/cart.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product',
  template: `
    <div class="container text-center">
      <!-- Content that will be shown when the page is loaded -->
      <h2 *ngIf="!loading" class="mt-5">Caricamento...</h2>
      <img
        src="https://www.metronic.com/assistenza-documentazione/front/img/loader-small.gif"
        *ngIf="!loading"
      />
      <!-- Details of the selected product -->
      <div class="card mb-3 mt-5 fw-bold fs-4" *ngIf="loading">
        <div class="card-header position-relative">
          <!-- Button to return to the product list -->
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
      <!-- Alert that warns the user of the correct addition of the product in the cart -->
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
  chooseProductId!: number; //variable which allows me to use the element's id much more freely
  chooseProduct!: Products;
  loading = false; //variable used for generating a load page
  correctAlert = false; //variable used to generate an alert for a successful addition of element into the cart
  constructor(
    private productService: ProductService, //connect the 'ProductService'
    private route: ActivatedRoute,
    private cartService: CartService //connect the 'CartService'
  ) {}

  /**
   * I associate the product Id with route.snapshot so that the route varies according to the Id of the chosen element
   * I use the getProduct() method of the 'ProductService', which returns me a url characterized by the product id number
   * and I associate the answer obtained
   * I modify the parameter of 'loading' which generates the loading of the page
   */
  ngOnInit(): void {
    this.chooseProductId = this.route.snapshot.params['id'];
    this.productService.getProduct(this.chooseProductId).subscribe((ris) => {
      this.chooseProduct = ris;
      this.loading = true;
    });
  }

  /**
   *Call the addCart () method from the CartService service and inside it, I pass the chosen element through 'chooseProduct'
   *Change value of 'correctAlert', that allows me to display a notice of correct added to the product cart
   *After 1 and a half seconds I return the value of the variable to false so as to make the alert disappear
   */
  addToCart() {
    this.cartService.addCart(this.chooseProduct);
    this.correctAlert = true;
    setTimeout(() => {
      this.correctAlert = false;
    }, 1500);
  }
}

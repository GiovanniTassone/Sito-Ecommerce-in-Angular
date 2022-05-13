import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../models/products';
import { CartService } from '../service/cart.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product',
  template: `
    <div class="container text-center">
      <h2 *ngIf="!loading" class="mt-5">Caricamento...</h2>
      <img
        src="https://www.metronic.com/assistenza-documentazione/front/img/loader-small.gif"
        *ngIf="!loading"
      />
      <div class="card mb-3 mt-5 fw-bold fs-4" *ngIf="loading">
        <div class="card-header">Dettagli Prodotto</div>
        <div class="card-body d-flex justify-content-center">
          <div class="align-self-center me-5">
            <button
              class="btn btn-secondary btn-lg d-inline-block"
              [routerLink]="['/']"
            >
              <i class="bi bi-arrow-left-square"></i> Torna ai prodotti
            </button>
          </div>
          <div class="w-25 align-self-center">
            <img
              src="{{ chooseProduct.url }}"
              class="img-fluid rounded-start"
            />
          </div>
          <div class="my-auto">
            <h5 class="card-title fs-1">{{ chooseProduct.name }}</h5>
            <h6 class="fs-3">
              {{ chooseProduct.price | currency: 'EUR' }}
            </h6>
            <p class="card-text fs-5 px-5">
              {{ chooseProduct.description }}
            </p>
            <button class="btn btn-primary" (click)="addToCart()">
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
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
  chooseProductId!: number;
  chooseProduct!: Products;
  loading = false;
  correctAlert = false;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.chooseProductId = this.route.snapshot.params['id'];

    this.productService.getProduct(this.chooseProductId).subscribe((ris) => {
      this.chooseProduct = ris;
      this.loading = true;
    });
  }

  addToCart() {
    this.cartService.addCart(this.chooseProduct);
    console.log(this.cartService.cartCount);
    this.correctAlert = true;
    setTimeout(() => {
      this.correctAlert = false;
    }, 1500);
  }
}

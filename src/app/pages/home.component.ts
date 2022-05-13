import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Products } from '../models/products';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  template: `
    <div
      class="row row-cols-1 row-cols-md-3 g-1 d-flex justify-content-center gap-4 mt-3 w-75 mx-auto"
    >
      <div
        class="card d-flex align-items-baseline"
        style="width: 18rem;height: 35rem"
        *ngFor="let product of productsList"
      >
        <img src="{{ product.url }}" class="card-img-top mt-3" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ product.name | uppercase }}</h5>
          <p class="card-text">{{ product.price | currency: 'EUR' }}</p>
          <p class="card-text">{{ product.description }}</p>
          <button
            [routerLink]="['/product', product.id]"
            class="btn btn-primary"
          >
            Dettagli
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  productsList: Products[] = [];

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.get().subscribe((ris) => (this.productsList = ris));
  }
}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Products } from '../models/products';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  template: `
    <!-- Pagina dettagli del Prodotto -->
    <div
      class="row row-cols-1 row-cols-md-3 g-1 d-flex justify-content-center gap-4 mt-3 w-75 mx-auto"
    >
      <div
        class="card d-flex align-items-between"
        style="width: 18rem;height: 35rem"
        *ngFor="let product of productsList"
      >
        <img
          src="{{ product.url }}"
          class="card-img-top mt-3 mx-auto"
          alt="..."
          style="width: 15rem;height: 12rem"
        />
        <div class="card-body d-flex align-content-between flex-column ">
          <h5 class="card-title">{{ product.name | uppercase }}</h5>
          <p class="card-text">{{ product.price | currency: 'EUR' }}</p>
          <p class="card-text">{{ product.description }}</p>
          <button
            [routerLink]="['/product', product.id]"
            class="btn btn-primary mt-auto"
          >
            Dettagli
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ListComponent implements OnInit {
  productsList: Products[] = []; //array dei prodotti

  constructor(
    private http: HttpClient, //importo HttpClient per poterr effettuare diverse chiamate multiple
    private productService: ProductService //collego il service legato ai prodotti
  ) {}

  ngOnInit(): void {
    this.productService.get().subscribe((ris) => (this.productsList = ris));
    //effettuo una subscribe per riceve la chiamata effettuata, associandola all'array dei prodtti creato all'interno di questo component
  }
}

import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand fs-2">Pjoneer</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                class="nav-link d-inline-block mt-1 fs-5"
                aria-current="page"
                [routerLink]="['/']"
                ><button type="button" class="btn btn-danger fw-bold">
                  <i class="bi bi-house-door-fill"></i> Home
                </button></a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link active fs-4"
                aria-current="page"
                [routerLink]="['/cart']"
                ><button type="button" class="btn btn-light position-relative">
                  <i class="bi bi-cart3"></i> Carrello
                  <span
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    *ngIf="counter > 0"
                  >
                    {{ counter }}
                  </span>
                </button></a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  counter = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.sub.subscribe((amount: number) => {
      this.counter = amount;
    });
  }
}

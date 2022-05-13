import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container-fluid">
        <svg
          height="80"
          viewBox="0 0 386.129 56.794"
          width="170"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m64.564 20.432c-1.424 4.018-10.398 8.215-32.438 3.233l2.866 13.016c22.04 4.006 35.105.712 42.567-7.122 5.527-5.807 6.61-13.317 2.069-19.064-4.803-6.084-15.443-10.495-28.88-10.495-19.221 0-32.917 5.569-40.521 26.465l-10.227 28.095h17.888l10.175-28.415c4.175-11.686 12.948-13.621 22.685-13.621 10.21 0 15.14 4.205 13.816 7.908zm177.118 12.331-.693-.299c4.003-1.595 8.348-2.459 12.664-2.459 2.62 0 8.447.445 10.902 1.85.597.335 1.144.863.851 1.519-1.084 2.444-17.04 2.307-23.724-.611zm32.675-6.57c-4.228-2.26-11.199-4.063-18.015-4.341-14.143-.583-30.264 4.241-33.476 15.642-1.854 6.558 4.501 15.417 21.05 17.93 8.281 1.27 21.436.949 30.905-2.18l3.535-9.733c-19.202 6.598-44.297 4.682-43.458-5.2 9.291 5.959 22.846 5.394 32.883 3.75 17.387-2.838 17.133-10.227 6.576-15.868zm29.312 6.57-.685-.299c4-1.595 8.347-2.459 12.657-2.459 2.63 0 8.447.445 10.904 1.85.597.335 1.143.863.85 1.519-1.084 2.444-17.034 2.307-23.726-.611zm32.677-6.57c-4.223-2.26-11.2-4.063-18.016-4.341-14.135-.583-30.257 4.241-33.476 15.642-1.85 6.558 4.508 15.417 21.05 17.93 8.28 1.27 21.444.949 30.91-2.18l3.538-9.733c-19.203 6.598-44.296 4.682-43.46-5.2 9.292 5.959 22.846 5.394 32.878 3.75 17.384-2.838 17.14-10.227 6.576-15.868zm13.055 8.367-7.093 20.006h16.376l5.459-15.394c1.341-3.905 2.48-6.826 7.256-6.826h11.505l3.225-9.218h-21.195c-7.09 0-12.805 3.517-15.533 11.432zm-274.323 20.006h16.954l11.459-31.438h-16.954zm110.015-16.916c1.576-4.325 6.342-6.327 10.515-6.327 4.138 0 8.1 2.438 6.566 6.649l-6.053 16.594h16.375l6.145-16.856c3.187-8.754-3.717-16.006-19.18-16.006-17.214 0-26.971 5.626-30.732 15.927l-6.169 16.935h16.368zm-50.513-6.008c6.617.278 11.95 3.609 11 7.934-.913 4.17-7.362 7.009-14.055 6.723-6.616-.274-11.944-3.618-11-7.942.916-4.162 7.363-7.006 14.055-6.715zm2.307-9.774c-17.055-.724-32.25 6.567-34.295 15.888-2.014 9.174 9.506 17.589 26.626 18.313 17.051.725 32.252-6.564 34.3-15.889 2.008-9.172-9.512-17.593-26.631-18.312z"
            fill="#a90533"
          />
        </svg>
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
        <div class="collapse navbar-collapse ms-3" id="navbarNav">
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
                class="nav-link d-inline-block mt-1 fs-5"
                aria-current="page"
                [routerLink]="['/productList']"
                ><button
                  type="button"
                  class="btn btn-light fw-bold text-danger"
                >
                  <i class="bi bi-music-note"></i> Prodotti
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
  counter = 0; //counter of element into the cart
  constructor(private cartService: CartService) {}

  /**
   * I make a subscribe that associates the variable 'this.counter' to the subject of the cartService
   */
  ngOnInit(): void {
    this.cartService.sub.subscribe((amount: number) => {
      this.counter = amount;
    });
  }
}

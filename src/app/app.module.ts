import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar.component';
import { ListComponent } from './pages/list.component';
import { ProductComponent } from './pages/product.component';
import { CartComponent } from './pages/cart.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './pages/home-page.component';

const routes: Route[] = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'product/:id',
    component: ProductComponent,
  },
  {
    path: 'homePage',
    component: HomePageComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListComponent,
    ProductComponent,
    CartComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

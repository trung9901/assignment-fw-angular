import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { AdminLayoutsComponent } from './layouts/admin-layouts/admin-layouts.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { ClientLayoutsComponent } from './layouts/client-layouts/client-layouts.component';


import { ProductListComponent } from './components/client/product-list/product-list.component';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './pages/cart/cart.component';

import { AdminProductFormComponent } from './pages/admin/admin-product/admin-product-form/admin-product-form.component';
import { AdminProductListComponent } from './pages/admin/admin-product/admin-product-list/admin-product-list.component';
import { ShowValidateComponent } from './components/show-validate/show-validate.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    AboutComponent,
    HomeComponent,
    ProductComponent,
    AdminLayoutsComponent,
    FooterComponent,
    ClientLayoutsComponent,

    SigninComponent,
    SignupComponent,
    ProductDetailComponent,
    CartComponent,
    AdminProductListComponent,
    AdminProductFormComponent,
    ShowValidateComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

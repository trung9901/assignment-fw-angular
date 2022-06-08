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

import { AddComponent } from './components/admin/product/add/add.component';
import { ProductListComponent } from './components/client/product-list/product-list.component';
import { ListComponent } from './components/admin/product/list/list.component';

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
    ListComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

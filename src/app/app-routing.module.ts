import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanAccessAdminGuard } from './guards/can-access-admin.guard';


import { AdminLayoutsComponent } from './layouts/admin-layouts/admin-layouts.component';
import { ClientLayoutsComponent } from './layouts/client-layouts/client-layouts.component';

import { AboutComponent } from './pages/about/about.component';
import { AdminProductFormComponent } from './pages/admin/admin-product/admin-product-form/admin-product-form.component';
import { AdminProductListComponent } from './pages/admin/admin-product/admin-product-list/admin-product-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductComponent } from './pages/product/product.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';


const routes: Routes = [
  {
    path: '', component: ClientLayoutsComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      {
        path: 'products', component: ProductComponent,
        // children: [
        //   { path: ':id', component: ProductDetailComponent, }
        // ]
      },
      { path: 'detail/:id', component: ProductDetailComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'cart', component: CartComponent }
    ]
  },

  {
    path: 'admin',
    component: AdminLayoutsComponent,
    canActivate: [CanAccessAdminGuard],
    children: [
      {
        path: 'products',
        children: [
          { path: "", redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: AdminProductListComponent,
          },
          {
            path: 'add', component: AdminProductFormComponent,
          },
          {
            path: 'edit/:id', component: AdminProductFormComponent,
          },

        ]
      }
    ]
  },
  // {
  //   path: 'auth',
  //   children: [
  //     {
  //       path: 'login',
  //       component: 
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

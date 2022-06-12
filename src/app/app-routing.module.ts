import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanAccessAdminGuard } from './guards/can-access-admin.guard';


import { AdminLayoutsComponent } from './layouts/admin-layouts/admin-layouts.component';
import { ClientLayoutsComponent } from './layouts/client-layouts/client-layouts.component';

import { AboutComponent } from './pages/about/about.component';
import { AdminCategoryFormComponent } from './pages/admin/admin-category/admin-category-form/admin-category-form.component';
import { AdminCategoryListComponent } from './pages/admin/admin-category/admin-category-list/admin-category-list.component';
import { AdminProductFormComponent } from './pages/admin/admin-product/admin-product-form/admin-product-form.component';
import { AdminProductListComponent } from './pages/admin/admin-product/admin-product-list/admin-product-list.component';
import { AdminUserFormComponent } from './pages/admin/admin-user/admin-user-form/admin-user-form.component';
import { AdminUserListComponent } from './pages/admin/admin-user/admin-user-list/admin-user-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductComponent } from './pages/product/product.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

import { PageComponent } from './pages/new/page/page.component';
import { DetailComponent } from './pages/new/detail/detail.component';

const routes: Routes = [
  {
    path: '', component: ClientLayoutsComponent,
    children: [
      {
        path: '', component: HomeComponent,
      },
      { path: 'about', component: AboutComponent },
      {
        path: 'products', component: ProductComponent,
        // children: [
        //   { path: ':id', component: ProductComponent, }
        // ]
      },
      { path: 'detail/:id', component: ProductDetailComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'cart', component: CartComponent },
      { path: 'categories/:id', component: HomeComponent },
      {
        path: 'news', component: PageComponent,
        children: [
          { path: 'detail', component: DetailComponent }
        ]

      }
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
      },
      {
        path: 'categories',
        children: [
          { path: "", redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: AdminCategoryListComponent,
          },
          {
            path: 'add', component: AdminCategoryFormComponent,
          },
          {
            path: 'edit/:id', component: AdminCategoryFormComponent,
          },
        ]
      },
      {
        path: 'users',
        children: [
          { path: "", redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: AdminUserListComponent,
          },
          // {
          //   path: 'add', component: AdminCategoryFormComponent,
          // },
          {
            path: 'edit/:id', component: AdminUserFormComponent,
          },
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

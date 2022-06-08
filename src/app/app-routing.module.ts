import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/admin/product/add/add.component';

import { ListComponent } from './components/admin/product/list/list.component';


import { AdminLayoutsComponent } from './layouts/admin-layouts/admin-layouts.component';
import { ClientLayoutsComponent } from './layouts/client-layouts/client-layouts.component';

import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductComponent } from './pages/product/product.component';


const routes: Routes = [
  {
    path: '', component: ClientLayoutsComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      {
        path: 'products', component: ProductComponent,
        children: [
          { path: ':id', component: ProductDetailComponent, }
        ]
      }
    ]
  },

  {
    path: 'admin',
    component: AdminLayoutsComponent,
    children: [
      {
        path: 'products',
        children: [
          { path: "", redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list', component: ListComponent,
          },
          {
            path: 'add', component: AddComponent,
          },
          {
            path: 'edit/:id', component: AddComponent,
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

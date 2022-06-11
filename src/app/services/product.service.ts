import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product';

import { environment } from '../../environments/environment';
import { ICategory } from '../models/category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }
  getProducts(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${environment.products}/${id}`);
  }
  getProductList(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(environment.products);
  }
  removeProduct(id: string): Observable<IProduct> {
    return this.http.delete<IProduct>(`${environment.products}/${id}`);
  }
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${environment.products}`, product);
  }
  updateProduct(id: string | number, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${environment.products}/${id}`, product);
  }

  getListProductByCate(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${environment.categories}/${id}`);
  }
}

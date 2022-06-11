import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/product';
import { ICategory } from './../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {

  }
  getCategories(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`${environment.categories}/${id}`);
  }
  getCategoryList(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(environment.categories);
  }
  removeCategory(id: string): Observable<ICategory> {
    return this.http.delete<ICategory>(`${environment.categories}/${id}`);
  }
  addCategory(data: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`${environment.categories}`, data);
  }
  updateCategory(id: string | number, data: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${environment.categories}/${id}`, data);
  }
}

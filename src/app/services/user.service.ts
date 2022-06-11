import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }
  getUsers(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${environment.users}/${id}`);
  }
  getUserList(): Observable<IUser[]> {
    return this.http.get<IUser[]>(environment.users);
  }
  removeUser(id: string): Observable<IUser> {
    return this.http.delete<IUser>(`${environment.users}/${id}`);
  }
  addUser(data: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.users}`, data);
  }
  updateUser(id: string | number, data: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${environment.users}/${id}`, data);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { signInResponse, signInType } from '../models/auth';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(data: signInType): Observable<signInResponse> {
    return this.http.post<signInResponse>(`${environment.signin}`, data)
  }
  signUp(data: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.signup}`, data)
  }
}

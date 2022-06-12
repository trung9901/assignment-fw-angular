import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { INew } from './../models/new';
@Injectable({
    providedIn: 'root'
})
export class NewService {

    constructor(private http: HttpClient) {

    }
    getNews(id: string): Observable<INew> {
        return this.http.get<INew>(`${environment.news}/${id}`);
    }
    getNewList(): Observable<INew[]> {
        return this.http.get<INew[]>(environment.news);
    }
    removeNew(id: string): Observable<INew> {
        return this.http.delete<INew>(`${environment.news}/${id}`);
    }
    addNew(data: INew): Observable<INew> {
        return this.http.post<INew>(`${environment.news}`, data);
    }
    updateNew(id: string | number, data: INew): Observable<INew> {
        return this.http.put<INew>(`${environment.news}/${id}`, data);
    }

}

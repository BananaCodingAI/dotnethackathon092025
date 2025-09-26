import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Merchandise } from '../models/merchandise.model';

@Injectable({
  providedIn: 'root'
})
export class MerchandiseService {
  private apiUrl = 'http://localhost:5290/api/merchandise';

  constructor(private http: HttpClient) {}

  getAllMerchandise(category?: string): Observable<Merchandise[]> {
    let params = new HttpParams();
    if (category) {
      params = params.set('category', category);
    }
    return this.http.get<Merchandise[]>(this.apiUrl, { params });
  }

  getMerchandiseById(id: string): Observable<Merchandise> {
    return this.http.get<Merchandise>(`${this.apiUrl}/${id}`);
  }
}
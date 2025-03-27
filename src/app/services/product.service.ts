import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) { }

  getAll(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(`${this.apiUrl}/get`, { headers }).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }
  store(name: string, categoryId: number, price: number, description: string): Observable<{ name: string; categoryId: number; price: number; description: string }> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const product = { name, categoryId, price, description };
    return this.http.post<{ name: string; categoryId: number; price: number; description: string }>(this.apiUrl + "/add", product, { headers }).pipe(
      tap(response => {
        console.log(response);
      })
    );;
  }

}

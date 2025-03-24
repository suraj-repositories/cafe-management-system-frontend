import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/category`;

  constructor(private http: HttpClient) {
  }

  store(name: string): Observable<{ name: string }> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<{ name: string }>(`${this.apiUrl}/add`, { name }, { headers }).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

  getAll(): Observable<any[]> {
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

  destroy(categoryId: BigInteger) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete<any>(`${this.apiUrl}/delete/${categoryId}`, { headers }).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

  update(id: any, name: string) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<{ message: string; success?: boolean }>(
      `${this.apiUrl}/update`,
      { id, name },
      { headers }
    ).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }


}

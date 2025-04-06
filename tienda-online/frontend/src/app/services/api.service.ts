import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, options?: any): Observable<T> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, options) as Observable<T>;
  }

  post<T>(endpoint: string, data: any, options?: any): Observable<T> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, options) as Observable<T>;
  }

  put<T>(endpoint: string, data: any, options?: any): Observable<T> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data, options) as Observable<T>;
  }

  delete<T>(endpoint: string, options?: any): Observable<T> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`, options) as Observable<T>;
  }
}

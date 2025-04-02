import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000/api/products';

  constructor(private http: HttpClient) { }

  private getPostHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/ld+json' });
  }

  private getPatchHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' });
  }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product, { headers: this.getPostHeaders() });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  patchProduct(id: number, product: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, product, { headers: this.getPatchHeaders() });
  }
}

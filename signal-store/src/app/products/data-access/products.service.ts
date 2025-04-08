import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseHttpService } from "../../shared/data-acces/base-http.service";
import { Product } from "../../shared/interfaces/product.interface";

@Injectable()
export class ProductsService extends BaseHttpService {

    getProducts(): Observable<Product[]> {
        return this.http.get<any>(`${this.apiUrl}/products`);
    }
}
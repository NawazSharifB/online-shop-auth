import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ShopClientService {

  constructor(private http: HttpClient) { }

  fetchAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.allProducts)
      .pipe(map(products=> {
        return products.map(product => new Product(product._id, product.title, product.description, product.price, product.stock));
      }));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ShopClientService {

  constructor(private http: HttpClient) { }

  fetchAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.allProducts);
  }
}

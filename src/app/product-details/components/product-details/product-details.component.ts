import { DataService } from '../../../shared/services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/products.model';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  counter = 0;
  product: Product;
  dSub: Subscription;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getProduct();
  }

  ngOnDestroy(): void {
    this.dSub.unsubscribe();
  }

  private getProduct(): void {
    this.dSub = combineLatest([this.route.paramMap, this.dataService.products$])
      .subscribe( data => {
        const param = data[0].get('id');
        const products = data[1];

        if (products.length) {
          products.forEach( product => {
            if (product._id === param) {
              this.product = product;
            }
          });
          if (!this.product) {
            this.router.navigate(['/not-found']);
          }
        } else {
          if (this.counter > 3) {
            this.router.navigate(['/server-error']);
          } else {
            setTimeout(() => {
              this.counter++;
              this.getProduct();
            }, 3000);
          }
        }
      });
  }


}

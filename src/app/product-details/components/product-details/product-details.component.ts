import { AvailableRoutes } from './../../../shared/enums/available-routes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { Product } from '../../../shared/models/products.model';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product!: Product;

  private subscription$ = new Subscription();

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private getProduct(): void {
    this.subscription$.add(
      combineLatest([this.route.paramMap, this.dataService.fetchAllProducts()])
      .subscribe( data => {
        const param = data[0].get('id');
        const products = this.dataService.products$.value;

        products.forEach( product => {
          if (product._id === param) {
            this.product = product;
          }
        });

        if (!this.product) {
          this.router.navigate([`/${AvailableRoutes.NotFound}`]);
        }
      },
      () => {
        this.router.navigate([`/${AvailableRoutes.ServerError}`]);
      })
    );
  }


}

import { Product } from '../../../shared/models/products.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;


  // p = new Product('5f4011d1fadf274a8862865a',
  // 'ad labore tempor eiusmod et',
  // 'Minim enim deserunt id aliquip tempor elit amet culpa voluptate officia pariatur voluptate adipisicing.
  // Enim ex anim enim voluptate minim esse. Dolore dolore ad nostrud sint.
  // Adipisicing ex voluptate veniam in elit pariatur irure pariatur tempor irure ex amet quis.
  // Proident incididunt non qui consequat duis Lorem in labore sunt Lorem adipisicing anim eiusmod.
  // Nisi Lorem nostrud deserunt reprehenderit enim quis eu duis minim enim. Eiusmod anim voluptate dolore exercitation
  // qui cupidatat nostrud pariatur.\r\nId laborum velit Lorem culpa. Ipsum velit laboris est laborum minim exercitation.
  //  Pariatur esse occaecat occaecat duis eiusmod reprehenderit labore commodo officia ea. Labore ut labore ad in. Elit
  // consequat do fugiat sit. Ex eu dolor nulla quis ipsum. Adipisicing velit duis excepteur fugiat.\r\n',
  // 'http://placehold.it/500x500',
  // 37,
  // 7, 0);

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goDetails(): void {
    this.router.navigate(['/product/', this.product._id]);
  }


}

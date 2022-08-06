export class Product {
  inCart = 0;
  picture = 'assets/pictures/placeholder.jpg';

  constructor(
      public _id: string,
      public title: string,
      public description: string,
      public price: number,
      public stock: number,
  ) {}

  get totalPrice(): number {
    return this.inCart * this.price;
  }
}



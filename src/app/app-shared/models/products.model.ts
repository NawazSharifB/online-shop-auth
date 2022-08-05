export class Product {
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public picture: string,
        public price: number,
        public stock: number,
        public inCart?: number
    ) {}

    // get id(): string {
    //     return this._id;
    // }


    // get totalPrice(): number {
    //     return this.inCart * this.price;
    // }
}



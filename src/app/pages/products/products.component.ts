import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interface/product.model';
import { ProductsService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Array<IProduct> = [];
  zapas: Array<IProduct> = []
  sort: string;

  constructor(private productsService: ProductsService) {
    this.getProdData();
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe(
      data => {
        this.zapas = data;
        this.zapas = this.products.filter(el => el.quantity > 0);
      },
      err => { console.log(err); }
    );
  }

  sortF(sort: string): void {
    if (sort === "Спочатку дорожчі") {
      this.products = this.products.sort((a, b) => b.price - a.price)
    }
    if (sort === "Спочатку дешевші") {
      this.products = this.products.sort((a, b) => a.price - b.price)
    }
    if (sort === "Спочатку з вищим рейтингом") {
      this.products = this.products.sort((a, b) => {
        const aRate = a.rating.reduce((el, el2) => (el + el2)) / a.rating.length;
        const bRate = a.rating.reduce((el, el2) => (el + el2)) / b.rating.length;
        return bRate - aRate;
      })
    }
    if (sort === "Спочатку нові") {
      this.products = this.zapas.reverse();
    }
  }

  private getProdData(): void {
    this.productsService.getProducts().subscribe(
      data => {
        this.products = data;
        this.products = this.products.filter(el => el.quantity > 0);
      },
      err => { console.log(err); }
    );
  }

}

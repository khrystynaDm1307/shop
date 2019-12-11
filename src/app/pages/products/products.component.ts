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
  constructor(private productsService: ProductsService) {
    this.getProdData();
  }

  ngOnInit() {
  }

  private getProdData(): void {
    this.productsService.getProducts().subscribe(
      data => {
        this.products = data;
        this.products = this.products.filter(el => el.quantity > 0)
      },
      err => { console.log(err); }
    );
  }

}

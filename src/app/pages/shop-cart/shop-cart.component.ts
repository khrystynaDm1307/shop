import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {

  public buyProduct: Array<any> = [];
  public all = 0;
  constructor(private productsService: ProductsService) {
    this.getLocalStorageArticles();
    this.countAll();
  }

  ngOnInit() { }

  public getLocalStorageArticles(): void {
    if (localStorage.getItem('products')) {
      this.buyProduct = JSON.parse(localStorage.getItem('products'));
    }
  }

  // always when input changes
  changeQt() {
    this.productsService.updateLocalStorage(this.buyProduct);
    this.countAll();
  }

  public deleteProduct(i: number) {
    this.buyProduct.splice(i, 1);
    this.productsService.updateLocalStorage(this.buyProduct);
    this.countAll();
  }

  public countAll(): void {
    this.all = 0;
    this.buyProduct.forEach(el => {
      this.all += el.quantity * el.productObj.price;
    });
    this.productsService.setCard(this.all,this.buyProduct)
  }
}

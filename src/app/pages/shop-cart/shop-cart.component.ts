import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interface/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {

  public buyProduct: Array<any> = [];
  public all = 0;
  products: Array<IProduct>;
  constructor(private productsService: ProductsService, public router: Router) {
    this.getLocalStorageArticles();
    this.countAll();
    this.getProdData()
  }

  ngOnInit() { }

  private getProdData(): void {
    this.productsService.getProducts().subscribe(
      data => {
        this.products = data;
      },
      err => { console.log(err); }
    );
  }

  public getLocalStorageArticles(): void {
    if (localStorage.getItem('products')) {
      this.buyProduct = JSON.parse(localStorage.getItem('products'));
    }
  }

  // always when input changes
  changeQt(product) {
    if (product.quantity < 1) {
      product.quantity = 1;
    }
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
    this.productsService.setCard(this.all, this.buyProduct)
  }

  public check(): void {
    this.buyProduct.forEach(buyEl => {
      this.products.forEach(el => {
        if (buyEl.productObj.name === el.name) {
          if (buyEl.quantity > el.quantity) {
            window.alert("There are not enought of this products")
          }
          else {
            this.router.navigate(['payment-delivery']);
          }
        }

      })
    })
  }
}

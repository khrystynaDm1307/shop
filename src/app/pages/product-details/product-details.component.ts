import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interface/product.model';
import { ProductsService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/shared/interface/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUserInside } from 'src/app/shared/interface/IUserInside';
import { Comments } from 'src/app/shared/class/product.class';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productId: number;
  view: IProduct;
  user: any;
  isBought: boolean;
  UserService: any;
  productsToBuy: Array<any> = []
  textComment: string;
  rateNumber: number;
  rating:string;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService
  ) {
    this.getMoreDetails();
    this.isProductBought()

  }

  ngOnInit() {
    this.getMoreDetails()
    this.isProductBought()
  }

  public addToBag(product: IProduct): void {
    if (localStorage.getItem('products') !== null) {
      this.productsToBuy = JSON.parse(localStorage.getItem('products'));
    }
    const object = { productObj: product, quantity: 1 }
    let n = false; // is this object already in the shopping bag?
    if (this.productsToBuy.length > 0) {
      this.productsToBuy.forEach((el, index) => {
        if (product.id === el.productObj.id) {
          object.quantity = el.quantity + 1;
          // update obj because quantity has increased
          delete this.productsToBuy[index];
          this.productsToBuy[index] = object;
          n = true;
        }
      });
      if (!n) {
        this.productsToBuy.unshift(object);
      }
    }
    else {
      this.productsToBuy.unshift(object);
    }
    this.productService.updateLocalStorage(this.productsToBuy);
  }

  public getMoreDetails(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getOneProduct(this.productId).subscribe(
      data => {
        this.view = data;
        this.rating =(this.view.rating.reduce((a, b) => (a + b)) / this.view.rating.length).toFixed(1);
      }
    )
  }

  public isProductBought(): void {
    if (localStorage.getItem('user') !== "null") {
      const id = JSON.parse(localStorage.getItem('user')).uid;
      this.authService.getOneUser(id).subscribe(
        data => {
          this.user = data.payload.data();
          if (this.user.purchase.some(element => element.id === this.productId)) {
            this.isBought = true;
          } else {
            this.isBought = false;
          }
          if (this.user.displayName === null) { this.user.displayName = this.user.email; }
        }
      );
    }
    else {
      this.isBought = false;
    }
  }

  public addComment(): void {
    const now = new Date();
    const comment = new Comments(1, this.user.displayName, this.textComment, `${now.getDay()}.${now.getMonth()}.${now.getFullYear()}`);
    if (this.view.comments.length > 0) {
      comment.id = this.view.comments.slice(-1)[0].id + 1;
    }
    this.view.comments.unshift(comment);
    this.view.rating.unshift(this.rateNumber);
    console.log(this.view.rating);
    this.rating =(this.view.rating.reduce((a, b) => (a + b)) / this.view.rating.length).toFixed(1)
    console.log(this.rating);
    
    this.edit();
    this.textComment = '';
  }

  changeQt() {
    if (this.rateNumber < 0 || this.rateNumber > 5) {
      this.rateNumber = 0;
    }
  }

  public deleteComment(i: number): void {
    this.view.comments.splice(i, 1)
    this.edit();
  }

  public edit(): void {
    this.productService.editProduct(this.view).subscribe(
      () => {
        this.getMoreDetails();
      }
    );
  }
  public goBack(): void {
    this.location.back();
  }

}

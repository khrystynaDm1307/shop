import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interface/product.model';
import { ProductsService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productId: number;
  view: IProduct;
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.getMoreDetails();
  }

  ngOnInit() {
  }

  public getMoreDetails(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getOneProduct(this.productId).subscribe(
      data => {
        this.view = data;
      }
    )
  }

  public goBack(): void {
    this.location.back();
  }
}

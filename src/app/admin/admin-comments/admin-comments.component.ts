import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interface/product.model';
import { ProductsService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.scss']
})
export class AdminCommentsComponent implements OnInit {
  products: Array<IProduct> = []
  constructor(private productsService: ProductsService) {
    this.getProdData()


  }

  ngOnInit() {
  }

  private getProdData(): void {
    this.productsService.getProducts().subscribe(
      data => {
        this.products = data.filter(el=>el.quantity>0);
        console.log(this.products);
      },
      err => { console.log(err); }
    );
  }

  a(product: IProduct) {
    product.commentsStatus = !product.commentsStatus;
    this.productsService.editProduct(product).subscribe(
      () => {
        this.getProdData();
      }
    );
    console.log(this.products)
  }
}

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
  priceFilter: string;
  catFilter: string;
new: Array<IProduct> = []
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
    if (sort === 'Спочатку дорожчі') {
      this.products = this.products.sort((a, b) => b.price - a.price)
    }
    if (sort === 'Спочатку дешевші') {
      this.products = this.products.sort((a, b) => a.price - b.price)
    }
    if (sort === 'Спочатку з вищим рейтингом') {
      this.products = this.products.sort((a, b) => {
        const aRate = a.rating.reduce((el, el2) => (el + el2)) / a.rating.length;
        const bRate = a.rating.reduce((el, el2) => (el + el2)) / b.rating.length;
        return bRate - aRate;
      })
    }
    if (sort === '-') {
      this.products = this.zapas;
    }
  }

  priceF(priceFilter: string, catFilter: string) {
    this.products = this.zapas;
    if (priceFilter === 'менше 1000') {
      this.products = this.zapas.filter(el => el.price < 1000)
    }
    if (priceFilter === 'від 1000 до 2000') {
      this.products = this.zapas.filter(el => el.price >= 1000).filter(el => el.price <= 2000)
    }
    if (priceFilter === '2000+') {
      this.products = this.zapas.filter(el => el.price > 2000)
    }
    if (catFilter === 'чоловіки') {
      this.products = this.products.filter(el => el.category === 'Man')
    }
    if (catFilter === 'жінки') {
      this.products = this.products.filter(el => el.category === 'Woman')
    }
    if (catFilter === 'діти') {
      this.products = this.products.filter(el => el.category === 'Chilldren')
    }
  }

  // priceF(priceFilter: string) {
  //   if (this.catFilter === undefined || this.catFilter === 'усі') {
  //     this.products = this.zapas;
  //   }

  //   if (priceFilter === 'менше 1000') {
  //     this.products = this.zapas.filter(el => el.price < 1000)
  //   }
  //   if (priceFilter === 'від 1000 до 2000') {
  //     this.products = this.zapas.filter(el => el.price >= 1000).filter(el => el.price <= 2000)
  //   }
  //   if (priceFilter === '2000+') {
  //     this.products = this.zapas.filter(el => el.price > 2000)
  //   }
  //   if (priceFilter === 'усі') {

  //   }

  // }

  // catF(catFilter) {
  //   if (this.catFilter === undefined || this.catFilter === 'усі') {
  //     if (catFilter === 'чоловіки') {
  //       this.products = this.zapas.filter(el => el.category === 'Man')
  //     }
  //     if (catFilter === 'жінки') {
  //       this.products = this.zapas.filter(el => el.category === 'Woman')
  //     }
  //     if (catFilter === 'діти') {
  //       this.products = this.zapas.filter(el => el.category === 'Chilldren')
  //     }
  //     if (catFilter === 'усі') {
  //      this.products=this.zapas;
  //     }
  //   }
  //   else {
  //     this.priceF(this.priceFilter)
  //     if (catFilter === 'чоловіки') {
  //       this.products = this.products.filter(el => el.category === 'Man')
  //     }
  //     if (catFilter === 'жінки') {
  //       this.products = this.products.filter(el => el.category === 'Woman')
  //     }
  //     if (catFilter === 'діти') {
  //       this.products = this.products.filter(el => el.category === 'Chilldren')
  //     }
  //     if (catFilter === 'усі') {

  //     }
  //   }
  // }

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

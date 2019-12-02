import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  cost: number;
  constructor(private productsService: ProductsService) {
    this.cost = this.productsService.getSum()
    console.log(this.cost);
    
  }

  ngOnInit() {
  }

}

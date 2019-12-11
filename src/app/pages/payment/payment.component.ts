import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/product.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct } from 'src/app/shared/interface/product.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  user: any;
  card: any;
  products: Array<IProduct>;
  constructor(private productsService: ProductsService,
    private authService: AuthService,
    private firestore: AngularFirestore) {
    //get user
    const id = JSON.parse(localStorage.getItem('user')).uid;
    this.authService.getOneUser(id).subscribe(
      data => {
        this.user = data.payload.data();
      }
    );
    //get card
    this.card = productsService.getCard();
    this.getProdData()
  }

  ngOnInit() {
  }

  private getProdData(): void {
    this.productsService.getProducts().subscribe(
      data => {
        this.products = data;
      },
      err => { console.log(err); }
    );
  }
  public buy() {
    this.card.arrayProd.forEach(element => {
     element.productObj.quantity-=element.quantity
     console.log();
     
     this.productsService.editProduct(element.productObj).subscribe(
      () => {
        this.getProdData();
      }
    ); 
      this.user.purchase.unshift(element.productObj)
    });
    this.firestore.doc('users/' + this.user.uid).update(this.user);
 
  }


}

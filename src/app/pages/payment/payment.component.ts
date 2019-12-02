import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/product.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  user: any;
  card: any;
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
  }

  ngOnInit() {
  }

  public buy() {
    this.card.arrayProd.forEach(element => {
      this.user.purchase.unshift(element.productObj)
    });
    this.firestore.doc('users/' + this.user.uid).update(this.user);

  }


}

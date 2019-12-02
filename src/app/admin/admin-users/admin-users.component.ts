import { Component, OnInit } from '@angular/core';

import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  public update(): void {
    const a = {
      a: 1,
      b: 2
    }
    this.firestore.collection('users').add(a)
  }
  public add(): void {
    const a = {
      a: 1,
      b: 2,
      c: 3
    }
    this.firestore.doc('users/'+'FnNUoKKv3fbe51J6ziT0UGFuB552').update(a);
  }
}

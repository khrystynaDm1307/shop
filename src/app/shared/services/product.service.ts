import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/interface/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string;
  card: any = {
    arrayProd: [],
    all: 0
  };
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products';
  }

  public getProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }

  public postProducts(product: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.url, product);
  }

  public deleteProduct(id: number): Observable<Array<IProduct>> {
    return this.http.delete<Array<IProduct>>(`${this.url}/${id}`);
  }

  public editProduct(obj: IProduct): Observable<Array<IProduct>> {
    return this.http.put<Array<IProduct>>(`${this.url}/${obj.id}`, obj);
  }

  public getOneProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }

  public updateLocalStorage(products: Array<any>): void {
    localStorage.removeItem('products');
    localStorage.setItem(`products`, JSON.stringify(products));
  }

  public setCard(cost: number, array: Array<any>): void {
    this.card.arrayProd = array;
    this.card.all = cost;
  }

  public getCard(): any {
    return this.card;
  }
}

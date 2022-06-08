import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductCart } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  private storageSubject = new Subject<string>();
  watchStorage(): Observable<any> {
    return this.storageSubject.asObservable()
  }
  getItem() {
    return JSON.parse(localStorage.getItem('cart') || '[]')
  }
  setItem(addItem: ProductCart) {
    const cardItems = this.getItem()
    const existingItems = cardItems.find((item: ProductCart) => item._id === addItem._id);
    if (!existingItems) {
      cardItems.push(addItem)

    } else {
      existingItems.value += addItem.value

    }
    localStorage.setItem('cart', JSON.stringify(cardItems))
    this.storageSubject.next('')



  }
}

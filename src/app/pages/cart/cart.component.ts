import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/models/product';

import { LocalstorageService } from 'src/app/services/localstorage.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: ProductCart[];

  constructor(private lsService: LocalstorageService) {
    this.cartItems = [];

  }

  ngOnInit(): void {
    this.onSetCart()
    this.lsService.watchStorage().subscribe(data => {
      this.onSetCart()
    })
  }
  onSetCart() {
    this.cartItems = this.lsService.getItem()
  }
  // onChangeCartValue(event: any) {
  //   this.cartValue = event.target.value;
  // }
  // getValue() {
  //   let values = 0;
  //   for (let data of this.cartItems) {
  //     values = data.value
  //   }
  //   return values
  // }
  totalPrice() {
    let total = 0;
    for (let data of this.cartItems) {
      total += data.value * data.price;
    }
    return total;
  }
  onUpdateToCart() {

  }
}

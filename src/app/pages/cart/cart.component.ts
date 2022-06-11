import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ProductCart } from 'src/app/models/product';

import { LocalstorageService } from 'src/app/services/localstorage.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(
    private toast: NgToastService,
    private lsService: LocalstorageService
  ) {
  }

  ngOnInit(): void {

  }
  onGetCart() {
    return this.lsService.getItem()
  }

  totalPrice() {
    let total = 0;
    for (let data of this.onGetCart()) {
      total += data.value * data.price;
    }
    return total;
  }

  increaseItemInCart(_id: string) {
    const cardItems = this.lsService.getItem()
    cardItems.find((item: ProductCart) => item._id === _id).value++;
    localStorage.setItem('cart', JSON.stringify(cardItems))
  }
  decreaseItemInCart(_id: string) {
    const cardItems = this.lsService.getItem()
    const currenProduct = cardItems.find((item: ProductCart) => item._id === _id);
    const filter = cardItems.filter((item: ProductCart) => item._id !== currenProduct._id);
    currenProduct.value--
    if (currenProduct.value < 1) {
      const confirm = window.confirm('Bạn có muốn xóa sản phẩm này không?');
      if (confirm) {
        localStorage.setItem('cart', JSON.stringify(filter))
        this.toast.success({ detail: 'xoa thanh cong' })
      } else {
        currenProduct.value = 1
        localStorage.setItem('cart', JSON.stringify(cardItems))
        this.toast.error({ detail: 'xoa that bai' })
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(cardItems))
    }
  }
  removeItemInCart = (_id: string) => {
    const confirm = window.confirm('Bạn có muốn xóa sản phẩm này không?');
    const cardItems = this.lsService.getItem()
    const filter = cardItems.filter((item: ProductCart) => item._id !== _id);
    if (confirm) {
      localStorage.setItem('cart', JSON.stringify(filter));
      this.toast.success({ detail: 'xoa thanh cong' })
    } else {
      this.toast.error({ detail: 'xoa that bai' })
      localStorage.setItem('cart', JSON.stringify(cardItems));
    }
  }
}

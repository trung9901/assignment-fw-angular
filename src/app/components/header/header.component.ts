import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/models/product';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItems: ProductCart[]
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
}

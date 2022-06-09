import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/models/product';
import { IUser } from 'src/app/models/user';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartItems: ProductCart[];;
  loggedInUser;

  constructor(private lsService: LocalstorageService) {
    this.cartItems = [];
    this.loggedInUser = this.lsService.getUser()

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

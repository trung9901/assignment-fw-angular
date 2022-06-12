import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/models/product';
import { IUser } from 'src/app/models/user';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToastrModule } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartItems: ProductCart[];;


  constructor(
    private lsService: LocalstorageService,
    private toast: NgToastService,
  ) {
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
  loggedIn() {

    return this.lsService.getUser()

  }
  onLogout() {
    localStorage.removeItem('loggedInUser')
    this.toast.success({ detail: 'dang xuat thanh cong' })
  }
}

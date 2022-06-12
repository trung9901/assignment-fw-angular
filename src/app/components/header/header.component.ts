import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/models/product';
import { IUser } from 'src/app/models/user';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToastrModule } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/app/models/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartItems: ProductCart[];;
  categories!: ICategory[]

  constructor(
    private categoryService: CategoryService,
    private lsService: LocalstorageService,
    private toast: NgToastService,
  ) {
    this.cartItems = [];
  }

  ngOnInit(): void {
    this.onGetListCate()
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
  onGetListCate() {
    this.categoryService.getCategoryList().subscribe((data) => {
      this.categories = data
    })
  }
}

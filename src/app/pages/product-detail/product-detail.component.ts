import { Component, OnInit } from '@angular/core';
import { IProduct, ProductCart } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from './../../services/localstorage.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: string;
  product: IProduct;
  cartValue: number;
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private lsService: LocalstorageService,
    private toast: NgToastService,
  ) {
    this.id = "";
    this.product = {
      _id: '',
      name: "",
      price: 0,
      description: '',
      sale_price: 0,
      quantity: 0,
      status: 0,
    }
    this.cartValue = 1;
  }

  ngOnInit(): void {
    this.getProducts()
  }

  onChangeCartValue(event: any) {
    this.cartValue = event.target.value;
  }
  getProducts() {
    this.id = this.router.snapshot.params['id'];
    this.productService.getProducts(this.id).subscribe((data) => {
      this.product = data;
    })
  }
  onAddToCart() {

    const addItem = {
      ...this.product,
      value: +this.cartValue
    };
    // this.lsService.setItem(addItem);
    this.cartValue = 1;
    // ------------------------
    if (this.product.quantity < addItem.value) {
      this.toast.error({ detail: 'Them that bai, san pham vuot qua so luong trong kho' })
      console.log(this.product.quantity, addItem.value)
    } else {
      this.lsService.setItem(addItem);
      this.toast.success({ detail: 'them vao gio hang thanh cong' })
    }
  }


}



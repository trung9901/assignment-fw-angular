import { Component, OnInit } from '@angular/core';
import { IProduct, ProductCart } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from './../../services/localstorage.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
    this.id = this.router.snapshot.params['id'];
    this.productService.getProducts(this.id).subscribe((data) => {
      this.product = data;
    })
  }

  onChangeCartValue(event: any) {
    this.cartValue = event.target.value;
  }

  onAddToCart() {

    const addItem = {
      ...this.product,
      value: +this.cartValue
    };
    this.lsService.setItem(addItem);
    this.cartValue = 1;


  }


}



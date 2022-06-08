import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
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
    // private lsService: LocalStorageService
  ) {
    this.id = "";
    this.product = {
      _id: '',
      name: "",
      price: 0,
      description: ''
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

  // onAddToCart() {
  //   // Định nghĩa 1 sp trong giỏ hàng có cấu trúc là gì
  //   const addItem = {
  //     ...this.product,
  //     value: +this.cartValue
  //   };
  //   // Nếu thực hiện như cũ, thì phía component cart sẽ không lắng nghe được

  //   // Thực hiện gọi lsService để component cart có thể lắng nghe thay đổi
  //   this.lsService.setItem(addItem);
  //   this.cartValue = 1;

  // }


}



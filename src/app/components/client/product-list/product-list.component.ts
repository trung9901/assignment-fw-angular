import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: IProduct[]
  constructor(private productService: ProductService) { }



  ngOnInit(): void {
    this.getProductList()
  }
  getProductList() {
    this.productService.getProductList().subscribe(data => {
      this.products = data;
      console.log(this.products)
    })
  }
  onHandleRemove(id: string) {
    this.productService.removeProduct(id).subscribe(() => {
      this.products = this.products.filter(item => item._id !== id);
    })
  }
}

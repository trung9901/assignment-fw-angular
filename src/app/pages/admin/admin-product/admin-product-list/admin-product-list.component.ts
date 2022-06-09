import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

  products!: IProduct[]
  constructor(private productService: ProductService) {

  }
  ngOnInit(): void {
    this.onGetList()
  }
  onGetList() {
    this.productService.getProductList().subscribe((data) => {
      this.products = data;
      console.log(this.products)
    });
  }

  onHandleRemove(id: string) {
    const confirmDelete = confirm('Bạn có chắc chắn xoá không?');
    if (confirmDelete && id) {
      this.productService.removeProduct(id).subscribe(() => {
        // this.products = this.products.filter(item => item._id !== id);
        this.onGetList();
      })
    }

  }
}

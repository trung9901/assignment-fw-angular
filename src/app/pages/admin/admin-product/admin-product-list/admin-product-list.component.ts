import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ICategory } from 'src/app/models/category';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

  products!: IProduct[]
  constructor(
    private productService: ProductService,
    private toast: NgToastService,
    private categoryService: CategoryService
  ) {

  }
  ngOnInit(): void {
    this.onGetList()
  }


  onGetList() {
    this.productService.getProductList().subscribe((data) => {
      this.products = data;

    });
  }

  onHandleRemove(id: string) {
    const confirmDelete = confirm('Bạn có chắc chắn xoá không?');
    if (confirmDelete && id) {
      this.productService.removeProduct(id).subscribe(() => {
        // this.products = this.products.filter(item => item._id !== id);
        this.onGetList();

      })
      this.toast.success({ detail: 'xoa san pham thanh cong' })
    } else {
      this.toast.error({ detail: 'xoa san pham that bai' })
    }

  }

  onGetCategoryById() {
    // this.productService.getProductList().subscribe((data) => {
    //   return data;
    // });
    // const id = this.data._id
    // this.categoryService.getCategories(id).subscribe((data) => {

    // })
  }

}

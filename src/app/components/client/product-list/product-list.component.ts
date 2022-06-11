import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any
  categoryId: string;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private activateRoute: ActivatedRoute,
    private router: Router,

  ) {
    this.categoryId = "";
  }



  ngOnInit(): void {
    this.categoryId = this.activateRoute.snapshot.params['id'];
    if (this.categoryId !== '0' && this.categoryId !== undefined) {
      console.log(this.getProductListByCate())
      this.getProductListByCate()
    } else {
      this.getProductList()
    }


  }
  getProductList() {

    this.productService.getProductList().subscribe(data => {
      this.products = data;
    })

  }

  getProductListByCate() {
    this.categoryId = this.activateRoute.snapshot.params['id'];
    this.productService.getListProductByCate(this.categoryId).subscribe((data) => {
      this.products = data;
    })

  }



}

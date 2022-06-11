import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: IProduct[]
  categoryId: string;
  constructor(
    private productService: ProductService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {
    this.categoryId = '0';
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

    return this.productService.getProductList().subscribe(data => {
      this.products = data;
    })

  }

  getProductListByCate() {
    const id = this.categoryId
    return this.productService.getListProductByCate(id).subscribe(data => {
      this.products = data;
    })
  }



}

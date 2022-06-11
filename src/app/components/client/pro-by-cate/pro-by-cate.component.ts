import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-pro-by-cate',
  templateUrl: './pro-by-cate.component.html',
  styleUrls: ['./pro-by-cate.component.css']
})
export class ProByCateComponent implements OnInit {
  id: string;
  product: any;
  constructor(
    private productService: ProductService,
    private activateRoute: ActivatedRoute,
  ) {
    this.id = ""
  }

  ngOnInit(): void {
  }
  getProductListByCate() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.productService.getListProductByCate(this.id).subscribe((data) => {
      this.product = data;
    })

  }

}

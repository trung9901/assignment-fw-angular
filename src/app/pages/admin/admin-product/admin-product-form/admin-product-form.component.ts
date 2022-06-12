import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ICategory } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';


import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId: string;
  categories!: ICategory[]
  constructor(
    private productService: ProductService, // cung cấp createProduct
    private router: Router, // cung cấp navigate điều hướng
    private activateRoute: ActivatedRoute, // lấy ra các tham số trong url
    private toast: NgToastService,
    private categoryService: CategoryService

  ) {
    this.productForm = new FormGroup({
      // name: new FormControl('', Validators.required),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
        // this.onValidateNameHasProduct
      ]),
      price: new FormControl('', [
        Validators.required
      ]),
      quantity: new FormControl('', [
        Validators.required
      ]),
      image: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.maxLength(100)
      ]),
      category: new FormControl('', [
        Validators.required
      ]),
      status: new FormControl(true),
    });

    this.productId = '0';
  }

  ngOnInit(): void {
    this.onGetCategory()
    this.productId = this.activateRoute.snapshot.params['id'];
    if (this.productId) {
      this.productService.getProducts(this.productId).subscribe(data => {
        // Gán giá trị cho form, patchValue sẽ nhận đầy đủ thuộc tính của form
        this.productForm.patchValue({
          name: data.name,
          price: data.price,
          quantity: data.quantity,
          image: data.image,
          description: data.description,
          category: data.category
        });
      });

    }

  }


  // onValidateNameHasProduct(control: AbstractControl): ValidationErrors | null {

  //   const { value } = control;

  //   if (!value.includes('product')) {
  //     return { hasProductError: true };
  //   }

  //   return null;
  // }

  onSubmit() {

    const submitData = this.productForm.value;

    if (this.productId !== '0' && this.productId !== undefined) {
      return this.productService.updateProduct(this.productId, submitData).subscribe(data => {
        this.router.navigateByUrl('/admin/products');
        this.toast.success({ detail: 'update san thanh cong' })
      });
    }

    return this.productService.addProduct(submitData).subscribe((data) => {
      this.toast.success({ detail: 'them san pham thanh cong' })
      this.router.navigateByUrl('/admin/products');
    })
  }


  onGetCategory() {
    this.categoryService.getCategoryList().subscribe((data) => {
      this.categories = data
    })

  }


}

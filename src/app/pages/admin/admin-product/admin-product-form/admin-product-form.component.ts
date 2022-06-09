import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId: string;
  constructor(
    private productService: ProductService, // cung cấp createProduct
    private router: Router, // cung cấp navigate điều hướng
    private activateRoute: ActivatedRoute // lấy ra các tham số trong url
  ) {
    this.productForm = new FormGroup({
      // name: new FormControl('', Validators.required),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
        // this.onValidateNameHasProduct
      ]),
      price: new FormControl(0, [
        Validators.required
      ]),
      quantity: new FormControl(0, [
        Validators.required
      ]),
      image: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [

      ]),
      // category: new FormControl('', [
      //   Validators.required
      // ]),
      status: new FormControl(true),
    });

    this.productId = '0';
  }

  ngOnInit(): void {
    this.productId = this.activateRoute.snapshot.params['_id'];
    if (this.productId) {
      this.productService.getProducts(this.productId).subscribe(data => {
        // Gán giá trị cho form, patchValue sẽ nhận đầy đủ thuộc tính của form
        this.productForm.patchValue({
          name: data.name
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

    // if (this.productId !== '0' || this.productId !== undefined) {
    //   return this.productService.updateProduct(this.productId, submitData).subscribe(data => {
    //     this.router.navigateByUrl('/admin/products');
    //   });
    // }

    console.log(submitData)
    return this.productService.addProduct(submitData).subscribe((data) => {

      this.router.navigateByUrl('/admin/products');
    })

  }
}

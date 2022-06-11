import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from './../../../../services/category.service';

@Component({
  selector: 'app-admin-category-form',
  templateUrl: './admin-category-form.component.html',
  styleUrls: ['./admin-category-form.component.css']
})
export class AdminCategoryFormComponent implements OnInit {

  categoryForm: FormGroup;
  categoryId: string;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toast: NgToastService,
  ) {
    this.categoryForm = new FormGroup({

      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
      ]),

      status: new FormControl(true),
    });

    this.categoryId = '0';
  }

  ngOnInit(): void {
    this.categoryId = this.activateRoute.snapshot.params['id'];
    if (this.categoryId) {
      this.categoryService.getCategories(this.categoryId).subscribe(data => {
        // Gán giá trị cho form, patchValue sẽ nhận đầy đủ thuộc tính của form
        this.categoryForm.patchValue({
          name: data.name

        });
      });

    }
  }
  onSubmit() {

    const submitData = this.categoryForm.value;

    if (this.categoryId !== '0' && this.categoryId !== undefined) {
      return this.categoryService.updateCategory(this.categoryId, submitData).subscribe(data => {
        this.toast.success({ detail: 'update danh muc thanh cong' })
        this.router.navigateByUrl('/admin/categories');
        console.log(this.categoryId)
      })
    }

    return this.categoryService.addCategory(submitData).subscribe((data) => {
      this.toast.success({ detail: 'them danh muc thanh cong' })
      this.router.navigateByUrl('/admin/categories');
      console.log(this.categoryId)
    })
  }

}

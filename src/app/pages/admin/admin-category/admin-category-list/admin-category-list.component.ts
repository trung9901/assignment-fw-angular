import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from './../../../../models/category';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.css']
})
export class AdminCategoryListComponent implements OnInit {
  categories!: ICategory[]
  constructor(
    private categoryService: CategoryService,
    private toast: NgToastService,
  ) { }

  ngOnInit(): void {
    this.onGetList()
  }
  onGetList() {
    this.categoryService.getCategoryList().subscribe((data) => {
      this.categories = data
    })
  }
  onHandleRemove(id: string) {
    const confirmDelete = confirm('Bạn có chắc chắn xoá không?');
    if (confirmDelete && id) {
      this.categoryService.removeCategory(id).subscribe(() => {
        // this.products = this.products.filter(item => item._id !== id);
        this.onGetList();
      })
      this.toast.success({ detail: 'xoa danh muc thanh cong' })
    } else {
      this.toast.error({ detail: 'xoa danh muc that bai' })
    }

  }
}

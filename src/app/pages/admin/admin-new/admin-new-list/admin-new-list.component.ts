import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NewService } from './../../../../services/new.service';

@Component({
  selector: 'app-admin-new-list',
  templateUrl: './admin-new-list.component.html',
  styleUrls: ['./admin-new-list.component.css']
})
export class AdminNewListComponent implements OnInit {

  news!: any
  constructor(
    private newService: NewService,
    private toast: NgToastService,
  ) { }

  ngOnInit(): void {
    this.onGetList()
  }
  onGetList() {
    this.newService.getNewList().subscribe((data) => {
      this.news = data
    })
  }
  onHandleRemove(id: string) {
    const confirmDelete = confirm('Bạn có chắc chắn xoá không?');
    if (confirmDelete && id) {
      this.newService.removeNew(id).subscribe(() => {
        // this.products = this.products.filter(item => item._id !== id);
        this.onGetList();
      })
      this.toast.success({ detail: 'xoa danh muc thanh cong' })
    } else {
      this.toast.error({ detail: 'xoa danh muc that bai' })
    }

  }

}

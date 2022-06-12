import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  users: IUser[]
  constructor(
    private userService: UserService,
    private toast: NgToastService,
  ) {
    this.users = [];
  }

  ngOnInit(): void {
    this.ongetUser()
  }
  ongetUser() {
    this.userService.getUserList().subscribe((data) => {
      this.users = data
    })
  }

  onHandleRemove(id: string) {
    const confirmDelete = confirm('Bạn có chắc chắn xoá không?');
    if (confirmDelete && id) {
      this.userService.removeUser(id).subscribe(() => {
        // this.products = this.products.filter(item => item._id !== id);
        this.ongetUser();
      })
      this.toast.success({ detail: 'xoa tai khoan thanh cong' })
    } else {
      this.toast.error({ detail: 'xoa tai khoan that bai' })
    }
  }
}

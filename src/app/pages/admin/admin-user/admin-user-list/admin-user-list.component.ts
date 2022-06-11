import { Component, OnInit } from '@angular/core';
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

  onHandleRemove(_id: string) {

  }
}

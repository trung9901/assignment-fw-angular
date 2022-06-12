import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['./admin-user-form.component.css']
})
export class AdminUserFormComponent implements OnInit {

  userForm: FormGroup;
  userId: string;
  constructor(
    private userService: UserService,

    private activateRoute: ActivatedRoute,
    private router: Router,
    private toast: NgToastService,
  ) {
    this.userForm = new FormGroup({

      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
      ]),
      // email: new FormControl('', [
      //   Validators.
      // ]),
      password: new FormControl('', [



      ]),
      status: new FormControl(0, [
        Validators.required,
      ]),
      role: new FormControl(0, [
        Validators.required,
      ]),
    });

    this.userId = '0';
  }

  ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.params['id'];
    if (this.userId) {
      this.userService.getUsers(this.userId).subscribe(data => {
        // Gán giá trị cho form, patchValue sẽ nhận đầy đủ thuộc tính của form
        this.userForm.patchValue({
          name: data.name,
          // email: data.email,
          password: data.password,
          status: data.status,
          role: data.role
        });
      });

    }
  }
  onSubmit() {

    const submitData = this.userForm.value;


    return this.userService.updateUser(this.userId, submitData).subscribe(data => {
      this.toast.success({ detail: 'update tai khoan thanh cong' })
      this.router.navigateByUrl('/admin/users');
      console.log(this.userId)
    })


    // return this.userService.addUser(submitData).subscribe((data) => {
    //   this.toast.success({ detail: 'them tai khoan thanh cong' })
    //   this.router.navigateByUrl('/admin/users');
    //   console.log(this.userId)
    // })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastr: NgToastService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16)
        ])
    })
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.authService.signUp(this.signupForm.value).subscribe(data => {
      this.router.navigateByUrl('/signin')
      this.toastr.success({ detail: 'đăng ký thành công chuyển tới trang đăng nhập' })
    })
  }
}

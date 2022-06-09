import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private toastr: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', Validators.email),
      password: new FormControl('')
    })
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.authService.signUp(this.signupForm.value).subscribe(data => {
      this.router.navigateByUrl('/signin')
      this.toastr.success('đăng ký thành công chuyển tới trang đăng nhập')
    })
  }
}

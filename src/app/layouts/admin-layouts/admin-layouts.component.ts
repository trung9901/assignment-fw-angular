import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-layouts',
  templateUrl: './admin-layouts.component.html',
  styleUrls: ['./admin-layouts.component.css']
})
export class AdminLayoutsComponent implements OnInit {

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }
  onLogout() {
    localStorage.removeItem('loggedInUser')
    this.router.navigateByUrl('/');
  }

}

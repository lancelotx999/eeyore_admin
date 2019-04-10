import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eeyore-admin';
  currentUser: User;

  constructor(
  	private authService: AuthService,
  	private router: Router
  ) {
  	this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  signOut() {
  	this.authService.signOut();
  	this.router.navigate(['/signin']);
  }
}

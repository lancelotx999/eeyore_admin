import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators'

import { AlertService, AuthService } from '../../_services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public registerForm: FormGroup;

  public   loading = false;
  public submitted = false;

  constructor(
    private   formBuilder: FormBuilder,
    private        router: Router,
  	private   authService: AuthService,
    private  alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    // initialize form validation
    this.registerForm = this.formBuilder.group({
          name: ['',  Validators.required],
      username: ['',  Validators.required],
         email: ['',  Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) { return; }
    
    // form is working
    this.loading = true;
    // assign the normal user role
    this.registerForm.value.roles = ["user"];
    // then call the sign up service
    this.authService.signUp(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Sign up successful', true);
          this.router.navigate(['/signin']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

}

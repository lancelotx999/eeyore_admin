import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private currentUserSubject: BehaviorSubject<User>;
	public         currentUser: Observable<User>;
  
	public apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {
  	this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  	this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
  	return this.currentUserSubject.value;
  }

  signUp(user: User) { 
  	return this.http.post<any>(`${this.apiUrl}/api/auth/signup`, user);
  }

  signIn(username: string, password: string) {
  	return this.http.post<any>(`${this.apiUrl}/api/auth/signin`, { username, password })
  		.pipe(
  			map(user => {
  				// login successful if there's a jwt token in the response
  				if (user && user.token) {
  					// store user details and jwt token in the local storage to keep user logged in between page refresh
  					localStorage.setItem('currentUser', JSON.stringify(user));
  					this.currentUserSubject.next(user);
  				}

  				return user;
  			}
  		)
  	);
  }

  signOut() {
  	// remove user from local storage to log user out
  	localStorage.removeItem('currentUser');
  	this.currentUserSubject.next(null);
  }

}

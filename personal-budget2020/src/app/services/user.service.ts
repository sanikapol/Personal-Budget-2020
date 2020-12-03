import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  };

  // private userSubject: BehaviorSubject<User>;
  // public user: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    // this.user = this.userSubject.asObservable();
  }

  // public get userValue(): User {
  //   return this.userSubject.value;
  // }

  createNewUser(userData) {
    console.log("userdata: " + userData);
    return this.http.post(`http://localhost:3000/user/signup/`, userData);
  }


  userLogin(username, password) {
    return this.http.post(`http://localhost:3000/user/login`, {username, password})
    .subscribe(
      (res:any) => {
        if(res){
          let token = res.token;
          console.log("creds: " + token);
          let userCred = res.userCredentials;
          console.log("creds: " + userCred);
          this.user.firstname = userCred.firstname;
          this.user.lastname = userCred.lastname;
          this.user.email = userCred.email;
          this.user.username = userCred.username;
          this.user.password = userCred.password;
          localStorage.setItem('Token', token);
          localStorage.setItem('currentUser', this.user.username);
          this.router.navigate(['/dashboard']);
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }


}

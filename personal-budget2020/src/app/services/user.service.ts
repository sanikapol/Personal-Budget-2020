import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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


  constructor(private http: HttpClient, private router: Router,private snackBar: MatSnackBar) {

  }

  createNewUser() {
    return this.http.post(`http://localhost:3000/user/signup/`, this.user)
    .subscribe(
      (res:any) => {
        if(res){
          // console.log("Frontend res");
          // console.log(res);
          this.router.navigate([ '/login' ]);
        }
      },
      // (err: HttpErrorResponse) => {
      //   if (err.error.msg) {
      //     this.snackBar.open(err.error.msg, 'Undo');
      //   } else {
      //     this.snackBar.open('Something Went Wrong!');
      //   }
      // }
    );
  }



  userLogin(username, password) {
    return this.http.post(`http://localhost:3000/user/login`, {username, password})
    .subscribe(
      (res:any) => {
        // console.log("login res");
        //console.log(res);
        if(res){
          let token = res.token;
          localStorage.setItem('Token', token);
          // console.log("localstorage");
          // console.log(localStorage.getItem('Token'));
          this.router.navigate(['/dashboard']);
        }
      },
      (err: HttpErrorResponse) => {
        //console.log(err.message);
        if (err.error.msg) {
          this.snackBar.open(err.error.msg, 'Undo');
        } else {
          this.snackBar.open('Something Went Wrong!');
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('currentUser');
    this.router.navigate([ '/login' ]);
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from './token.service';
import { DataService } from './data.service';

const baseURL = 'http://localhost:3000';
// const baseURL = 'http://198.199.69.99:3000';

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


  constructor(private http: HttpClient, private router: Router,private snackBar: MatSnackBar, private tokenService: TokenService,private dataService: DataService) {

  }

  createNewUser() {
    const url = baseURL + '/user/signup/';
    return this.http.post(url, this.user)
    .subscribe(
      (res:any) => {
        if(res){
          // console.log("Frontend res");
          // console.log(res);
          this.router.navigate([ '/login' ]);
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error.msg) {
          this.snackBar.open(err.error.msg, 'Undo');
        } else {
          this.snackBar.open('Something Went Wrong!');
        }
      }
    );
  }

  userLogin(username, password) {
    this.dataService.dataSource = {
      labels: [],
      datasets: [{
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132,1.0)',
            'rgba(54, 162, 235, 1.0)',
            'rgba(255, 206, 86, 1.0)',
            'rgba(75, 192, 192, 1.0)',
            'rgba(153, 102, 255, 1.0)',
            'rgba(140, 159, 86, 1.0)',
            'rgba(78, 103, 4, 1.0)',
            'rgba(250, 167, 118, 1.0)',
            'rgba(123, 45, 100, 1.0)',
            'rgba(90, 34, 56, 1.0)',
            'rgba(100, 10, 10, 1.0)',
          ],
      }]
  }

  this.dataService.dataSourceBar = {
    labels: [],
    datasets: [{
        label: "Expenses",
        data: [],
        backgroundColor: [
            'rgba(255, 99, 132,1.0)',
            'rgba(54, 162, 235, 1.0)',
            'rgba(255, 206, 86, 1.0)',
            'rgba(75, 192, 192, 1.0)',
            'rgba(153, 102, 255, 1.0)',
            'rgba(140, 159, 86, 1.0)',
            'rgba(78, 103, 4, 1.0)',
            'rgba(250, 167, 118, 1.0)',
            'rgba(123, 45, 100, 1.0)',
            'rgba(90, 34, 56, 1.0)',
            'rgba(100, 10, 10, 1.0)',
        ],
    }]
}

this.dataService.dataSourceLine = {
  datasets: [
    {
      label: "Budget",
      data: [],
      backgroundColor: 'rgb(90, 255, 132)',
      borderColor: 'rgb(90, 255, 132)',
      fill: false,
    },
    {
      label: "Spent",
      data: [],
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      fill: false,
    }
  ],
  labels: []
}


    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const url = baseURL + '/user/login/';
    return this.http.post(url, {username, password})
    .subscribe(
      (res:any) => {
        // console.log("login res");
        //console.log(res);
        if(res){
          //let token = res.token;
          this.tokenService.saveToken(res.token);
          this.tokenService.saveRefreshToken(res.refreshToken);
          localStorage.setItem("username",username);
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

  refreshToken(){
    this.tokenService.removeToken();
    const token = this.tokenService.getRefreshToken();
    const username = localStorage.getItem('username');
    const url = baseURL + '/token/';
    return this.http.post(url, {token,username})
    .subscribe((res:any) => {
        this.tokenService.saveToken(res.token);
    })
  }

  logout() {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    localStorage.removeItem('username');
    this.router.navigate([ '/login' ]);
  }


}

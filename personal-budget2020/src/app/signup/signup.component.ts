import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent implements OnInit {


  constructor(private userService: UserService, private router: Router,private snackBar: MatSnackBar,private formBuilder: FormBuilder,) { }

  signupForm = new FormGroup({
    firstname: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
  });

  async createUser() {
    //console.log(this.signupForm.value);
    await this.mapUser();
    // console.log("user set");
    // console.log(this.userService.user);
    this.userService.createNewUser();
  }

  ngOnInit(): void {

  }



  getErrorMessage() {
    return this.signupForm.hasError('required') ? 'Required field' :
           this.signupForm.hasError('type') ? 'no numbers allowed' :
           this.signupForm.hasError('email') ? 'invalid email' :
        '';
  }

  mapUser(){
    this.userService.user.firstname = this.signupForm.value.firstname;
    this.userService.user.lastname = this.signupForm.value.lastname;
    this.userService.user.email = this.signupForm.value.email;
    this.userService.user.username = this.signupForm.value.username;
    this.userService.user.password = this.signupForm.value.password;
  }

  cancel(){
    this.router.navigate([ '/login' ]);
  }


}

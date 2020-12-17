import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl,FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private userService: UserService, private router: Router,private formBuilder: FormBuilder) { }

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  loginUser() {
    //console.log(this.loginForm.value);
    this.userService.userLogin(this.loginForm.value.username, this.loginForm.value.password);
  }

  ngOnInit(): void {

  }

  gotoSignUp(){
    this.router.navigate(['/signup'])
  }

}

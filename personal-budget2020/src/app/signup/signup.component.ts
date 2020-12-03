import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  newUser = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: ""
  };

  constructor(private userService: UserService, private router: Router,private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    console.log(this.form.value);
    this.userService.createNewUser(this.newUser)

}

}

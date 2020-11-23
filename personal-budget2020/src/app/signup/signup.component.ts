import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {

  }

  signUpNewUser(){

  }

}

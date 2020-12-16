import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../services/data.service';


// interface Month {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'pb-addbudget',
  templateUrl: './addbudget.component.html',
  styleUrls: ['./addbudget.component.scss']
})


export class AddbudgetComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddbudgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService) { }


  // month: Month[] = [
  //   {value: '0', viewValue: 'January'},
  //   {value: '1', viewValue: 'February'},
  //   {value: '2', viewValue: 'March'},
  //   {value: '2', viewValue: 'April'},
  //   {value: '2', viewValue: 'May'},
  //   {value: '2', viewValue: 'June'},
  //   {value: '2', viewValue: 'July'},
  //   {value: '2', viewValue: 'August'},
  //   {value: '2', viewValue: 'Sepetember'},
  //   {value: '2', viewValue: 'October'},
  //   {value: '2', viewValue: 'November'},
  //   {value: '2', viewValue: 'December'},

  // ];

  ngOnInit(): void {
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    //console.log("budget to add");
    this.dataService.row.title = this.data.title;
    this.dataService.row.budget = this.data.budget;
    this.dataService.row.expense = this.data.expense;
    this.dataService.row.month = this.data.month;
    console.log(this.data);
    console.log(this.data.title);

    this.dataService.addBudget(this.dataService.row);
  }
}

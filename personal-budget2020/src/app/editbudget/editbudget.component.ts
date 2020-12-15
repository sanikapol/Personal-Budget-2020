import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../services/data.service';

@Component({
  selector: 'pb-editbudget',
  templateUrl: './editbudget.component.html',
  styleUrls: ['./editbudget.component.scss']
})
export class EditbudgetComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditbudgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

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

  stopEdit(): void {
    // this.dataService.row.title = this.data.title;
    // this.dataService.row.budget = this.data.budget;
    // this.dataService.row.expense = this.data.expense;
    // this.dataService.row.month = this.data.month;
    console.log("This.data");
    console.log(this.data);
    this.dataService.updateBudget(this.data.id,{"title":this.data.title,"budget":this.data.budget,"expense":this.data.expense,"month":this.data.month});
  }
}

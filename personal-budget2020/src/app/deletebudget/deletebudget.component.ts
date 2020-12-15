import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../services/data.service';

@Component({
  selector: 'pb-deletebudget',
  templateUrl: './deletebudget.component.html',
  styleUrls: ['./deletebudget.component.scss']
})
export class DeletebudgetComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletebudgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    // console.log("id");
    // console.log(this.data.id);
    this.dataService.deleteBudget(this.data.id);
  }

}

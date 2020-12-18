import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../services/data.service';
import { TableData } from '../models/tableData';
import {MatDialog} from '@angular/material/dialog';
import { AddbudgetComponent } from '../addbudget/addbudget.component';
import { DeletebudgetComponent } from '../deletebudget/deletebudget.component';
import { EditbudgetComponent } from '../editbudget/editbudget.component';


@Component({
  selector: 'pb-configure-budget',
  templateUrl: './configure-budget.component.html',
  styleUrls: ['./configure-budget.component.scss']
})
export class ConfigureBudgetComponent implements OnInit {


  constructor(private dataService: DataService,public dialog: MatDialog,) { }
  TABLE_DATA : TableData[];
  displayedColumns = ['title', 'budget', 'expense', 'month', 'actions'];
  dataSource;


  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getTableData()
    .subscribe((res: any) => {
      this.TABLE_DATA = res;
      this.dataSource = new MatTableDataSource<TableData>(this.TABLE_DATA);
    });


  }

  refresh() {
    this.loadData();
  }

  addData(){
    const dialogRef = this.dialog.open(AddbudgetComponent, {
      data: {row:this.dataService.row }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refresh();
      }
    });
  }

  deleteItem(i: number, id: string,title: string, budget:number,expense:number,month:string) {
    this.dataService.row.id = id;
    const dialogRef = this.dialog.open(DeletebudgetComponent, {
      data: {id: id,title: title, budget:budget,expense:expense,month:month}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result === 1) {
        this.refresh();
      }
    });
  }

  startEdit(i: number, id: string, title: string, budget:number,expense:number,month:string) {
    this.dataService.row.id = id;
    // index row is used just for debugging proposes and can be removed

    const dialogRef = this.dialog.open(EditbudgetComponent, {
      data: {id: id, title: title, budget:budget,expense:expense,month:month}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refresh();
      }
    });
  }


}

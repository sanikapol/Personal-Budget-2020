import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { DataService } from '../services/data.service';



@Component({
  selector: 'pb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //IsWait = true;
  constructor(private dataService: DataService,private router: Router) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData(){
    //var label = document.getElementById('myLabel');
    this.dataService.getBudgetData()
    .subscribe((res: any) => {
      // console.log("Budget:");
      //console.log(res);
      if(res.length == 0){
        this.router.navigate(['/configurebudget']);
      }
      else{
        for (var i = 0; i < res.length; i++){
          this.dataService.dataSource.datasets[0].data[i] = res[i].total;
          this.dataService.dataSource.labels[i] = res[i]._id;
        }
        //console.log(this.dataSource);
        this.createBudgetChart();

        this.dataService.getExpenses()
        .subscribe((res: any) => {
          // console.log("Expenses");
          // console.log(res);
          if(res.length == 0){
            this.router.navigate(['/configurebudget']);
          }
          else{
            for (var i = 0; i < res.length; i++){
              this.dataService.dataSourceBar.datasets[0].data[i] = res[i].total;
              this.dataService.dataSourceBar.labels[i] = res[i]._id;
            }
            this.createExpensesChart();

            this.dataService.getBudgetAnDExpenses()
            .subscribe((res: any) => {
              //console.log(res);
              // console.log(res.length);
              if(res.length == 0){
                this.router.navigate(['/configurebudget'])
              }else{
                for (var i = 0; i < res.length; i++){
                  this.dataService.dataSourceLine.datasets[0].data[i] = res[i].totalBudget;
                  this.dataService.dataSourceLine.datasets[1].data[i] = res[i].totalExpense;
                  this.dataService.dataSourceLine.labels[i] = res[i]._id;
                }
                //console.log(this.dataService.dataSourceLine);
                this.createBudgetVsExpensesChart();
                //this.IsWait = false;
              }

            });
          }

        });
      }

    });





  }


  createBudgetChart() {
    var ctx = document.getElementById('myBudgetChart');
    new Chart(ctx, {
        type: 'doughnut',
        data: this.dataService.dataSource,
    });
  }

  createExpensesChart() {
    var ctx = document.getElementById('myExpensesChart');
    new Chart(ctx, {
        type: 'bar',
        data: this.dataService.dataSourceBar,
    });
  }

  createBudgetVsExpensesChart() {
    var ctx = document.getElementById('myBudgetVsExpensesChart');
    new Chart(ctx, {
        type: 'line',
        data: this.dataService.dataSourceLine,
    });
  }

}

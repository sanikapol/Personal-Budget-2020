import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData(){
    await this.dataService.getBudgetData();
    this.createBudgetChart();
    await this.dataService.getExpenses();
    this.createExpensesChart();
    await this.dataService.getBudgetAnDExpenses();
    this.createBudgetVsExpensesChart();
  }

  createBudgetChart() {
    var ctx = document.getElementById('myBudgetChart');
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: this.dataService.dataSource,
    });
  }

  createExpensesChart() {
    var ctx = document.getElementById('myExpensesChart');
    var myPieChart = new Chart(ctx, {
        type: 'bar',
        data: this.dataService.dataSourceBar,
    });
  }

  createBudgetVsExpensesChart() {
    var ctx = document.getElementById('myBudgetVsExpensesChart');
    var myPieChart = new Chart(ctx, {
        type: 'line',
        data: this.dataService.dataSourceLine,
    });
  }

}

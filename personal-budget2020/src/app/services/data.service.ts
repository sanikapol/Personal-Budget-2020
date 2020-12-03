import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public dataSource = {
    datasets:[
        {
            //data: [380,90,100,50],
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#99ff33',
                '#ff9900',
                '#00ffcc',
                '#99ff99',
                '#cc66ff',
                '#cc6699',
                '#3366cc',
                '#660066',
            ],
        }
    ],
    //labels: ['Rent','Eat Out','Groceries','Movies']
    labels: []
  };

  public dataSourceBar = {
    datasets: [
      {
        data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#99ff33',
                '#ff9900',
                '#00ffcc',
                '#99ff99',
                '#cc66ff',
                '#cc6699',
                '#3366cc',
                '#660066',
            ],
      }
    ],
    labels: []
  }

  public dataSourceLine = {
    datasets: [
      {
        label: "Budget",
        data: [],
        backgroundColor: 'rgb(90, 255, 132)',
        borderColor: 'rgb(90, 255, 132)',
        fill: false,
      },
      {
        label: "Spent",
        data: [],
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
      }
    ],
    labels: []
  }

  constructor(private http: HttpClient, public UserService:UserService) { }

  getBudgetData(){
    console.log(this.UserService.user.username);
    const url = 'http://localhost:3000/budget/' + this.UserService.user.username;

    this.http.get(url)
    .subscribe((res: any) => {
      console.log("Budget: " + res);
      // console.log(res.length);
      for (var i = 0; i < res.length; i++){
        this.dataSource.datasets[0].data[i] = res[i].total;
        this.dataSource.labels[i] = res[i]._id;
      }
      console.log(this.dataSource);
    });
  }

  getExpenses(){
    const url = 'http://localhost:3000/expenses/' + this.UserService.user.username;
    this.http.get(url)
    .subscribe((res: any) => {
      console.log("Expenses: " + res);
      // console.log(res.length);
      for (var i = 0; i < res.length; i++){
        this.dataSourceBar.datasets[0].data[i] = res[i].total;
        this.dataSourceBar.labels[i] = res[i]._id;
      }
      console.log(this.dataSource);
    });
  }

  getBudgetAnDExpenses(){
    const url = 'http://localhost:3000/budget-expenses/' + this.UserService.user.username + "/Movies";
    this.http.get(url)
    .subscribe((res: any) => {
      console.log("budget-expenses: " + res);
      // console.log(res.length);
      for (var i = 0; i < res.length; i++){
        this.dataSourceLine.datasets[0].data[i] = res[i].totalBudget;
        this.dataSourceLine.datasets[1].data[i] = res[i].totalExpense;
        this.dataSourceLine.labels[i] = res[i]._id;
      }
      console.log(this.dataSource);
    });
  }


}

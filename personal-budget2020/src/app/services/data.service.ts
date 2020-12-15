import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public dataSource = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132,1.0)',
          'rgba(54, 162, 235, 1.0)',
          'rgba(255, 206, 86, 1.0)',
          'rgba(75, 192, 192, 1.0)',
          'rgba(153, 102, 255, 1.0)',
          'rgba(140, 159, 86, 1.0)',
          'rgba(78, 103, 4, 1.0)',
          'rgba(250, 167, 118, 1.0)',
          'rgba(123, 45, 100, 1.0)',
          'rgba(90, 34, 56, 1.0)',
          'rgba(100, 10, 10, 1.0)',
        ],
    }]
}

  public dataSourceBar = {
    labels: [],
    datasets: [{
        label: "Expenses",
        data: [],
        backgroundColor: [
            'rgba(255, 99, 132,1.0)',
            'rgba(54, 162, 235, 1.0)',
            'rgba(255, 206, 86, 1.0)',
            'rgba(75, 192, 192, 1.0)',
            'rgba(153, 102, 255, 1.0)',
            'rgba(140, 159, 86, 1.0)',
            'rgba(78, 103, 4, 1.0)',
            'rgba(250, 167, 118, 1.0)',
            'rgba(123, 45, 100, 1.0)',
            'rgba(90, 34, 56, 1.0)',
            'rgba(100, 10, 10, 1.0)',
        ],
    }]
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


  public row = {
    id:'',
    title: '',
    budget: '',
    expense: '',
    month: '',
  }

  constructor(private http: HttpClient,private snackBar: MatSnackBar) { }


  getBudgetData(){
    const url = 'http://localhost:3000/budget/';
    return this.http.get(url);
  }

  getExpenses(){
    const url = 'http://localhost:3000/expenses/';
    return this.http.get(url);
  }


  getBudgetAnDExpenses(){
    const url = 'http://localhost:3000/budget-expenses/';
    return this.http.get(url);
  }

  getTableData(){
    const url = 'http://localhost:3000/tabledata/';
    return this.http.get(url);
  }

  addBudget(payload){
    return this.http.post(`http://localhost:3000/addbudget/`, payload)
    .subscribe((res:any) =>{
      console.log(res);
    })
  }

  deleteBudget(id){
    const url = 'http://localhost:3000/deletebudget/' +  id;
    return this.http.delete(url)
    .subscribe((res:any) =>{
      console.log(res);
    })
  }

  updateBudget(id,payload){
    console.log(payload);
    const url = 'http://localhost:3000/editbudget/' +  id;
    console.log(url);
    return this.http.put(url,payload)
    .subscribe((res:any) =>{
      console.log(res);
    })
  }

}

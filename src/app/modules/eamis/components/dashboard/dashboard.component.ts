import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Weather:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.http.get('https://localhost:44350/WeatherForecast').subscribe(response => 
    { 
      this.Weather = response; 
   },error =>{
 console.log(error)
   });
  }

}

import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Chart } from 'chart.js';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  chart = []

  constructor(private _weather: WeatherService){}

  ngOnInit(){
    this._weather.getForecast().subscribe(res =>{
      let data = res['_body'];
      let temp = JSON.parse(data);
      let temp_max = temp['list'].map(res => res.main.temp_max)
      let temp_min = temp['list'].map(res => res.main.temp_min)
      let allDates = temp['list'].map(res => res.dt)

      let weatherDates:any= []
      allDates.forEach(res=>{
        let jsDate = new Date(res * 1000)
        weatherDates.push(jsDate)
      })
      console.log(weatherDates)
      //chart data
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: weatherDates,
          datasets: [
            { 
              data: temp_max,
              borderColor: "#3cba9f",
              fill: false
            },
            { 
              data: temp_min,
              borderColor: "#ffcc00",
              fill: false
            },
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });

  }  
}

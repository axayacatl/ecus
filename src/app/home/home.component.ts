import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { CurrencyService } from '../services/currency.service';
import * as moment from 'moment'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public chart: any;
  public start_date: any;
  public end_date: any;
  public day_diff: any;
  public values: any[] = [];

  constructor(private _currencyService: CurrencyService) { }

  ngOnInit() {
    this.getData();
  }

  getData(start_date = undefined, end_date = undefined) {
    this.values = [];
    this._currencyService.getDateRange(start_date, end_date).subscribe(data => {
      console.log(data.results.USD_MXN.val);
      let dd = data.results.USD_MXN.val;
      for(let date in dd) {
	console.log('Fecha ' + date +': ', dd[date]);
	this.values.push(dd[date]);
      }
      console.log('Valores: ', this.values);
      this.drawChart();
    });
  }

  setDates(){
    let start_date = moment(this.start_date).format("YYYY-MM-DD");
    let end_date = moment(this.end_date).format("YYYY-MM-DD");

    this.day_diff = new Date(this.end_date - this.start_date).getDate();

    if(moment(this.end_date).subtract(7,'days') > this.start_date){
      alert('Solo es posible consultar un rango de 8 días');
      return;
    }

    this.getData(start_date, end_date);
  }

  drawChart(){
    this.chart = new Chart({
      chart: {
        type: 'area'
      },
      title: {
        text: 'Tipo de cambio - USD a MXN'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'MXN',
          data: this.values
        }
      ]
    });
  }
}

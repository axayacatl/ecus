import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _currencyService: CurrencyService) { }

  ngOnInit(){
    this.getData();
  }
 
  title = 'ecus';

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      }
    ]
  });

  getData(){
    this._currencyService.getDateRange().subscribe(data => {
      console.log(data);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public chart: any;
  constructor(private _currencyService: CurrencyService) { }

  ngOnInit() {
    this.chart = new Chart({
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
    this.getData();
  }

  getData() {
    this._currencyService.getDateRange().subscribe(data => {
      console.log(data);
    });
  }

  // add point to chart serie
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }
}

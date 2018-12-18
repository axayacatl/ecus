import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  endpoint: string = 'https://free.currencyconverterapi.com/api/v6/convert';

  constructor(private _httpClient: HttpClient) { }

  getDateRange( start_date = moment().subtract(7, 'days').format('YYYY-MM-DD'),
		end_date = moment().format('YYYY-MM-DD'),
		currencies = 'USD_MXN'){ 

    let params = new HttpParams().set('date', start_date.toString())
				 .set('endDate', end_date.toString())
				 .set('q', currencies);
    return this._httpClient.get(this.endpoint, { params });
  }

}

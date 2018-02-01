import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class WeatherService {
  

  body = {}

  headers = new Headers({ 'Access-Control-Allow-Origin': '*' });

  options = new RequestOptions({ headers: this.headers });

  urlWeather = "http://samples.openweathermap.org/data/2.5/history/city?id=2885679&type=hour&appid=b1b15e88fa797225412429c1c50c122a1"

  constructor(private _http: Http) { }

  getForecast(){
    return this._http.get(this.urlWeather)
      .map(result => result)
      
  }
}

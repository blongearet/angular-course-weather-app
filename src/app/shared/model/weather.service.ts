import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import { IOpenWeatherMapOneCallResponse } from './openweathermap'
import { Weather } from './weather'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // The BehavioSubject will store the Weather instance into memory and allows us to emit new values
  private _weather: BehaviorSubject<Weather> = new BehaviorSubject<Weather>(null)
  // The Observable is just a limited version of BehaviorSubject to expose to public
  private weather$: Observable<Weather> = this._weather.asObservable()

  constructor(private http: HttpClient) { }

  /**
   * Returns the observable of weather
   */
  public getWeather$(): Observable<Weather> {
    return this.weather$
  }

  /**
   * Returns the observable of weather when fetch request is done
   */
  public fetchAndGetWeather$(lat: number, lon: number): Observable<Weather> {
    let apiKey = environment.openweathermapKey
    let apiEndpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`
    return this.http.get<IOpenWeatherMapOneCallResponse>(apiEndpoint).pipe(
      map(response => new Weather(response)),
      tap(weather => this._weather.next(weather)),
      switchMap(() => this.getWeather$())
    )
  }
}

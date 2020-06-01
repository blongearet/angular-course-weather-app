import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Weather } from '../shared/model/weather'
import { WeatherService } from '../shared/model/weather.service'

export interface IWeatherComponentTitle {
  date: string
  weather: string
}

export interface IWeatherComponentTemperatures {
  weatherIconUrl: string
  temperature: number
}

export interface IWeatherComponentStats {
  clouds: number
  humidity: number
  wind: number
}

export interface IWeatherComponentDaily {
  time: string
  min: number
  max: number
  weatherIconUrl: string
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  public weather$: Observable<Weather>
  public weatherTitle$: Observable<IWeatherComponentTitle>
  public weatherTemperatures$: Observable<IWeatherComponentTemperatures>
  public weatherStats$: Observable<IWeatherComponentStats>
  public weatherDaily$: Observable<IWeatherComponentDaily[]>

  constructor(private weather: WeatherService) {
    this.weather$ = this.weather.fetchAndGetWeather$(43.7190656,4.3057152)

    this.weatherTitle$ = this.weather$.pipe(
      map(weather => ({
        date: `${weather.getCurrentTime().format('dddd HH')}:00`,
        weather: weather.getCurrentWeather().description
      }))
    )

    this.weatherTemperatures$ = this.weather$.pipe(
      map(weather => ({
        weatherIconUrl: `http://openweathermap.org/img/wn/${weather.getCurrentWeather().icon}@2x.png`,
        temperature: weather.getCurrentTemperature()
      }))
    )

    this.weatherStats$ = this.weather$.pipe(
      map(weather => ({
        clouds: weather.getCurrentClouds(),
        humidity: weather.getCurrentHumidity(),
        wind: weather.getCurrentWind()
      }))
    )

    this.weatherDaily$ = this.weather$.pipe(
      map(weather => {
        let daily = weather.getDailySummary(8)
        return daily.map(day => ({
          time: day.time.format('ddd'),
          min: Math.round(day.temp.min),
          max: Math.round(day.temp.max),
          weatherIconUrl: `http://openweathermap.org/img/wn/${day.weather.icon}@2x.png`
        }))
      })
    )
  }

  ngOnInit(): void {
  }

}

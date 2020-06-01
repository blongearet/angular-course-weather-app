import { IOpenWeatherMapOneCallResponse, IOpenWeatherMapOneCallWeatherResponse } from './openweathermap'
import * as moment from 'moment'

export interface IWeatherDailySummary {
  time: moment.Moment
  temp: {
    min: number
    max: number
  }
  weather: IOpenWeatherMapOneCallWeatherResponse
}

export class Weather {
  public rawResponse: IOpenWeatherMapOneCallResponse

  constructor(data: IOpenWeatherMapOneCallResponse) {
    this.rawResponse = data
  }

  public getCurrentTime(): moment.Moment {
    return moment.unix(this.rawResponse.current.dt)
  }

  public getCurrentWeather(): IOpenWeatherMapOneCallWeatherResponse {
    return this.rawResponse.current.weather[0]
  }

  public getCurrentTemperature(): number {
    return this.rawResponse.current.temp
  }

  public getCurrentClouds(): number {
    return this.rawResponse.current.clouds
  }

  public getCurrentHumidity(): number {
    return this.rawResponse.current.humidity
  }

  public getCurrentWind(): number {
    return this.rawResponse.current.wind_speed
  }

  public getDailySummary(numOfDays: number): IWeatherDailySummary[] {
    return this.rawResponse.daily
      .map(daily => ({
        time: moment.unix(daily.dt),
        temp: {
          min: daily.temp.min,
          max: daily.temp.max
        },
        weather: daily.weather[0]
      }))
      .slice(0, numOfDays)
  }
}

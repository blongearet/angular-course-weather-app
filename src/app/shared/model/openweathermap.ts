// Based on https://openweathermap.org/api/one-call-api
export interface IOpenWeatherMapOneCallWeatherResponse {
  id: number
  main: string
  description: string
  icon: string
}

export interface IOpenWeatherMapOneCallDailyResponse {
  dt: number
  sunrise: number
  sunset: number
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  feels_like: {
    day: number
    night: number
    eve: number
    morn: number
  }
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  weather: IOpenWeatherMapOneCallWeatherResponse[]
  clouds: number
  rain?: number
  uvi: number
}

export interface IOpenWeatherMapOneCallResponse {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: {
    dt: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    weather: IOpenWeatherMapOneCallWeatherResponse[]
    rain: {
      "1h": number
    }
  }
  hourly: any
  daily: IOpenWeatherMapOneCallDailyResponse[]
}

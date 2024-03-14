function getExtremeWeatherIdeals(temperature, weather_id) {
    let extreme_weather = "None";

    if (temperature > 35) {
        extreme_weather = "Heatwave"
    }
    if (temperature < -10) {
        extreme_weather = "Extreme Cold"
    }
    if (weather_id >= 210 && weather_id <= 232) {
        extreme_weather = "Thunderstorm"
    }
    if (weather_id == 622 || weather_id == 602) {
        extreme_weather = "Snowstorm"
    }
    if (weather_id == 781) {
        extreme_weather = "Tornado"
    }
    if (weather_id == 711) {
        extreme_weather = "Smoke"
    }
    if (weather_id == 731) {
        extreme_weather = "Dust"
    }
    if (weather_id == 762) {
        extreme_weather = "Ash"
    }

    return extreme_weather
}
export {getExtremeWeatherIdeals};
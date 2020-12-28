import celsius from "../img/celsius.svg";
import clock from "../img/clock.svg";
import compass from "../img/compass.svg";
import wind from "../img/wind.svg";
import { formatTime, formatTemperature } from "./handler";

export class Today {
  constructor({ name, sys, main, dt, wind, weather }) {
    this.mainSection = document.querySelector("#mainSection");
    this.city = name;
    this.state = sys.country;
    this.temp = formatTemperature(main.temp);
    this.tempFeelsLike = formatTemperature(main.feels_like);
    this.time = formatTime(dt);
    this.windDeg = wind.deg;
    this.windSpeed = wind.speed;
    this.weather = weather[0].icon;
    this.render();
  }

  getSrc = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

  showWindDeg = (windDeg) => {
    let text = "";
    if (windDeg > 0 && windDeg <= 45) {
      text = "North";
    } else if (windDeg > 45 && windDeg <= 135) {
      text = "East";
    } else if (windDeg > 135 && windDeg <= 225) {
      text = "South";
    } else if (windDeg > 225 && windDeg <= 315) {
      text = "West";
    } else {
      text = "North";
    }
    return text;
  };

  render() {
    let today = `
        <div class="today">
            <div class="today__block">
                <h2 class="today__city">${this.city}</h2>
                <h2 class="today__city">${this.state}</h2>
            </div>
            <div class="today__time">
                <img class="today__time-img" src="${clock}" alt="not found">
                <time class="today__time-number">${this.time}</time>
            </div>
            <div class="today__weather">
                <img class="today__weather-img" src=${this.getSrc(this.weather)}
                alt="not found">
                    <div class="today__temperature">
                        <p class="today__temperature-number">${this.temp}</p>
                        <img class="today__temperature-img" src="${celsius}" alt="not found">
                    </div>
                    <div class="today__temperature">
                        <p class="today__temperature-number today__temperature-number--size">Feels like ${
                          this.tempFeelsLike
                        }</p>
                        <img class="today__temperature-img today__temperature-img--size" src="${celsius}" alt="not found">
                    </div>
            </div>
            <div class="today__options">
                <div class="today__options-coordinate">
                    <img class="today__options-img" style="transform:rotate(${
                      this.windDeg - 180
                    }deg)"
                    src="${compass}" alt="not found">
                    <p class="today__options-value">${this.showWindDeg(
                      this.windDeg
                    )}</p>
                </div>
                <div class="today__options">
                    <img class="today__options-img" src="${wind}" alt="not found">
                    <p class="today__options-value">${this.windSpeed} m/s</p>
                </div>
            </div>
        </div>
      `;
    this.mainSection.innerHTML = this.mainSection.innerHTML + today;
  }
}

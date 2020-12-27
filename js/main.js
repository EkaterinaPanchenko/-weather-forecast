import clock from "../img/clock.svg";
import celsius from "../img/celsius.svg";
import compass from "../img/compass.svg";
import wind from "../img/wind.svg";

function fetchData(url, method) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = () => {
      // как только Request(перев. запрос) подгрузился, делаем ...
      if (xhr.status == "200") {
        resolve(xhr.response); //вызываем resolve, (.response) - ответ от сервера
      } else {
        reject(xhr.status);
      }
    };
    xhr.onerror = () => {
      console.error("Error: " + xhr.status + " " + xhr.statusText);
    };
    xhr.send(); // (.send) отправить на сервер
  });
  return promise;
}

const key = "03fb54ebf904aeecf7fbb0e169f0c7ad";
const urlWether = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${key}`;
const urlWether5 = `https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=${key}`;

class Today {
  constructor({ name, sys, main, dt, wind, weather }) {
    this.mainSection = document.querySelector("#mainSection");
    this.city = name;
    this.state = sys.country;
    this.temp = Math.round(main.temp - 273.15);
    this.tempFeelsLike = Math.round(main.feels_like - 273.15);
    this.time = `${new Date(dt * 1000).getHours()}:${
      new Date(dt * 1000).getMinutes() > 9
        ? new Date(dt * 1000).getMinutes()
        : `0${new Date(dt * 1000).getMinutes()}`
    }`;
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

fetchData(
  `https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${key}`,
  "GET"
).then((response) => {
  const data = JSON.parse(response);
  new Today(data);
});

class NextDays {
  constructor({ list }) {
    this.section = document.querySelector("#section");
    this.list = list;
    this.months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    this.render();
  }

  getSrc = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

  getMonth = (index) => this.months[index - 1];

  getTemp = (temp) => Math.round(temp - 273.15);

  getTime = (date) =>
    `${new Date(date * 1000).getHours()}:${
      new Date(date * 1000).getMinutes() > 9
        ? new Date(date * 1000).getMinutes()
        : `0${new Date(date * 1000).getMinutes()}`
    }`;

  getDay = (date) => date.split(" ")[0].split("-");

  render() {
    this.list.forEach(({ main, dt, dt_txt, weather }, index) => {
      const [temp, time, day, icon] = [
        this.getTemp(main.temp),
        this.getTime(dt),
        this.getDay(dt_txt),
        weather[0].icon,
      ];
      if (index % 8 === 0) {
        let nextDay = `
          <div class="next-days">
              <div class="next-days__container">
                  <div class="next-days__time">
                      <p class="next-days__time-day">${day[2]}</p>
                      <p class="next-days__time-month">${this.getMonth(
                        day[1]
                      )}</p>
                      <p class="next-days__time-clock">${time}</p>
                  </div>
                  <div class="next-days__img">
                      <img src=${this.getSrc(icon)} alt="not found">
                  </div>
                  <div class="next-days__temperature">
                      <p class="next-days__temperature-number">${temp}</p>
                      <img class="next-days__temperature-img" src="${celsius}" alt="not found">
                  </div>
              </div>
          </div>
        `;
        this.section.innerHTML = this.section.innerHTML + nextDay;
      }
    });
  }
}

fetchData(
  `https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=${key}`,
  "GET"
).then((response) => {
  const data = JSON.parse(response);
  new NextDays(data);
});

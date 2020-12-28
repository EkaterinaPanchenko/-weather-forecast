import celsius from "../img/celsius.svg";
import { formatTime, formatTemperature } from "./handler";

export class NextDays {
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

  getDay = (date) => date.split(" ")[0].split("-");

  render() {
    this.list.forEach(({ main, dt, dt_txt, weather }, index) => {
      const [temp, time, day, icon] = [
        formatTemperature(main.temp),
        formatTime(dt),
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

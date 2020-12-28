import { Today } from "./TodayComponent";
import { NextDays } from "./NextDaysComponent";
import { fetchData } from "./handler";
import { urlWether, urlWether5 } from "./config";

fetchData(urlWether, "GET").then((response) => {
  const data = JSON.parse(response);
  new Today(data);
});

fetchData(urlWether5, "GET").then((response) => {
  const data = JSON.parse(response);
  new NextDays(data);
});

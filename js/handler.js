export const fetchData = (url, method) => {
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
};

export const formatTime = (date) =>
  `${new Date(date * 1000).getHours()}:${
    new Date(date * 1000).getMinutes() > 9
      ? new Date(date * 1000).getMinutes()
      : `0${new Date(date * 1000).getMinutes()}`
  }`;

export const formatTemperature = (temp) => Math.round(temp - 273.15);

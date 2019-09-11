import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import getPosition from './js/getGeoPosition';
import fetchWeather from './js/fetchWeather';
import defs from './js/defs';
import wederTpl from './template/weather.hbs';
import 'pnotify/dist/PNotifyBrightTheme.css';
import './css/styles.css';

window.onload = () => {
  defs.bodyPreloder.style.display = 'none';
};

function drowwether(data) {
  defs.searchForm.reset();
  if (data.error) {
    defs.preloder.style.display = 'none';
    return PNotify.notice({
      title: `Notice  ${data.error.type}`,
      text: data.error.info,
    });
  }
  const htmlData = wederTpl(data);
  defs.weather.innerHTML = htmlData;
  defs.preloder.style.display = 'none';
  return true;
}

defs.searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  defs.preloder.style.display = 'flex';
  fetchWeather(event.target.elements.city.value)
    .then((data) => {
      drowwether(data);
    })
    .catch((err) => {
      defs.preloder.style.display = 'none';
      PNotify.error({
        title: err.message,
        text: err.stack,
        delay: 3500,
      });
    });
});
getPosition()
  .then(({ coords }) => {
    PNotify.success({
      title: 'geolocation',
      text: 'We have successfully received the geolocation',
      icons: 'brighttheme',
      delay: 3500,
    });
    fetchWeather(`${coords.latitude} ${coords.longitude}`)
      .then((data) => {
        drowwether(data);
      })
      .catch((err) => {
        defs.preloder.style.display = 'none';
        PNotify.error({
          title: err.message,
          text: err.stack,
        });
      });
  })
  .catch((error) => {
    defs.preloder.style.display = 'none';
    PNotify.notice({
      title: 'Notice Location',
      text: error.message,
      delay: 3500,
    });
  });

import defs from './defs';

export default function () {
  defs.preloder.style.display = 'flex';
  return new Promise((remove, reject) => {
    navigator.geolocation.getCurrentPosition(remove, reject, {
      maximumAge: 30000,
    });
  });
}

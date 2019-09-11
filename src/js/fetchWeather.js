export default function (query) {
  const params = {
    base: 'http://api.weatherstack.com/current',
    access_key: 'ff06c010f687a22c4f327a933864bf9c',
    query,
  };

  return fetch(
    `${params.base}?access_key=${params.access_key}&query=${params.query}&units=m`,
  ).then((response) => {
    if (response.ok) return response.json();
    throw new Error(`Error while fetching: ${response.statusText}`);
  });
}

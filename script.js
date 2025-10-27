mapboxgl.accessToken = 'pk.eyJ1IjoiYWxvbmRyYXpvIiwiYSI6ImNtaDlja21mejBuNGQyb29vMnltMW9uNWcifQ.YTHG2RY451FEBeMrdhAD2Q';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/alondrazo/cmh9cos1300at01sq7cz9a7w5', // your Style URL goes here
  center: [-122.27, 37.87], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9 // starting zoom
    });
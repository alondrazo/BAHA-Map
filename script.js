mapboxgl.accessToken = 'pk.eyJ1IjoiYWxvbmRyYXpvIiwiYSI6ImNtaDlja21mejBuNGQyb29vMnltMW9uNWcifQ.YTHG2RY451FEBeMrdhAD2Q';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/alondrazo/cmh9cos1300at01sq7cz9a7w5', // your Style URL goes here
  center: [-122.27, 37.87], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
  projection: 'mercator'
    });

// Add a scale control to the map
const scale = new mapboxgl.ScaleControl({
  maxWidth: 150,      // width of the scale bar in pixels
  unit: 'imperial'      // options: 'imperial', 'metric', or 'nautical'
});
map.addControl(scale, 'bottom-left'); // position options: 'top-left', 'top-right', 'bottom-left', 'bottom-right'

map.on('load', function() {
  map.addSource('points-data',{
    type:'geojson',
    data:'https://raw.githubusercontent.com/alondrazo/BAHA-Map/refs/heads/main/data/183data.geojson'
    });

    map.addLayer({
      id: 'points-layer',
      type: 'circle',
      source: 'points-data',
      paint: {
          'circle-color': '#4264FB',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
      }
  });

  map.on('click', 'points-layer', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const properties = e.features[0].properties;
    const popupContent = `
            <div>
                <h3>${properties.Landmark}</h3>
                <p><strong>Address:</strong> ${properties.Address}</p>
                <p><strong>Architect & Date:</strong> ${properties.Architect_Date}</p>
                <p><strong>Designated:</strong> ${properties.Designated}</p>
                ${properties.Link ? `<p><a href="${properties.Link}" target="_blank">More Information</a></p>` : ''}
                ${properties.Notes ? `<p><strong>Notes:</strong> ${properties.Notes}</p>` : ''}
            </div>
        `;

        new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: true,
          offset: [10, 0], // horizontal offset
          anchor: 'left'   // force popup to appear to the right/left/top/bottom of the point
          })
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);

  });

  // Change cursor to pointer when hovering over points
  map.on('mouseenter', 'points-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
});

// Change cursor back when leaving points
map.on('mouseleave', 'points-layer', () => {
    map.getCanvas().style.cursor = '';
});

});

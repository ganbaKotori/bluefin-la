var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider(); //variable for search bar with suggestions
var searchControl = L.esri.Geocoding.geosearch({
  providers: [
    arcgisOnline,
    L.esri.Geocoding.mapServiceProvider({
      label: "States and Counties",
      url:
        "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
      layers: [2, 3],
      searchFields: ["NAME", "STATE_NAME"],
    }),
  ],
  position: "topright",
  expanded: true,
  collapseAfterResult: false,
  useMapBounds: 20,
}).addTo(map); //add search bar to map
var results = L.layerGroup().addTo(map);
searchControl.on("results", function (data) {
  results.clearLayers();
  for (var i = data.results.length - 1; i >= 0; i--) {
    console.log(results);
    results.addLayer(L.marker(data.results[i].latlng));
  }
});

$(document).ready(function () {
  $(".alert3").hide();
})

L.control
  .zoom({
    position: "topleft",
  })
  .addTo(map);

L.control
  .custom({
    position: "bottomleft",
    content:
      '<div class="alert3">' +
      '<div class="alert2 d-flex align-items-center">' +
      '<strong class="loading-text">Loading...</strong>' +
      '<div class="spinner-grow text-light" role="status">' +
      '<span class="visually-hidden"></span>' +
      "</div>" +
      "</div>" +
      "</div>",
    style: {
      margin: "5px",
      padding: "0px 0 0 0",
      cursor: "pointer",
    },
    events: {
      click: function (data) {
      },

      contextmenu: function (data) {
      },
    },
  })
  .addTo(map);


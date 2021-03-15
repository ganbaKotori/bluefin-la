var schoolLayerGroup = L.layerGroup();
function addSchoolMarkers(data) {
  for (var key in data) {
    console.log(data[key])
    var marker = new L.circleMarker([data[key].geometry.y, data[key].geometry.x], {
        radius: 5,
        color: "#F0F0F0",
        stroke: true,
        fill: true,
        fillColor: "blue",
        fillOpacity: 1,
      }).bindPopup(
        "<table class='table table-bordered table-striped table-hover'>" +
          "<tr><th>Name</th><th>" +
          data[key].attributes.FULLNAME +
          "</th><tr>" +
          "<tr><th>Address</th><th>" +
          data[key].attributes.ADDRESS +
          "</th><tr>" +
          "<tr><th>City</th><th>" +
          data[key].attributes.CITY +
          "</th><tr>" +
          "<tr><th>Description</th><th>" +
          data[key].attributes.MPD_DESC +
          "</th><tr>" +
          "</table>"
      );

      schoolLayerGroup.addLayer(marker);
  }
  schoolLayerGroup.addTo(map);
}

function customTip(average2, pop) {
    
  pop.unbindTooltip();
  if (!pop.isPopupOpen()){
    
    pop.bindTooltip("$" + Math.ceil(average2)).openTooltip();
  }
    
}

function getSchools(obj) {
  if ($(obj).is(":checked")) {
    $(".alert3").toggle();
    var latlng = map.getBounds();
    $.ajax({
    url: "https://maps.lacity.org/lahub/rest/services/LAUSD_Schools/MapServer/0/query?where=1%3D1&outFields=*&geometry=" +
    latlng._southWest.lng +
    "," +
    latlng._southWest.lat +
    "," +
    latlng._northEast.lng +
    "," +
    latlng._northEast.lat + "&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json",
      type: "GET",
      data: {},
    }).done(function (data) {
      console.log(data);
      addSchoolMarkers(data.features);
      $(".alert3").hide();
    });
  } else {
    schoolLayerGroup.eachLayer((layer) => {
      layer.remove();
    });
  }
}

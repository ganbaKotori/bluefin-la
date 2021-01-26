var layerGroup = L.layerGroup();
function addHouseholdMarkers(data) {
  for (var key in data) {
    var count = 0;
    var sum = 0;

    const incomes = (({
      B19013Ae1,
      B19013Be1,
      B19013Ce1,
      B19013De1,
      B19013Ee1,
      B19013Fe1,
      B19013Ge1,
      B19013He1,
      B19013Ie1,
      B19013e1,
    }) => ({
      B19013Ae1,
      B19013Be1,
      B19013Ce1,
      B19013De1,
      B19013Ee1,
      B19013Fe1,
      B19013Ge1,
      B19013He1,
      B19013Ie1,
      B19013e1,
    }))(data[key].attributes);

    //console.log(incomes)
    for (const [key, value] of Object.entries(incomes)) {
      console.log(`${key}: ${value}`);
      if (value != 0) {
        count += 1;
        sum += value;
      }
    }
    console.log(count);
    console.log(sum);
    let average = sum / count;

    var color;
    if (average > 120000) {
      color = "purple";
    } else if (average > 100000) {
      color = "green";
    } else if (average > 50000) {
      color = "yellow";
    } else if (average > 30000) {
      color = "orange";
    } else if (Number.isNaN(average)) {
      color = "gray";
    } else color = "red";

    var latLngs = data[key].geometry.rings[0];
    reversedLatLngs = [];
    for (var index in latLngs) {
      reversedLatLngs.push(latLngs[index].reverse());
    }

    var polygon = L.polygon(reversedLatLngs, { color: color, opacity: 1, weight: 2, fillOpacity: 0.3 }).on("mouseover", function(e) {
        var average2 = average
        customTip(average2,this);
      }).bindPopup("$" + Math.ceil(average))

    layerGroup.addLayer(polygon);
  }
  layerGroup.addTo(map);
}

function customTip(average2, pop) {
    
  pop.unbindTooltip();
  if (!pop.isPopupOpen()){
    
    pop.bindTooltip("$" + Math.ceil(average2)).openTooltip();
  }
    
}

function getHouseholdIncome(obj) {
  if ($(obj).is(":checked")) {
    $(".alert3").toggle();
    var latlng = map.getBounds();
    $.ajax({
      url:
        "https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/Demographics/MapServer/12/query?where=1%3D1&outFields=*&geometry=" +
        latlng._southWest.lng +
        "," +
        latlng._southWest.lat +
        "," +
        latlng._northEast.lng +
        "," +
        latlng._northEast.lat +
        "&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json",
      type: "GET",
      data: {},
    }).done(function (data) {
      console.log(data);
      addHouseholdMarkers(data.features);
      $(".alert3").hide();
    });
  } else {
    //map.removeLayer(layerGroup)
    layerGroup.eachLayer((layer) => {
      layer.remove();
    });
  }
}

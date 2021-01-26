var layerGroup3 = L.layerGroup();
var ctx = document.getElementById("myChart2").getContext("2d");
var myPieChart;
function addDemographicMarkers(data) {
  for (var key in data) {
    var latLngs = data[key].geometry.rings[0];
    reversedLatLngs = [];
    for (var index in latLngs) {
      reversedLatLngs.push(latLngs[index].reverse());
    }
    let demographicData = data[key].attributes;
    var polygon = L.polygon(reversedLatLngs, { color: "blue", fillOpacity: 0.1, weight: 2,  })
      .bindPopup("Demographic Info on Chart")
      .on("click", function (e) {
        var demographicData2 = demographicData;
        onClick(demographicData2);
      });
    layerGroup3.addLayer(polygon);
  }
  layerGroup3.addTo(map);
}

function getDemographic(obj) {
  if ($(obj).is(":checked")) {
    $(".alert3").toggle();
    var latlng = map.getBounds();
    $.ajax({
      url:
        "https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/Demographics/MapServer/11/query?where=1%3D1&outFields=*&geometry=" +
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
      addDemographicMarkers(data.features);
      $(".alert3").hide();
    });
  } else {
    layerGroup3.eachLayer((layer) => {
      layer.remove();
    });
  }
}

function onClick(demographicData) {
  console.log(
    demographicData.wht18,
    demographicData.blk18,
    demographicData.lat18,
    demographicData.asn18,
    demographicData.nat18,
    demographicData.pac18
  );
  if (myPieChart) {
    myPieChart.destroy();
  }
  var data = {
    labels: ["White", "Black", "Hispanic", "Asian", "Native", "Pacific"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          demographicData.wht18,
          demographicData.blk18,
          demographicData.lat18,
          demographicData.asn18,
          demographicData.nat18,
          demographicData.pac18,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  myPieChart = new Chart(ctx, {
    type: "pie",
    data: data,
  });
}

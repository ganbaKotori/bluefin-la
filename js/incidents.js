var layerGroup2 = L.layerGroup(); 

function getIncidents(obj){
    if($(obj).is(":checked")){
        $(".alert3").toggle()
        $.ajax({
            url:
              "https://data.lacity.org/resource/63jg-8b9z.json?$where=date_occ%20between%20%272019-01-10T12:00:00%27%20and%20%272020-01-10T14:00:00%27",
            type: "GET",
            data: {
              $limit: 2500,
              $$app_token: "a2kvHD9X0ctQWM262zde4wxEz",
            },
          }).done(function (data) {
            //alert("Retrieved " + data.length + " records from the dataset!");
            console.log(data);
            addIncidentMarkers(data);
          });
      }else{
        //map.removeLayer(layerGroup)
        layerGroup2.eachLayer((layer) => {
            layer.remove();
          });
      }
}

function addIncidentMarkers(data) {
    for (var key in data) {
      var marker = new L.circleMarker([data[key].lat, data[key].lon], {
        radius: 5,
        color: "#F0F0F0",
        stroke: true,
        fill: true,
        fillColor: "#FF0000",
        fillOpacity: 1,
      }).bindPopup(
        "<table class='table table-bordered table-striped table-hover'>" +
          "<tr><th>area</th><th>" +
          data[key].area +
          "</th><tr>" +
          "<tr><th>area name</th><th>" +
          data[key].area_name +
          "</th><tr>" +
          "<tr><th>date_occ</th><th>" +
          data[key].date_occ +
          "</th><tr>" +
          "<tr><th>location</th><th>" +
          data[key].location +
          "</th><tr>" +
          "<tr><th>crm_cd_desc</th><th>" +
          data[key].crm_cd_desc +
          "</th><tr>" +
          "</table>"
      );
      layerGroup2.addLayer(marker);
      //map.addLayer(marker);
    }
    layerGroup2.addTo(map);
    $(".alert3").hide()
  }
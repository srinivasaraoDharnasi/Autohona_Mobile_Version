var watchID = null;
var geocoder;
var infowindow;
var town1, town2, sourcestore = '', destinationstore = '';
var directionsDisplay;
var directionsService;
var wsuccess = function(pos) {
	geocoder = new google.maps.Geocoder();
	infowindow = new google.maps.InfoWindow();
  //  var text = "<div>Latitude: " + pos.coords.latitude + 
  //              " <br/>" + "Longitude: " + pos.coords.longitude + "<br/>" + 
  //              "Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
  
	//alert(pos.coords.latitude);
    var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          map.setZoom(11);
          marker = new google.maps.Marker({
              position: latlng,
              map: map
          });
          $("#input_pac1").val(results[1].formatted_address);
		  localStorage.setItem("source",$(input_pac1).val());
		  if(localStorage.getItem("source")!=""){
		    localStorage.setItem("sourceCount",1);
		  }
          infowindow.setContent(results[1].formatted_address);
          infowindow.open(map, marker);
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
    
};
var wfail = function(error) {
    
};
var toggleWatchPosition = function() {

    var options = { frequency: 3000, maximumAge: 5000, timeout: 5000, enableHighAccuracy: true };
    watchID = navigator.geolocation.watchPosition(wsuccess, wfail, options);
};
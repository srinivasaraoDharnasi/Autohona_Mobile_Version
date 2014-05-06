 var map;
 var town1, town2, sourcestore = '', destinationstore = '';
 var directionsDisplay;
 var directionsService;
 var src;
 var dst;
 var currentLat;
 var currentLong;
 var infowindow;
 
$(document).ready(function() {
	
	$("#input_pac1").keydown(function(){
		localStorage.setItem("sourceCount",0);
	});
	
	$("#input_pac2").keydown(function(){
		localStorage.setItem("destCount",0);
	});
  
	directionsDisplay = new google.maps.DirectionsRenderer({
		polylineOptions: {
			strokeColor: "green",
			strokeOpacity: 0.8,
			strokeWeight: 4
	    }
	});
	infowindow = new google.maps.InfoWindow();
	var coordinates=[];
	var point={
		lattitude: 17.3660,
		longitude: 78.4760
	};
	coordinates.push(pointsPair(point.lattitude,point.longitude));
	function pointsPair(lattitude, longitude) {
		return {
			lattitude : lattitude,
			longitude : longitude
		};
	}
	var sample=coordinates[0];
	var myPoint=new google.maps.LatLng(coordinates[0].lattitude,coordinates[0].longitude);
	currentLat=coordinates[0].lattitude;
	currentLong=coordinates[0].longitude;
	var mapOptions = {
		zoom: 8,
		center: myPoint,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			position: google.maps.ControlPosition.BOTTOM_CENTER
		},
		zoomControl   : false,
		scaleControl  : false,
		panControl    : false,
		streetViewControl: false,
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	directionsDisplay.setMap(map);
	
	function placeMarker(location) {
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			icon:'images/auto.png'
		});
		var infowindow = new google.maps.InfoWindow({
			content: 'Latitude: ' + location.lat() +
			'<br>Longitude: ' + location.lng()
		});
		infowindow.open(map,marker);
	}

	var input = (document.getElementById('input_pac1'));
	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);
	google.maps.event.addListener(autocomplete,'place_changed',function() {
		var place = autocomplete.getPlace();
		var address = '';
		if (place.address_components) {
			address = [
				(place.address_components[0]
				&& place.address_components[0].short_name || ''),
				(place.address_components[1]
				&& place.address_components[1].short_name || ''),
				(place.address_components[2]
				&& place.address_components[2].short_name || '') ]
				.join(',');
		}
		
		localStorage.setItem("source",$(input).val());
		localStorage.setItem("sourceCount",1);
	});
	var input1 = (document.getElementById('input_pac2'));
	var autocomplete1 = new google.maps.places.Autocomplete(input1);
	autocomplete1.bindTo('bounds', map);
	google.maps.event.addListener(autocomplete1,'place_changed',function() {
		var place = autocomplete1.getPlace();
		var address1 = '';
		if (place.address_components) {
			address1 = [
				(place.address_components[0]
				&& place.address_components[0].short_name || ''),
				(place.address_components[1]
				&& place.address_components[1].short_name || ''),
				(place.address_components[2]
				&& place.address_components[2].short_name || '') ]
				.join(',');
		}
		
		localStorage.setItem("destination",$(input1).val());
		localStorage.setItem("destCount",1);
	});
	
	$("#go_btn").click(function(){
		toSetRoute();
    });
	function toSetRoute(){
		src = document.getElementById("input_pac1").value;
		dst = document.getElementById("input_pac2").value;
		if (src == ""|| src.localeCompare("source") == 0) {
			alert("please enter source");
			$("#input_pac1").focus();
			return;
		}else if (dst == "" || dst.localeCompare("destination") == 0) {
			alert("please enter destination");
			$("#input_pac2").focus();
			return;
		}else if(localStorage.getItem("sourceCount")==0||localStorage.getItem("destCount")==0){
			alert("Please provide valid address");
		}else if (src==dst) {
			alert("source and destination are same");
			return;
		}else{
			calcRoute(src,dst);
		}
	}

	function calcRoute(src,dst) {
		var start = src;
		var end = dst;
		directionsService = new google.maps.DirectionsService();
		var request = {
			origin : start,
			destination : end,
			travelMode : google.maps.TravelMode.DRIVING
		};
		directionsService.route(request, function(response,status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
				codeAddress();
				if(src!==""&&dst!==""){
					getAutoList();
				}else{
					alert("Must Enter Source and Destination");
				}
          	}
		});
	}
	function codeAddress() {
		if(geocoder==null)
			geocoder = new google.maps.Geocoder();
		var src_address = document.getElementById("input_pac1").value;
		geocoder.geocode({ 'address': src_address},function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				currentLat=results[0].geometry.location.lat();
				currentLong=results[0].geometry.location.lng();
			}else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
	}
});
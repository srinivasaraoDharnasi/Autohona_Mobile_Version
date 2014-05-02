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
	directionsDisplay = new google.maps.DirectionsRenderer({
		polylineOptions: {
			//set the color of the poly line 
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
 console.log("check this:-----:"+sample.lattitude+ " , "+sample.longitude);
var myPoint=new google.maps.LatLng(coordinates[0].lattitude,coordinates[0].longitude);
currentLat=coordinates[0].lattitude;
currentLong=coordinates[0].longitude;
 var mapOptions = {
    zoom: 8,
    center: myPoint,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
   // mapTypeControlOptions: {
  //     style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
  //    },
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.BOTTOM_CENTER
    },
   zoomControl   : false,
   //// zoomControlOptions: {
   //     style: google.maps.ZoomControlStyle.SMALL,
   //     position: google.maps.ControlPosition.RIGHT_TOP
  //  },
    scaleControl  : false,
  //  scaleControlOptions: {
  //      position: google.maps.ControlPosition.RIGHT_TOP
  //  },
    panControl    : false,
  //  panControlOptions: {
  //      position: google.maps.ControlPosition.RIGHT_TOP
  //  },
   streetViewControl: false,
 //   streetViewControlOptions: {
   //     position: google.maps.ControlPosition.RIGHT_TOP
   // }
  };
 map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

 directionsDisplay.setMap(map);
  //var marker=new google.maps.Marker({
  //position:myPoint,
  //icon:'images/auto.png'
  //});

//marker.setMap(map);
  
 // google.maps.event.addListener(marker,'click',function() {
  //map.setZoom(9);
 // map.setCenter(marker.getPosition());
  //});
 
 //google.maps.event.addListener(map, 'click', function(event) {
 // placeMarker(event.latLng);
 // });

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




// auto complete address for source and destination input boxes
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
					sourcestore = address;
				});

var input1 = (document.getElementById('input_pac2'));
var autocomplete1 = new google.maps.places.Autocomplete(input1);
autocomplete1.bindTo('bounds', map);
google.maps.event.addListener(autocomplete1,'place_changed',function() {
					var place = autocomplete1.getPlace();
					var address1 = '';
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
					destinationstore = address1;
				});

var trip_flag='';
$("#go_btn").click(function(){
	
if($("#checkkBoxId").attr("checked"))
{
    alert("Checked");
    trip_flag='Y';    
    toSetRoute();
}
else
{
    alert("Unchecked");
    
    trip_flag='N';    
    toSetRoute();
}
});




function toSetRoute(){
	 src = document.getElementById("input_pac1").value;
	 dst = document.getElementById("input_pac2").value;

	 var now = new Date(); 
	  var datetime = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate(); 
	  datetime += ' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds(); 
	 
	  alert(datetime);
	 
	 $.ajax({
			url:"http://autohonatest.meximas.com/service/setAppointment.php?userId=56&fromLoc="+src+"&toLoc="+dst+"&dAt="+datetime+"&tripFlag="+trip_flag+"",
			cache : false,
			dataType : "json",
			success:function(status){		
				alert("success"+status.message);
			},
			error : function(error) {
				alert("error in getting data"+status.message);
			}
		});
		    
	 
	// console.log(document.getElementById("pac-input1").value);
	if (src == ""|| src.localeCompare("source") == 0) {
	     alert("please enter source");
		$("#input_pac1").focus();
		return;
	}

	if (dst == "" || dst.localeCompare("destination") == 0) {
		alert("please enter destination");
		$("#input_pac2").focus();

		return;
	}
	if (src != "" && dst != "") {
		
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
	directionsService.route(request, function(response,
			status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
			 codeAddress();
			//getAutoData();
			 getAutoList();
		}
	});
	
}


//function getAutoList(){
//	$.ajax({
//		url:"http://autohonatest.meximas.com/service/getAutoData.php?type=autolist&currentLat="+currentLat+"&currentLng="+currentLong+"&source="+src+"&destination="+dst,
//		cache : false,
//		dataType : "json",
//		success:function(result){		
//			alert(result);
//			var data = result[0].data;
//			alert(data);
//			autolist =data;
//			data.sort(function(a, b) {
//				return parseFloat(a.dist) - parseFloat(b.dist);
//			});	
//			$.each(data,function(index, value) {
//
//				$("#AutoDetailsList")
//						.append(
//								"<a><div class='auto'>Id:"
//										+ value.autoid
//										+ "<br>Name:"
//										+ value.drivername
//										+ "<br>Dist:"
//										+ value.dist/1000 +"KM"
//										+ "<div class='display-item'></div><button id='"
//										+ value.autoid
//										+ "' index='"
//										+ index
//										+ "' onclick='popupDiv(this);' class='orange' >Details</button></div></a>");
//
//			});
//			pointingAutos();
//		},
//		error : function(error) {
//			alert("error in getting data");
//		}
//	});
//}
//var pointingAutos = function() {
//
//					var autolis = autolist;
//
//					var marker;
//					markers = new Array();
//					
//					// Add the markers and infowindows to the map
//					for (var i = 0; i < autolis.length; i++) {
//					//alert("placing");
//						marker = new google.maps.Marker({
//							position : new google.maps.LatLng(
//									autolis[i].latitude,
//									autolis[i].longitude),
//									icon : 'http://autohonatest.meximas.com/test/img/auto.png',
//							map : map
//						});
//
//						markers.push(marker);
//						google.maps.event
//								.addListener(
//										marker,
//										'click',
//										(function(marker, i) {
//											return function() {
//												infowindow
//														.setContent("Auto<br>DriverName:"
//																+ autolis[i].drivername
//																+ "<br>Rating"
//																+ autolis[i].rating
//																+ "<br>Distance"
//																+ autolis[i].dist
//																+ "mtr");
//												infowindow
//														.open(map, marker);
//											}
//										})(marker, i));
//
//					}
//				}
//



function codeAddress() {
    if(geocoder==null)
	    geocoder = new google.maps.Geocoder();
	var src_address = document.getElementById("input_pac1").value;
	
	geocoder.geocode({ 'address': src_address},

				 function(results, status) {
			
		                if (status == google.maps.GeocoderStatus.OK) {
		                	 
//						        map.setCenter(results[0].geometry.location);
//						        var marker = new google.maps.Marker({
//						        										map: map,
//						        										position: results[0].geometry.location
//						        	                                });
//						        console.log(results[0].geometry);
						      //  alert("I am ready to send latitude and longitude=(" +results[0].geometry.location.lat()+" , "+results[0].geometry.location.lng()+") ");
						        currentLat=results[0].geometry.location.lat();
						        currentLong=results[0].geometry.location.lng();
						       // getAutoData();
			               }
						 else {
							 	
							 	alert("Geocode was not successful for the following reason: " + status);
						 		}
				});

}


});
function getAutoList(){
	$.ajax({
		url:"http://autohonatest.meximas.com/service/getAutoData.php?type=autolist",
		cache : false,
		dataType : "json",
		success:function(result){		
			//alert(result);
			var data = result[0].data;
			//alert(data);
			autolist =data;
			data.sort(function(a, b) {
				return parseFloat(a.dist) - parseFloat(b.dist);
			});	
			$.each(data,function(index, value) {

				$("#foo")
						.append(
								"<div id='"+value.autoid+"' onclick=\"popupDiv1('"+value.autoid+"');\" style='color: white;text-align:center;padding: 10px; background-color:#555; border-radius:10px;margin-top:5px;margin-bottom:5px;' class='auto'>Id:"
										+ value.autoid
										+ "<br>Name:"
										+ value.drivername
										+ "<br>Dist:"
										+ value.dist/1000 +"KM"
										+ "<br><div style='margin-left:30%;'><span class='stars'>"
										+value.rating
										+"</span></div>"
										+ "<br><a style='text-decoration:none;background-color:white;padding:2px;border-radius:5px;' href='tel: "
										+value.phonenum+"'>"
										+value.phonenum+"</a>" +
												"<br><input type='submit' value='Rate me' id='rate_me'/></div>");

			});
			$('#foo').on('click', '#rate_me', function(){
				  // alert("clicked on rate me");
				   window.open("page3.html");
				});
			/*Srinivas Added for Rating */$('span.stars').stars();
			pointingAutos();
		},
		error : function(error) {
			alert("error in getting data"+status);
		}
	});
}
function popupDiv1(id){
localStorage.setItem("selectedId",id+"");
popupDiv2();
}


/*Srinivas Added for Rating Below*/
$.fn.stars = function() {
	return $(this).each(function() {
    var val = parseFloat($(this).html());
    var size = Math.max(0, (Math.min(5, val))) * 16;
    var $span = $('<span />').width(size);
    $(this).html($span);
});
}
/*Srinivas Added for Rating Above*/









//if($("#checkkBoxId").attr("checked"))
//{
//    alert("Checked");
////    $.ajax({
////    	url:"http://autohonatest.meximas.com/service/setAppointment.php?userId=49&fromLoc=punjagutta&toLoc=ameetpet&dAt=2014-02-02 02:02:02&tripFlag=Y",
////		cache : false,
////		dataType : "json",
////		success:function(status){		
////			alert("success"+status.message);
////		},
////		error : function(error) {
////			alert("error in getting data"+status.message);
////		}
////    });
//}
//else
//{
//    alert("Unchecked");
//}



var pointingAutos = function() {

	var autolis = autolist;

	var marker;
	markers = new Array();
	
	// Add the markers and infowindows to the map
	for (var i = 0; i < autolis.length; i++) {
	//alert("placing");
		marker = new google.maps.Marker({
			position : new google.maps.LatLng(
					autolis[i].latitude,
					autolis[i].longitude),
					icon : 'http://autohonatest.meximas.com/test/img/auto.png',
			map : map
		});

		markers.push(marker);
		google.maps.event
				.addListener(
						marker,
						'click',
						(function(marker, i) {
							return function() {
								infowindow
										.setContent("Auto<br>DriverName:"
												+ autolis[i].drivername
												+ "<br>Rating"
												+ autolis[i].rating
												+ "<br>Distance"
												+ autolis[i].dist
												+ "mtr");
								infowindow
										.open(map, marker);
							};
						})(marker, i));

	}
};


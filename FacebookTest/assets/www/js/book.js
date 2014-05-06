		
			$(document).ready(function() {
				var $menu = $('nav#menu');
				$menu.mmenu();
				$("#searchSource").keydown(function(){
					localStorage.setItem("sourceCountBook",0);
				});
				$("#searchDestination").keydown(function(){
					localStorage.setItem("destCountBook",0);
				});
				document.getElementById('searchSource').value=localStorage.getItem("source");
				if(document.getElementById('searchSource').value!=""){
					localStorage.setItem("sourceCountBook",1);
				}
				document.getElementById('searchDestination').value=localStorage.getItem("destination");
				
				var input = (document.getElementById('searchSource'));
				var options = {componentRestrictions: {country: 'in'}};
				var autocomplete = new google.maps.places.Autocomplete(input,options);
				google.maps.event.addListener(autocomplete,'place_changed',function() {
					localStorage.setItem("sourceCountBook",1);
				});
				
				var input2 = (document.getElementById('searchDestination'));
				var autocomplete1 = new google.maps.places.Autocomplete(input2,options);
				google.maps.event.addListener(autocomplete1,'place_changed',function() {
					localStorage.setItem("destCountBook",1);
				});
		
				$('#setTimeExample').timepicker();
				$('#setTimeButton').on('click', function (){
					$('#setTimeExample').timepicker('setTime', new Date());
				});
				$( "#datepicker" ).datepicker();
				$('#setTimeExample').timepicker('setTime', new Date());
				$('#datepicker').datepicker('setDate', new Date());
		
				$('#bookbut').click(function() {
					var date = $("#datepicker").val();
					var time = $("#setTimeExample").val();
					var srcloc = $("#searchSource").val();
					var destloc = $("#searchDestination").val();
					var tripflag=$('#roundCheck').is(':checked') ? "Y" : "N" ;
					if(srcloc==""){
						alert("Enter Source");
						$("#searchSource").focus();
					}else if(destloc==""){
						alert("Enter destination");
						$("#searchDestination").focus();
					}else if(localStorage.getItem("sourceCountBook")==0||localStorage.getItem("destCountBook")==0){
						alert("Please provide valid address");
					}else if(date==""){
						alert("Enter date");
						$("#datepicker").focus();
					}else if(time==""){
						alert("Enter time");
						$("#setTimeExample").focus();
					}else{
						$.ajax({
							url : "http://autohonatest.meximas.com/service/setAppointement.php?type=bookingAuto&userId=49&fromLoc="+srcloc+"&toLoc="+destloc+"&timeS="+time+"&tripFlag="+tripflag+"&dateS="+date+"&timeE=10:30:02&dateE="+date,
							cache : false,
							dataType : "json",
							success : function(dataAll) {
								alert("success");
							},
							error : function(error) {alert("error")}
						});
					}
				});
			});
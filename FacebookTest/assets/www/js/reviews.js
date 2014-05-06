var auto_id;
$.fn.stars = function() {
	return $(this).each(function() {
    var val = parseFloat($(this).html());
    var size = Math.max(0, (Math.min(5, val))) * 16;
    var $span = $('<span />').width(size);
    $(this).html($span);
});
}

function fbInit(){
		document.addEventListener('deviceready', function() {
		try {
			//alert('Device is ready!	Make sure you set your app_id below this alert.');
				FB.init({
					appId : "1441459259430140",
					nativeInterface : CDV.FB,
					useCachedDialogs : false
				});
				login();
			} catch (e) {
				alert(e);
			}
		}, false);
 }
function profile() {
	FB.api('/me',function(response) {
		//alert(response.first_name);
		//alert(response.id);
		//alert(response.last_name);
		$("#login").hide();
		$("#registration").show();				
		$("#regFirstName").val(response.first_name);
		$("#regLastName").val(response.last_name);
	});
}
function login() {
	FB.login(function(response) {
		if (response.authResponse) {
			profile();
		} else {
			alert('not logged in');
		}
	}, {
		scope : "email"
	});
}

function popupDiv2(){
auto_id=localStorage.getItem("selectedId");
document.getElementById("autoID").value=auto_id;
	$.ajax({
		url : "http://autohonatest.meximas.com/service/getAutoData.php?type=reviews&&autoid="+auto_id,
		cache : false,
		dataType : "json",
		success : function(data) {
		var reviewslist=data[0].data;
		
		//console.log(data[0].data);
		$.each(reviewslist,function(index,value){
			$("#driver_review_tab").append(
				"<div><span><b>"
				+value.username+"</b></span>"
				+ "<br><span class='stars'>"
				+value.rating
				+"</span>"
				+"<br><span>Comment:<br>"
				+value.comment
				+"</span></div><br><hr>");
				$("#"+value.userid+""+value.rating);
			});
			$('span.stars').stars();
		},
		error: function(e){
		}
	});
}

jQuery(function($) {

$("#regUserBack").click(function() {
	$("#login").show();		
	$("#registration").hide();
});
$("#signinBtn").click(function() {	
	$("#login").hide();
	$("#registration").show();
});	
		
$("#loginBtn").click(function() {	
	$("#login").hide();		
	$("#userLoginForm").show();
});		

$("#loginBack").click(function() {	
	$("#userLoginForm").hide();
	$("#regUser").hide();
	$("#login").show();	
});

$("#loginForgotPwd").click(function() {
	$("#userLoginForm").hide();
	$("#regUser").hide();
	$("#login").hide();
	$("#PwdReset").show();
});		

$("#pwdResetBack").click(function() {
	$("#PwdReset").hide();
	$("#userLoginForm").show();
});

$("#loginLogin").click(function(){
	//alert('Enter in to login login');
	//var url;
 	var uname=$("#loginEmailUserName").val(); 
	var pwd=$("#loginPwd").val(); 
	var cmt=$("#user_comment").val(); 
	var rate=$("#rate").val(); 
	//auto_id=$("#autoID").val();
	if(uname != "" && pwd != ""){ 
		$.ajax({ 
			url: "http://autohonatest.meximas.com/service/loginstatus.php?uname="+uname+"&pwd="+pwd+"&cmt="+cmt+"&rate="+rate+"&autoId="+auto_id, 
			dataType:"json", 
			success:function(data){ 
				if(data.status=="success"){ 
					alert("success"); 
					$("#toPopup").fadeOut("normal");
					popupDiv2();
				}else{ 
					alert("failed"); 
				} 
			}, 
 			error:function(){ 
                //alert("server is slow try again !!");
			} 
 		}); 
 	} 
});

$("#regUser").click(function() {
var url;
	var fname=$("#regFirstName").val();
	var lname=$("#regLastName").val();
	var email=$("#regEmail").val();
	var pwd=$("#regPwd").val();
	var phone=$("#regMobile").val();
	//url="http://autohonatest.meximas.com/service/getAutoData.php?type=register&firstName="+fname+"&lastName="+lname+"&pwd="+pwd+"&phone="+phone+"&email="+email;
	//console.log(url);
	//$.ajax({
		//url: "http://autohonatest.meximas.com/service/getAutoData.php?type=register&firstName="+fname+"&lastName="+lname+"&pwd="+pwd+"&phone="+phone+"&email="+email,
		//dataType:"json",
		//success:function(){
		//	alert("saved successfully");
	//	},
	//	error:function(){
		//	alert("data input error");
	  //  }
	//});
	//if(){
	
	
	//}
	function validateEmail(){
		var emailID = email;
		atpos = emailID.indexOf("@");
		dotpos = emailID.lastIndexOf(".");
		if (atpos < 1 || ( dotpos - atpos < 2 )){
			alert("Please enter correct email ID")
			$("#regEmail").focus();			
			return false;
		}
		return( true );
	}
	function PhoneNumber(){
		var PhoneID = phone;
		var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		if(PhoneID.match(phoneno)){
			return true;
		}else{
			alert("Not a valid Phone Number");
			$("#regMobile").focus();
			return false;
		}
	}
	if(fname.length<20&&fname.length!=""){
		if(lname.length<20&&lname.length!=""){
			var ret = validateEmail();
			if( ret == true ){
				if(pwd.length<20&&pwd.length!=""&&pwd.length>8){
					var rec = PhoneNumber();
					if(rec==true){
						$.ajax({
							url: "http://autohonatest.meximas.com/service/getAutoData.php?type=register&firstName="+fname+"&lastName="+lname+"&pwd="+pwd+"&phone="+phone+"&email="+email,
							dataType:"json",
							success:function(){
								alert("saved successfully");
								$("#registration").hide();
							},
							error:function(){
								
							}
						});
					}
				}else{
					alert("password must be 8 - 12 characters!!");
					$("#regPwd").focus();
				}
			}
		}else{
			alert("enter correct last name should not exceed 20 characters")
			$("#regLastName").focus();
		}
	}else{
		alert("enter correct First name should not exceed 20 characters")
		$("#regFirstName").focus();
	}
});

$("a.topopup").click(function() {
	var cmt=$("#user_comment").val(); 
    if(cmt==""){
		alert("please enter comment");
	}else{
		$("#toPopup").fadeIn(0500); 
		$("#backgroundPopup").css("opacity", "0.7"); 
		$("#registration").hide();
		$("#userLoginForm").hide();
		$("#login").show();
		$("#PwdReset").hide();
	}
		
});
$("div.close").click(function() {
	$("#toPopup").fadeOut("normal");  
});
	
});
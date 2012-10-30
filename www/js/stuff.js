

var pictureSource;
var destinationType;
var lat;
var lon;



function init(){
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType; 
}
	
function geolocateFailure(error){
	alert('code: ' + error.code + '\n' +
		  'message' + error.message + '\n');
}	

// function geolocateSuccess(position){	
	// options.latitude = position.coords.latitude;
	// options.longitude = position.coords.longitude;
// }

function uploadPhoto(){
	navigator.geolocation.getCurrentPosition(function(position){
		lat = position.coords.latitude;
		lon = position.coords.longitude;
		
		var description = document.getElementById('description').value;
		var imageName = document.getElementById('imagePreview').src;
		var options = new FileUploadOptions();
		options.fileKey = "img";
		options.fileName = imageName.substr(imageName.lastIndexOf('/')+1);
		options.mimeType = "image/jpeg";
		
		var params = new Object();
		params.description = description;
		params.latitude = lat;
		params.longitude = lon;
		
		options.params = params;
		options.chunkedMode = false;
		
		var ft = new FileTransfer();
		ft.upload(imageName, encodeURI("http://mg.whitecloud.se/upload.php"), uploadSuccess, uploadFail, options);
	});
	
}

function uploadSuccess(r){
	console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
	alert('Upload Success');
}

function uploadFail(error){
	alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

function previewPhoto(imageURI){
	var image = document.getElementById('imagePreview');
	image.src = imageURI;
}

function capturePhoto(){
	navigator.camera.getPicture(previewPhoto, onFail, { quality:50, destinationType: destinationType.FILE_URI });
}

function onFail(message){
	alert('Failed: ' + message);
}

function getPhotos(){
	$.ajax({
		url: "mg.whitecloud.se/getPhotos.php",
		type: "POST",
		dataType: "html"
	}).done(function(html){
		$("#images").append(html);
	});
}

$(document).ready(function() {
	
});
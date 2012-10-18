var pictureSource;
var destinationType;

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
	
function uploadPhoto(imageURI){
	var longitude;
	var latitude;
	var options = new FileUploadOptions();
	options.fileKey = "img";
	options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
	options.mimeType = "image/jpeg";

	function geolocateSuccess(position){	
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
	}
	
	navigator.geolocation.getCurrentPosition(geolocateSuccess, geolocateFailure, { timeout: 30000, maximumAge: 3000 });
	
	options.latitude = latitude;
	options.longitude = longitude;
	
	options.chunkedMode = false;
	
	var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://mg.whitecloud.se/upload.php"), uploadSuccess, uploadFail, options);
}

function uploadSuccess(r){
	console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

function uploadFail(error){
	alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

function capturePhoto(){
	navigator.camera.getPicture(uploadPhoto, onFail, { quality:50, destinationType: destinationType.FILE_URI });
}

function onFail(message){
	alert('Failed: ' + message);
}
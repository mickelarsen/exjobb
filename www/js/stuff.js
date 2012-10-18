var pictureSource;
var destinationType;
var longitude;
var latitude;



function init(){
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType; 
}

function geolocateSuccess(position){
	
	this.latitude = position.coords.latitude;
	this.longitude = position.coords.longitude;
	
}
	
function geolocateFailure(error){
	alert('code: ' + error.code + '\n' +
		  'message' + error.message + '\n');
}	
	
function uploadPhoto(imageURI){
	
	var options = new FileUploadOptions();
	options.fileKey = "img";
	options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
	options.mimeType = "image/jpeg";

	navigator.geolocation.getCurrentPosition(geolocateSuccess, geolocateFailure, { timeout: 3000, maximumAge: 3000, enableHighAccuracy: true });
	
	options.latitude = this.latitude;
	options.longitude = this.longitude;
	
	options.chunkedMode = false;
	
	var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://mg.whitecloud.se/upload.php"), uploadSuccess, uploadFail, options);
}

function onPhotoURISuccess(imageURI) {

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

function getPhoto(source){
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality:50, destinationType: destinationType.FILE_URI, sourceType: source});
}

function onFail(message){
	alert('Failed: ' + message);
}
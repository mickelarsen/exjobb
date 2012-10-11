var pictureSource;
var destinationType;


function init(){
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
}

function uploadPhoto(imageURI){
	
	var options = new FileUploadOptions();
	options.fileKey = "img";
	options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
	options.mimeType = "image/jpeg";
	
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
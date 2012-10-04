var pictureSource;
var destinationType;


function init(){
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
}

function onPhotoDataSuccess(imageData){
	var smallImage=document.getElementById('smallImage');
	
	smallImage.style.display='block';
	
	smallImage.src="data:image/jpeg;base64," + imageData;
}

function onPhotoURISuccess(imageURI) {
    var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
	options.mimeType = "image/jpeg";
	
	var params = new Object();
	params.value1 = "test";
	params.value2 = "params";
	
	options.params = params;
	
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
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality:50, destinationType: destinationType.DATA_URL });
}

function getPhoto(source){
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality:50, destinationType: destinationType.FILE_URI, sourceType: source});
}

function onFail(message){
	alert('Failed: ' + message);
}

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
    // Uncomment to view the image file URI 
    // console.log(imageURI);

    // Get image handle
    //
    var largeImage = document.getElementById('largeImage');

    // Unhide image elements
    //
    largeImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
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

// This is a JavaScript file

var video = document.getElementById('video');

// Get access to the camera!
function getvideo(){
    console.log("Capture")
// Get access to the camera!
video = document.getElementById('video');
var vidid=[];

navigator.mediaDevices.enumerateDevices()
  .then(function(devices) {
      var i=0;
    devices.forEach(function(device) {
      //console.log(device.kind + ": " + device.label + // " id = " + device.deviceId);
     vidid[i]=device.deviceId
     i+=1;
      
    });
    
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video:{optional: [{sourceId: vidid[4]}]}}).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
        
    });

}

  })
  .catch(function(err) {
    console.log(err.name + ": " + error.message);
  });



}

// Trigger photo take

function snap(){
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');    
    context.drawImage(video, 0, 0, 20, 20);
    var imageData = context.getImageData(0,0,20,20);
    var data = imageData.data;
    var rgb=0;
        for(var i = 0; i < data.length; i += 4) {
            rgb+=data[i]+data[i+1]+data[i+2];
            
        }
        console.log(rgb)
}

function setSnapInt(){
    setInterval(function(){ snap() }, 1000);
}


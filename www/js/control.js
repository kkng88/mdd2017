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
        
        //Do actions
        doChart()
        setSnapInt()
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
        updateChart(Math.round(rgb/1000))
        //console.log(rgb)
}

var myInt;
function setSnapInt(){
    myInt=setInterval(function(){ snap() }, 90);
}

function stopInt(){
clearInterval(myInt);
}

//Do heart chart

var myvar=1;  
var label_arr=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var data_arr=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var myChart,chartctx

function doChart(){
 $("#updating-chart").height("400")
 chartctx = document.getElementById("updating-chart").getContext("2d");   
 
 
 myChart = new Chart(chartctx, {
    type: 'line',
    data: {
        datasets: [{
            pointRadius:0,
            data: data_arr,
            fill:false,
            borderColor: "white"
        }]
    },
    options: {
        legend: {display: false},
        animation: {duration: 0},
        scales: {
            yAxes: [{
                gridLines : {display : false},
                display:false
            }],
            xAxes: [{
                gridLines : {display : false},
                display:false
            }]
        }
    }
});
/*
    myinterval=setInterval(function(){
        
        for (i = 0; i < data_arr.length; i++) { 

          try{
          myChart.data.datasets[0].data[i] = data_arr[i+1];
          myChart.data.labels[i] = "";
          if(i==39){
              myChart.data.datasets[0].data[i] = Math.random();
          }
          }catch(err){
              myChart.data.datasets[0].data[i] = Math.random();
          }
        }
          
          myChart.update();       

    }, 100);*/
  
}

function updateChart(input){
        for (i = 0; i < data_arr.length; i++) { 

          try{
          myChart.data.datasets[0].data[i] = data_arr[i+1];
          myChart.data.labels[i] = "";
          if(i==39){
              myChart.data.datasets[0].data[i] = input;
          }
          }catch(err){
              myChart.data.datasets[0].data[i] = input;
          }
        }
          
          myChart.update();      
}



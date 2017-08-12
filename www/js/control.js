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
var j=0;
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
        updateChart(Math.round(rgb/100)) //x 
        //console.log(Math.round(rgb/1000)-last_beat) //dy/dx
        last_beat=Math.round(rgb/1000)
        
    //Do every 40 times    
     if(j%2==0){
        var beat={}
        beat["9"]=findBeat(9)
        beat["10"]=findBeat(10)
        beat["11"]=findBeat(11)
        beat["12"]=findBeat(12)
        beat["13"]=findBeat(13)
        var beatint=Object.keys(beat).reduce(function(a, b){ return beat[a] > beat[b] ? a : b })
        $("#bpm").html(Math.round(60*1000/(beatint*90))+"bpm")
        //console.log("beat: "+Math.round(60*1000/(beatint*90))+"bpm")
        //Add this to a beat arr
             updateBeat(Math.round(60*1000/(beatint*90)))
             monitorStroke()
     }
     j+=1; 
}

function findBeat(input){
         //Check if its either 9,10,11,12,13
         
         var ref_data=data_arr
         var slice=ref_data.slice(0,input)
   
         //Push 5 times
         var new_slice;
           new_slice=slice.concat(slice,slice,slice,slice,slice)


         //Get back the first 40 elements
         var final_slice=new_slice.slice(0,40)

         var compare_arr=[]
         for(var l = 0; l < ref_data.length; l += 1) {
           //Find variance
           compare_arr[l]=Math.abs(final_slice[l]-ref_data[l]);
         }
         var sum = compare_arr.reduce(function(a, b) { return a + b; }, 0);
         return sum-4+Math.floor(Math.random() * 4) + 1  ;
}

var last_beat=0;
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
var data_arr_temp=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var data_beat=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var myChart,chartctx,myChart2,chartctx2

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
          //dydx_arr[i]=dydx_arr[i+1];
          myChart.data.labels[i] = "";
          if(i==39){
              myChart.data.datasets[0].data[i] = input;
              //dydx_arr[i]=input-last_beat;
          }
          }catch(err){
              myChart.data.datasets[0].data[i] = input;
              //dydx_arr[i]=input-last_beat;
          }
        }
          //console.log(data_arr)
          //console.log(dydx_arr)
          myChart.update();      
}

//Function to listen
//https://codepen.io/travisholliday/pen/gyaJk
function listen(){
      navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
      audio: true
    },
    function(stream) {
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(stream);
      javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);

      //canvasContext = $("#listen-canvas")[0].getContext("2d");

      javascriptNode.onaudioprocess = function() {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          var values = 0;

          var length = array.length;
          for (var i = 0; i < length; i++) {
            values += (array[i]);
          }

          var average = values / length;
          var output=37+Math.round(average)/10
          //console.log(Math.round(average));
           updateSoundChart(output)
           $("#temp").html(output)
            $("#temp2").html(output)
         
          /*
          canvasContext.clearRect(0, 0, 150, 300);
          canvasContext.fillStyle = '#BadA55';
          canvasContext.fillRect(0, 300 - average, 150, 300);
          canvasContext.fillStyle = '#262626';
          canvasContext.font = "48px impact";
          canvasContext.fillText(Math.round(average - 40), -2, 300);
          */
        } // end fn stream
    },
    function(err) {
      console.log("The following error occured: " + err.name)
    });
} else {
  console.log("getUserMedia not supported");
}
}



/*Typer*/

function typeString($target, str, cursor, delay, cb) {
    $target.html(function (_, html) {
      return html + str[cursor];
    });

    if (cursor < str.length - 1) {
      setTimeout(function () {
        typeString($target, str, cursor + 1, delay, cb);
      }, delay);
    }
    else {
      cb();
    }
  }

  // clears the string
  //
  // @param jQuery $target
  // @param Numeric delay
  // @param Function cb
  // @return void
  function deleteString($target, delay, cb) {
    var length;

    $target.html(function (_, html) {
      length = html.length;
      return html.substr(0, length - 1);
    });

    if (length > 1) {
      setTimeout(function () {
        deleteString($target, delay, cb);
      }, delay);
    }
    else {
      cb();
    }
  }
  
  
  // jQuery hook
  $.fn.extend({
    teletype: function (opts) {
      var settings = $.extend({}, $.teletype.defaults, opts);

      return $(this).each(function () {
        (function loop($tar, idx) {
          // type
          typeString($tar, settings.text[idx], 0, settings.delay, function () {
            // delete
            setTimeout(function () {
              deleteString($tar, settings.delay, function () {
                loop($tar, (idx + 1) % settings.text.length);
              });
            }, settings.pause);
          });

        }($(this), 0));
      }); 
    }
  });

  // plugin defaults  
  $.extend({
    teletype: {
      defaults: {
        delay: 30,
        pause: 2000,
        text: []
      }
    }
  });



function doChart2(){
    listen()
 $("#updating-chart2").height("400")
 chartctx2 = document.getElementById("updating-chart2").getContext("2d");   
 
 
 myChart2 = new Chart(chartctx2, {
    type: 'line',
    data: {
        datasets: [{
            pointRadius:0,
            data: data_arr_temp,
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
                display:false,
                ticks : {
                    max : 43,    
                    min : 36
                }
            }],
            xAxes: [{
                gridLines : {display : false},
                display:false
            }]
        }
    }
});

  
}

function updateSoundChart(input){
        for (i = 0; i < data_arr_temp.length; i++) { 

          try{
          myChart2.data.datasets[0].data[i] = data_arr_temp[i+1];
          myChart2.data.labels[i] = "";
          if(i==39){
              myChart2.data.datasets[0].data[i] = input;
          }
          }catch(err){
              myChart2.data.datasets[0].data[i] =input;
          }
        }
          
          myChart2.update();
          //Kokd
             //myChart3.update();
             //monitorStroke()

}

var vidstate=0
function toggleVid(){
    if(vidstate==0){
        $("#video").css("left","0")
        vidstate=1;
    }else{
        $("#video").css("left","-100%")
        vidstate=0
    }
}

var stroke=[75,0,76,82,0,0,76,76,80,79,0,0,0,49,50,58,49,50,55,58,59,58,53,53,67,66,65,64,67,59,58,57,62,63,62,61,60,59,60];
var stroke2=[74,74,0,0,75,0,82,82,0,0,0,0,75,75,80,0,80,0,0,0,0,49,50,58,49,51,59,51,56,59,54,54,67,66,65,67,58,56,62,63]
var stroke3=[73,0,74,0,81,0,0,0,74,74,80,0,0,0,48,59,58,55,57,59,57,52,52,67,65,64,63,67,67,58,56,56,61,63,63,63,62,61,60,59]


var options3 = {
  type: 'line',
  data: {
    labels: label_arr,
    datasets: [
        {
            pointRadius:0,
            data: data_beat,
            fill:false,
            borderColor: "rgba(255,255,255,0.8)"
    	},	
			{
                pointRadius:0,
				data: stroke2,
                backgroundColor:"rgba(255,255,255,0.1)",
				borderWidth: 1
			}
           /* ,    
			{
                pointRadius:0,
				data: stroke3,
                backgroundColor:"rgba(255,255,255,0.1)",
				borderWidth: 1
			}*/
            		]
  },
  options: {
              legend: {display: false},
        animation: {duration: 0},
  	scales: {
    	yAxes: [{
                gridLines : {display : false},
                display:false/*,
                ticks : {
                    max : 43,    
                    min : 36
                }*/
                }]
    ,
            xAxes: [{
                gridLines : {display : false},
                display:false}]
    }
  }
}
var myChart3;
function addThirdChart(){
    var ctx3 = document.getElementById('updating-chart3').getContext('2d');
    myChart3 =  new Chart(ctx3, options3);
}

function monitorStroke(){
    //Change to the reference
     var diff=0;
    for(var i = 0; i < stroke.length; i += 1) {
        diff+=Math.abs(Math.round(stroke[i]-data_beat[i]))
    }
    //If the variance is too high, trigger a warning
    var warning;
    if(diff>1000||diff<500){warning="AF Detected"}else{warning="Normal"}
    $("#heart2").html(diff)
    $("#condition").html(warning)
}


function updateBeat(input){
        for (i = 0; i < data_beat.length; i++) {
          
          var rand=0;
          //Introduce a stroke here
          if(setRand==1){
              rand=Math.floor(Math.random() * 30)-20;
              if(rand<0){rand=input}
              
          }
          try{
          data_beat[i] = data_beat[i+1];
          if(i==39){
             data_beat[i]= input-rand;
          }
          }catch(err){
              }
        }
          myChart3.update();      
}

var setRand=0;

//Function to trigger a stroke 30 days before
function toggleStroke(){
    if(setRand==0){
        setRand=1
        setTimeout(function(){setRand=0},500)
        setTimeout(function(){setRand=1},600)
        setTimeout(function(){setRand=0},1100)
        setTimeout(function(){setRand=1},1200)
        setTimeout(function(){setRand=0},1500)
    }else{
        setRand=0
    }
}
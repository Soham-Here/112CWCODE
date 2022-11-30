prediction1="Currently Not Available";
prediction2="Currently Not Available";

Webcam.set({
width:320,
height:256,
image_format:'png',
png_quality:99
});

camera=document.getElementById("camera");

Webcam.attach("camera");

function take_snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("snap").innerHTML='<img id="img_image" src="'+data_uri+'">'});
}

console.log("Your 'ml5.js' version is "+ml5.version+"!");

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Qh582v96S/model.json",modelLoaded);

function modelLoaded(){
    console.log("Your model has loaded in!");
}

function speak(){
    var synth=window.speechSynthesis;
    var speak_data1="The first prediction is....... "+prediction1;
    var speak_data2="The one you have been waiting for.......... 'Prediction 2' is....."+prediction2;
   var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
   synth.speak(utterThis);
}

function check(){
    img=document.getElementById("img_image");
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error+" Is the error!");
    }
    else{
        console.log(results+"Here they are!");
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label=="Happy"){
            document.getElementById("update_emoji").innerHTML="&#128512;";
        }
        if(results[0].label=="Sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        if(results[0].label=="Angry"){
            document.getElementById("update_emoji").innerHTML="&#128545;";
        }
        if(results[1].label=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128512;";
        }
        if(results[1].label=="Sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if(results[1].label=="Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545;";
    }
  }
}
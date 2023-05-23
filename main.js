function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet",modalloaded);

}


function draw() {
  image(video,0,0,300,300)
  classifier.classify(video,gotResults);
}

function modalloaded() {
  console.log("modal loaded")
}
var previous_results = ""
function gotResults(error,results) {
  if(error) {
    console.error(error)
  }
  else{
if ((results[0].confidence > 0.5) && (previous_results != results[0].label)){
  console.log(results);
  previous_results=results[0].label;

  document.getElementById("result_object_name").innerHTML=results[0].label;
  document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);

  var synth=window.speechSynthesis;
  speak_data="object detect is least likely"+ results[0].label;
  var utterthis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterthis);
}
  }
}



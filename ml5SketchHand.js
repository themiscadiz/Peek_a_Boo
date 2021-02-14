// p5 sketch

// **********************************
// STUFF FOR PAPER
window.globals = { a:1, b:100, c:500, d:100, e:800, f:100, g:500, h:100, i:800, j:100, k:100, l:100, m:100};

let handpose;
let video;
let predictions = [];

let s1, s2, s3;
let gravity = 9.0;
let mass = 2.0;
let newIndicator;

let smoothMov = 0.3;
// let smoothMov = 0.5;
let lerp_X = 0;
let lerp_Y = 0;

let lerpPoints = [];

let keypoint;

let previousKeypoint;

let lerpLength = 21;


let thumpFinger;

let indexFinger;

let middleFinger;

let ringFinger;

let pinkyFinger;

let palm;
let floorH;

function setup() {
  // createCanvas(640, 480);
  createCanvas(windowWidth, windowHeight);
  floorH = windowHeight;
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
  
    for (let i = 0; i < lerpLength; i++) {
    let thispoint = createVector(0, 0);
    lerpPoints.push(thispoint);
  }

}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  
  drawKeypoints();

}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {

 

  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      
      if (predictions.length != 0){
         keypoint = prediction.landmarks[j];
      }
      if(predictions.length < 0){
         keypoint = previousKeypoint;
      }
     
      
        fill(0, 255, 0);
        noStroke();

        //       //  LERP
        lerp_X = lerp(lerpPoints[j].x, prediction.landmarks[j][0], smoothMov);
        lerp_Y = lerp(lerpPoints[j].y, prediction.landmarks[j][1], smoothMov);
      

      let keypointPos = createVector(lerp_X, lerp_Y);
      
      lerpPoints[j] = keypointPos;
      
      // // All Point after Lerp
     previousKeypoint = prediction.landmarks[j];

    }

    
    
    thumpFinger = createVector(lerpPoints[4].x, lerpPoints[4].y);

    indexFinger = createVector(lerpPoints[8].x, lerpPoints[8].y);

    middleFinger = createVector(lerpPoints[12].x, lerpPoints[12].y);

    ringFinger = createVector(lerpPoints[16].x, lerpPoints[16].y);

    pinkyFinger = createVector(lerpPoints[20].x, lerpPoints[20].y);

    palm = createVector(lerpPoints[0].x, lerpPoints[0].y);

    // access global variables for paper.js
      window.globals.c = indexFinger.x;
      window.globals.d = indexFinger.y;

      window.globals.a = thumpFinger.x;
      window.globals.b = thumpFinger.y;

      window.globals.e = middleFinger.x;
      window.globals.f = middleFinger.y;

      window.globals.g = ringFinger.x;
      window.globals.h = ringFinger.y;

      window.globals.i = pinkyFinger.x;
      window.globals.j = pinkyFinger.y;

      window.globals.k = palm.x;
      window.globals.l = palm.y;

      window.globals.m = floorH;

    //   console.log(window.globals.a);
     

  }
}


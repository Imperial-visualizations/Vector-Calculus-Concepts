/*jshint esversion:7*/
let width = $('#sketch-holder').width(), height = $('#sketch-holder').height();

class OK_shape{
    constructor(x, y){
        this.x = x;
        this.y = y;                                                 //Anticlockwise
        this.nodeX = [0, 100, 150,                                  //Palm
                        140, 130, 105, 95, 115,                     //Pinky
                        122, 103, 70, 55, 80,                       //4th finger
                        87, 70, 30, 13, 45,                         //International
                        52, -10, -30, -50, -48, -25, -10, 25,       //2nd
                        30, 25,                                     //the curve
                        -15, -30, -55, -50];                        //Thumb
        this.nodeY = [0, 0, -50,                                    //Palm
                        -100, -150, -200, -200, -150,               //Pinky
                        -110, -160, -220, -215, -155,               //4th finger
                        -115, -165, -225, -220, -160,               //International
                        -115, -140, -130, -110, -90, -100, -110, -100,//2nd
                        -70, -50,                                   //the curve
                        -55, -80, -70, -55];                        //Thumb
    }
}

//draw canvas in which everything p5.js happens
function setup() {
    let canvas = createCanvas(width,height);
    canvas.parent('sketch-holder');
    frameRate(60);
}

function draw() {
    clear();
    loop = new OK_shape(300, 400);

    //Draw the loop
    stroke("#48A9A6");
    curveTightness(1);
    translate(300, 400);
    beginShape();
    for (let i = 0; i < loop.nodeX.length; i++) {
        curveVertex(loop.nodeX[i], loop.nodeY[i]);
    }
    endShape(CLOSE);

}
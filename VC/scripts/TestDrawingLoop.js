/*jshint esversion:7*/
let width = $('#sketch-holder').width(), height = $('#sketch-holder').height(), X = [], Y = [];

class Draw_shape{
    constructor(){
        this.nodeX = X;
        this.nodeY = Y;                     
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
    loop = new Draw_shape();
    if (mouseIsPressed && mouseButton === LEFT){
        cursor(CROSS);
        X.push(mouseX);
        Y.push(mouseY);
        if (loop.nodeX.length != 0){    
            //Draw the loop
            stroke("#48A9A6");
            curveTightness(1);
        
            beginShape();
            for (let i = 0; i < loop.nodeX.length; i++) {
                curveVertex(loop.nodeX[i], loop.nodeY[i]);
            }
            endShape(CLOSE);
        }
    } else {
        cursor(ARROW);
        if (loop.nodeX.length != 0){    
            //Draw the loop
            stroke("#48A9A6");
            curveTightness(1);
        
            beginShape();
            for (let i = 0; i < loop.nodeX.length; i++) {
                curveVertex(loop.nodeX[i], loop.nodeY[i]);
            }
            endShape(CLOSE);
        }
    }





}
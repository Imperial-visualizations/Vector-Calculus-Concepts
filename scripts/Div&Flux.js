/*jshint esversion:7*/

//The function to switch between visualisations
//When checked is false, displays vis 1
//When checked is true, displays vis 2
//Default is false
document.getElementById("mode").checked = false;
function toggle() {
    if (document.getElementById("mode").checked == true) {
        document.getElementById("Vis1_text").style.display = "none";
        document.getElementById("Vis1_interactive").style.display = "none";
        document.getElementById("Vis2_text").style.display = "block";
        document.getElementById("Vis2_interactive").style.display = "block";
    } else {
        document.getElementById("Vis1_text").style.display = "block";
        document.getElementById("Vis1_interactive").style.display = "block";
        document.getElementById("Vis2_text").style.display = "none";
        document.getElementById("Vis2_interactive").style.display = "none";
    }
}

//JS for Vis1
//A: Global Initial Parameters:

/* Start by putting in all initial parameters you want and any constants you want to use (e.g. G = 6.67*10**(-11),
any layout properties (which you probably want to keep constant for an individual part of a visualisation
should go here */

const initialPoint = [1, 0];
const initialPoint3 = [1,0];
const layout = {
    autosize: true,
    //width: 450, "height": 500,
    margin: {l:30, r:30, t:30, b:30},
    hovermode: "closest",
    showlegend: false,
    xaxis: {range: [-5, 5], zeroline: true},
    yaxis: {range: [-5, 5], zeroline: true},
    aspectratio: {x:1, y:1},
};
var currentPoint = initialPoint;

//B: Maths

/*Next comes all the mathematical functions that are used, if you think a library will do a particular job
that's fine, no need to recreate stuff, but any functions you need to construct yourself should go in this
next block*/


function inner_product(first_vector , second_vector){
    // Returns the inner product of two vectors
    var sum = 0;
    for (var i=0; i<2; i++) {
        sum += first_vector[i] * second_vector[i];
    }
    return sum;
}

function orthogonal(vector_a , vector_b, tolerance = 0){
    //Returns whether vectors a and b are orthogonal
    dot = inner_product(vector_a , vector_b);
    if (dot === 0){
        return true;
        }
    else {
        return false;
        }
    }


function normalised(vector){
    // Returns whether a vector has a normalised basis
    dot = inner_product(vector, vector);
    if (dot === 1){
        return true;
        }
    else {
        return false;
        }
    }

function find_xy(resulting_vector, base_1 , base_2){
    // Finds the projection of "resulting vector" into base_1 and base_2 and returns the
    //coefficients that are needed such the reconstruct the result from the two bases
    b1 = resulting_vector[0];
    b2 = resulting_vector[1];
    p1 = base_1[0];
    p2 = base_1[1];
    q1 = base_2[0];
    q2 = base_2[1];

    if (p1 === 0){
        y = b1 / q1;
        x = (q1*b2 - b1*q2)/p2;
    }
    else if (p1*q2 === p2**2){
        y = (p1*b2 - b1)/(p2**2 - q1*p2);
        x = (b1 - y*q1)/(p1);
    }
    else{
        y = (p1*b2 - p2*b1)/(p1*q2 - p2**2);
        x = (b1/p1) - y*p2;
    }
    return x,y;
}

function projection(target_vector, base_vector){
    //Finds the distance along 'base_vector' the vector 'target_vector' is projected
    dot_product = inner_product(target_vector ,base_vector);
    base_size = Math.sqrt(inner_product(base_vector, base_vector));
    span = dot_product / base_size;
    return span;
}

function scale_vector(original_vector, scale){
    // Multiplies the each component of the original vector by 'scale'
    new_1 = scale * original_vector[0];
    new_2 = scale * original_vector[1];
    new_vector = [new_1, new_2];
    return new_vector;
}

function unpackVertices (vertices) {
    //to unpack the array of vertices allowing us to operate and place them on the graph with ease of control
    for (i=0; i<vertices.length-1; i++) {
        let current_vertex = vertices[i];
        current_vertex.gObject(green, 3),
        current_vertex.arrowHead(green, 3);
    }
    return;
}

function computeBasis(x3,y3) {
    currentPoint3 = [x3, y3];

    rho3 = Math.sqrt(x3**2+y3**2);
    phi3 = Math.atan(x3/y3);

    dx3 = 1;
    dy3 = 1;


    if (x3<0 && y3>0){
    dx3=-dx3;
    }else if (x3>0 && y3<0){
    dy3=-dy3;
    }else if (x3<0 && y3<0){
    dx3=-dx3;
    dy3=-dy3;
    }else{}

    //This is how we first declare objects

    let vnumber =4;
    let hnumber = 4;



    let lhsx = [];
    let rhsx = [];
    let lhsy = [];
    let rhsy = [];
    let widths = [];
    let colours = []

    for (i=0; i<hnumber;i++){
        for (j=0;j<vnumber;j++){
            colorscale= [250*Math.cos(i*x3),0,Math.abs(250*Math.sin(i*x3))]
            for (let jj=0; jj<2;jj++){
                for (let ii=0;ii<2;ii++) {
                    if (x3 >= 0) {
                        lhsx.push(((-1) ** ii) * x3 * (i));
                        rhsx.push(((-1) ** ii) * x3 * (i + 1));
                        lhsy.push(((-1) ** jj) * j*y3);
                        rhsy.push(((-1) ** jj) * j*y3);
                        colours.push(colorscale);
                        widths.push(Math.abs((hnumber-i)*x3));
                    } else {
                        lhsx.push(((-1) ** ii) * x3 * (i+1));
                        rhsx.push(((-1) ** ii) * x3 * (i));
                        lhsy.push(((-1) ** jj) * j*y3);
                        rhsy.push(((-1) ** jj) * j*y3);
                        colours.push(colorscale);
                        widths.push(Math.abs((hnumber-i)*x3));
                    }
                }
            }
        }
     }

    let colors1 = [];
    let colors2 = [];
    let colors3 = [];
    //let colors_string = (eval(colors));

    for (i=0; i<lhsx.length;i++){
        colors1.push(colours[i][0]);
        colors2.push(colours[i][1]);
        colors3.push(colours[i][2]);
    }
    let yolo = [];
    for (i=0; i<lhsx.length;i++) {
        yolo.push("rgb(" + colors1[i] + "," + colors2[i] + "," + colors3[i] + ")");

    }


    let vertices = [];
    for (i=0; i<lhsx.length; i++){
        let a = new Line2d([[lhsx[i], lhsy[i]], [rhsx[i], rhsy[i]]]);
        vertices.push(color= a.gObject(yolo[i], widths[i]));
        vertices.push(color= a.arrowHead(yolo[i] , widths[i]));
    }

        function isPositive(x){
        if (Math.abs(x) === x) {
        return true;
        } else {
        return false;
        }
    }

    var data = [];

    for (i=0;i<vertices.length; i++){
        data.push(vertices[i])
        }
    return data;
}

//C: Interactivity

/* We've now got all the functions we need to use such that for a given user input, we have a data output that we'll use.
Now we just have to actually obtain the user input from the HTML file by using JQuery and then plot everything relevant that we want to see*/

function initCarte(type) {
    Plotly.purge("graph");
    initX3 = initialPoint3[0];
    initY3 = initialPoint3[0];


    $("#x3Controller").val(initX3);
    $("#x3ControllerDisplay").val(initX3);
    $("#y3Controller").val(initY3);
    $("#y3ControllerDisplay").val(initY3);
    $("#y3Controller").hide();

    /* ~Jquery
    2.  Declare and store the floating values from x/y- sliders.
        Hint:
            - use document.getElementById('idName').value
            - use parseFloat() to make sure you are getting floating points.
    */


    var x3 = parseFloat(document.getElementById('x3Controller').value);
    var y3 = parseFloat(document.getElementById('y3Controller').value);


    Plotly.newPlot("graph", computeBasis(x3, y3), layout);

    return;
}


//D: Calling

/* Now we have to ask the plots to update every time the user interacts with the visualisation. Here we must both
define what we want it to do when it updates, and then actually ask it to do that. These are the two functions below.
*/

function updatePlot() {
    var data = [];

    var x3 = parseFloat(document.getElementById('x3Controller').value);
    var y3 = parseFloat(document.getElementById('y3Controller').value);


    data = computeBasis(x3,y3);

    Plotly.animate(
        'graph',
        {data: data},
        {
            fromcurrent: true,
            transition: {duration: 0,},
            frame: {duration: 0, redraw: false,},
            mode: "immediate"
        }
    );
}

function main() {
    computeBasis(initialPoint3[0],initialPoint3[1]);

    /*Jquery*/ //NB: Put Jquery stuff in the main not in HTML
    $("input[type=range]").each(function () {
        /*Allows for live update for display values*/
        $(this).on('input', function(){
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
            $("#"+$(this).attr("id") + "Display").val( $(this).val());
            //NB: Display values are restricted by their definition in the HTML to always display nice number.
            updatePlot(); //Updating the plot is linked with display (Just My preference)
        });

    //Update sliders if value in box is changed


    });

    $("#x3ControllerDisplay").change(function () {
     var value = this.value;
     $("#x3Controller").val(value);
     updatePlot();
    });

    $("#y3ControllerDisplay").change(function () {
     var value = this.value;
     $("#y3Controller").val(value);
     $("#y3Controller").hide();
     updatePlot();
    });


    /*Tabs*/
    $(function() {
        $('ul.tab-nav li a.button').click(function() {
            var href = $(this).attr('href');
            $('li a.active.button', $(this).parent().parent()).removeClass('active');
            $(this).addClass('active');
            $('.tab-pane.active', $(href).parent()).removeClass('active');
            $(href).addClass('active');

            initCarte(href); //re-initialise when tab is changed
            return false;
        });
    });

    //The First Initialisation - I use 's' rather than 'z' :p
    initCarte("#basis");
    updatePlot(); //Shows initial positions of vectors
    }

$(document).ready(main); //Load main when document is ready.

//JS for Vis2

//allpoints for storing charges, maxpoints to limit total n of allpoints, newchargex/y for position of new charge on top

let width = $('#sketch-holder').width(), height = $('#sketch-holder').height(), allpoints = [], maxpoints = 10, newchargex = 240, newchargey = 38, line_ele = [];
const Nvertices = 700, max_range = 2000, R = 16, square_size = 100, padding = 50, rect_height = height/8, arrow_size = 2;

//Used to prevent things from overlapping one another
class volume_element {
    constructor(x, y, w, l) {
        this.y = y;
        this.x = x;
        this.w = w;
        this.l = l;
    }
}

//de charge
class charge {
    constructor(q, x, y){
        this.q = q;
        this.x = x;
        this.y = y;
        this.r = R;
        this.clicked = false;
        
        //Colour of charge in relation to magnitude and polarity
        if (q > 0){
            let tune1 = Math.round(180 - 120*(1-Math.exp(-Math.abs(q))));
            let tune2 = Math.round(90*(Math.exp(-Math.abs(q))));
            this.color = "rgb(255," + tune1.toString() + "," + tune2.toString() + ")";
        } else if (q < 0){
            let tune1 = Math.round(120*(Math.exp(-Math.abs(q))));
            let tune2 = Math.round((180 - 120*(1-Math.exp(-Math.abs(q)))));
            this.color = "rgb(" + tune1.toString() + "," + tune2.toString() + ",255)";
        } else {
            this.color = "#00FF00";
        }

        //Relate the number of field lines to the magnitude of the charge
        this.n_lines = 3 + 10*Math.abs(q);
    }

    //Cursor interactivity
    pressed(){
        if (dist(mouseX, mouseY, this.x, this.y) < this.r){
            this.clicked = true;
        }
    }

    dragposition(){
            this.x = mouseX;
            this.y = mouseY;
    }

    intersect(){
        let areintersecting = false;
        for (let i = 0; i < allpoints.length; i++) {
            if(allpoints[i] != this){
                if (parseFloat(dist(mouseX, mouseY, allpoints[i].x, allpoints[i].y)) <= R*2){
                    areintersecting = true;
                }
            }
        }
        if (parseFloat(Math.abs(mouseX-v1.x)) <= R && v1.y - R <= mouseY && mouseY <= v1.y + v1.l + R){
            areintersecting = true;
        }
        if (parseFloat(Math.abs(mouseX-v1.x - v1.w)) <= R && v1.y - R <= mouseY && mouseY <= v1.y + v1.l + R){
            areintersecting = true;
        }
        if (parseFloat(Math.abs(mouseY-v1.y - v1.l)) <= R && v1.x - R <= mouseX && mouseX <= v1.x + v1.w + R){
            areintersecting = true;
        }
        if (parseFloat(Math.abs(mouseY - v1.y)) <= R && v1.x - R <= mouseX && mouseX <= v1.x + v1.w + R){
            areintersecting = true;
        }
        return areintersecting;
    }
}

//Selects the charge that user wants
class charge_selector{
    constructor(q, x, y){
        this.q = q;
        this.x = x;
        this.y = y;
        this.r = R;
        this.clicked = false;

        //Colour of charge in relation to magnitude and polarity
        if (q == 0){
            this.color = "#00FF00";
        } else if (q > 0){
            let tune1 = Math.round(180 - 120*(1-Math.exp(-Math.abs(q))));
            let tune2 = Math.round(90*(Math.exp(-Math.abs(q))));
            this.color = "rgb(255," + tune1.toString() + "," + tune2.toString() + ")";
        } else {
            let tune1 = Math.round(120*(Math.exp(-Math.abs(q))));
            let tune2 = Math.round((180 - 120*(1-Math.exp(-Math.abs(q)))));
            this.color = "rgb(" + tune1.toString() + "," + tune2.toString() + ",255)";
        }
    }
    
    //God's hand to pull charge out of thin air 
    pressed(){
        if (dist(mouseX, mouseY, this.x, this.y) < this.r){
            if (this.q != 0) {
                let q = new charge(this.q, this.x, this.y);
                allpoints.push(q);
            }
        }
    }
}

//de line
class line_element {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.clicked = false;
        this.r = 50;
    }

    //Cursor interactivity
    pressed(){
        if (dist(mouseX, mouseY, this.x, this.y) < this.r){
            this.clicked = true;
        }
    }

    dragposition(){
            this.x = mouseX;
            this.y = mouseY;
    }
}

//The special case care taker, delete at your own peril
function structural(n) {
    let x = newchargex, y = newchargey;
    fill(50);
    textSize(10);
    textAlign(CENTER);
    text('Author: Darren Lean', x, y + 30);
    if (dist(mouseX, mouseY, x, y) < R) {
        text("You can't catch me!", x, y - 22);
        textSize(15);
        text('Poofff  : p', x, y);
    } else {
        if (n < maxpoints) {
            text('Peek a boo!', x, y - 22);
            noStroke();
            fill(247, 202, 24);
            ellipse(x, y, 2*R, 2*R);
            fill(0);
            ellipse(x - 8, y - 4, 5, 5);
            ellipse(x + 8, y - 4, 5, 5);
            arc(x, y + 1, 20, 20, radians(0), radians(180));
        } else {
            text('Oh no! You have used all of them.', x, y - 22);
            noStroke();
            fill(247, 202, 24);
            ellipse(x, y, 2*R, 2*R);
            stroke(51);
            line(x - 8, y - 6, x - 4, y - 2);
            line(x - 8, y - 2, x - 4, y - 6);
            line(x + 4, y - 6, x + 8, y - 2);
            line(x + 4, y - 2, x + 8, y - 6);
            fill(153, 153, 0);
            ellipse(x, y + 6, 6, 6);
        }
    }
}

//Adds the starting points of the field lines around the charge
function initial_fieldpoints(Qposition, R, n_lines){
    let x0=[], y0=[];

    for (let i = 0; i < n_lines; i++) {
        let theta = 2*i*(Math.PI/n_lines);          //putting the dots around the circle
        x0.push(Qposition[0] + R*Math.cos(theta)/2);
        y0.push(Qposition[1] + R*Math.sin(theta)/2);
    }
    return([x0,y0]);
}

function draw_fieldlines(initialx, initialy, q, allpoints){
    let xfield0 = initialx, yfield0 = initialy, xfield1 = 0, yfield1 = 0;
    
    //Change the magnitude of charge to fix the sizes of arrows and field lines 
    //The polarity of q determines the direction of the arrow
    if (q > 0) {
        q = +1;
    } else {
        q = -1;
    }

    for (let i = 0; i < Nvertices; i++) {
        //Area inside the top blue box to not draw fieldlines
        if(xfield0 > width+padding||xfield0 < 0 - padding||yfield0 > height+padding||yfield0 < 0-padding){return;}
        let Fx = 0, Fy = 0, Ftotal;
        for (let k = 0; k < allpoints.length; k++) {
            let r = Math.sqrt(((xfield0 - allpoints[k].x) ** 2 + (yfield0 - allpoints[k].y) ** 2));
            //Calcuating the field strength
            Fx += (allpoints[k].q)*(xfield0 - allpoints[k].x) / (Math.pow(r,3));
            Fy += (allpoints[k].q)*(yfield0 - allpoints[k].y) / (Math.pow(r,3));
        }
        Ftotal = Math.sqrt(Fx ** 2 + Fy ** 2);
        //Scaling the step size
        let dx = q * (max_range/Nvertices) * (Fx / Ftotal),
            dy = q * (max_range/Nvertices) * (Fy / Ftotal);
        //Prepare to draw the line
        xfield1 = xfield0 + dx;
        yfield1 = yfield0 + dy;
        stroke("rgb(120, 120, 120)");
        line(xfield0, yfield0, xfield1, yfield1);       //Draw the field line
        if (i == Math.round(Nvertices/12)) {            //Draw the arrow if condition is met
            line(xfield0 - q*dy*arrow_size, yfield0 + q*dx*arrow_size, xfield0 + arrow_size*q*dx, yfield0 + arrow_size*q*dy);
            line(xfield0 + q*dy*arrow_size, yfield0 - q*dx*arrow_size, xfield0 + arrow_size*q*dx, yfield0 + arrow_size*q*dy);
        }
        xfield0 = parseFloat(xfield1);                  //Prepare the initial coordinates for drawing next bit of field line
        yfield0 = parseFloat(yfield1);
    }
}

//function that 'move' a charge when it is clicked
function mousePressed(){
    for (let i = 0; i < allpoints.length; i++) {
        allpoints[i].pressed();
    }
    for (let i = 0; i < line_ele.length; i++) {
        line_ele[i].pressed();
    }
}

function mouseReleased() {
    for (let i = 0; i < allpoints.length; i++) {
        if (allpoints[i].y < rect_height || allpoints[i].y > height|| allpoints[i].x > width || allpoints[i].x < 0 ){
            allpoints.splice(i,1);
        } else {
            allpoints[i].clicked = false;
        }
    }
    for (let i = 0; i < line_ele.length; i++) {
        line_ele[i].clicked = false;
    }
}

//Used to prevent things from overlapping one another
v1 = new volume_element(width/2, height/2, width/8, width/8);

//draw canvas in which everything p5.js happens
function setup() {
    let canvas = createCanvas(width,height);
    canvas.parent('sketch-holder');
    frameRate(60);
}

//main function that repeats as soon as the last line is called
function draw() {
    clear();

    let fixedpoints = [];
    q1 = new charge(1, 250, 250);
    fixedpoints.push(q1);
    q2 = new charge(-1, 750, 500);
    fixedpoints.push(q2);

    //draws fieldlines of charges 
    for (let i = 0; i < fixedpoints.length; i++){
        let [x0, y0] = initial_fieldpoints([fixedpoints[i].x, fixedpoints[i].y], fixedpoints[i].r, fixedpoints[i].n_lines);
        for (let j = 0; j < x0.length; j++) {
            draw_fieldlines(x0[j], y0[j], fixedpoints[i].q, fixedpoints);
        }
    }

    //draw and colour all the points
    for (let i = 0; i < fixedpoints.length; i++) {
        noStroke(1);
        fill("rgb(0, 0, 0)");
        ellipse(fixedpoints[i].x, fixedpoints[i].y, R);
    }

    line_ele.push(new line_element(500, 375));
    //WARNING: do not change the order of the transformations, i.e. translate and rotate
    let angle = parseFloat(document.getElementById('angle').value)*3.14/180;
    let Fx = 0, Fy = 0, Ftotal;
    for (let k = 0; k < fixedpoints.length; k++) {
        let r = Math.sqrt(((line_ele[0].x - fixedpoints[k].x) ** 2 + (line_ele[0].y - fixedpoints[k].y) ** 2));
        //Calcuating the field strength
        Fx += (fixedpoints[k].q)*(line_ele[0].x - fixedpoints[k].x) / (Math.pow(r,3));
        Fy += (fixedpoints[k].q)*(line_ele[0].y - fixedpoints[k].y) / (Math.pow(r,3));
    }
    Ftotal = Math.sqrt(Fx ** 2 + Fy ** 2);
    //Scaling the step size
    let dx = 5*(Fx / 0.00001)*(2/(1+Math.exp(-Math.abs(Fx / Ftotal))) + 1),
        dy = 5*(Fy / 0.00001)*(2/(1+Math.exp(-Math.abs(Fy / Ftotal))) + 1);
    //Prepare to draw the line
    xfield1 = line_ele[0].x + dx;
    yfield1 = line_ele[0].y + dy;
    stroke("rgb(120, 120, 120)");
    strokeWeight(4);
    line(line_ele[0].x, line_ele[0].y, xfield1, yfield1);       //Draw the field line
    line(xfield1 - 10*Fx/Ftotal - 10*Fy/Ftotal , yfield1 - 10*Fy/Ftotal + 10*Fx/Ftotal , xfield1, yfield1);
    line(xfield1 - 10*Fx/Ftotal + 10*Fy/Ftotal , yfield1 - 10*Fy/Ftotal - 10*Fx/Ftotal , xfield1, yfield1);
    strokeWeight(1);
    fill(0, 0, 0);
    text('F', 1.02*xfield1, 1.02*yfield1);

    //Compute flux
    document.getElementById('flux').value = Math.round(100000*(Fx*Math.cos(angle) - Fy*Math.sin(angle)));

    translate(line_ele[0].x, line_ele[0].y);
    rotate(-angle);

    //Draw the line element
    noFill();
    stroke("#48A9A6");
    strokeWeight(4);
    //Line element
    line(0, -30, 0, 30);
    stroke(51);
    //Arrow body
    line(0, 0, 30, 0);
    //Arrow head
    line(30 - 5, 0 - 5, 30, 0);
    line(30 - 5, 0 + 5, 30, 0);
    translate(38, 3);
    rotate(angle);
    textAlign(CENTER);
    strokeWeight(1);
    text('d', 0, 0);
    strokeWeight(1.5);
    text('S', 8, 0);
    strokeWeight(1);
    rotate(-angle);
    translate(-38, -3);
    rotate(angle);
    translate(-line_ele[0].x, -line_ele[0].y);

    if (line_ele[0].clicked == true){
        cursor(HAND);
        line_ele[0].dragposition();
    } else {
        cursor(ARROW);
    }

    //draw the top blue rectangle box that contains the text, slider and new charge
    noStroke();
    fill(247, 252, 251);
    rect(0, 0, width, rect_height);

    stroke(72, 99, 95);
    line(0, rect_height, width, rect_height);

}
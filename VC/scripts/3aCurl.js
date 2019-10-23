class Arrow{
    //class currently only works for 2d arrows drawn at z = 0 on a 3d plot.
    //need to edit GetDrawData if you want 3d arrows.
    constructor(x1, y1, x2, y2, HeadSize){
        //x1 and y1 are coords of tail of arrow
        //x2 and y2 are coords of head of arrow
        //HeadSize sets the size of the arrowhead.
        this.TailPos = [x1, y1];
        this.HeadPos = [x2, y2];

        this.HeadSize = HeadSize;
        this.HeadAngle = Math.PI/4;

        this.r = this.GetLength(this.HeadPos, this.TailPos);
        this.theta = this.GetTheta(this.HeadPos, this.TailPos);

    }

    GetHeadPos(){
        return this.HeadPos;
    }

    GetTailPos(){
        return this.TailPos;
    }

    GetLength(){
        return Math.sqrt((this.HeadPos[0] - this.TailPos[0])**2 + (this.HeadPos[1] - this.TailPos[1])**2);
    }

    GetTheta(){
        return Math.atan2((this.HeadPos[1] - this.TailPos[1]), (this.HeadPos[0] - this.TailPos[0]));
    }

    GetDrawData3D(){
        //need arrays of x values and arrays of y values
        //first line is main body of arrow

        //let FirstLine = [[this.TailPos[0], this.HeadPos[0]],  [this.TailPos[1], this.HeadPos[1]]];

        let Ax = this.HeadPos[0] - this.HeadSize*Math.sin((Math.PI/2) - this.theta + this.HeadAngle);
        let Ay = this.HeadPos[1] - this.HeadSize*Math.cos((Math.PI/2) - this.theta + this.HeadAngle);
        //let PointA = [Ax, Ay];

        let Bx = this.HeadPos[0] - this.HeadSize*Math.sin((Math.PI/2) - this.theta - this.HeadAngle);
        let By = this.HeadPos[1] - this.HeadSize*Math.cos((Math.PI/2) - this.theta - this.HeadAngle);
        //let PointB = [Bx, By];

        //let SecondLine = [[this.HeadPos[0], Ax], [this.HeadPos[1], Ay]];
        //let ThirdLine = [[this.HeadPos[0], Bx], [this.HeadPos[1], By]];
        let FirstLine = {};
        let SecondLine = {};
        let ThirdLine = {};

        if (this.r <= 0.000001){
            FirstLine = {
                type: "scatter3d",
                mode: "lines",
                x: [this.TailPos[0], this.HeadPos[0]],
                y: [this.TailPos[1], this.HeadPos[1]],
                z: [0,0],
                line: {color: "blue", width: 3},
                hoverinfo: "skip"
            };

            SecondLine = {
                type: "scatter3d",
                mode: "lines",
                x: [this.HeadPos[0], Ax],
                y: [this.HeadPos[1], Ay],
                z: [0,0],
                line: {color: "blue", width: 3},
                hoverinfo: "skip"
            };

            ThirdLine = {
                type: "scatter3d",
                mode: "lines",
                x: [this.HeadPos[0], Bx],
                y: [this.HeadPos[1], By],
                z: [0,0],
                line: {color: "blue", width: 3},
                hoverinfo: "skip"
            };
        }else{

            FirstLine = {
                type: "scatter3d",
                mode: "lines",
                x: [this.TailPos[0], this.HeadPos[0]],
                y: [this.TailPos[1], this.HeadPos[1]],
                z: [0,0],
                line: {color: "blue", width: 3},
                hoverinfo: "skip"
            };

            SecondLine = {
                type: "scatter3d",
                mode: "lines",
                x: [this.HeadPos[0], Ax],
                y: [this.HeadPos[1], Ay],
                z: [0,0],
                line: {color: "blue", width: 3},
                hoverinfo: "skip"
            };

            ThirdLine = {
                type: "scatter3d",
                mode: "lines",
                x: [this.HeadPos[0], Bx],
                y: [this.HeadPos[1], By],
                z: [0,0],
                line: {color: "blue", width: 3},
                hoverinfo: "skip"
            };
        }

        return [FirstLine, SecondLine, ThirdLine];
    }

    GetDrawData2D(){

        //need arrays of x values and arrays of y values
        //first line is main body of arrow

        //let FirstLine = [[this.TailPos[0], this.HeadPos[0]],  [this.TailPos[1], this.HeadPos[1]]];

        let Ax = this.HeadPos[0] - this.HeadSize*Math.sin((Math.PI/2) - this.theta + this.HeadAngle);
        let Ay = this.HeadPos[1] - this.HeadSize*Math.cos((Math.PI/2) - this.theta + this.HeadAngle);
        //let PointA = [Ax, Ay];

        let Bx = this.HeadPos[0] - this.HeadSize*Math.sin((Math.PI/2) - this.theta - this.HeadAngle);
        let By = this.HeadPos[1] - this.HeadSize*Math.cos((Math.PI/2) - this.theta - this.HeadAngle);
        //let PointB = [Bx, By];

        //let SecondLine = [[this.HeadPos[0], Ax], [this.HeadPos[1], Ay]];
        //let ThirdLine = [[this.HeadPos[0], Bx], [this.HeadPos[1], By]];
        let FirstLine = {};
        let SecondLine = {};
        let ThirdLine = {};

        if (this.r == 0){
            FirstLine = {
                type: "scatter",
                mode: "lines",
                x: [this.TailPos[0], this.HeadPos[0]],
                y: [this.TailPos[1], this.HeadPos[1]],
                line: {color: "blue", width: 0},
                hoverinfo: "skip"
            };

            SecondLine = {
                type: "scatter",
                mode: "lines",
                x: [this.HeadPos[0], Ax],
                y: [this.HeadPos[1], Ay],
                line: {color: "blue", width: 0},
                hoverinfo: "skip"
            };

            ThirdLine = {
                type: "scatter",
                mode: "lines",
                x: [this.HeadPos[0], Bx],
                y: [this.HeadPos[1], By],
                line: {color: "blue", width: 0},
                hoverinfo: "skip"
            };
        }else{

            FirstLine = {
                type: "scatter",
                mode: "lines",
                x: [this.TailPos[0], this.HeadPos[0]],
                y: [this.TailPos[1], this.HeadPos[1]],
                line: {color: "blue", width: 2},
                hoverinfo: "skip"
            };

            SecondLine = {
                type: "scatter",
                mode: "lines",
                x: [this.HeadPos[0], Ax],
                y: [this.HeadPos[1], Ay],
                line: {color: "blue", width: 1},
                hoverinfo: "skip"
            };

            ThirdLine = {
                type: "scatter",
                mode: "lines",
                x: [this.HeadPos[0], Bx],
                y: [this.HeadPos[1], By],
                line: {color: "blue", width: 1},
                hoverinfo: "skip"
            };
        }

        return [FirstLine, SecondLine, ThirdLine];
    }

};


function getVectorData(curl, x_max, PlotStep){
    let ArrowData = [];
    //let z = [];
    let VectorData = [];

    let CurrentArrow, LineStuff;

    let x = [];
    let y = [];

    let x2 = 0;
    let y2 = 0;
    let b = 0;
    let c = 0;

    for (let i = -x_max; i <= x_max; i += PlotStep){
        for (let j = -x_max; j <= x_max; j += PlotStep){
            x[0] = i;
            y[0] = j;

            let scaleFactor = 0.07;

            if (curl >= 0){
                x2 = 50 - (y[0]-2)*curl;
                y2 = 0;
            } else if (curl < 0) {
                x2 = 50 - (y[0]-18)*curl;
                y2 = 0;
            };


            x2 *= scaleFactor;
            y2 *= scaleFactor;

            x[1] = x[0] + x2;
            y[1] = y[0] + y2;

            ArrowData = [x, y];

            CurrentArrow = new Arrow(ArrowData[0][0], ArrowData[1][0], ArrowData[0][1], ArrowData[1][1], 0.5);
            LineStuff = CurrentArrow.GetDrawData2D();

            VectorData.push(LineStuff[0]);
            VectorData.push(LineStuff[1]);
            VectorData.push(LineStuff[2]);
        }
    }
    return VectorData;
};

//B: Maths

/*Next comes all the mathematical functions that are used, if you think a library will do a particular job
that's fine, no need to recreate stuff, but any functions you need to construct yourself should go in this
next block*/


//D: Calling

/* Now we have to ask the plots to update every time the user interacts with the visualisation. Here we must both
define what we want it to do when it updates, and then actually ask it to do that. These are the two functions below.
*/

function updatePlot(layout) {
    let curl = parseFloat(document.getElementById('x3Controller').value);
    let data = getVectorData(curl, 18, 4)

//    Plotly.animate(
//        'graph',
//        {data: data},
//        {
//            fromcurrent: true,
//            transition: {duration: 0,},
//            frame: {duration: 0, redraw: false,},
//            mode: "afterall"
//        }
//    );

    Plotly.react("graph", data, layout);
}





function main() {
    const initialPoint = [0, 1];
    const initialPoint1 = [1.1, 0.1];
    const initialPoint2 = [0.1,1.1];
    const initialPoint3 = [1,1];
    const layout = {
        title:"Vector Field with Constant Curl",
        autosize: true,
        //width: 450, "height": 500,
        margin: {l:30, r:30, t:30, b:30},
        hovermode: "closest",
        showlegend: false,
        xaxis: {range: [0, 20],
                zeroline: false,
                showticklabels: false,
//                showgrid: false,
                zeroline: false,
                showline: false,
                },
        yaxis: {range: [0, 20],
                zeroline: false,
                showticklabels: false,
//                showgrid: false,
                zeroline: false,
                showline: false,
                },
        aspectratio: {x:1, y:1},

    };
    let currentPoint = initialPoint;
    let initX1 = 0, initY1 = 0;
    let initX2 = 0, initY2 = 0;
    let isBlackText = false;

    updatePlot(layout);

    /*Jquery*/ //NB: Put Jquery stuff in the main not in HTML
    $("input[type=range]").each(function () {
        /*Allows for live update for display values*/
        $(this).on('input', function(){
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
            $("#"+$(this).attr("id") + "Display").val( $(this).val());
            //NB: Display values are restricted by their definition in the HTML to always display nice number.
            updatePlot(layout); //Updating the plot is linked with display (Just My preference)
        });



    });

    }

$(document).ready(main); //Load main when document is ready.
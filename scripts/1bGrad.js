//Below prepares the x,y coordinate data to be calculated, depending on the plot step.
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

function GetVectorData(a, x_max, PlotStep){
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
    let equation = selectEquation();

    switch (equation){
        case "Reciprocal": //reciprocal
            for (let i = -x_max; i <= x_max; i += PlotStep){
                for (let j = -x_max; j <= x_max; j += PlotStep){
                    x[0] = i;
                    y[0] = j;

                    let scaleFactor = 500;

                    x2 = -a/(x[0]**2 + y[0]**2)**1.5*x[0]
                    y2 = -a/(x[0]**2 + y[0]**2)**1.5*y[0]


                    x2 = (x2**2*scaleFactor)**0.15*x2;
                    y2 = (y2**2*scaleFactor)**0.15*y2;

                    x[1] = x[0] + x2;
                    y[1] = y[0] + y2;

                    ArrowData = [x, y];

                    CurrentArrow = new Arrow(ArrowData[0][0], ArrowData[1][0], ArrowData[0][1], ArrowData[1][1], 2);
                    LineStuff = CurrentArrow.GetDrawData2D();

                    VectorData.push(LineStuff[0]);
                    VectorData.push(LineStuff[1]);
                    VectorData.push(LineStuff[2]);
                }
            }
            break;


        case "Gaussian":  //gaussian type

            for (let i = -x_max; i <= x_max; i += PlotStep){
                for (let j = -x_max; j <= x_max; j += PlotStep){
                    x[0] = i;
                    y[0] = j;

                    let scaleFactor = 200;

                    x2 = -a/100*Math.exp( -(x[0]**2 + y[0]**2)/200 )*x[0];
                    y2 = -a/100*Math.exp( -(x[0]**2 + y[0]**2)/200 )*y[0];

                    x2 = Math.sqrt(x2**2*scaleFactor)*x2;
                    y2 = Math.sqrt(y2**2*scaleFactor)*y2;

                    x[1] = x[0] + x2;
                    y[1] = y[0] + y2;

                    ArrowData = [x, y];

                    CurrentArrow = new Arrow(ArrowData[0][0], ArrowData[1][0], ArrowData[0][1], ArrowData[1][1], 2);
                    LineStuff = CurrentArrow.GetDrawData2D();

                    VectorData.push(LineStuff[0]);
                    VectorData.push(LineStuff[1]);
                    VectorData.push(LineStuff[2]);

                }
            }

            break;

        case "Sinusodial": //cos type
            for (let i = -x_max; i <= x_max; i += PlotStep){
                for (let j = -x_max; j <= x_max; j += PlotStep){
                    //ArrowData = GetArrowPoints(i, j, Equation, A);
                    x[0] = i;
                    y[0] = j;

                    let scaleFactor = 0.6

                    x2 = 0;
                    y2 = a*2*Math.PI/15*Math.cos(2*Math.PI/15*x[0]);

                    x2 *= scaleFactor;
                    y2 *= scaleFactor;

                    x[1] = x[0] + x2;
                    y[1] = y[0] + y2;

                    ArrowData = [x, y];

                    CurrentArrow = new Arrow(ArrowData[0][0], ArrowData[1][0], ArrowData[0][1], ArrowData[1][1], 1);
                    LineStuff = CurrentArrow.GetDrawData2D();

                    VectorData.push(LineStuff[0]);
                    VectorData.push(LineStuff[1]);
                    VectorData.push(LineStuff[2]);

                }
            }
            break;
    }



    return VectorData;
};

//function GetArrowPoints(x1, y1, A){
//    let x = [x1];
//    let y = [y1];
//
//    let x2 = 0;
//    let y2 = 0;
//
//    let b = 0;
//    let c = 0;
//
//    let equation = selectEquation();
//
//    switch (equation){
//        case "Reciprocal": //reciprocal
//            b = 1/A;
//            x2 = -A*b**2*x1*((b*x1)**2 + (b*y1)**2)**(-3/2);
//            y2 = -A*b**2*y1*((b*x1)**2 + (b*y1)**2)**(-3/2);
//            break;
//
//        case "Gaussian":  //gaussian type
//            c = 50;
//            b = 1/500;
//            x2 = 2*A*b*((x1 - c)*Math.exp(-b*((x1 - c)**2 + y1**2))-(x1 + c)*Math.exp(-b*((x1 + c)**2 + y1**2)));
//            y2 = 2*A*b*y1*(Math.exp(-b*((x1 - c)**2 + y1**2))-Math.exp(-b*((x1 + c)**2 + y1**2)));
//            break;
//
//        case "Sinusodial": //cos type
//            b = 0.1;
//            x2 = -A*b*Math.sin(b*x);
//            y2 = 0;
//            break;
//    }
//    x2 = x2*4;
//    y2 = y2*4;
//    x.push(x1 + x2);
//    y.push(y1 + y2);
//
//    return [x, y];
//};

function setupSurfaceData(xMin, xMax, yMin, yMax, plotStep){
    let xSurface = [];
    let ySurface = [];

    for (let i = xMin; i <= xMax; i += plotStep){
        xSurface.push(i);
    };

    for (let j = yMin; j <= yMax; j += plotStep){
        ySurface.push(j);
    };

    return [xSurface , ySurface]
};

//Line 1 is the horizontal line where y = 0.
//Line 2 is a sinusodial path.
function setupLineAData(xLineMin, xLineMax, yLineMin, yLineMax, plotLineStep) {
    let xLine = [];
    let yLine = [];

    for (let i = xLineMin; i <= xLineMax; i += plotLineStep){
        xLine.push(i);
    };

    for (let j = xLineMin; j <= xLineMax; j += plotLineStep){
        yLine.push(0);
    };

    return [xLine , yLine]
};

//path2 draws sinusodial line.
function path2(x){
    return 10 * Math.sin( (2*Math.PI/42) * (x+16) )
};

function setupLineBData(xLineMin, xLineMax, yLineMin, yLineMax, plotLineStep){
    let xLine = [];
    let yLine = [];

    for (let i = xLineMin; i <= xLineMax; i += plotLineStep){
        xLine.push(i);
        yLine.push( path2(i) );
    };
    return [xLine , yLine]
};

//Below we calculate the function values f(x,y).

//for surface plot.
function gaussianSurface1b (a, sigma, xSurface,ySurface){
    let zSurface = [];
    for (let xValue in xSurface){
        let zArray = [];
        for (let yValue in ySurface){
            zArray.push(a*Math.exp(-1*(xSurface[xValue]**2 + ySurface[yValue]**2)/(2*sigma**2)));
        };
        zSurface.push(zArray);
    };
    return zSurface;
};

//for line plot.
function gaussianLine1b (a, sigma, xLine, yLine){
    let zLine = [];
    for (let xValue in xLine){
            zLine.push(a*Math.exp(-1*(xLine[xValue]**2 + yLine[xValue]**2)/(2*sigma**2)));
        };
    return zLine;
};

//for point plot.
function gaussianPoint1b (a, sigma, xPoint, yPoint){
    return a*Math.exp(-1*(xPoint**2 + yPoint**2)/(2*sigma**2));
};

function reciprocalSurface1b(a, xSurface, ySurface){
    let zSurface = [];
    for (let xValue in xSurface){
            let zArray = [];
            for (let yValue in ySurface){
//                zArray.push(a*xSurface[xValue]*ySurface[yValue])
//                  zArray.push(5)
                zArray.push(a/(( xSurface[xValue]**2 + ySurface[yValue]**2)**0.5) );
//        zArray.push(a)
            };
            zSurface.push(zArray);
        };
    return zSurface;
};

function reciprocalLine1b (a, xLine, yLine){
    let zLine = [];
    for (let xValue in xLine){
            zLine.push(a/Math.sqrt(xLine[xValue]**2 + yLine[xValue]**2));
        };
    return zLine;
};

function reciprocalPoint1b (a, xPoint, yPoint){
    return a/Math.sqrt(xPoint**2 + yPoint**2)
};

function sinusodialSurface1b (a, xSurface, ySurface){
    let zSurface = [];
    for (let xValue in xSurface){
            let zArray = [];
            for (let yValue in ySurface){
                zArray.push(0.8* a * Math.sin(2* Math.PI/12 * xSurface[xValue]) );
            };
            zSurface.push(zArray);
        };
    return zSurface;
};

function sinusodialLine1b (a, xLine, yLine) {
    let zLine = [];
    for (let yValue in yLine){
            zLine.push(0.8 * a * Math.sin(2* Math.PI/12 * yLine[yValue]) );
        };
    return zLine;
};

function sinusodialPoint1b (a, xPoint, yPoint){
    return 0.8 * a * Math.sin(2* Math.PI/12 * yPoint)
};


//Below we prepare the data in the structure that plotly takes.
function dataSurfaceCompile(xSurface,ySurface,zSurface){
     let dataSurface = {
                         x: xSurface,
                         y: ySurface,
                         z: zSurface,
                         type: 'surface',
                         name: 'Scalar Field',
                         showscale: false
                     };
    return dataSurface;
};

function dataLineACompile(xLine, yLine, zLine){
    let dataLine = {
                         x:xLine,
                         y:yLine,
                         z:zLine,
                         type: 'scatter3d',
                         mode: 'lines',
                         line: {
                                color: 'rgb(255,255,0)',
                                width: 10
                              },
                         name: 'Path 1',
                         showscale: false
                     };
    return dataLine
};

function dataLineBCompile(xLine, yLine, zLine){
    let dataLine = {
                         x:xLine,
                         y:yLine,
                         z:zLine,
                         type: 'scatter3d',
                         mode: 'lines',
                         line: {
                                color: 'rgb(173,255,47)',
                                width: 10
                              },
                         name: 'Path 2',
                         showscale: false
                     };
    return dataLine
};

function dataLineAVectorCompile(lineArray){
    let xLine = lineArray[0];
    let yLine = lineArray[1];
    let dataLine = {
                         x:xLine,
                         y:yLine,
                         type: 'scatter',
                         mode: 'lines',
                         line: {
                                color: 'rgb(255,255,0)',
                                width: 5
                              },
                         name: 'Path 1',
                         showscale: false
                     };
    return dataLine;
};

function dataLineBVectorCompile(lineArray){
    let xLine = lineArray[0];
    let yLine = lineArray[1];
    let dataLine = {
                         x:xLine,
                         y:yLine,
                         type: 'scatter',
                         mode: 'lines',
                         line: {
                                color: 'rgb(173,255,47)',
                                width: 5
                              },
                         name: 'Path 1',
                         showscale: false
                     };
    return dataLine;
};

function selectEquation(){
    return document.getElementById("Function_Selector").value
};

function dataPointACompile(xPoint, yPoint, zPoint){
    let dataPoint = {
                         x:[xPoint],
                         y:[yPoint],
                         z:[zPoint],
                         type: 'scatter3d',
                         mode: 'markers',
                         marker: {
                                color: 'rgb(238,130,238)',
                                size: 10
                              },
                         name: "Point A",
                         showscale: false
    };
    return dataPoint
};

function dataPointBCompile(xPoint, yPoint, zPoint){
    let dataPoint = {
                         x:[xPoint],
                         y:[yPoint],
                         z:[zPoint],
                         type: 'scatter3d',
                         mode: 'markers',
                         marker: {
                                color: 'rgb(192,192,192)',
                                size: 10
                              },
                         name: "Point B",
                         showscale: false
    };
    return dataPoint
};

function dataBallCompile(xBall, yBall, zBall){
    let dataBall = {
                         x:[xBall],
                         y:[yBall],
                         z:[zBall],
                         type: 'scatter3d',
                         mode: 'markers',
                         marker: {
                                color: 'rgb(255,0,0)',
                                size: 10
                              },
                         name: "Ball",
                         showscale: false
                         };
    return dataBall
};

function plot(xMin, xMax, yMin, yMax, plotStep, xSurface, ySurface, xLineA, yLineA,
                    xLineB, yLineB, xLineMin, yLineMin, xLineMax, yLineMax, dataLineAVector, dataLineBVector, sigma, layoutScalar, layoutVector){

    document.getElementById("Gaussian_eqn").style.display = "none";
    document.getElementById("Reciprocal_eqn").style.display = "none";
    document.getElementById("Sinusodial_eqn").style.display = "none";
    document.getElementById("Grad_Gaussian_eqn").style.display = "none";
    document.getElementById("Grad_Reciprocal_eqn").style.display = "none";
    document.getElementById("Grad_Sinusodial_eqn").style.display = "none";

    let a = parseFloat(document.getElementById('Slider_1').value);
    let xPoint = parseFloat(document.getElementById('Slider_2').value);

    let equation = selectEquation();

    let xBallA = xPoint;
    let yBallA = 0;

    let xBallB = xPoint;
    let yBallB = path2(xPoint);

    let xPointA = xLineMin;
    let yPointA = yLineMin;

    let xPointB = xLineMax;
    let yPointB = yLineMax;

    if (equation === "Gaussian"){

        document.getElementById("Gaussian_eqn").style.display = "block";
        document.getElementById("Grad_Gaussian_eqn").style.display = "block";

        let zSurface = gaussianSurface1b(a, sigma, xSurface, ySurface);
        let dataSurface = dataSurfaceCompile(xSurface, ySurface, zSurface);

        let zLineA = gaussianLine1b(a, sigma, xLineA, yLineA);
        let dataLineA = dataLineACompile(xLineA, yLineA, zLineA);

        let zLineB = gaussianLine1b(a, sigma, xLineB, yLineB);
        let dataLineB = dataLineBCompile(xLineB, yLineB, zLineB);

        let zPointA = gaussianPoint1b(a, sigma, xPointA, yPointA);
        let zPointB = gaussianPoint1b(a, sigma, xPointB, yPointB);

        let dataPointA = dataPointACompile(xPointA, yPointA, zPointA);
        let dataPointB = dataPointBCompile(xPointB, yPointB, zPointB);

        let zBallA = gaussianPoint1b(a, sigma, xBallA, yBallA);

        let zBallB = gaussianPoint1b(a, sigma, xBallB, yBallB);

        let dataBallA = dataBallCompile(xBallA, yBallA, zBallA);

        let dataBallB = dataBallCompile(xBallB, yBallB, zBallB);

        let vectorData = GetVectorData(a, xMax, 5);

        vectorData.push(dataLineAVector);
        vectorData.push(dataLineBVector);

        console.log(dataLineAVector);
        console.log(vectorData);

        Plotly.react("Vector_Graph_1b", vectorData, layoutVector);

        Plotly.react('Scalar_Graph_1b', [dataSurface, dataLineA, dataLineB, dataPointA, dataPointB, dataBallA, dataBallB], layoutScalar);
    }
        else if (equation === "Sinusodial") {

        document.getElementById("Sinusodial_eqn").style.display = "block";
        document.getElementById("Grad_Sinusodial_eqn").style.display = "block";

        let zSurface = sinusodialSurface1b(a, xSurface, ySurface);
        let dataSurface = dataSurfaceCompile(xSurface, ySurface, zSurface);

        let zLineA = sinusodialLine1b(a, xLineA, yLineA);
        let dataLineA = dataLineACompile(xLineA, yLineA, zLineA);

        let zLineB = sinusodialLine1b(a, xLineB, yLineB);
        let dataLineB = dataLineBCompile(xLineB, yLineB, zLineB);

        let zPointA = sinusodialPoint1b(a, xPointA, yPointA);
        let zPointB = sinusodialPoint1b(a, xPointB, yPointB);

        let dataPointA = dataPointACompile(xPointA, yPointA, zPointA);
        let dataPointB = dataPointBCompile(xPointB, yPointB, zPointB);

        let zBallA = sinusodialPoint1b(a, xBallA, yBallA);

        let zBallB = sinusodialPoint1b(a, xBallB, yBallB);

        let dataBallA = dataBallCompile(xBallA, yBallA, zBallA);

        let dataBallB = dataBallCompile(xBallB, yBallB, zBallB);

        let vectorData = GetVectorData(a, xMax, 3);

        vectorData.push(dataLineAVector);
        vectorData.push(dataLineBVector);

        Plotly.react("Vector_Graph_1b", vectorData, layoutVector );

    Plotly.react('Scalar_Graph_1b', [dataSurface, dataLineA, dataLineB, dataPointA, dataPointB, dataBallA, dataBallB], layoutScalar);

    }
    else if (equation === "Reciprocal"){
        document.getElementById("Reciprocal_eqn").style.display = "block";
        document.getElementById("Grad_Reciprocal_eqn").style.display = "block";

        a *= 4;

        let zSurface = reciprocalSurface1b(a, xSurface, ySurface);
        let dataSurface = dataSurfaceCompile(xSurface, ySurface, zSurface);

        let zLineA = reciprocalLine1b(a, xLineA, yLineA);
        let dataLineA = dataLineACompile(xLineA, yLineA, zLineA);

        let zLineB = reciprocalLine1b(a, xLineB, yLineB);
        let dataLineB = dataLineBCompile(xLineB, yLineB, zLineB);

        let zPointA = reciprocalPoint1b(a, xPointA, yPointA);
        let zPointB = reciprocalPoint1b(a, xPointB, yPointB);

        let dataPointA = dataPointACompile(xPointA, yPointA, zPointA);
        let dataPointB = dataPointBCompile(xPointB, yPointB, zPointB);

        let zBallA = reciprocalPoint1b(a, xBallA, yBallA);

        let zBallB = reciprocalPoint1b(a, xBallB, yBallB);

        let dataBallA = dataBallCompile(xBallA, yBallA, zBallA);

        let dataBallB = dataBallCompile(xBallB, yBallB, zBallB);

        let vectorData = GetVectorData(a, xMax, 5);

        vectorData.push(dataLineAVector);
        vectorData.push(dataLineBVector);


        Plotly.react("Vector_Graph_1b", vectorData, layoutVector);

    //    let layout = layout_1b;
//        Plotly.react('Scalar_Graph_1b', [dataSurface, dataLineA, dataLineB, dataPointA, dataPointB, dataBallA, dataBallB], layout);

        Plotly.react('Scalar_Graph_1b', [dataSurface, dataLineA, dataLineB, dataPointA, dataPointB, dataBallA, dataBallB], layoutScalar)
    }
};

function main(){
    let a1b = 5;
    let sigma1b = 10;
    let xMin = -20;
    let xMax = 20;
    let yMin = -20;
    let yMax = 20;
    let plotStep = 0.33;
    let plotLineStep = 0.11;

    let xLineMin = -16;
    let xLineMax = 5;
    let yLineMin = 0;
    let yLineMax = 0;

    let xPos = xLineMin;

    const layoutScalar_1b = {
            title: 'Scalar Field',
            autosize: false,
            width: 500,
            height: 500,
            margin: {
                        l: 65,
                        r: 50,
                        b: 65,
                        t: 90},
            dragmode: 'turntable',
            scene: {
                aspectmode: "cube",
                xaxis: {range: [xMin, xMax], title: 'x'},
                yaxis: {range: [yMin, yMax], title: 'y'},
                zaxis: {range: [-10, 10], title: 'f(x,y)'},

                camera: {
                    up: {x: 0, y: 0, z: 1},//sets which way is up
                    eye: {x: -1, y: -1, z: 1}//adjust camera starting view
                }
            },
        };

    const layoutVector_1b = {
            title: "Gradient Field",
//            autosize: true,
            width: 300,
            height: 300,
            showlegend: false,
//            width: 500,
//            height: 500,
            margin: {
                        l: 0,
                        r: 0,
                        b: 0,
                        t: 0,
            xaxis: {
//                constrain: "domain",
                range: [-22, 22],
                title: "x",
//                showticklabels: false
                //title: "Angle"
            },
            yaxis: {
//                scaleanchor: "x",
                range: [-10, 10],
//                showticklabels: false,
                title: "y"
            },
//            margin: {
//                l: 1, r: 1, b: 30, t: 10, pad: 1
//            },
//            margin: {
//                        l: 50,
//                        r: 50,
//                        b: 0,
//                        t: 0},
            // legend: {
            //     x: 0, y: 10,
            //     orientation: "h"
            // },
            // font: {
            //     family: "Fira Sans",
            //     size: 16
            // }
        },};

    let xySurface = setupSurfaceData(xMin, xMax, yMin, yMax, plotStep);
    let xScalarPlot = xySurface[0];
    let yScalarPlot = xySurface[1];

    let ScalarLine1Plot = setupLineAData(xLineMin, xLineMax, xLineMin, xLineMax, plotLineStep);
    let xScalarLine1_1b = ScalarLine1Plot[0];
    let yScalarLine1_1b = ScalarLine1Plot[1];

    let ScalarLine2Plot = setupLineBData(xLineMin, xLineMax, xLineMin, xLineMax, plotLineStep);
    let xScalarLine2_1b = ScalarLine2Plot[0];
    let yScalarLine2_1b = ScalarLine2Plot[1];

    let lineAVector = setupLineAData(xLineMin, xLineMax, yLineMin, yLineMax, 0.1);
    let dataLineAVector = dataLineAVectorCompile(lineAVector);

    let lineBVector = setupLineBData(xLineMin, xLineMax, yLineMin, yLineMax, 0.1);
    let dataLineBVector = dataLineBVectorCompile(lineBVector);

//    let VectorData = GetVectorData(a1b, xMax, plotLineStep);

//    Plotly.react('Vector_Graph_1b', VectorData);

//    initialPlot(xScalarPlot, yScalarPlot, xScalarLine1_1b, yScalarLine1_1b, xScalarLine2_1b, yScalarLine2_1b,
//             xLineMin, yLineMin, xLineMax, yLineMax, xPos, a1b, sigma1b,layout_1b);
    plot(xMin, xMax, yMin, yMax, plotStep, xScalarPlot, yScalarPlot, xScalarLine1_1b, yScalarLine1_1b,
        xScalarLine2_1b, yScalarLine2_1b, xLineMin, yLineMin, xLineMax, yLineMax, dataLineAVector, dataLineBVector, sigma1b,layoutScalar_1b, layoutVector_1b);
//jQuery to update the plot as the value of the slider changes.
    $("input[type=range]").each(function () {
        /*Allows for live update for display values*/
        $(this).on('input', function(){
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
            $("#"+$(this).attr("id") + "Display").val( $(this).val());
            //NB: Display values are restricted by their definition in the HTML to always display nice number.
            plot(xMin, xMax, yMin, yMax, plotStep, xScalarPlot, yScalarPlot, xScalarLine1_1b, yScalarLine1_1b,
        xScalarLine2_1b, yScalarLine2_1b, xLineMin, yLineMin, xLineMax, yLineMax, dataLineAVector, dataLineBVector, sigma1b, layoutScalar_1b, layoutVector_1b); //Updating the plot is linked with display (Just My preference)
        });

    });

    $('#Function_Selector').on("input", function(){
        //update plots when function is changed
        plot(xMin, xMax, yMin, yMax, plotStep, xScalarPlot, yScalarPlot, xScalarLine1_1b, yScalarLine1_1b,
        xScalarLine2_1b, yScalarLine2_1b, xLineMin, yLineMin, xLineMax, yLineMax, dataLineAVector, dataLineBVector, sigma1b,layoutScalar_1b, layoutVector_1b);
    });
};

$(document).ready(main); //Load setup when document is ready.
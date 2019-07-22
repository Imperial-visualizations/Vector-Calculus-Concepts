//Below prepares the x,y coordinate data to be calculated, depending on the plot step.

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
                zArray.push(a/Math.sqrt( xSurface[xValue]**2 + ySurface[yValue]**2 ));
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
                         name: false,
                         showscale: false
                         };
    return dataBall
};

function updatePlot(xMin, xMax, yMin, yMax, plotStep, xSurface, ySurface, xLineA, yLineA,
                    xLineB, yLineB, xLineMin, yLineMin, xLineMax, yLineMax, sigma, layout){

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

//    let layout = layout_1b;
    Plotly.react('Scalar_Graph_1b', [dataSurface, dataLineA, dataLineB, dataPointA, dataPointB, dataBallA, dataBallB], layout)
    }

    else if (equation === "Reciprocal"){

    a = a * 5;
//    let a = parseFloat(document.getElementById('Slider_1').value);
//    let xPoint = parseFloat(document.getElementById('Slider_2').value);

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



    console.log(dataSurface);
    Plotly.react('Scalar_Graph_1b', [dataSurface, dataLineA, dataLineB, dataPointA, dataPointB, dataBallA, dataBallB], layout)
    };
};


function main(){
    let a1b = 5;
    let sigma1b = 10;
    let xMin = -20;
    let xMax = 20;
    let yMin = -20;
    let yMax = 20;
    let plotStep = 2.1;
    let plotLineStep = 0.1;

    let xLineMin = -16;
    let xLineMax = 5;
    let yLineMin = 0;
    let yLineMax = 0;

    let xPos = xLineMin;

    const layout_1b = {
            title: 'YEET',
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

    let xySurface = setupSurfaceData(xMin, xMax, yMin, yMax, plotStep);
    let xScalarPlot = xySurface[0];
    let yScalarPlot = xySurface[1];

    let ScalarLine1Plot = setupLineAData(xLineMin, xLineMax, xLineMin, xLineMax, plotLineStep);
    let xScalarLine1_1b = ScalarLine1Plot[0];
    let yScalarLine1_1b = ScalarLine1Plot[1];

    let ScalarLine2Plot = setupLineBData(xLineMin, xLineMax, xLineMin, xLineMax, plotLineStep);
    let xScalarLine2_1b = ScalarLine2Plot[0];
    let yScalarLine2_1b = ScalarLine2Plot[1];


//    initialPlot(xScalarPlot, yScalarPlot, xScalarLine1_1b, yScalarLine1_1b, xScalarLine2_1b, yScalarLine2_1b,
//             xLineMin, yLineMin, xLineMax, yLineMax, xPos, a1b, sigma1b,layout_1b);
    updatePlot(xMin, xMax, yMin, yMax, plotStep, xScalarPlot, yScalarPlot, xScalarLine1_1b, yScalarLine1_1b,
        xScalarLine2_1b, yScalarLine2_1b, xLineMin, yLineMin, xLineMax, yLineMax, sigma1b,layout_1b);
//jQuery to update the plot as the value of the slider changes.
    $("input[type=range]").each(function () {
        /*Allows for live update for display values*/
        $(this).on('input', function(){
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
            $("#"+$(this).attr("id") + "Display").val( $(this).val());
            //NB: Display values are restricted by their definition in the HTML to always display nice number.
            updatePlot(xMin, xMax, yMin, yMax, plotStep, xScalarPlot, yScalarPlot, xScalarLine1_1b, yScalarLine1_1b,
        xScalarLine2_1b, yScalarLine2_1b, xLineMin, yLineMin, xLineMax, yLineMax, sigma1b,layout_1b); //Updating the plot is linked with display (Just My preference)
        });

    });

    $('#Function_Selector').on("input", function(){
        //update plots when function is changed
        updatePlot(xMin, xMax, yMin, yMax, plotStep, xScalarPlot, yScalarPlot, xScalarLine1_1b, yScalarLine1_1b,
        xScalarLine2_1b, yScalarLine2_1b, xLineMin, yLineMin, xLineMax, yLineMax, sigma1b,layout_1b);
    });
};

$(document).ready(main); //Load setup when document is ready.
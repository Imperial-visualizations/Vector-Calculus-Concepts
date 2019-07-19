function setupSurfaceData(xMin, xMax, yMin, yMax, plotStep){
    let xScalar1b = [];
    let yScalar1b = [];

    for (let i = xMin; i <= xMax; i += plotStep){
        xScalar1b.push(i);
    };

    for (let j = yMin; j <= yMax; j += plotStep){
        yScalar1b.push(j);
    };

    return [xScalar1b , yScalar1b]
};

function path2(x){
    return 10 * Math.sin( (2*Math.PI/42) * (x+16) )
};

function setupLine1Data(xLineMin, xLineMax, yLineMin, yLineMax, plotLineStep) {         //line1; across the mountain. y is kept at 0
    let xScalarLine1_1b = [];
    let yScalarLine1_1b = [];

    for (let i = xLineMin; i <= xLineMax; i += plotLineStep){
        xScalarLine1_1b.push(i);
    };

    for (let j = xLineMin; j <= xLineMax; j += plotLineStep){
        yScalarLine1_1b.push(0);
    };

    return [xScalarLine1_1b , yScalarLine1_1b]
};

function setupLine2Data(xLineMin, xLineMax, yLineMin, yLineMax, plotLineStep){
    let xScalarLine2_1b = [];
    let yScalarLine2_1b = [];

    for (let i = xLineMin; i <= xLineMax; i += plotLineStep){
        xScalarLine2_1b.push(i);
        yScalarLine2_1b.push( path2(i) );
    };
        console.log([xScalarLine2_1b , yScalarLine2_1b]);
    return [xScalarLine2_1b , yScalarLine2_1b]
};

function gaussian1b (a, sigma, xScalar1b,yScalar1b){
    let zScalar1b = [];
    for (let xValue in xScalar1b){
        let zArray = [];
        for (let yValue in yScalar1b){
            zArray.push(a*Math.exp(-1*(xScalar1b[xValue]**2 + yScalar1b[yValue]**2)/(2*sigma**2)));
        };
        zScalar1b.push(zArray);
    };
    return zScalar1b;
};

function gaussianLine1b (a, sigma, xScalarLine1_1b, yScalarLine1_1b){
    let zScalarLine1_1b = [];
    for (let xValue in xScalarLine1_1b){
            zScalarLine1_1b.push(a*Math.exp(-1*(xScalarLine1_1b[xValue]**2 + yScalarLine1_1b[xValue]**2)/(2*sigma**2)));
        };
    return zScalarLine1_1b;
};

function gaussianPoint1b (a, sigma, xPos, yPos){
    let zPos = [];
    zPos.push(a*Math.exp(-1*(xPos**2 + yPos**2)/(2*sigma**2)));
    return zPos;
};

function dataCompile(xScalar1b,yScalar1b,zScalar1b){
     let dataPlot = {
                         x: xScalar1b,
                         y: yScalar1b,
                         z: zScalar1b,
                         type: 'surface',
                         name: 'Scalar Field',
                         showscale: false
                     };
    return dataPlot
};

function dataLine1Compile(xScalarLine1_1b, yScalarLine1_1b, zScalarLine1_1b){
    let dataPlot = {
                         x:xScalarLine1_1b,
                         y:yScalarLine1_1b,
                         z:zScalarLine1_1b,
                         type: 'scatter3d',
                         mode: 'lines',
                         line: {
                                color: 'rgb(255,255,0)',
                                width: 10
                              },
                         name: 'Path 1',
                         showscale: false
                     };
    return dataPlot
};

function dataLine2Compile(xScalarLine1_1b, yScalarLine1_1b, zScalarLine1_1b){
    let dataPlot = {
                         x:xScalarLine1_1b,
                         y:yScalarLine1_1b,
                         z:zScalarLine1_1b,
                         type: 'scatter3d',
                         mode: 'lines',
                         line: {
                                color: 'rgb(173,255,47)',
                                width: 10
                              },
                         name: 'Path 2',
                         showscale: false
                     };
    return dataPlot
};


function testPlot(xScalarPlot, yScalarPlot, xScalarLine1_1b, yScalarLine1_1b, xScalarLine2_1b, yScalarLine2_1b,
                    xLineMin, yLineMin, xLineMax, yLineMax, a1b, sigma1b, layout_1b){
    let zScalarPlot = gaussian1b(a1b, sigma1b, xScalarPlot, yScalarPlot);
    let zScalarLine1_1b = gaussianLine1b(a1b, sigma1b, xScalarLine1_1b, yScalarLine1_1b);
    let zScalarLine2_1b = gaussianLine1b(a1b, sigma1b, xScalarLine2_1b, yScalarLine2_1b);

    let dataLine1_1b = dataLine1Compile(xScalarLine1_1b, yScalarLine1_1b, zScalarLine1_1b);
    let dataLine2_1b = dataLine2Compile(xScalarLine2_1b, yScalarLine2_1b, zScalarLine2_1b);
    let dataPlot1b = dataCompile(xScalarPlot, yScalarPlot, zScalarPlot);

    let dataPointA = {
                         x:[xLineMin],
                         y:[yLineMin],
                         z:gaussianPoint1b(a1b, sigma1b, xLineMin, yLineMin),
                         type: 'scatter3d',
                         mode: 'markers',
                         marker: {
                                color: 'rgb(238,130,238)',
                                size: 10
                              },
                         name: 'Point A',
                         showscale: false
                     };

    let dataPointB = {
                         x:[xLineMax],
                         y:[yLineMax],
                         z:gaussianPoint1b(a1b, sigma1b, xLineMax, yLineMax),
                         type: 'scatter3d',
                         mode: 'markers',
                         marker: {
                                color: 'rgb(192,192,192)',
                                size: 10
                              },
                         name: 'Point B',
                         showscale: false
                     };

    console.log(dataPointA);
    Plotly.react('Scalar_Graph_1b', [dataPlot1b, dataLine1_1b, dataLine2_1b, dataPointA, dataPointB], layout_1b);
};

function testPlot2 (){

};

function updatePlot(xMin, xMax, yMin, yMax, plotStep, xScalarPlot, yScalarPlot, xScalarLine1_1b, yScalarLine1_1b,
                    xScalarLine2_1b, yScalarLine2_1b, xLineMin, yLineMin, xLineMax, yLineMax, sigma1b,layout_1b){
    let a1b = parseFloat(document.getElementById('Slider_1').value);

    let zScalarPlot = gaussian1b(a1b, sigma1b, xScalarPlot, yScalarPlot);
    dataPlot1b = dataCompile(xScalarPlot, yScalarPlot, zScalarPlot);

    let zScalarLine1_1b = gaussianLine1b(a1b, sigma1b, xScalarLine1_1b, yScalarLine1_1b);
    let dataLine1_1b = dataLine1Compile(xScalarLine1_1b, yScalarLine1_1b, zScalarLine1_1b);

    let zScalarLine2_1b = gaussianLine1b(a1b, sigma1b, xScalarLine2_1b, yScalarLine2_1b);
    let dataLine2_1b = dataLine2Compile(xScalarLine2_1b, yScalarLine2_1b, zScalarLine2_1b);

    let dataPointA = {
                         x:[xLineMin],
                         y:[yLineMin],
                         z:gaussianPoint1b(a1b, sigma1b, xLineMin, yLineMin),
                         type: 'scatter3d',
                         mode: 'markers',
                         marker: {
                                color: 'rgb(238,130,238)',
                                size: 10
                              },
                         showscale: false
                     };

    let dataPointB = {
                         x:[xLineMax],
                         y:[yLineMax],
                         z:gaussianPoint1b(a1b, sigma1b, xLineMax, yLineMax),
                         type: 'scatter3d',
                         mode: 'markers',
                         marker: {
                                color: 'rgb(192,192,192)',
                                size: 10
                              },
                         showscale: false
                     };

//    let layout = layout_1b;
    Plotly.animate(
        'Scalar_Graph_1b', {
        data: [dataPlot1b, dataLine1_1b, dataLine2_1b, dataPointA, dataPointB], layout: layout_1b,

            fromcurrent: true,
            transition: {duration: 0,},
            frame: {duration: 0, redraw: false,},
            mode: "immediate"
        }
    );

//    Plotly.animate(
//        'Scalar_Graph_1b', {
//        data: [dataLine1_1b], layout: layout_1b,
//
//            fromcurrent: true,
//            transition: {duration: 0,},
//            frame: {duration: 0, redraw: true,},
//            mode: "immediate"
//        }
//    );
};

function main(){
    let a1b = 5;
    let sigma1b = 10;
    let xMin = -20;
    let xMax = 20;
    let yMin = -20;
    let yMax = 20;
    let plotStep = 2;
    let plotLineStep = 0.1;

    let xLineMin = -16;
    let xLineMax = 5;
    let yLineMin = 0;
    let yLineMax = 0;

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
            dragmode: 'orbit',
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

    let ScalarPlot = setupSurfaceData(xMin, xMax, yMin, yMax, plotStep);
    let xScalarPlot = ScalarPlot[0];
    let yScalarPlot = ScalarPlot[1];

    let ScalarLine1Plot = setupLine1Data(xLineMin, xLineMax, xLineMin, xLineMax, plotLineStep);
    let xScalarLine1_1b = ScalarLine1Plot[0];
    let yScalarLine1_1b = ScalarLine1Plot[1];

    let ScalarLine2Plot = setupLine2Data(xLineMin, xLineMax, xLineMin, xLineMax, plotLineStep);
    let xScalarLine2_1b = ScalarLine2Plot[0];
    let yScalarLine2_1b = ScalarLine2Plot[1];
    console.log(ScalarLine2Plot)

    testPlot(xScalarPlot, yScalarPlot, xScalarLine1_1b, yScalarLine1_1b, xScalarLine2_1b, yScalarLine2_1b, xLineMin, yLineMin, xLineMax, yLineMax, a1b, sigma1b,layout_1b);
//    testLinePlot(xScalarLine1_1b, yScalarLine1_1b, a1b, sigma1b, layout_1b);
    $('#Slider_1').on("input", function(){
        //update plots when coefficient changed
        $("#" + $(this).attr("id") + "Display").text($(this).val() + $("#" + $(this).attr("id") + "Display").attr("data-unit"));
        updatePlot(xMin, xMax, yMin, yMax, plotStep, xScalarPlot, yScalarPlot, xScalarLine1_1b, yScalarLine1_1b,
        xScalarLine2_1b, yScalarLine2_1b, xLineMin, yLineMin, xLineMax, yLineMax, sigma1b,layout_1b);
    });
};

$(document).ready(main); //Load setup when document is ready.
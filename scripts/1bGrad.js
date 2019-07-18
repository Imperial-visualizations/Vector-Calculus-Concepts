function setupData(xMin, xMax, yMin, yMax, plotStep){
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

function gaussian1b (a, sigma, xScalar1b,yScalar1b){
    let zScalar1b = [];
    for (let xValue in xScalar1b){
        let zArray = [];
        for (let yValue in yScalar1b){
            zArray.push(a*Math.exp(-1*(xScalar1b[xValue]**2 + yScalar1b[yValue]**2)/(2*sigma**2)));
            console.log(xValue)
        };
        zScalar1b.push(zArray);
    };
    return zScalar1b;
};

function dataCompile(xScalar1b,yScalar1b,zScalar1b){
         let dataPlot = [{
                             x:xScalar1b,
                             y:yScalar1b,
                             z: zScalar1b, type: 'surface'
                         }];
    return dataPlot
};

function testPlot(){
    let a1b = 5;
    let sigma1b = 10;
    let xMin = -20;
    let xMax = 20;
    let yMin = -20;
    let yMax = 20;
    let plotStep = 1;
    let ScalarPlot = [];

    ScalarPlot = setupData(xMin, xMax, yMin, yMax, plotStep);

    let xScalarPlot = ScalarPlot[0];
    let yScalarPlot = ScalarPlot[1];

    zScalarPlot = gaussian1b(a1b, sigma1b, xScalarPlot, yScalarPlot);

    dataPlot1b = dataCompile(xScalarPlot, yScalarPlot, zScalarPlot);

    let layout = {
        title: 'Mt Bruno Elevation',
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

    console.log(xScalarPlot);
    console.log(zScalarPlot);
    console.log(dataPlot1b);
    Plotly.newPlot('Scalar_Graph_1b', dataPlot1b, layout, {showSendToCloud: true});
};

function testPlot2 (){

};

function updatePlot(){
    let a1b = parseFloat(document.getElementById('Slider_1').value);
    let sigma1b = 10;
    let xMin = -20;
    let xMax = 20;
    let yMin = -20;
    let yMax = 20;
    let plotStep = 1;
    let ScalarPlot = [];

    ScalarPlot = setupData(xMin, xMax, yMin, yMax, plotStep);

    let xScalarPlot = ScalarPlot[0];
    let yScalarPlot = ScalarPlot[1];

    zScalarPlot = gaussian1b(a1b, sigma1b, xScalarPlot, yScalarPlot);

    dataPlot1b = dataCompile(xScalarPlot, yScalarPlot, zScalarPlot);

    let layout = {
        title: 'Mt Bruno Elevation',
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

    Plotly.animate(
        'Scalar_Graph_1b', {
        data: dataPlot1b, layout: layout,

            fromcurrent: true,
            transition: {duration: 0,},
            frame: {duration: 0, redraw: false,},
            mode: "immediate"
        }
    );
};

function main(){
    testPlot()
    $('#Slider_1').on("input", function(){
        //update plots when coefficient changed
        $("#" + $(this).attr("id") + "Display").text($(this).val() + $("#" + $(this).attr("id") + "Display").attr("data-unit"));
        updatePlot();
    });
};

$(document).ready(main); //Load setup when document is ready.
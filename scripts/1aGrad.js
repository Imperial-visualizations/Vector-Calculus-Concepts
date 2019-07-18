/*jshint esversion: 7 */
function setLayout(sometitlex, sometitley, sometitlez){
    // const new_layout = {
    //     autosize: true,
    //     margin: {l: 45, r: 30, t: 30, b: 30},
    //     hovermode: "closest",
    //     showlegend: false,
    //     xaxis: {range: [-100, 100], zeroline: true, title: sometitlex},
    //     yaxis: {range: [-100, 100], zeroline: true, title: sometitley},
    //     zaxis: {range: [-100, 100], zeroline: true, title: sometitlez},
    //     aspectratio: {x: 1, y: 1}
    // };


    const new_layout = {//layout of 3D graph
        showlegend: false,
        showscale: false,
        margin: {
            l: 10, r: 10, b: 10, t: 1, pad: 5
        },
        dragmode: 'orbit',
        scene: {
            aspectmode: "cube",
            xaxis: {range: [-100, 100], title: sometitlex},
            yaxis: {range: [-100, 100], title: sometitley},
            zaxis: {range: [-100, 100], title: sometitlez},

            camera: {
                up: {x: 0, y: 0, z: 1},//sets which way is up
                eye: {x: -1, y: -1, z: 1}//adjust camera starting view
            }
        },
    };
    return new_layout;
}

function GetScalarData(A, Function, x_max, PlotStep){
    let x = [];
    let y = [];
    let z = [];
    let inner_z = [];
    let CurrentZ = 0;

    for (let q = -x_max; q <= x_max; q += PlotStep){
        y.push(q);
        x.push(q);
    }

    switch (Function){
        case "A": //reciprocal 
            for (let i = -x_max; i <= x_max; i += PlotStep){
                for (let j = -x_max; j <= x_max; j += PlotStep){
                    CurrentZ = A/(Math.sqrt(i**2 + j**2));
                    inner_z.push(CurrentZ);
                }
                z.push(inner_z);
                inner_z = [];
            }
            break;

        case "B":  //gaussian type
            for (let i = -x_max; i <= x_max; i += PlotStep){
                for (let j = -x_max; j <= x_max; j += PlotStep){
                    CurrentZ = A*Math.exp(-((i + 50)**2 + j**2)/(500)) - A*Math.exp(-((i - 50)**2 + j**2)/(500));
                    inner_z.push(CurrentZ);  
                }
                z.push(inner_z);
                inner_z = [];
            }
            break;

        case "C": //cos type
            for (let i = -x_max; i <= x_max; i += PlotStep){
                for (let j = -x_max; j <= x_max; j += PlotStep){
                    CurrentZ = A*Math.cos(i);
                    inner_z.push(CurrentZ);
                }
                z.push(inner_z);
                inner_z = [];
            }
            break;
    }

    let ScalarData = [{
        type: 'surface',
        x: x,
        y: y,
        z: z,
        showscale: false
    }];
      
    //Plotly.plot('graph', [trace])

    // let ScalarData = [{
    //     z: z,
    //     type: 'surface'
    //  }];

    // var layout = {
    //     title: '',
    //     autosize: false,
    //     width: 500,
    //     height: 500,
    //     margin: {
    //         l: 65,
    //         r: 50,
    //         b: 65,
    //         t: 90,
    //     }
    // };
    return ScalarData;
}

function GetVectorData(){

}

function UpdateScalarPlot(ScalarData){
    Plotly.react('Scalar_Graph_1a', ScalarData, setLayout('x', 'y', 'f(x,y)'));
}

function NewScalarPlot(ScalarData){
    Plotly.newPlot('Scalar_Graph_1a', ScalarData, setLayout('x', 'y', 'f(x,y)'));
}

function UpdateVectorPlot(VectorData){

}

function NewVectorPlot(VectorData){

}




function GetNewInputs(){
    let A = parseFloat(document.getElementById("Slider_1").value);
    let Function = document.getElementById("Function_Selector").value;
    //expecting to return a character

    return [A, Function];
}

function Refresh(NewPlots = false){
    
    //Define a few constants
    let x_max = 100; //max x value permitted on graph.  Will be mirrored and also same in y
    let PlotStep = 1;//x_max/100; //distance between points that are plotted


    let NewInputs = GetNewInputs();
    let A = NewInputs[0]; //coefficient to change gradient
    let Function = NewInputs[1];
    //A = 100;
    //now plot graphs
    let ScalarData = GetScalarData(A, Function, x_max, PlotStep);
    //GetVectorData(A, Function);
    if (NewPlots){
        NewScalarPlot(ScalarData);
    }else{
        UpdateScalarPlot(ScalarData);
    }
    //UpdateScalarPlot(ScalarData);
    //UpdateVectorPlot();
}



function Setup1a() {
    $('#Slider_1').on("input", function(){
        //update plots when coefficient changed
        //$("#" + $(this).attr("id") + "Display").text($(this).val() + $("#" + $(this).attr("id") + "Display").attr("data-unit"));
        Refresh();
    });

    $('#Function_Selector').on("input", function(){
        //update plots when function is changed
        Refresh();
    });

    Refresh(NewPlots = true);
}



$(document).ready(Setup1a); //Load setup when document is ready.
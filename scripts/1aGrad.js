/*jshint esversion: 7 */

function GetScalarData(A, Function, x_max, PlotStep){
    let z = [];
    let inner_z = [];
    let CurrentZ = 0;
    switch (Function){
        case "A": //reciprocal 
            for (let x = -x_max; x < x_max; x = x + PlotStep){
                for (let y = -x_max; y < x_max; y = y + PlotStep){
                    CurrentZ = A/(Math.sqrt(x**2 + y**2));
                    inner_z.push(CurrentZ);
                }
                z.push(inner_z);
            }
            console.log("A");
            break;

        case "B":  //gaussian type
            for (let x = -x_max; x < x_max; x = x + PlotStep){
                for (let y = -x_max; y < x_max; y = y + PlotStep){
                    CurrentZ = A/(Math.sqrt(x**2 + y**2));
                    inner_z.push(CurrentZ);
                }
                z.push(inner_z);
            }
            console.log("B");
            break;

        case "C": //cos type
            for (let x = -x_max; x < x_max; x = x + PlotStep){
                for (let y = -x_max; y < x_max; y = y + PlotStep){
                    CurrentZ = Math.cos(A*x);
                    inner_z.push(CurrentZ);
                }
                z.push(inner_z);
            }
            console.log("C");
            break;
    }


    var data = [{
        z: z,
        type: 'surface'
     }];

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
    Plotly.newPlot('Scalar_Graph', data, setLayout('x', 'ct', 'z'));

}

function setLayout(sometitlex, sometitley, sometitlez) {
    const new_layout = {
        autosize: true,
        margin: {l: 45, r: 30, t: 30, b: 30},
        hovermode: "closest",
        showlegend: false,
        xaxis: {range: [-100, 100], zeroline: true, title: sometitlex},
        yaxis: {range: [-100, 100], zeroline: true, title: sometitley},
        zaxis: {range: [-100, 100], zeroline: true, title: sometitlez},
        aspectratio: {x: 1, y: 1}
    };
    return new_layout;
}

function GetVectorData(){

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
    let PlotStep = x_max/100; //distance between points that are plotted


    let NewInputs = GetNewInputs();
    console.log(NewInputs);
    let A = NewInputs[0]; //coefficient to change gradient
    let Function = NewInputs[1];

    //now plot graphs
    GetScalarData(A, Function);
    GetVectorData(A, Function);
    //console.log("hi");
    //UpdateScalarPlot();
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
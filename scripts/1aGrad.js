/*jshint esversion: 7 */

function UpdateScalarPlot(A, Function, x_max, PlotStep){
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
            break;

        case "B":  //gaussian type
            for (let x = -x_max; x < x_max; x = x + PlotStep){
                for (let y = -x_max; y < x_max; y = y + PlotStep){
                    CurrentZ = A/(Math.sqrt(x**2 + y**2));
                    inner_z.push(CurrentZ);
                }
                z.push(inner_z);
            }
            break;

        case "C": //cos type
            for (let x = -x_max; x < x_max; x = x + PlotStep){
                for (let y = -x_max; y < x_max; y = y + PlotStep){
                    CurrentZ = Math.cos(A*x);
                    inner_z.push(CurrentZ);
                }
                z.push(inner_z);
            }
            break;
    }

}

function UpdateVectorPlot(){

}

function GetNewInputs(){
    let A = parseFloat(document.getElementById("Slider_1").value);
    //let Function = parseFloat(document.getElementById("Function_Selector").value);
    //expecting to return a character

    return [A, Function];
}

function Refresh(){
    //Define a few constants
    let x_max = 100; //max x value permitted on graph.  Will be mirrored and also same in y
    let PlotStep = x_max/100; //distance between points that are plotted


    let NewInputs = GetNewInputs();
    let A = NewInputs[0]; //coefficient to change gradient
    let Function = NewInputs[1];

    //now plot graphs
    UpdateScalarPlot(A, Function);
    UpdateVectorPlot(A, Function);
    console.log("hi");
}



function Setup1a() {
    $('#Slider_1').change(function(){
        //update plots when coefficient changed
        $("#" + $(this).attr("id") + "Display").text($(this).val() + $("#" + $(this).attr("id") + "Display").attr("data-unit"));
        Refresh();
    });

    $('#Function_Selector').change(function(){
        //update plots when function is changed
        Refresh();
    });

    Refresh();
}



$(document).ready(Setup1a); //Load setup when document is ready.
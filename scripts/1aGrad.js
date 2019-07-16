/*jshint esversion: 7 */

function UpdateScalarPlot(A, Function, x_max, PlotStep){
    switch (Function){
        case "A":
            for (let x = -x_max; x < x_max; x = x + PlotStep){
                for (let y = -x_max; y < x_max; y = y + PlotStep){
                    
                }
            }
            
            break;
        case "B":
            
            break;
        case "C":
            
            break;
    }

}

function UpdateVectorPlot(){

}

function GetNewInputs(){
    let A = parseFloat(document.getElementById("Slider_1").value);
    let Function = parseFloat(document.getElementById("Function_Selector").value);
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



$(document).ready(setup1a); //Load setup when document is ready.
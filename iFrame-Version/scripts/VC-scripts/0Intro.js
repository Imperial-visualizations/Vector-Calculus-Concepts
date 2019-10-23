//main
function displayImage(){
    let picture = $("input[name = wave-switch]:checked").val();

    if (picture === "scalar") {
    document.getElementById("scalarFieldImage").style.display = "block";
    document.getElementById("vectorFieldImage").style.display = "none"
    } else if (picture === "vector"){
    document.getElementById("vectorFieldImage").style.display = "block";
    document.getElementById("scalarFieldImage").style.display = "none"
    };
}

function main(){
//jQuery to update the plot as the value of the slider changes.
    document.getElementById("scalarFieldImage").style.display = "block";
    document.getElementById("vectorFieldImage").style.display = "none";
    $("input[type=radio]").each(function () {
        /*Allows for live update for display values*/
        $(this).on('input', function(){
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
//            $("#"+$(this).attr("id") + "Display").val( $(this).val());
            //NB: Display values are restricted by their definition in the HTML to always display nice number.
        displayImage();
        });
    });
}

$(document).ready(main); //Load setup when document is ready.
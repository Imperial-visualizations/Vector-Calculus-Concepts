//main
function displayImage(){
    let picture = $("input[name = wave-switch]:checked").val();

    if (picture === "Probability_Current") {
    document.getElementById("Probability_Current_Density").style.display = "block";
    document.getElementById("Shoelace_Formula").style.display = "none"
    } else if (picture === "Shoelace"){
    document.getElementById("Shoelace_Formula").style.display = "block";
    document.getElementById("Probability_Current_Density").style.display = "none"
    };
}

function main(){
//jQuery to update the plot as the value of the slider changes.
    document.getElementById("Probability_Current_Density").style.display = "block"
    document.getElementById("Shoelace_Formula").style.display = "none"
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
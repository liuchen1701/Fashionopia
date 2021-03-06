/**
 * Created by XavierXinweiWang on 16/10/26.
 */

var selected = 0;

var new_look = {
    "title": "",
    "date": "Today",
    "like": "0",
    "imageURL1": "",
    "imageURL2": ""
};

var selected_clothes = [];

var toUpload = "";

var numUploaded = 0;


$('#time').click(function()
{
    $("#toolbar").attr('class', 'mdl-layout__tab-bar mdl-js-ripple-effect mdl-color--primary-dark red');
});

$('#likes').click(function()
{
    $("#toolbar").attr('class', 'mdl-layout__tab-bar mdl-js-ripple-effect mdl-color--primary-dark lime');
});

$('.fakeitem2').click(function(){
    $(this).parentsUntil("#data1").parent().find("#fake1").attr('src', $(this).attr("src"));
});

$('.delete').click(function () {
    $(this).parentsUntil("#collection").fadeOut(500);
});

/*$('.wear').click(function () {
    if($(this).parentsUntil("#data1").parent().find('#lastwear1').text() == 'access_timeToday') {
      console.log($(this).parentsUntil("#data1").parent().find('#lastwear1').text());
      var data = {message: "You have already worn it today."};
      document.querySelector('#wear-snackbar').MaterialSnackbar.showSnackbar(data);
    } else {
      $(this).parentsUntil("#data1").parent().find('#lastwear1').html("<i class='material-icons'>access_time</i>Today");
    }
});
*/

$('#to-all-clothes').click(function() {
    selected_clothes = [];
    selected = 0;
    $(".check-icon").hide();
    //$('#filter').parent().parent().show();
});

$('#to-explore').click(function() {
    $('#filter').parent().parent().hide();
});

$('#to-saved-looks').click(function() {
    $('#filter').parent().parent().hide();
});



$('#closet').find('.card-image').click(function() {
    $(this).find('i').toggle();

    if($(this).find('i').attr("style") == "display: none;") {
        for (var i = 0; i < selected_clothes.length; i++) {
            if (selected_clothes[i].title == $(this).find('p').text()) {
                selected_clothes.splice(i, 1);
            }
        }
        selected--;
    } else {
        selected_clothes.push(
            {"title" : $(this).find('p').text(), "imageURL" : $(this).find('img').attr("src")}
        );
        selected++;
    }

    if (selected == 0) {
        $('#filter').parent().parent().hide();
    } else {
        $('#filter').parent().parent().show();
    }
});

$('#filter').click(function() {
    if($('#filter').text() == "done") {
        $('#to-saved-looks').addClass("is-active");
        $('#history').addClass("is-active");
        $('#to-all-clothes').removeClass("is-active");
        $('#closet').removeClass("is-active");

        $(".check-icon").hide();
    }
});

$('#filter').click(function() {
    if($(this).text() == "done") {
        var title = "";
        for (var i = 0; i < selected_clothes.length; i++) {
            title = title.concat(selected_clothes[i].title);
            if(i < selected_clothes.length - 1) {
                title = title.concat(", ");
            }
        }
        new_look.title = title;

        new_look.imageURL1 = selected_clothes[0].imageURL;
        if(selected_clothes.length >= 2) {
            new_look.imageURL2 = selected_clothes[1].imageURL;
        }

        $("#collection").prepend(
            "<li id='data1'><div class='collapsible-header'><section class='section--center mdl-grid mdl-grid--no-spacing'><div class='mdl-card mdl-cell--12-col'><div class='mdl-card mdl-cell mdl-cell--12-col' id='form'><form class='col s12'><div class='row'><div class='input-field col l6 m6 s6'><img src='" + new_look.imageURL1 + "' class='fakeitem1' id='fake1'></div><div class='input-field col l6 m6 s6'><p>" + new_look.title + "</p><p id='lastwear1'><i class='material-icons'>access_time</i>" + new_look.date + "</p><p id='like1'><i class='material-icons'>favorite</i>" + new_look.like + " likes</p></div></div></form></div></div></section></div><div class='collapsible-body'><section class='section--center mdl-grid mdl-grid--no-spacing'><div class='mdl-card mdl-cell--12-col'><div class='mdl-card mdl-cell mdl-cell--12-col'><form class='col s12'><div class='row'><div class='input-field col l3 m3 s3'></div><div class='input-field col l3 m3 s3' id = 'fakedata1a'><img src='" + new_look.imageURL1 + "' class='fakeitem2 onview'></div><div class='input-field col l3 m3 s3' id = 'fakedata1b'><img src='" + new_look.imageURL2 + "' class='fakeitem2'></div><div class='input-field col l6 m6 s6'><a class='mdl-button mdl-js-button mdl-button--accent delete' style='width: 100%' id='delete1'>DELETE</a></div><div class='input-field col l6 m6 s6'><a class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent wear' style='width: 100%' id='wear1'>WEAR</a></div></div></form></div></div></section></div></li>"
        );

        new_look = {
            "title": "",
            "date": "Today",
            "like": "0",
            "imageURL1": "",
            "imageURL2": ""
        };

        selected_clothes = [];
        selected = 0;

        $('#filter').parent().parent().hide();
    }
});

$('#collection').on('click', '.delete', function() {
    $(this).parentsUntil("#collection").fadeOut(500);
});

$('#collection').on('click', '.fakeitem2', function() {
    $(this).parentsUntil("#data1").parent().find("#fake1").attr('src', $(this).attr("src"));
});

$('#collection').on('click', '.wear', function() {
  if($(this).parentsUntil("#data1").parent().find('#lastwear1').text() == 'access_timeToday') {
    var data = {message: "You have already worn it today."};
    document.querySelector('#wear-snackbar').MaterialSnackbar.showSnackbar(data);
  } else {
    $(this).parentsUntil("#data1").parent().find('#lastwear1').html("<i class='material-icons'>access_time</i>Today");
  }
});

$('.card-action').on('click', '.before-like', function(){
    if ($(this).find("i").html()=='favorite_border'){
        $(this).find("i").html('favorite');
    }
    else{
        $(this).find("i").html('favorite_border');
    }
});

$('.card-action').on('click', '.skip', function(){
    $(this).parentsUntil("#explore").fadeOut(500);
});

$('.alternateNext').on('click', '.skip', function(){
    $(this).parentsUntil("#explore").fadeOut(500);
});

$('#fakeUpload').hide();
$('#resultPercentage').hide();
$('#upload').click(function(){
    $('#uploadIcon').hide();
    $('#fakeUpload').show();
    $('#uploadInstruction').hide();
    $('#resultPercentage').show();
    $('#itemsToCompare').show();
});

$('#cancel').click(function(){
    $('#uploadIcon').show();
    $('#fakeUpload').hide();
    $('#uploadInstruction').show();
    $('#resultPercentage').hide();
    $('#itemsToCompare').hide();
});

$(".fakeitem2").click(function() {
    $(this).parentsUntil(".row").parent().find(".onview").removeClass("onview");
    $(this).addClass("onview");
    if($(this).parent().parent().attr('id') == 'itemsToCompare') {
      $('#resultPercentage').find('h5').show();
    }
});

$('#collection').on('click', '.fakeitem2', function() {
    $(this).parentsUntil(".row").parent().find(".onview").removeClass("onview");
    $(this).addClass("onview");
});

$("#addCloth").click(function() {
    toUpload = "../images/rockmui_aloneteewhite-1000x1000.jpg";
    localStorage.setItem("toUpload", toUpload);

    numUploaded = localStorage.getItem("numUploaded");
    if(numUploaded == null) {
        numUploaded = 0;
    }
    numUploaded = JSON.parse(numUploaded);
    numUploaded++;
    localStorage.setItem("numUploaded", numUploaded);
});

$("index").ready(function(){
    var numUploadedX = localStorage.getItem("numUploaded");

    for (var i = 0; i < numUploadedX; i++) {
        $("#topGrid").prepend(
            "<div class='row'> <div class='col'> <div class='card z-depth-0'> <div class='card-image new'> <p style='display: none'>Black Text Tee</p> <img src='../images/rockmui_aloneteewhite-1000x1000.jpg'> <i class='material-icons check-icon' style='display: none'>check_circle</i> </div> </div> </div> </div>"
        );
    }
});

$('#topGrid').on('click', '.card-image.new', function() {
    $(this).find('i').toggle();

    if($(this).find('i').attr("style") == "display: none;") {
        for (var i = 0; i < selected_clothes.length; i++) {
            if (selected_clothes[i].title == $(this).find('p').text()) {
                selected_clothes.splice(i, 1);
            }
        }
        selected--;
    } else {
        selected_clothes.push(
            {"title" : $(this).find('p').text(), "imageURL" : $(this).find('img').attr("src")}
        );
        selected++;
    }

    if (selected == 0) {
        $('#filter').parent().parent().hide();
    } else {
        $('#filter').parent().parent().show();
    }
});

$('.A-Version').click(function() {
  console.log("next clicked");
  ga('send', 'event', 'to-next', 'click', 'A-Version');
});

$('.B-Version').click(function() {
  console.log("arrow clicked");
  ga('send', 'event', 'to-next', 'click', 'B-Version');
});

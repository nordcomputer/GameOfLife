
var widthstart = 100;
var heightstart = 30;
var height=widthstart;
var width=heightstart;
var maxcells=3;
var newborn = 3;
var dieifsmaller = 2;
var isMouseDown = false;
var fieldsize = "14px";
var myArray = new Array(1);
var ctx = "";
var myTimer;
var boxes = getboxes();
var interval;
var generation = 0;


function drawfields(ctx,fields) {
  for (i = 0; i < height; i++) {
  for (h = 0; h < width; h++) {

      ctx.fillStyle = "white";

      ctx.fillStyle = "green";
      if (fields[h][i]==true) {
        $( "#"+h+"-"+i ).addClass( "true" );
      }
      else {
        $( "#"+h+"-"+i ).removeClass( "true");
      }
    }
  }
}

function getcounter(fields,h,i) {
  let count=0;
  h=parseInt(h);
  i=parseInt(i);


  //  x . .
  //  . . .
  //  . . .
  if (h>0 && i>0) {
    if (fields[h-1][i-1]==true) {
      count=count+1;
    }
  }
  //
  //  . x .
  //  . . .
  //  . . .

  if (h>0) {
    if (fields[h-1][i]==true) {
      count=count+1;
    }
  }
  //  . . x
  //  . . .
  //  . . .

  if (i < height-1 && h > 0) {
    if (fields[h-1][i+1]==true) {
      count=count+1;
    }
  }


  //  . . .
  //  x . .
  //  . . .

  if (h>0) {
    if (fields[h][i-1]==true) {
      count=count+1;
    }
  }


  //  . . .
  //  . . x
  //  . . .

  if (h<width-1) {
    if (fields[h][i+1]==true) {
      count=count+1;
    }
  }

  //  . . .
  //  . . .
  //  x . .

  if (h < width-1  && i > 0) {
    if (fields[h+1][i-1]==true) {
      count=count+1;
    }
  }

  //  . . .
  //  . . .
  //  . x .

  if (h < width-1) {
    if (fields[h+1][i]==true) {
      count=count+1;
    }
  }


  //  . . .
  //  . . .
  //  . . x

  if (i < height-1 && h < width-1) {
    if (fields[h+1][i+1]==true) {
      count=count+1;
    }
  }

  if (count==newborn) {
    console.log(h+":"+i+"="+count)
  }
  return count;

}

function newgeneration(ctx,fields) {

  var allfields = 0;
  var newgen = new Array(1);
  for (h = 0; h < width; h++) {
    newgen[h] = new Array(1);
  }

  for (h = 0; h < width; h++) {
    for (i = 0; i < height; i++) {
        newgen[h][i] = fields[h][i];

        if (getcounter(fields,h,i)<dieifsmaller) {
          newgen[h][i] = false;
        }

        if (getcounter(fields,h,i)>maxcells) {
          newgen[h][i] = false;
        }

        if (getcounter(fields,h,i)==newborn) {
          newgen[h][i] = true;
        }
        if (newgen[h][i] == true) {
          allfields = allfields + 1;
        }


    }
  }
  generation = generation + 1;
  $('#sum').text("Alive: " + allfields);
  $('#generation').text("Generation: "+generation);
  drawfields(ctx, newgen);
  if (allfields == 0) {
    $('#pause').trigger('click');
  }
    return newgen;



}

function getboxes() {
  boxes = $(".true");
  return boxes;
}

function createcanvas() {
  widthstart = $('#width').val();
  heightstart = $('#height').val();
  fieldsize = $('#size').val() + "px";
  height=widthstart;
  width=heightstart;
  myArray = new Array(1);
  ctx = "";
  myTimer;
  boxes = getboxes();

  $('#flaeche').append('<canvas id="canvas" height="'+height*10+'px" width="'+width*10+'px"></canvas>');
  i=0;
  var lin = new Array(1);

  for (h = 0; h < width; h++) {
    lin[h]="";
    for (i = 0; i < height; i++) {
      lin[h]=lin[h]+'<div class="checker line-'+h+' column-'+i+'"><div class="checking" id="'+h+'-'+i+'" data-line="'+h+'" data-row="'+i+'"></div></div>';
    }
    $('#checkframe').append('<div class="liner lin-'+h+'">'+lin[h]+'</div>');
  }

  myArray = new Array(1);
  for (h = 0; h < width; h++) {
    myArray[h] = new Array(1);
  }
  for (h = 0; h < width; h++) {
    for (i = 0; i < height; i++) {


    myArray[h][i] = false;


    }

  }
  $('.checking').css('width', fieldsize);
  $('.checking').css('height', fieldsize);
  $('.liner').css('height', fieldsize);
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");


  drawfields(ctx,myArray);
}

$(function () {

  $('body').mousedown(function() {
    isMouseDown = true;

  })
  .mouseup(function() {
      isMouseDown = false;
  });

  createcanvas();

  $('#start').click(function () {
      interval = $('#interval').val();
      boxes = getboxes();
      boxes.each(function() {
        var startline=$(this).data("line");
        var startrow=$(this).data("row");
        myArray[parseInt(startline)][parseInt(startrow)]=true;
      });

      // myArray=newgeneration(ctx,myArray);

      var start = new Date;

      myArray=newgeneration(ctx,myArray);
          myTimer=setInterval(function() {
                myArray=newgeneration(ctx,myArray);
          }, interval);

          $('#pause').click(function() {
            clearInterval(myTimer);
          });
    });

    $('.checking').click(function() {
      $(this).toggleClass('true');
      var alive = $('.true').length;
      $('#sum').text("Alive: "+alive);

    });

  $('#reset').click(function () {
      generation = 0;
    $('#generation').text("Generation: " + generation);
    $('#sum').text("Alive: 0");
      $('.true').removeClass('true');
      $('#flaeche').empty();
      $('#checkframe').empty();
      createcanvas();
      $('.checking').click(function() {
        $(this).toggleClass('true');
        var alive = $('.true').length;
        $('#sum').text("Alive: "+alive);
      });
      $('.checking').mouseover(function() {
        if (isMouseDown==true) {
          $(this).toggleClass('true');
        }
        var alive = $('.true').length;
        $('#sum').text("Alive: "+alive);
      });

    });

    $('.checking').mouseover(function() {
      if (isMouseDown==true) {
        $(this).toggleClass('true');
      }
      var alive = $('.true').length;
      $('#sum').text("Alive: "+alive);
    });

  });

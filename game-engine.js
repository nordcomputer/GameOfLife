const width=40;
const height=20;

const maxcells=4;
const spawn=2;
const stay=1;
const dying=1


function drawfields(ctx,fields) {
  for (i = 0; i < height; i++) {
  for (h = 0; h < width; h++) {

      ctx.fillStyle = "white";
      ctx.fillRect(h*10+100, i*10+100, 9, 9);
      ctx.fillStyle = "green";
      if (fields[h][i]==true) {
        ctx.fillRect(h*10+100, i*10+100, 9, 9);
        $( "#"+h+"-"+i ).prop( "checked", true );
      }
      else {
        ctx.strokeRect(h*10+100, i*10+100, 9, 9);
        $( "#"+h+"-"+i ).prop( "checked", false );
      }
    }
  }
}

function getcounter(fields,h,i) {
  let count=0;
  if (h>=1) {
    if (fields[h-1][i]==true) {
      count=count+1
    }
    if (i>=1) {
      if (fields[h-1][i-1]==true) {
        count=count+1
      }
    }
  }
  if (h<9) {
    if (fields[h+1][i]==true) {
      count=count+1
    }
    if (i<9) {
      if (fields[h+1][i+1]==true) {
        count=count+1
      }
    }
  }
  if (i>=1) {
    if (fields[h][i-1]==true) {
      count=count+1
    }
    if (h>=1) {
      if (fields[h-1][i-1]==true) {
        count=count+1
      }
    }
  }
  if (i<9) {
    if (fields[h][i+1]==true) {
      count=count+1
    }
    if (h<9) {
      if (fields[h+1][i+1]==true) {
        count=count+1
      }
    }
  }
  return count;

}

function newgeneration(ctx,fields) {

  var newgen = new Array(1);
  for (h = 0; h < width; h++) {
    newgen[h] = new Array(1);
  }
  for (h = 0; h < width; h++) {
    for (i = 0; i < height; i++) {

      if (getcounter(fields,h,i) == dying) {
        newgen[h][i] = false;
      }
      if (getcounter(fields,h,i) == stay) {
        newgen[h][i] = true;
      }
      if (getcounter(fields,h,i) == spawn) {
        newgen[h][i] = fields[h][i];

      }
      if (getcounter(fields,h,i) >= maxcells) {
        newgen[h][i] = false;
      }

    }
  }
  drawfields(ctx,newgen);
  return newgen;


}


$(function() {
  i=0;
  var lin = new Array(1);

  for (h = 0; h < width; h++) {
    lin[h]="";
    for (i = 0; i < height; i++) {
      lin[h]=lin[h]+'<div class="checker line-'+h+' column-'+i+'"><input data-line="'+h+'" data-row="'+i+'" type="checkbox" name="'+h+'-'+i+'" id="'+h+'-'+i+'"/></div>';
    }
    $('#checkframe').append('<div class="liner lin-'+h+'">'+lin[h]+'</div>');
  }

  var myArray = new Array(1);
  for (h = 0; h < width; h++) {
    myArray[h] = new Array(1);
  }
  for (h = 0; h < width; h++) {
    for (i = 0; i < height; i++) {


    myArray[h][i] = false;


    }

  }

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");


  console.table(myArray);
  drawfields(ctx,myArray);

  $('#canvas').click(function() {
      var boxes = $(":checkbox:checked");
      boxes.each(function() {
        var startline=$(this).data("line");
        var startrow=$(this).data("row");
        console.log(startline);
        console.log(startrow);
        myArray[parseInt(startline)][parseInt(startrow)]=true;
      });

      // myArray=newgeneration(ctx,myArray);
      console.table(myArray);
      var start = new Date;


          var myTimer=setInterval(function() {
                myArray=newgeneration(ctx,myArray);
          }, 200);

          $('#pause').click(function() {

            clearInterval(myTimer);

          });
    });

  });

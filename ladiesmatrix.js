var vm, datosarray
var datos = []
var matrix_container_raphael = []
var matrix_container_canvas = [] 
var cursor_coordinates = [], cursor_colors = [], cursor_size = []
var colors=['#000000','#550000','#990000','#995500','#9999000','#dddd00' ,'#ffdd00']
var groundcursor, cursor, dimension
var position = {"x":0, "y":0, "windowWidth":280, "windowHeight":280, "margin":[10,10,10,10], "paddingx":0, "paddingy":20}
var total = {"width":position.windowWidth-position.margin[3]-position.margin[1], "height":position.windowHeight-position.margin[0]-position.margin[2]}



function drawEllipseByCenter(ctx, color, cx, cy, w, h) {
  drawEllipse(ctx, color,cx - w/2.0, cy - h/2.0, w, h);
}

function drawEllipse(ctx, color, x, y, w, h) {
  var kappa = .5522848,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle
  ctx.fillStyle = color
  ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  //ctx.closePath(); // not used correctly, see comments (use to close off open path)
  ctx.fill();
}



function dibujaCanvas(line1,maxlong,ancho,dimension){

matrix_container_canvas=[];
ctx.fillStyle = "#555";
ctx.strokeWidth = 1;


 ground = [];
 
 ctx.fillRect(0, 0, position.windowWidth, position.windowHeight)
  ctx.fill();
  ctx.stroke();  
 
var colorpalette=[]
for(var a = 0; a < maxlong ; a++){
  //colorpalette[a] = vm.rect(a*line1+0.2, position.windowHeight,line1+0.2,20).attr({"fill": colors[a], "stroke-width":0})
  ctx.fillStyle = colors[a]
  
  ctx.fillRect(a*line1+0.2, position.windowHeight,line1+0.2,20)
  ctx.fill();
}

for (var i = 0; i < dimension; i++){
  matrix_container_canvas[i]=[] 
  for (var j = 0; j < dimension; j++){
   var r = 0, g = '00', b='00'
   var color=datosarray[i][j];//"#ff0000"
   //matrix_container_raphael[i][j] = vm.circle(j * ancho+position.margin[3]+ancho*0.38, i * ancho +position.margin[0]+ancho*0.4, ancho/2);
   if(datosarray[i][j].length<4){var mycolor="#777777"}else{ var mycolor=colorsarray[i][j] }
      
   drawEllipseByCenter(ctx, mycolor, position.margin[3] + ancho / 2 + j * ancho, position.margin[0]  + ancho / 2 + i * ancho , ancho, ancho);
    matrix_container_canvas[i][j]={
        x: position.margin[3] + ancho / 2 + j * ancho,
        y: position.margin[0]  + ancho / 2 + i * ancho,
        radius: ancho,
        fill: mycolor,
        stroke: '#000',
        strokeWidth: 0,
		id: i+'_'+j,
		wasInside: false,
	   mouseover:(function () {
    gotext(i+'_'+j,''+i,''+j)
     }),
    mouseout:(function () {
    outtext(i+'_'+j,''+i,''+j)
     }),         
   click:(function () {
    clicktext(i+'_'+j,''+i,''+j)
     })
    }
   //ctx.ellipse(position.margin[3] + ancho / 2 + j * ancho, position.margin[0]  + ancho / 2 + i * ancho , ancho/2);
   if(datosarray[i][j].length<4){var mycolor="#777777"}else{ var mycolor=colorsarray[i][j] }
   //   matrix_container_raphael[i][j].node.id = i+'_'+j;
   //matrix_container_raphael[i][j].mouseover(function () {
    //gotext(this.node.id,''+i,''+j)
     //});         
   //matrix_container_raphael[i][j].mouseout(function () {
    //outtext(this.node.id,''+i,''+j)
     //});         
   //matrix_container_raphael[i][j].click(function () {
    //clicktext(this.node.id,''+i,''+j)
   //  });
   }
 }
}

function pointInCircle(point, radius, center){


var a = point.x - center.x;
var b = point.y - center.y;
var distX = Math.abs(point.x - center.x), distY = Math.abs(point.y - center.y);
    var dist1 = Math.sqrt(distX * distX + distY * distY);
    if(dist1 < radius){
      return true;
    }else{
      return false;
    }
}
    

var pos={x:0,y:0}
var idselect={i:false,j:false}

function handleMouseMove(e) {

    // tell the browser that we're handling this event

    e.preventDefault();
    e.stopPropagation();

    // calculate the mouse position

    pos.x = parseInt(e.clientX - offsetX);
    pos.y = parseInt(e.clientY - offsetY);

    // calculate if the mouse is currently inside the circle

 //document.getElementById("texto").innerHTML=dimension;
 var center , isInside
 for (var i = 0; i < dimension; i++){
	for (var j = 0; j < dimension; j++){
	 //document.getElementById("texto").innerHTML=i+' '+j;
	 center = {x: matrix_container_canvas[i][j].x, y:  matrix_container_canvas[i][j].y};
	
	 isInside=pointInCircle(pos, matrix_container_canvas[i][j].radius, center);
	
	//if(dx * dx + dy * dy <= (matrix_container_canvas[i][j].radius/2) * (matrix_container_canvas[i][j].radius)){
	   //isInside = true
  //}
    // if the mouse has either entered or exited the circle
    // then erase and redraw the circle to reflect its current 
    // hover state
	
    //if (isInside && !matrix_container_canvas[i][j].wasInside) {
	 
	if (isInside && !matrix_container_canvas[i][j].wasInside) {
	//$("#texto").text(pos.x+' '+pos.y+' '+isInside+' hola '+center.x+' '+center.y);
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
		outtext(idselect.i+'_'+idselect.j,''+idselect.i,''+idselect.j)
        matrix_container_canvas[i][j].wasInside = isInside;
		idselect.i=i;idselect.j=j;
    } else if (!isInside && matrix_container_canvas[i][j].wasInside) {
	
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        matrix_container_canvas[i][j].wasInside = isInside;
		idselect.i=i;idselect.j=j;
		gotext(idselect.i+'_'+idselect.j,''+idselect.i,''+idselect.j)
	    
    }
  }
 }
}

var canvas, ctx, $canvas, canvasOffset, offsetX, offsetY, scrollX , scrollY 


function ini(){   

 var textoini=document.getElementById("datos").value;//match(/(?:/\t\r\n/g || {0: ""})[0].length;
 //datos=textoini.split(/\n\s*\n|\r\n\s*\r\n/);
 //Hyphenator.run();
 var datos00 = textoini.split("\n");
 var datos01 = textoini.split("\r");
 var datos02 = textoini.split("\t");  
 var datos03 = textoini.split("\r\n"); 
 var datos04 = []
 var winner = '00'
 if(datos01.length>datos00.length){winner = 01}
 if(winner == 01){if(datos02.length>datos01.length ){winner = 02}}
 if(winner == 02 || winner == 01){ if(datos03.length>datos02.length){winner = 02}  }
 
 if(winner == '00'){ datos04 = datos00 }
 if(winner == '01'){ datos04 = datos01 }
 if(winner == '02'){ datos04 = datos02 } 
 if(winner == '03'){ datos04 = datos03 } 


for(var a = 0; a < datos04.length; a++){
  if(datos04[a].length > 2 ){ datos.push(datos04[a]) }
}
 
 var longdatos = datos.length             
 var dimensionFloat = Math.sqrt(datos.length)
 dimension = Math.ceil(dimensionFloat)
 //alert( '  longdatos: ' + longdatos + ' \n  longdatos/dimension: ' + longdatos/dimension + ' \n  dimensionFloat: ' + dimensionFloat + ' \n  dimension: ' + dimension + '  \n  longdatos % dimensionFloat :' + longdatos % dimensionFloat + ' \n  longdatos % dimension: ' + longdatos % dimension + ' \n  longdatos - dimension*dimension: ' +  (longdatos - dimension*dimension ) + ' \n  dimension*dimension - longdatos: ' +  (dimension*dimension - longdatos ) )
 /*
  longdatos: 251 
  longdatos/dimension: 15.6875 
  dimensionFloat: 15.84297951775486 
  dimension: 16  
  longdatos % dimensionFloat :13.355307233677113 
  longdatos % dimension: 11 
  longdatos - dimension*dimension: -5 
  dimension*dimension - longdatos: 5
  */
 
 var datoslength=datos.length
 
 for(var a = 0; a < dimension*dimension - longdatos ; a++){
  datos[datoslength+a] = ' '
 }
 
 var maxlong = 0
 var maxlong0 = 0
 for(var a = 0; a < datoslength ; a++){
  maxlong0=datos[a].length
  if(maxlong0>maxlong){
    maxlong = maxlong0 
  }
 } 
 //alert(maxlong)
 maxlong++
 


 //ground.translate(position.windowWidth/2, position.windowWeight/2);



var center = 128;
 var width = 127;
 var steps = maxlong;
 var frequency = Math.PI/steps;
 colors= makeColorGradient(frequency,frequency,frequency,0,2,4,center,width,maxlong);



 
var line1= position.windowWidth / maxlong
//alert(maxlong+' '+line1)



//alert(dimension+' '+ dimension*dimension + ' ' + longdatos + ' '+ (dimension*dimension-longdatos)+' '+datoslength+' '+ datos.length)
 datosarray = []    
 colorsarray =[]
 for (var i = 0; i < dimension; i++){
   datosarray[i]=[]
   colorsarray[i]=[]
  for (var j = 0; j < dimension; j++){
   datosarray[i][j]=datos[i*dimension+j]
   colorsarray[i][j] = colors[datosarray[i][j].length] 
   //colorsarray[i][j] = '#'+hex(datosarray[i][j].length)
   /*
   if(datosarray[i][j].length < 50  && datosarray[i][j].length >  0){ colorsarray[i][j] = colors[1] }
   if(datosarray[i][j].length < 100 && datosarray[i][j].length > 50){ colorsarray[i][j] = colors[2] }
   if(datosarray[i][j].length < 150 && datosarray[i][j].length >100){ colorsarray[i][j] = colors[3] }
   if(datosarray[i][j].length < 200 && datosarray[i][j].length >150){ colorsarray[i][j] = colors[4] }
   if(datosarray[i][j].length < 250 && datosarray[i][j].length >200){ colorsarray[i][j] = colors[5] }
   if(datosarray[i][j].length > 250){                                 colorsarray[i][j] = colors[6] }
   */
  }
} 





  /*
 groundcursor = vm.rect(0, 0, 40, 40);
  groundcursor.attr({"fill": "#e00", "stroke-width":0})
  //groundcursor.node.id = 'groundcursorRect'
  ground.mousemove(function(e){
      //e = e || window.event;
      var pageCoords = {"x": e.pageX , "y": e.pageY };
      var clientCoords = {"x": e.clientX , "y": e.clientY };
      var coordshape={"x": (clientCoords.x-pageCoords.x) , "y": (clientCoords.y-pageCoords.y) }
      document.getElementById("texto").innerHTML='top:' +e.clientX+' '+ e.pageX+' '+coordshape.x+' left:'+ e.clientY+' '+ e.pageY+' '+ coordshape.y
      groundcursor.attr({'x':coordshape.x,'y':coordshape.y}) 
      //$("div:vc").css({ top: (clientCoords.x), left: (clientCoords.y) });
      //var position = p.position();
      //$("span:first").text("( e.pageX, e.pageY ) - " + pageCoords);
      //$("span:last").text("( e.clientX, e.clientY ) - " + clientCoords);
  });
 
 
 
 var txt = {font: '12px Fontin-Sans, Arial', fill: "#fff"},
        txt1 = {font: '10px Fontin-Sans, Arial', fill: "#fff"},
        txt2 = {font: '12px Fontin-Sans, Arial', fill: "#000"}
    
 var frame = vm.rect(10, 10, 100, 40, 5).attr({fill: "#000", stroke: "#474747", "stroke-width": 2}).hide()
 var label = []
 label[0] = vm.text(60, 10, "nn").attr(txt).hide();
 label[1] = vm.text(60, 40, "nn").attr(txt1).attr({fill: '#000'}).hide();
  */
 
 //vm.circle(29, 120, 23).attr({"fill": "#a44", "stroke-width":2})
 
 //matrix_container_raphael[0]=''
 //var ancho = (position.width) / ((dimension-1)*1.75)
 //alert(total.width)
 var ancho = total.width / (dimension)
 //position.width = position.width - (ancho0/3)
 
 //var ancho = (position.width-ancho0*0.25) / (dimension-1)
 //ancho = ancho - (ancho/dimension*0.2)
 var x = 0, y = 0

 
 canvas = document.getElementById("viewmatrixcanvas");
ctx = canvas.getContext("2d");
$canvas = $("#viewmatrixcanvas");
canvasOffset = $canvas.offset();
offsetX = canvasOffset.left;
offsetY = canvasOffset.top;
scrollX = $canvas.scrollLeft();
scrollY = $canvas.scrollTop();
canvas.width = position.windowWidth;
canvas.height = position.windowHeight+20;


 dibujaCanvas(line1,maxlong,ancho,dimension)

$("#viewmatrixcanvas").mousemove(function (e) {
    handleMouseMove(e);
});
/*$("#viewmatrixcanvas").mouseover(function (e) {
     
    //matrix_container_canvas[idselect.i][idselect.j].mouseover
	
});
$("#viewmatrixcanvas").mouseout(function (e) {
     gotext(idselect.i+'_'+idselect.j,''+idselect.i,''+idselect.j)
    //matrix_container_canvas[idselect.i][idselect.j].mouseover
	
});
*/
$("#viewmatrixcanvas").click(function (e) {
    clicktext(idselect.i+'_'+idselect.j,''+idselect.i,''+idselect.j)
	

}); 
  
 
 var circlepath1=''
 
  /*var vm_nivel_max = vm.path("M 13.169439,45.55947 L 14.780883,20.624586 L 4.5257184,22.915579 L 19.338738,4.5876459 L 34.554611,22.441098 L 23.896588,21.295604 L 27.314978,45.825494 L 20.478199,40.098014 L 13.169439,45.55947 z")  
   vm_nivel_max.attr({"fill": "#a44", "stroke": "#202", "stroke-width":3, "fill-opacity":0.5, "stroke-opacity":0.5})
   vm_nivel_max.node.style.cursor = "pointer"; 
   //vm_nivel_max.click(opf2op)     
   vm_nivel_max.mouseover(function () {
    vm_nivel_max.animate({"fill": "#f20", "stroke": "#000", "fill-opacity":1, "stroke-opacity":1}, 100)
   });         
   vm_nivel_max.mouseout(function () {
    vm_nivel_max.animate({"fill": "#a44", "stroke": "#202",  "fill-opacity":0.5,  "stroke-opacity":0.5}, 100);
   });
  



  $("div:viewmatrixCanvas").mousemove(function(event){
  
       var ev=event||window.event;            
       var pos=showpos('viewmatrixCanvas')
       var x=ev.clientX-pos[0] // mouse X
       var y=ev.clientY-pos[1] // mouse Y
       //if(parseInt(x)-x < 0.5){ var x1=parseInt(x)
       //groundcursor.attr({'x': x-20,'y': y-20 })
       // }
      //document.getElementById("texto").innerHTML='top:' +x+' left:'+ y
    });
    
  */  

}
var srcText='';
var parcialTexto;
var seti
function typet(t1){
   clearInterval(seti);
	$("#src").text('');
	parcialTexto='';
	srcText='';	
     $("#src").text(t1);
     //var srcText=t1.trim()
    srcText = $("#src").text().trim();
   		var i = 0;
    	parcialTexto = srcText[i];
		
     seti=setInterval(function() {
        if(i == srcText.length-1) {
            clearInterval(seti);
            return;
        };
        i++;
        parcialTexto += srcText[i];
        $("#texto").text(parcialTexto);

    }, 100); // the period between every character and next one, in milliseonds.

}
function gotext(one,i,j){
 //alert(one+' '+i+' '+j)
 var num=one.split('_')
 //matrix_container_raphael[num[0]][num[1]].attr({ "stroke": "#000"})
 
 //document.getElementById("texto").innerHTML=datosarray[num[0]][num[1]].length+' '+num[0]+' '+ num[1]+' '+datosarray[num[0]][num[1]]
 document.getElementById("texto").innerHTML=datosarray[num[0]][num[1]]
 
 
 return true
} 
function outtext(one){
 var num=one.split('_')
 //matrix_container_raphael[num[0]][num[1]].attr({ "stroke": "#555"})
 return true
} 

function clicktext(one){

 var num=one.split('_')
 var plusx=parseInt(num[0]) 
 var plusy=parseInt(num[1])
 var plus1x=plusx, plus1y=plusy+1, plus2x=plusx, plus2y=plusy+2
 typet(datosarray[plusx][plusy]);
 //alert(dimension)
 /*
 if(plusy==dimension-2){
  //alert(dimension)
  plus1x=plusx;
  plus1y=dimension-1;
  plus2y=0;
  plus2x=plusx+1
   if(plusx==dimension-1){
    plus2x=0
   }

  }

 if(plusy==dimension-1){
  plus1x++;
  plus1y=0;
  plus2x++;
  plus2y=1
   if(plusx==dimension-1){
    plus1x=0 
    plus2x=0 
   }
  
 }


 //alert(one+' '+plus1+' '+plus2)
 matrix_container_raphael[num[1]][num[0]].attr({ "stroke": "#aaa"})
 document.getElementById("texto").innerHTML=datosarray[num[0]][num[1]].length+' '+num[0]+' '+ num[1]+' '+datosarray[num[0]][num[1]]
 document.getElementById("texto").innerHTML+="\n<br />"+datosarray[plus1x][plus1y].length+' '+plus1x+' '+ plus1y+' '+datosarray[plus1x][plus1y]
 document.getElementById("texto").innerHTML+="\n<br />"+datosarray[plus2x][plus2y].length+' '+plus2x+' '+ plus2y+' '+datosarray[plus2x][plus2y]
*/
 return true
} 

var showpos = function(divname) {
  //get the position of the placeholder element
  var pos = $("#"+divname).offset();  
  var width = $("#"+divname).width();
  var r= [pos.left,pos.top]
  return r;
}
  
    
/*
http://www.krazydad.com/makecolors.php  
makeColorGradient(.3,.3,.3,0,2,4);
center = 128;
width = 127;
steps = 6;
frequency = 2*Math.PI/steps;
makeColorGradient(frequency,frequency,frequency,0,2,4,center,width,50);
*/
function RGB2Color(r,g,b)
  {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function makeColorGradient(frequency1, frequency2, frequency3,
                             phase1, phase2, phase3,
                             center, width, len)
  {
   var arr=[]
    if (len == undefined)      len = 50;
    if (center == undefined)   center = 128;
    if (width == undefined)    width = 127;

    for (var i = 0; i < len; ++i)
    {
       var red = Math.sin(frequency1*i + phase1) * width + center;
       var grn = Math.sin(frequency2*i + phase2) * width + center;
       var blu = Math.sin(frequency3*i + phase3) * width + center;
       arr[i]= RGB2Color(red,grn,blu) 
    }         
    return arr
 }


function byte2Hex(n)
  {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }


//http://www.irt.org/articles/js162/


var h="0123456789ABCDEF";
var Fullrgb = "#000000";

function merge(r, g, b) {
    return (r << 16 | g << 8 | b);
}

function hex(c) {
    var temp = "";
    var hexStr = "";
    var remainder, i;

    // divide c by 16 each time
    for( ; c != 0; c >>= 4) {
        remainder = c % 16;
        hexStr += h.charAt(remainder);
    }

    // only thing with a conversion is that it does it backwards
    // so this makes it right
    // you could have also used recursion but that
    // would have been more complicated
    
    for(i=5 ; i >= 0; i--)
        temp += hexStr.charAt(i);

    // return the converted hex number
    return temp;
}

$( document ).ready(function() {
ini();
});
    
    


var img1 = document.getElementById("Reactor");
window.onload = call;
let checkin = 0;

window.addEventListener('resize', call, false);

let chg = 1;

function flip(tst){
if (tst == 1){
  tst = 0;
}
else{
  tst = 1;
}
return tst;
}

function call_flip(){
   but = document.getElementById("changer");
 if (but.innerHTML == "Formules"){
  but.innerHTML = "Cijfers";
}
  else{but.innerHTML = "Formules";
}

chg = flip(chg);
call();
}

function call(){
var cy = document.getElementById("Cycle").value
var startCO = document.getElementById("CO").value
var startH2 = document.getElementById("H2").value
var convi = document.getElementById("conv").value
var spui_in = document.getElementById("spui").value
//var Axis_on = document.getElementById("Axis").value
var checkBox = document.getElementById("Axis");
if (checkBox.checked) {
    var Axis_on = 1
} else {
    var Axis_on = 0
}
reactor(parseInt(cy),parseFloat(startCO),parseFloat(startH2),parseFloat(convi),parseFloat(spui_in),chg,parseInt(Axis_on));
}




function ensureLatexOverlay(texString){
  var canvas = document.getElementById('myCanvas');
  if (!canvas) return;

  // Wrap the canvas in a relatively positioned container if not already
  var parent = canvas.parentElement;
  if (!parent || parent.id !== 'canvasWrap'){
    var wrap = document.createElement('div');
    wrap.id = 'canvasWrap';
    wrap.style.position = 'relative';
    wrap.style.display = 'inline-block';
    // Insert wrapper before canvas and move canvas inside
    if (canvas.parentNode){
      canvas.parentNode.insertBefore(wrap, canvas);
      wrap.appendChild(canvas);
      parent = wrap;
    } else {
      return;
    }
  }

  // Ensure overlay exists
  var overlay = document.getElementById('latexOverlay');
  if (!overlay){
    overlay = document.createElement('div');
    overlay.id = 'latexOverlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '6px';
    overlay.style.right = '6px';
    overlay.style.pointerEvents = 'none';
    overlay.style.whiteSpace = 'nowrap';
    parent.appendChild(overlay);
  }

  // Render with KaTeX when available; graceful fallback otherwise
  if (texString){
    if (window.katex && window.katex.render){
      window.katex.render(texString, overlay, { throwOnError: false });
    } else {
      overlay.innerHTML = 'CO + 2H<sub>2</sub> → CH<sub>3</sub>OH';
    }
  }
}

function reactor(cyc,CO_st,H2_s,Con,SP,CHG,Ax_on){
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
if (window.innerWidth < ctx.canvas.width){
  ctx.canvas.width  = window.innerWidth/2;
  ctx.canvas.height = (ctx.canvas.width/480)*200;
}
else{
  ctx.canvas.width  = window.innerWidth/2;
  ctx.canvas.height = (ctx.canvas.width/480)*200;
}
ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

// Update LaTeX overlay to show the reaction in the upper-right using mhchem
// Using template literal (backticks) to avoid escaping backslashes
//ensureLatexOverlay(`\\large \\color{#1f77b4}{\\ce{CO}} + \\color{#ff7f0e}{\\ce{2H2}} \\ce{->} \\color{#2ca02c}{\\ce{CH3OH}}`);
ensureLatexOverlay(`\\ce{\\color{RoyalBlue}{CO} + \\color{orange}{2H2} -> \\color{green}{CH3OH}}`);
//ctx.canvas.width  = window.innerWidth*0.75;
//ctx.canvas.height = (ctx.canvas.width/480)*200;
//var plot = document.getElementById("GraphID");
//plot.style.width = window.innerWidth*0.75;
//plot.style.height = window.innerWidth*0.45;

ctx.setTransform(1, 0, 0, 1, 0, 0);
let CO_s = CO_st;

var valsout = berekening(H2_s, CO_s, cyc,Con,SP, ctx.canvas.width, ctx.canvas.height, Ax_on);
var width = canvas.width;
var height = canvas.height;
var arrowsize = 5;
var txt = "nope" ;
var sp = 15; //spacing
//let CO_s = CO_st;
var H2_recycle = valsout[cyc][7].toFixed(3);
var CO_recycle = valsout[cyc][6].toFixed(3);
var H2_inSR = valsout[cyc][1].toFixed(3);
var CO_inSR = valsout[cyc][0].toFixed(3);
var H2_SR = valsout[cyc][10].toFixed(3);
var H2_SR_show = Math.abs((H2_SR-H2_inSR)).toFixed(3);
var H2_uitSR = H2_SR;
var CO_uitSR = valsout[cyc][9].toFixed(3);
var CO_SR = valsout[cyc][2].toFixed(3);
var H2_spui = valsout[cyc][5].toFixed(3);
var CO_spui = valsout[cyc][4].toFixed(3);
var CH3OH = valsout[cyc][8].toFixed(3);

var str2 = "2";
var width = canvas.width;
var height = canvas.height;
var R_length = 80;
var R_x = 288 - R_length;
var R_height = 40;
var R_y = 140-R_height;
var S1_x = 96-R_height;
var S2_x = 410-R_height;

//Color
var ColorCO = "#1f77b4"
var ColorH2 = "#ff7f0e"
var ColorCH3OH = "#2ca02c"
//Steady text
//ctx.scale(canvas.height/200,canvas.width/480);
ctx.scale(ctx.canvas.width/480,ctx.canvas.height/200);
ctx.font = "18pt Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("C", S1_x+R_height/2,R_y+R_height/2+2);
ctx.fillText("S", S2_x+R_height/2,R_y+R_height/2+2);


ctx.font = "10pt Arial";
ctx.textBaseline = "bottom";
ctx.fillText("Synthese", R_x+R_length/2,R_y+R_height/2-2);
ctx.fillStyle = ColorCO;
ctx.fillText("CO", width,height);
ctx.textBaseline = "top";
ctx.fillStyle = 'black';
ctx.fillText("Reactor", R_x+R_length/2,R_y+R_height/2+2);
ctx.textBaseline = "middle";
ctx.font = "8pt Arial";
ctx.textBaseline = "top";
ctx.fillText("Recycle R", R_x+R_length/2,65);
//ctx.fillText("Spui", S2_x+R_height/2+20,10);
ctx.textAlign = "start";
ctx.textBaseline = "bottom";
ctx.fillText("Verse", S1_x-R_height*1.3,R_y+R_height/2-16);
ctx.fillText("voeding", S1_x-R_height*1.3,R_y+R_height/2-2);
ctx.textBaseline = "bottom";
ctx.fillText("in SR", S1_x+R_height+arrowsize,R_y+R_height/2-2);
ctx.fillText("uit SR", R_x+R_length+arrowsize,R_y+R_height/2-2);
ctx.textBaseline = "middle";
if (CHG == 1){
// Variable text
ctx.font = "10pt Arial";
//FEED
ctx.fillStyle = ColorCO;
ctx.fillText(CO_s + " CO", S1_x-R_height*1.3,R_y+R_height/2+sp);
ctx.fillStyle = ColorH2;
ctx.fillText(H2_s + " H", S1_x-R_height*1.3,R_y+R_height/2+sp*2);
ctx.fillStyle = "black"
var Hfeed = H2_s + " H";
var Hfeed_norm = "3 H";
//Recycle
ctx.textAlign = "start";
ctx.fillStyle = ColorCO;
ctx.fillText(CO_recycle + " CO", R_x+R_length/4,60-11-sp);
ctx.fillStyle = ColorH2;
ctx.fillText(H2_recycle + " H", R_x+R_length/4,60-11);
var H_rec = H2_recycle + " H";
// in SR
ctx.fillStyle = ColorCO;
ctx.fillText(CO_inSR+ " CO", S1_x+R_height+arrowsize,R_y+R_height/2+sp);
ctx.fillStyle = ColorH2;
ctx.fillText(H2_inSR+ " H", S1_x+R_height+arrowsize,R_y+R_height/2+sp*2);
var Hin = H2_inSR+ " H";
// SR
ctx.textAlign = "center";
ctx.fillStyle = 'red';

ctx.fillText("-", R_x+arrowsize,R_y+R_height+sp);
ctx.fillText("-", R_x+arrowsize,R_y+R_height+sp*2);
ctx.fillStyle = 'black';
ctx.fillText("+", R_x+arrowsize,R_y+R_height+sp*3);
ctx.textAlign = "start";
ctx.fillStyle = 'red';
ctx.fillText(CO_SR + " CO", R_x+sp,R_y+R_height+sp);
ctx.fillText(H2_SR_show + " H", R_x+sp,R_y+R_height+sp*2);
ctx.fillStyle = 'black';
ctx.fillStyle = ColorCH3OH;
ctx.fillText(CH3OH + " CH", R_x+sp,R_y+R_height+sp*3);
ctx.fillText("OH", R_x+sp+61.5,R_y+R_height+sp*3);
var Hsr = H2_SR_show + " H";
// uit SR
ctx.fillStyle = ColorCO;
ctx.fillText(CO_uitSR + " CO", R_x+R_length+arrowsize,R_y+R_height/2+sp);
ctx.fillStyle = ColorH2;
ctx.fillText(H2_SR + " H", R_x+R_length+arrowsize,R_y+R_height/2+sp*2);
ctx.fillStyle = ColorCH3OH;
ctx.fillText(CH3OH + " CH", R_x+R_length+arrowsize,R_y+R_height/2+sp*3);
ctx.fillText("OH", R_x+R_length+arrowsize+61.5,R_y+R_height/2+sp*3);
var Huit = H2_SR + " H";

//CH3OH
//ctx.fillText(CH3OH + " CH"+ String.fromCharCode(8323)+"OH", S2_x+R_height+arrowsize,R_y+R_height/2+sp);
ctx.fillText(CH3OH, S2_x+R_height+arrowsize,R_y+R_height/2+sp);
ctx.fillText("CH", S2_x+R_height+arrowsize,R_y+R_height/2+sp*2);
ctx.fillText("OH", S2_x+R_height+arrowsize+24.5,R_y+R_height/2+sp*2);

var Hnorm = "0.000 H";
ctx.fillStyle = "black";

//window.alert(ctx.measureText(Huit));
//spui
if (SP > 0){
ctx.fillStyle = ColorCO  
ctx.fillText(CO_spui + " CO", S2_x+R_height/2+arrowsize+9,20+sp);
ctx.fillStyle = ColorH2  
ctx.fillText(H2_spui + " H", S2_x+R_height/2+arrowsize+9,20+sp*2);
ctx.fillStyle = "black"  

}
//Diverse

ctx.font = "10pt Arial";
ctx.textAlign = "left";
ctx.textBaseline = "top";


//Subscript
ctx.font = "7pt Arial";
ctx.fillStyle = ColorCH3OH;
ctx.fillText("3", S2_x+R_height+arrowsize+19.5,R_y+R_height/2+sp*2-1);
ctx.fillText("3", R_x+sp+56.5,R_y+R_height+sp*3);
ctx.fillText("3", R_x+R_length+arrowsize+56.5,R_y+R_height/2+sp*3);
ctx.fillStyle = 'red';
ctx.fillText("2", R_x+sp+47*ctx.measureText(Hsr).width/ctx.measureText(Hnorm).width,R_y+R_height+sp*2);
ctx.fillStyle = ColorH2;  
ctx.fillText("2", S1_x+R_height+arrowsize+47*ctx.measureText(Hin).width/ctx.measureText(Hnorm).width,R_y+R_height/2+sp*2);
ctx.fillText("2", S1_x-(R_height*1.3)+21*ctx.measureText(Hfeed).width/ctx.measureText(Hfeed_norm).width,R_y+R_height/2+sp*2);
ctx.fillText("2", R_x+R_length+arrowsize+47*ctx.measureText(Huit).width/ctx.measureText(Hnorm).width,R_y+R_height/2+sp*2);

ctx.fillText("2", R_x+R_length/4+47*ctx.measureText(H_rec).width/ctx.measureText(Hnorm).width,60-11);
ctx.fillStyle = "black";

if (SP > 0){
ctx.fillStyle = ColorH2;  
ctx.fillText("2", S2_x+R_height/2+arrowsize+55,20+sp*2);
ctx.fillStyle = "black";

}
}
else{
  //Calculation show
  var Hnorm = "0.000 H";

  //FEED
  ctx.font = "10pt Arial";
  ctx.fillStyle = ColorCO;  
  ctx.fillText("F", S1_x-R_height*1.3,R_y+R_height/2+sp);
  ctx.fillStyle = ColorH2;  
  ctx.fillText("F", S1_x-R_height*1.3,R_y+R_height/2+sp*2);
  var Hfeed = "F";
  var COfeed = "F";
  ctx.font = "7pt Arial";
  ctx.textBaseline = "top";
  ctx.fillStyle = ColorH2;  
  ctx.fillText("H", S1_x-(R_height*1.3)+2+ctx.measureText(Hfeed).width,R_y+R_height/2+sp*2);
  ctx.fillStyle = ColorCO;  

  ctx.fillText("CO", S1_x-(R_height*1.3)+2+ctx.measureText(COfeed).width,R_y+R_height/2+sp);
  ctx.font = "5pt Arial";
  ctx.fillStyle = ColorH2;  

  ctx.fillText("2", S1_x-(R_height*1.3)+10+ctx.measureText(Hfeed).width,R_y+R_height/2+4+sp*2);
  ctx.fillStyle = "black";  


  //inSR
  ctx.font = "10pt Arial";
  ctx.textBaseline = "middle";
  ctx.fillStyle = ColorCO;  
  ctx.fillText("F", S1_x+R_height+arrowsize-2,R_y+R_height/2+sp);
  ctx.fillStyle = ColorH2;  
  ctx.fillText("F", S1_x+R_height+arrowsize-2,R_y+R_height/2+sp*2);
  ctx.fillStyle = "black";  

  ctx.font = "7pt Arial";
  ctx.textBaseline = "top";
  ctx.fillStyle = ColorCO;  

  ctx.fillText("CO", S1_x+R_height+arrowsize+ctx.measureText(Hfeed).width,R_y+R_height/2+sp);
  ctx.fillStyle = ColorH2;  

  ctx.fillText("H", S1_x+R_height+arrowsize+ctx.measureText(Hfeed).width,R_y+R_height/2+sp*2);
  ctx.font = "5pt Arial";
  ctx.fillText("2", S1_x+R_height+arrowsize+8+ctx.measureText(Hfeed).width,R_y+R_height/2+4+sp*2);
  ctx.font = "10pt Arial";
  ctx.textBaseline = "middle";
  ctx.fillStyle = ColorCO;  
  ctx.fillText("+ R", S1_x+R_height+arrowsize+13+ctx.measureText(Hfeed).width,R_y+R_height/2+sp);
  ctx.fillStyle = ColorH2;  
  ctx.fillText("+ R", S1_x+R_height+arrowsize+13+ctx.measureText(Hfeed).width,R_y+R_height/2+sp*2);
  ctx.font = "7pt Arial";
  ctx.textBaseline = "top";
  ctx.fillStyle = ColorCO;  
  ctx.fillText("CO", S1_x+R_height+arrowsize+38+ctx.measureText(Hfeed).width,R_y+R_height/2+sp);
  ctx.fillStyle = ColorH2;  
  ctx.fillText("H", S1_x+R_height+arrowsize+38+ctx.measureText(Hfeed).width,R_y+R_height/2+sp*2);
  ctx.font = "5pt Arial";
  ctx.fillText("2", S1_x+R_height+arrowsize+46+ctx.measureText(Hfeed).width,R_y+R_height/2+4+sp*2);
  ctx.font = "10pt Arial";
  ctx.textBaseline = "middle";
  ctx.fillStyle = ColorCO;  
  ctx.fillText("= Fin", S1_x+R_height+arrowsize+51+ctx.measureText(Hfeed).width,R_y+R_height/2+sp);
  ctx.fillStyle = ColorH2;  
  ctx.fillText("= Fin", S1_x+R_height+arrowsize+51+ctx.measureText(Hfeed).width,R_y+R_height/2+sp*2);
  ctx.font = "7pt Arial";
  ctx.textBaseline = "top";
  ctx.fillStyle = ColorCO;  
  ctx.fillText("CO", S1_x+R_height+arrowsize+83+ctx.measureText(Hfeed).width,R_y+R_height/2+sp);
  ctx.fillStyle = ColorH2;  
  ctx.fillText("H", S1_x+R_height+arrowsize+84+ctx.measureText(Hfeed).width,R_y+R_height/2+sp*2);
  ctx.font = "5pt Arial";
  ctx.fillText("2", S1_x+R_height+arrowsize+92+ctx.measureText(Hfeed).width,R_y+R_height/2+4+sp*2);
  //SR
  ctx.font = "10pt Arial";
  ctx.textBaseline = "middle";
  ctx.fillStyle = ColorCO;  
  ctx.fillText("Fin", R_x+arrowsize,R_y+R_height+sp);
  ctx.fillStyle = ColorH2;  
  ctx.fillText("Fin", R_x+arrowsize,R_y+R_height+sp*2);
  ctx.font = "7pt Arial";
  ctx.textBaseline = "top";
  ctx.fillStyle = ColorCO;  
  ctx.fillText("CO", R_x+arrowsize+6+ctx.measureText("Fin").width,R_y+R_height+sp);
  ctx.fillStyle = ColorH2;  
  ctx.fillText("H", R_x+arrowsize+6+ctx.measureText("Fin").width,R_y+R_height+sp*2);
  ctx.font = "5pt Arial";
  ctx.fillText("2", R_x+arrowsize+26,R_y+R_height+4+sp*2);
  ctx.font = "10pt Arial";
  ctx.textBaseline = "middle";
  ctx.fillStyle = ColorCO;  

  ctx.fillText(String.fromCharCode(215)+" "+Con+" =", R_x+arrowsize+18 + ctx.measureText("Fin").width,R_y+R_height+sp);
  //ctx.fillText("Fin", R_x+arrowsize,R_y+R_height+sp*2);
  ctx.font = "10pt Arial";
  ctx.textBaseline = "middle";
  ctx.fillText("SR", R_x+arrowsize+63+ctx.measureText("Fin").width,R_y+R_height+sp);
  ctx.font = "7pt Arial";
  ctx.textBaseline = "top";
  
  ctx.fillText("CO", R_x+arrowsize+87+ctx.measureText("SR").width,R_y+R_height+sp);
  ctx.font = "10pt Arial";
  ctx.textBaseline = "middle";
  
  ctx.fillStyle = "black";  

  ctx.fillText("-", R_x+arrowsize+18+ctx.measureText("Fin").width,R_y+R_height+sp*2);
  ctx.fillStyle = ColorCO;  

  ctx.font = "10pt Arial";
  ctx.textBaseline = "middle";
  ctx.fillText("2"+String.fromCharCode(215)+"SR", R_x+arrowsize+18+ctx.measureText("Fin   ").width,R_y+R_height+sp*2);
  ctx.fillStyle = ColorCO;  

  ctx.font = "7pt Arial";
  ctx.textBaseline = "top";
  ctx.fillText("CO", R_x+arrowsize+53+ctx.measureText("2 xFuit").width,R_y+R_height+sp*2);
  ctx.fillStyle = ColorH2;  

  ctx.font = "10pt Arial";
  ctx.textBaseline = "middle";
  ctx.fillText("= SR", R_x+arrowsize+66+ctx.measureText("Fin   ").width,R_y+R_height+sp*2);
  ctx.font = "7pt Arial";
  ctx.textBaseline = "top";
  ctx.fillText("H", R_x+arrowsize+113+ctx.measureText("Fin").width,R_y+R_height+sp*2);
  ctx.font = "5pt Arial";
  ctx.fillText("2", R_x+arrowsize+132,R_y+R_height+4+sp*2);
  ctx.fillStyle = ColorCO;  

  ctx.font = "10pt Arial";
  ctx.textBaseline = "middle";
  ctx.fillText("SR", R_x+arrowsize,R_y+R_height+sp*3);
  ctx.font = "7pt Arial";
  ctx.textBaseline = "top";
  ctx.fillText("CO", R_x+arrowsize+6+ctx.measureText("Fin").width,R_y+R_height+sp*3);
  ctx.font = "10pt Arial";
  
  ctx.textBaseline = "middle";
  ctx.fillStyle = ColorCH3OH;  

  ctx.fillText("= SR", R_x+arrowsize+18+ctx.measureText("Fin").width,R_y+R_height+sp*3);
  ctx.font = "7pt Arial";
  ctx.textBaseline = "top";
  ctx.fillText("CH", R_x+arrowsize+16+ctx.measureText("SRCO = SR").width,R_y+R_height+sp*3);
  ctx.font = "5pt Arial";
  ctx.fillText("3", R_x+arrowsize+80,R_y+R_height+4+sp*3);
  ctx.font = "7pt Arial";
  ctx.textBaseline = "top";
  ctx.fillText("OH", R_x+arrowsize+15+ctx.measureText("SRCO = SRCH3").width,R_y+R_height+sp*3);
  // S uit
  ctx.fillStyle = ColorCH3OH;  

  ctx.font = "10pt Arial";
  ctx.textBaseline = "middle";
  ctx.fillText("SR", S2_x+R_height+arrowsize,R_y+R_height/2+sp);
  ctx.font = "7pt Arial";
  ctx.textBaseline = "top";
  ctx.fillText("CH", S2_x+R_height+arrowsize+ctx.measureText("SR  ").width,R_y+R_height/2+sp);
  ctx.font = "5pt Arial";
  ctx.fillText("3", S2_x+R_height+arrowsize+32,R_y+R_height/2+4+sp);
  ctx.font = "7pt Arial";
  ctx.textBaseline = "top";
  ctx.fillText("OH", S2_x+R_height+arrowsize+2+ctx.measureText("SRCH   ").width,R_y+R_height/2+sp);
  ctx.fillStyle = "black";  

  if (SP > 0){
  ctx.font = "10pt Arial";
  ctx.textBaseline = "middle";
    
  ctx.fillStyle = ColorCO;  
  
  ctx.fillText("SR", S2_x+R_height/2+arrowsize+5,20+sp);
  ctx.fillStyle = ColorH2;  

  ctx.fillText("SR", S2_x+R_height/2+arrowsize+5,20+sp*2);
  ctx.fillStyle = "black";  

  ctx.fillText(String.fromCharCode(215)+" "+SP, S2_x+R_height/2+arrowsize+arrowsize+ctx.measureText("SRH2").width,20+sp);
  ctx.fillText(String.fromCharCode(215)+" "+SP, S2_x+R_height/2+arrowsize+arrowsize+ctx.measureText("SRH2").width,20+sp*2);
  
  //Recycle
  ctx.fillStyle = ColorCO;  

  ctx.fillText("R", R_x,60-11-sp);
  ctx.fillStyle = ColorH2;  

  ctx.fillText("R", R_x,60-11);
  ctx.fillStyle = ColorCO;  

  ctx.fillText("= SR", R_x+ctx.measureText("RCO").width-3,60-11-sp);
  ctx.fillStyle = ColorH2;  

  ctx.fillText("= SR", R_x+ctx.measureText("RH2").width,60-11);
  ctx.fillStyle = "black";  

  ctx.fillText(String.fromCharCode(215)+" "+(1-SP).toFixed(1), R_x+ctx.measureText("RCO=SRCO").width-3,60-11-sp);
  ctx.fillText(String.fromCharCode(215)+" "+(1-SP).toFixed(1), R_x+ctx.measureText("RH2=SRH2 ").width-1,60-11);

  ctx.font = "7pt Arial";
  ctx.textBaseline = "top";
  ctx.fillStyle = ColorH2;  
  ctx.fillText("H", S2_x+R_height/2+1+arrowsize+ctx.measureText("SR    ").width,20+sp*2);
  ctx.fillStyle = ColorCO;  

  ctx.fillText("CO", S2_x+R_height/2+arrowsize+ctx.measureText("SR    ").width,20+sp);
  ctx.fillText("CO", R_x+1+ctx.measureText("R ").width,60-11-sp);
  ctx.fillStyle = ColorH2;  

  ctx.fillText("H", R_x+1+ctx.measureText("R ").width,60-11);
  ctx.fillStyle = ColorCO;  

  ctx.fillText("CO", R_x+1+ctx.measureText("RCO = SR     ").width-1,60-11-sp);
  ctx.fillStyle = ColorH2;  

  ctx.fillText("H", R_x+1+ctx.measureText("RH2 = SR      ").width-1,60-11);


  ctx.font = "5pt Arial";
  ctx.fillText("2", S2_x+R_height+16,20+4+sp*2);
  ctx.fillText("2", R_x+17,60+4-11);
  ctx.fillText("2", R_x+65,60+4-11);
  ctx.fillStyle = "black";  

  }
  else{
    ctx.font = "10pt Arial";
    ctx.textBaseline = "middle";
    //Recycle
    ctx.fillStyle = ColorCO;  
    ctx.fillText("R", R_x,60-11-sp);
    ctx.fillStyle = ColorH2;  
    ctx.fillText("R", R_x,60-11);
    ctx.fillStyle = ColorCO;  
    ctx.fillText("= SR", R_x+ctx.measureText("RCO").width-3,60-11-sp);
    ctx.fillStyle = ColorH2;  
    ctx.fillText("= SR", R_x+ctx.measureText("RH2").width,60-11);

    ctx.font = "7pt Arial";
    ctx.textBaseline = "top";
    ctx.fillStyle = ColorCO;  
    ctx.fillText("CO", R_x+1+ctx.measureText("R ").width,60-11-sp);
    ctx.fillStyle = ColorH2;  
    ctx.fillText("H", R_x+1+ctx.measureText("R ").width,60-11);
    ctx.fillStyle = ColorCO;  
    ctx.fillText("CO", R_x+1+ctx.measureText("RCO = SR     ").width-1,60-11-sp);
    ctx.fillStyle = ColorH2;  
    ctx.fillText("H", R_x+1+ctx.measureText("RH2 = SR      ").width-1,60-11);
    ctx.font = "5pt Arial";
    ctx.fillText("2", R_x+17,60+4-11);
    ctx.fillText("2", R_x+65,60+4-11);
    ctx.fillStyle = "black";  

  }
  ctx.font = "10pt Arial";

}



if (SP > 0){
  ctx.font = "10pt Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

ctx.fillText("Spui "+SP*100+"%" ,  S2_x+R_height/2+10,10);
}
ctx.textAlign = "left";
ctx.textBaseline = "top";

ctx.font = "15pt Arial";
ctx.fillText("Cycle "+cyc, 10,10);
ctx.font = "italic 8pt Arial";
ctx.textAlign = "center";
ctx.textBaseline = "bottom";
ctx.fillText(Con*100+"% Conversie", R_x+R_length/2,R_y-2);
//Rectangles
//Reactor
ctx.strokeRect(R_x,R_y,R_length,R_height);
//C
ctx.strokeRect(S1_x,R_y,R_height,R_height);
//S
ctx.strokeRect(S2_x,R_y,R_height,R_height);
//Lines
//Feed line
ctx.beginPath();
ctx.moveTo(S1_x-R_height*1.3, R_y+R_height/2);
ctx.lineTo(S1_x, R_y+R_height/2);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(S1_x+R_height, R_y+R_height/2);
ctx.lineTo(R_x, R_y+R_height/2);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(R_x+R_length, R_y+R_height/2);
ctx.lineTo(S2_x, R_y+R_height/2);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(S2_x+R_height, R_y+R_height/2);
ctx.lineTo(S2_x+R_height*2.5, R_y+R_height/2);
ctx.stroke();
if (SP > 0){
ctx.beginPath();
ctx.moveTo(S2_x+R_height/2, 60);
ctx.lineTo(S2_x+R_height/2, 20);
ctx.stroke();
}
ctx.beginPath();
ctx.moveTo(S2_x+R_height/2, R_y);
ctx.lineTo(S2_x+R_height/2, 60);
ctx.lineTo(S1_x+R_height/2,60);
ctx.lineTo(S1_x+R_height/2, R_y);
ctx.stroke();

//Arrowheads
ctx.beginPath();
   ctx.moveTo(S1_x+R_height/2, R_y);
   ctx.lineTo(S1_x+R_height/2+arrowsize, R_y-arrowsize-arrowsize/2);
   ctx.lineTo(S1_x+R_height/2-arrowsize, R_y-arrowsize-arrowsize/2);
   ctx.fill();



if (SP > 0){
ctx.beginPath();
   ctx.moveTo(S2_x+R_height/2,20);
   ctx.lineTo(S2_x+R_height/2+arrowsize,20+arrowsize+arrowsize/2);
   ctx.lineTo(S2_x+R_height/2-arrowsize,20+arrowsize+arrowsize/2);
   ctx.fill();
}


ctx.beginPath();
   ctx.moveTo(S2_x+R_height*2.5, R_y+R_height/2);
   ctx.lineTo(S2_x+R_height*2.5-arrowsize-arrowsize/2, R_y+R_height/2-arrowsize);
   ctx.lineTo(S2_x+R_height*2.5-arrowsize-arrowsize/2, R_y+R_height/2+arrowsize);
   ctx.fill();



ctx.beginPath();
   ctx.moveTo(S1_x, R_y+R_height/2);
   ctx.lineTo(S1_x-arrowsize-arrowsize/2, R_y+R_height/2-arrowsize);
   ctx.lineTo(S1_x-arrowsize-arrowsize/2, R_y+R_height/2+arrowsize);
   ctx.fill();

ctx.beginPath();
   ctx.moveTo(R_x, R_y+R_height/2);
   ctx.lineTo(R_x-arrowsize-arrowsize/2, R_y+R_height/2-arrowsize);
   ctx.lineTo(R_x-arrowsize-arrowsize/2, R_y+R_height/2+arrowsize);
   ctx.fill();

   ctx.beginPath();
      ctx.moveTo(S2_x, R_y+R_height/2);
      ctx.lineTo(S2_x-arrowsize-arrowsize/2, R_y+R_height/2-arrowsize);
      ctx.lineTo(S2_x-arrowsize-arrowsize/2, R_y+R_height/2+arrowsize);
      ctx.fill();

//window.alert(valsout);
//ctx.fillText(valsout[parseInt(cyc)][1].toFixed(4), S1_x+R_height+arrowsize,20+sp);


}


function berekening (H2_begin, CO_begin, num, omz, sp, wi, hi, Ax_on){
Plotly.purge("GraphID");

 var n =  num;

 var vals= [];
//vals.length = 10;
var conv = omz;
var spui = sp;
var inH2 = 0;
var inCO = 0;
var reaH2 = 0;
var reaCO = 0;
var spuiH2 = 0;
var spuiCO = 0;
var recH2 = 0;
var recCO = 0;
var meth = 0;
var uitCO = 0;
var uitH2 = 0;


for (x = 0; x <= n+1; x++){
  vals[x]=[];
 }

 var plot_x = [0];
 var plot_CO = [0];
 var plot_H2 = [0];
 var plot_CH3OH = [0];


   var sz = 3 + 8 * ((window.innerWidth - 320) / 720);
   var szb = 5 + 8 * ((window.innerWidth - 320) / 720);

       for (var i = 0; i <= n; i++){
         if (i <1){
         vals[0][0]=0;
         vals[0][1]=0;
         vals[0][2]=0;
         vals[0][3]=0;
         vals[0][4]=0;
         vals[0][5]=0;
         vals[0][6]=0;
         vals[0][7]=0;
         vals[0][8]=0;
         vals[0][9]=0;
         vals[0][10]=0
         plot_x.push(0);
         plot_CO.push(0);
         plot_H2.push(0);
         plot_CH3OH.push(0);

        }
        else{
           inCO = CO_begin + recCO;
           inH2 = H2_begin + recH2;
           //window.alert(inCO);
           reaCO = conv*inCO;
           reaH2 = 2*(conv*inCO);
           meth = conv*inCO;
           uitCO = inCO - reaCO;
           uitH2 = inH2 - reaH2
           spuiCO = spui*uitCO;
           spuiH2 = spui*uitH2;
           recH2 = uitH2 - spuiH2;
           recCO = uitCO - spuiCO;


           vals[i][0] = inCO;
           vals[i][1] = inH2;
           vals[i][2] = reaCO;
           vals[i][3] = reaH2;
           vals[i][4] = spuiCO;
           vals[i][5] = spuiH2;
           vals[i][6] = recCO;
           vals[i][7] = recH2;
           vals[i][8] = meth;
           vals[i][9] = uitCO;
           vals[i][10] = uitH2



           if (uitH2 < 0){
             reaH2 = 0;
             reaCO = inH2/2;
             meth = reaCO;
             uitCO = inCO - reaCO;
             spuiCO = spui*uitCO;
             spuiH2 = spui*reaH2;
             recH2 = reaH2 - spuiH2;
             recCO = uitCO - spuiCO;

             vals[i][0] = inCO;
             vals[i][1] = inH2;
             vals[i][2] = reaCO;
             vals[i][3] = reaH2;
             vals[i][4] = spuiCO;
             vals[i][5] = spuiH2;
             vals[i][6] = recCO;
             vals[i][7] = recH2;
             vals[i][8] = meth;
             vals[i][9] = uitCO;
             vals[i][10]= reaH2;
           }


           plot_x.push(i);
           plot_CO.push(vals[i][6].toFixed(3));
           plot_H2.push(vals[i][7].toFixed(3));
           plot_CH3OH.push(vals[i][8].toFixed(3));
}
           //reaCO = inCO - (conv*inCO);
           //reaH2 = inH2 - 2*conv*inCO;
           //meth = conv*inCO;


           //window.alert(plot_CO);
          // var inH2 = 0;
          // var inCO = 0;
          // var reaH2 = 0;
           //var reaCO = 0;
          // var spuiH2 = 0;
          // var spuiCO = 0;
          // var recH2 = 0;
        //   var recCO = 0;
        //   var meth = 0;
        // }
        var ymax;
        var xmax;




        if (n<1){
           ymax = 1;
           xmax = 1;
        }


        else{

           if (Ax_on == 0){
            ymax = plot_H2[n+1]
            xmax = plot_x[n+1]
           }
           else{
              if (plot_CO[n+1] > plot_CH3OH[n+1]){
                  ymax = plot_CO[n+1];
                  xmax = plot_x[n+1];
                  }
                  else{
                    ymax = plot_CH3OH[n+1];
                    xmax = plot_x[n+1];
                    }
           }


}    var COplot = {
          x: plot_x,
          y: plot_CO,
          mode: 'lines',
          name: 'CO',
          line: {shape: 'spline'}


        };

        var H2plot = {
          x:  plot_x,
          y:  plot_H2,
          mode: 'lines',
          name: 'H<sub>2</sub>',
          line: {shape: 'spline'}

        };
        if (Ax_on == 1) {
          H2plot.yaxis = 'y2';
        };
        var CH3OHplot = {
          x:  plot_x,
          y:  plot_CH3OH,
          mode: 'lines',
          name: 'CH<sub>3</sub>OH',
          line: {shape: 'spline'}

        };
        var data = [COplot, H2plot, CH3OHplot];

        var layout = {
          width: window.innerWidth/2,
          height: window.innerWidth*0.3,
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          modebar:{
            color: 'rgba(0,0,0,0.6)',
            activecolor: 'rgba(0,0,0,0.4)',
            bgcolor: 'rgba(0,0,0,0)'},
        showlegend: true,

        margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 35,
        pad: 0
        },

        legend: {
          font: {size: szb},
          orientation: "h",
          xref: 'x domain',
          yref: 'y',
          x: 0,
          xanchor: 'left',
          y: 1.08
        },

        xaxis: {
          title:{text:'Cycle #',
          standoff: szb},
          range : [0 , xmax*1.05],
          automargin: true,
          ticks: 'outside',
          titlefont: {
              size: szb,
            },
            tickfont: {
              size: sz,
            },
        },

        yaxis1: {
          title: {text:'Recycle CO en CH<sub>3</sub>OH',
          standoff: szb},

          automargin: true,

          ticks: 'outside',
          titlefont: {
              size: szb,
            },
            tickfont: {
              size: sz,
            },
            range : [0 , ymax*1.2],
          rangemode: 'tozero',
          //autorange: 'true'
        },

        yaxis2: {
        title: {text:'Recycle H<sub>2</sub>',
        standoff: szb},
        automargin: true,
        ticks: 'outside',
        //scaleanchor: 'y',
        showline: true,
        titlefont: {
            size: szb,
          },
          tickfont: {
            size: sz,
            color: 'black'
          },
        overlaying: 'y',
        side: 'right',
        rangemode: 'tozero',
        //autorange: 'true'
        }
        };

        Plotly.newPlot('GraphID',data, layout);

       }



 return vals;
 }

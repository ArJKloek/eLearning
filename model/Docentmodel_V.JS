const A00 = [87,95,98,85,97,97,93,95,95,95,95,95,31,93,93,93,93,94,92,95,95,91,91,94,55,45,31,14.6,26,22,59,35,67,52,56,58,45,43,43,26,71,71,71,71,52,47,80,46]
const A20 = [-35,-40,-10,-25,-74,-54,-46,-67,-0.65,-1.65,-1.65,-2.65,-2.65,-3.65,-3.75,-0.75,0.22,0.42,0.31,0.28,0.28,0.18,0.18,0.09,-0.19,0.19,0.19,0.09,0.19,-0.44,-0.24,-0.04,-0.25,-0.35,-0.35,-0.65,-0.65,0.65,0.65,0.65,0.6,0.6,1.1,-1.1,-1.1,-0.1,0.53,0.53]
const A02 = [-44,-80,-45,-35,-74,-72,-63,-17,-1.27,-2.27,-2.5,-1.5,1.5,-2.85,-2.65,-1.65,0.33,0.27,0.27,0.87,0.37,0.17,0.17,0.07,0.07,-0.37,-0.37,-0.17,0.47,0.44,0.24,0.07,0.65,0.45,0.45,0.85,-0.85,0.85,0.99,0.99,0.6,0.6,-0.15,0.15,-0.85,-0.85,0.95,1.35]
const A11 = [5,-26,25,-35,0,-8,15,-13,0.55,-0.75,-0.075,-0.85,-0.85,0.85,1.85,1.85,0.43,0.33,0.63,-1.13,-0.77,0.27,0,-0.11,0.31,-0.11,-0.71,-1.71,-2.21,-1.21,-0.1,1.01,-0.75,1.41,-1.73,-0.73,-3.73,0.33,-0.73,-1.05,0.55,0.55,0.55,0.55,-0.95,-1.95,-0.95,-1.33]
const x0 = [0.4,0.7,0.45,0.66,0.27,0.77,0.54,0.61,0.6,0.3,0.7,0.8,0.8,0.7,0.2,0.4,0.4,0.66,0.56,0.46,0.36,0.62,0.62,0.52,0.39,0.69,0.69,0.41,0.69,0.59,0.3,0.5,0.4,0.25,0.75,0.65,0.71,0.31,0.51,0.27,0.5,0.4,0.5,0.5,0.7,0.7,0.5,0.15]
const y0 = [0.6,0.4,0.75,0.33,0.43,0.81,0.1,0.33,0.45,0.45,0.55,0.85,0.85,0.25,0.75,0.55,0.55,0.33,0.43,0.63,0.63,0.44,0.44,0.42,0.42,0.32,0.32,0.52,0.42,0.72,0.5,0.3,0.55,0.41,0.71,0.31,0.47,0.37,0.37,0.67,0.5,0.6,0.5,0.5,0.3,0.3,0.8,0.9]

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function modelkeuze(){

m = document.getElementById("model").value -1
n = document.getElementById("model").value

if (n == null || n == "" || n > 48){
  alert("Vul een model in! 1-48");
return false;
}

if (n >= 1 && n <= 8) {
  //R_model = A00[m]+A20[m]*Math.pow((X-x0[m]),2)+A02[m]*Math.pow((Y-y0[m]),2)+A11[m]*(X-x0[m])*(Y-y0[m])
  t1 = A00[m]
  t2 = A20[m]
  t3 = x0[m]
  t4 = A02[m]
  t5 = y0[m]
  t6 = A11[m]
    model = "Bikwadratisch <p>" + t1.toString() + "+" + t2.toString() + "*(X - " + t3.toString() + ")^2 + " + t4.toString() + "*(Y -" + t5.toString()+ ")^2 + " + t6.toString() + "*(X -" + t3.toString() + ")*(Y - " + t5.toString() + ")"

}
//Gaussich
if (n >= 9 && n <= 16) {
    //R_model = A00[m]*Math.exp(A20[m]*Math.pow((X-x0[m]),2) + A02[m]*Math.pow((Y-y0[m]),2) + A11[m]*(X-x0[m])*(Y-y0[m]))
  //document.getElementById("y1").value = A00[m];
  t1 = A00[m]
  t2 = A20[m]
  t3 = x0[m]
  t4 = A02[m]
  t5 = y0[m]
  t6 = A11[m]
    model = "Gaussisch <p>" + t1.toString() + "* e^( " + t2.toString() + "*(X - " + t3.toString() + ")^2 + " + t4.toString() + "*(Y -" + t5.toString()+ ")^2 + " + t6.toString() + "*(X -" + t3.toString() + ")*(Y - " + t5.toString() + "))"
}
//expgonio
if (n >= 17 && n <= 32) {
//  R_model = A00[m]*Math.exp(A20[m]*(Math.cos(2*Math.PI*(X-x0[m]))-1) + A02[m]*(Math.cos(2*Math.PI*(Y-y0[m]))-1) + A11[m]*Math.sin(2*Math.PI*(X-x0[m])*(Y-y0[m])))
t1 = A00[m]
t2 = A20[m]
t3 = x0[m]
t4 = A02[m]
t5 = y0[m]
t6 = A11[m]
  model = "Expgonio <p>" + t1.toString() + "* e^( " + t2.toString() + "*COS(2*PI*(X - " + t3.toString() + "))-1 + " + t4.toString() + "*COS(2*PI*(Y -" + t5.toString()+ "))-1 + " + t6.toString() + "*SIN(2*PI*(X -" + t3.toString() + ")*(Y - " + t5.toString() + ")))"


//    model = "$$\sum_{i = 0}^n {n \choose i} x^{i} y^{n-i}$$"
}
//Gaussich deel 2
if (n >= 33 && n <= 40) {
  //R_model = A00[m]*Math.exp(A20[m]*Math.pow((X-x0[m]),2) + A02[m]*Math.pow((Y-y0[m]),2) + A11[m]*(X-x0[m])*(Y-y0[m]))
  t1 = A00[m]
  t2 = A20[m]
  t3 = x0[m]
  t4 = A02[m]
  t5 = y0[m]
  t6 = A11[m]
    model = "Gaussisch <p>" + t1.toString() + "* e^( " + t2.toString() + "*(X - " + t3.toString() + ")^2 + " + t4.toString() + "*(Y -" + t5.toString()+ ")^2 + " + t6.toString() + "*(X -" + t3.toString() + ")*(Y - " + t5.toString() + "))"

}
//expkubisch
if (n >= 41 && n <= 48) {
  //R_model = A00[m]*Math.exp(A20[m]*Math.pow((X-x0[m]),3) + A02[m]*Math.pow((Y-y0[m]),3) + A11[m]*(X-x0[m])*(Y-y0[m]))
  t1 = A00[m]
  t2 = A20[m]
  t3 = x0[m]
  t4 = A02[m]
  t5 = y0[m]
  t6 = A11[m]
    model = "Expkubisch <p>" + t1.toString() + "+" + t2.toString() + "*(X - " + t3.toString() + ")^3 + " + t4.toString() + "*(Y -" + t5.toString()+ ")^3 + " + t6.toString() + "*(X -" + t3.toString() + ")*(Y - " + t5.toString() + ")"

}

document.getElementById("modelselect").innerHTML = model;

}
function models(n){
m = document.getElementById("model").value -1
R_model = ""
//bikwadratisch
if (n >= 1 && n <= 8) {
    R_model = A00[m]+A20[m]*Math.pow((X-x0[m]),2)+A02[m]*Math.pow((Y-y0[m]),2)+A11[m]*(X-x0[m])*(Y-y0[m])

}
//Gaussich
if (n >= 9 && n <= 16) {
    R_model = A00[m]*Math.exp(A20[m]*Math.pow((X-x0[m]),2) + A02[m]*Math.pow((Y-y0[m]),2) + A11[m]*(X-x0[m])*(Y-y0[m]))

}
//expgonio
if (n >= 17 && n <= 32) {
  R_model = A00[m]*Math.exp(A20[m]*(Math.cos(2*Math.PI*(X-x0[m]))-1) + A02[m]*(Math.cos(2*Math.PI*(Y-y0[m]))-1) + A11[m]*Math.sin(2*Math.PI*(X-x0[m])*(Y-y0[m])))
//alert(A00[m])
}
//Gaussich deel 2
if (n >= 33 && n <= 40) {
  R_model = A00[m]*Math.exp(A20[m]*Math.pow((X-x0[m]),2) + A02[m]*Math.pow((Y-y0[m]),2) + A11[m]*(X-x0[m])*(Y-y0[m]))
}
//expkubisch
if (n >= 41 && n <= 48) {
  R_model = A00[m]*Math.exp(A20[m]*Math.pow((X-x0[m]),3) + A02[m]*Math.pow((Y-y0[m]),3) + A11[m]*(X-x0[m])*(Y-y0[m]))
}
return R_model

}

function checkv2(){
  //m = input[0]-1
  //n = input[0]
  m = document.getElementById("model").value -1
  n = document.getElementById("model").value
  schaal = 0.009
  random = 1 + getRandomArbitrary(-0.005, 0.005)

  Xin = document.getElementById("x").value
  Yin = document.getElementById("y").value

  if (Xin == null || Xin == "") {
    alert("Vul een getal in!");
  return false;
  }
  X = (Xin - 0 )/(2000 - 0)
  Y = (Yin - 0 )/(2000 - 0)
//bikwadratisch
//if (n >= 1 && n <= 8) {
//    R_model = A00[m]+A20[m]*Math.pow((X-x0[m]),2)+A02[m]*Math.pow((Y-y0[m]),2)+A11[m]*(X-x0[m])*(Y-y0[m])

//}
//Gaussich
//if (n >= 9 && n <= 16) {
//    R_model = A00[m]*Math.exp(A20[m]*Math.pow((X-x0[m]),2) + A02[m]*Math.pow((Y-y0[m]),2) + A11[m]*(X-x0[m])*(Y-y0[m]))

//}
//expgonio
//if (n >= 17 && n <= 32) {
//  R_model = A00[m]*Math.exp(A20[m]*(Math.cos(2*Math.PI*(X-x0[m]))-1) + A02[m]*(Math.cos(2*Math.PI*(Y-y0[m]))-1) + A11[m]*Math.sin(2*Math.PI*(X-x0[m])*(Y-y0[m])))
//}
//Gaussich deel 2
//if (n >= 33 && n <= 40) {
//  R_model = A00[m]*Math.exp(A20[m]*Math.pow((X-x0[m]),2) + A02[m]*Math.pow((Y-y0[m]),2) + A11[m]*(X-x0[m])*(Y-y0[m]))
//}
//expkubisch
//if (n >= 41 && n <= 48) {
//  R_model = A00[m]*Math.exp(A20[m]*Math.pow((X-x0[m]),3) + A02[m]*Math.pow((Y-y0[m]),3) + A11[m]*(X-x0[m])*(Y-y0[m]))
//}
//alert(model(m))
  R_ruis = models(n) * random
  R_final = Math.round(R_ruis*1000)/1000
  R_final = schaal * R_ruis
  R = Math.round(R_final*1000)/1000

  document.getElementById("R").value = R;
  //document.getElementById("x1").value = X;
  document.getElementById("R_raw").value = R_model;
}
function dataplot(){
n = document.getElementById("model").value
var grid = [];
xMax = 2000;
yMax = 2000;
xAmount = 200;
yAmount = 200;
xCount = 0;
yCount = 0;
xAdd = xMax/xAmount;
yAdd = yMax/yAmount;
schaal = 0.009

    for (let i = 0; i < xAmount +1 ; i++) {
      grid[i] = [];
      //xCount = xCount +xAdd;
      for (let j = 0; j < yAmount +1 ; j++) {
        grid[i][j] = 0;

      }
    }
//alert(grid); // 4


    for (let i = 0; i < xAmount +1 ; i++) {
      for (let j = 0; j < yAmount +1 ; j++) {
        m = 11
        //R_model = A00[m]*Math.exp(A20[m]*Math.pow((X-x0[m]),2) + A02[m]*Math.pow((Y-y0[m]),2) + A11[m]*(X-x0[m])*(Y-y0[m]))
        Xin = j*xAdd
        Yin = i*yAdd
        X = (Xin - 0 )/(2000 - 0)
        Y = (Yin - 0 )/(2000 - 0)
        grid[i][j] = schaal*models(n)
      }
    }
//alert(grid[50][50]); // 4
var maxRow = grid.map(function(row){ return Math.max.apply(Math, row); });
var max = Math.max.apply(null, maxRow);


//alert(getMax(grid))
MaxIndex = getIndexOfK(grid,getMax(grid))
//alert(MaxIndex[0])
document.getElementById("maxX").value = MaxIndex[1]*10;
document.getElementById("maxY").value = MaxIndex[0]*10;

var data = [ {
  z: grid,
  type: 'contour' 
}
];
var layout = {
  width: 750,
  height: 750,
  title: 'Model plot',
  xaxis: {
    title: '\xB5L H<sub>2</sub>SO<sub>4</sub>'
  },
  yaxis: {
    title: '\xB5L H<sub>2</sub>O<sub>2</sub>'
  }
};
Plotly.newPlot('myDiv', data, layout);

}
function getIndexOfK(arr, k) {
for (var i = 0; i < arr.length; i++) {
  var index = arr[i].indexOf(k);
  if (index > -1) {
    return [i, index];
  }
}
}
function getMax(a){
return Math.max(...a.map(e => Array.isArray(e) ? getMax(e) : e));
}

function largestOfFour(arr) {
return arr.map(n => Math.max(...n));
}

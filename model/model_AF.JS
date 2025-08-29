const pHmax = 11.5
const pHmin = 10
const Tempmax = 42
const Tempmin = 35

const A00 = [87,95,98,85,97,97,93,95,95,95,95,95,31,93,93,93,93,94,92,95,95,91,91,94,55,45,31,14.6,26,22,59,35,67,52,56,58,45,43,43,26,71,71,71,71,52,47,80,46]
const A20 = [-35,-40,-10,-25,-74,-54,-46,-67,-0.65,-1.65,-1.65,-2.65,-2.65,-3.65,-3.75,-0.75,0.22,0.42,0.31,0.28,0.28,0.18,0.18,0.09,-0.19,0.19,0.19,0.09,0.19,-0.44,-0.24,-0.04,-0.25,-0.35,-0.35,-0.65,-0.65,0.65,0.65,0.65,0.6,0.6,1.1,-1.1,-1.1,-0.1,0.53,0.53]
const A02 = [-44,-80,-45,-35,-74,-72,-63,-17,-1.27,-2.27,-2.5,-1.5,1.5,-2.85,-2.65,-1.65,0.33,0.27,0.27,0.87,0.37,0.17,0.17,0.07,0.07,-0.37,-0.37,-0.17,0.47,0.44,0.24,0.07,0.65,0.45,0.45,0.85,-0.85,0.85,0.99,0.99,0.6,0.6,-0.15,0.15,-0.85,-0.85,0.95,1.35]
const A11 = [5,-26,25,-35,0,-8,15,-13,0.55,-0.75,-0.075,-0.85,-0.85,0.85,1.85,1.85,0.43,0.33,0.63,-1.13,-0.77,0.27,0,-0.11,0.31,-0.11,-0.71,-1.71,-2.21,-1.21,-0.1,1.01,-0.75,1.41,-1.73,-0.73,-3.73,0.33,-0.73,-1.05,0.55,0.55,0.55,0.55,-0.95,-1.95,-0.95,-1.33]
const x0 = [0.4,0.7,0.45,0.66,0.27,0.77,0.54,0.61,0.6,0.3,0.7,0.8,0.8,0.7,0.2,0.4,0.4,0.66,0.56,0.46,0.36,0.62,0.62,0.52,0.39,0.69,0.69,0.41,0.69,0.59,0.3,0.5,0.4,0.25,0.75,0.65,0.71,0.31,0.51,0.27,0.5,0.4,0.5,0.5,0.7,0.7,0.5,0.15]
const y0 = [0.6,0.4,0.75,0.33,0.43,0.81,0.1,0.33,0.45,0.45,0.55,0.85,0.85,0.25,0.75,0.55,0.55,0.33,0.43,0.63,0.63,0.44,0.44,0.42,0.42,0.32,0.32,0.52,0.42,0.72,0.5,0.3,0.55,0.41,0.71,0.31,0.47,0.37,0.37,0.67,0.5,0.6,0.5,0.5,0.3,0.3,0.8,0.9]


function reverseTransformRangepH(newValue) {
  var oldMin = 0, oldMax = 2000;
  var newMin = pHmin, newMax = pHmax;

  var originalValue = oldMin + ((oldMax - oldMin) * (newValue - newMin) / (newMax - newMin));
  return originalValue;
}
function reverseTransformRangeTemp(newValue) {
  var oldMin = 0, oldMax = 2000;
  var newMin = Tempmin, newMax = Tempmax;

  var originalValue = oldMin + ((oldMax - oldMin) * (newValue - newMin) / (newMax - newMin));
  return originalValue;
}

function getRandomArbitrary(min, max) {
   return Math.random() * (max - min) + min;
}

function Uitbuiter(){
  test = getRandomArbitrary(0,25)
  if (test < 1){
    return 0.25
  }
  else
    return 1
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
  
function getMin(a) {
    return Math.min(...a.map(e => Array.isArray(e) ? getMin(e) : e));
}
  
function changeButton(){
  var mybutton = document.getElementById("mycalcbutton");
  mybutton.disabled = true;
  setTimeout(function() {
      mybutton.disabled = false;
  }, 10000);

  var timeleft = 9;
  var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
      clearInterval(downloadTimer);
  }
  document.getElementById('mycalcbutton').innerHTML = String(timeleft);
  if (timeleft == 0){
    document.getElementById('mycalcbutton').innerHTML = 'Compute!';

  }

  timeleft -= 1;
  }, 1000);

}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function MinMaxResponse(n,m,schaal){
  
  var grid = [];
  xMax = 2000;
  yMax = 2000;
  xAmount = 200;
  yAmount = 200;
  xCount = 0;
  yCount = 0;
  xAdd = xMax/xAmount;
  yAdd = yMax/yAmount;
  
  for (let i = 0; i < xAmount +1 ; i++) {
    grid[i] = [];
    for (let j = 0; j < yAmount +1 ; j++) {
      grid[i][j] = 0;
    }
  }
  
  for (let i = 0; i < xAmount +1 ; i++) {
    for (let j = 0; j < yAmount +1 ; j++) {
      Xin = j*xAdd
      Yin = i*yAdd
      X = (Xin - 0 )/(2000 - 0)
      Y = (Yin - 0 )/(2000 - 0)
      grid[i][j] = schaal*models(n,m)
    }
  }
  
  //var maxRow = grid.map(function(row){ return Math.max.apply(Math, row); });
  //var max = Math.max.apply(null, maxRow);
  MaxIndex = getIndexOfK(grid,getMax(grid))
  MinIndex = getIndexOfK(grid,getMin(grid))
  Max = grid[MaxIndex[0]][MaxIndex[1]]
  Min = grid[MinIndex[0]][MinIndex[1]]
  return {Max,Min}
}

function models(n,m){
  //m = document.getElementById("model").value -1
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
  
function transformRangeResponse(oldMin,oldMax,oldValue) {
  //var oldMin = 0, oldMax = 2000;
  var newMin = 0.1, newMax = 1.5;

  var newValue = newMin + ((newMax - newMin) * (oldValue - oldMin) / (oldMax - oldMin));
  return newValue;
}

function checkv2(input){
  //m = input[0]-1
  //n = input[0]
  m = input[0]-1
  n = input[0]
  
  //m = document.getElementById("model").value -1
  //n = document.getElementById("model").value
  //schaal = input[1]
  
  schaal = 0.009
  random = 1 + getRandomArbitrary(-0.005, 0.005)

  //Xold = document.getElementById("x").value
  //Yold = document.getElementById("y").value
  Xold = parseFloat(document.getElementById("x").value.replace(',','.').replace(' ',''))
  Yold = parseFloat(document.getElementById("y").value.replace(',','.').replace(' ',''))
  
  if (Xold == null || Xold == "") {
    alert("Vul een getal in!");
  return false;
  }
  if (Yold == null || Yold == "") {
    alert("Vul een getal in!");
  return false;
  }

  Xin = reverseTransformRangepH(Xold)
  Yin = reverseTransformRangeTemp(Yold)

  X = (Xin - 0 )/(2000 - 0)
  Y = (Yin - 0 )/(2000 - 0)

  //data = MinMaxResponse(n,m,schaal)
  
  R_ruis = models(n,m) * random  * Uitbuiter()
  //R_ruis = transformRangeResponse(data.Min, data.Max ,R_ruis)
  R_final = Math.round(R_ruis*1000)/1000
  
  R_final = schaal * R_ruis
  
  //
  data = MinMaxResponse(n,m,schaal)
  R_final = transformRangeResponse(data.Min,data.Max, R_final)
  
  R = Math.round(R_final*1000)/1000
  
  document.getElementById("R").value = R;
  document.getElementById("R_raw").value = R_model;

  //document.getElementById("x1").value = X;
  //document.getElementById("R_raw").value = R_model;
}


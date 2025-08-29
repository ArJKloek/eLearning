
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


  function checkv2(input){
    m = input[0]-1
    n = input[0]
    schaal = input[1]
    random = 1 + getRandomArbitrary(-0.01, 0.01)

    Xin = parseFloat(document.getElementById("x").value.replace(',','.').replace(' ',''))
    Yin = parseFloat(document.getElementById("y").value.replace(',','.').replace(' ',''))
    if ( isNaN(Xin) ||  isNaN(Yin)) {
      alert("Vul een getal in!");
    return false;
    }
    //changeButton();

    X = (Xin - 0 )/(2000 - 0)
    Y = (Yin - 0 )/(2000 - 0)
    const A00 = [87,95,98,85,97,97,93,95,95,95,95,95,31,93,93,93,93,94,92,95,95,91,91,94,55,45,31,14.6,26,22,59,35,67,52,56,58,45,43,43,26,71,71,71,71,52,47,80,46]
    const A20 = [-35,-40,-10,-25,-74,-54,-46,-67,-0.65,-1.65,-1.65,-2.65,-2.65,-3.65,-3.75,-0.75,0.22,0.42,0.31,0.28,0.28,0.18,0.18,0.09,-0.19,0.19,0.19,0.09,0.19,-0.44,-0.24,-0.04,-0.25,-0.35,-0.35,-0.65,-0.65,0.65,0.65,0.65,0.6,0.6,1.1,-1.1,-1.1,-0.1,0.53,0.53]
    const A02 = [-44,-80,-45,-35,-74,-72,-63,-17,-1.27,-2.27,-2.5,-1.5,1.5,-2.85,-2.65,-1.65,0.33,0.27,0.27,0.87,0.37,0.17,0.17,0.07,0.07,-0.37,-0.37,-0.17,0.47,0.44,0.24,0.07,0.65,0.45,0.45,0.85,-0.85,0.85,0.99,0.99,0.6,0.6,-0.15,0.15,-0.85,-0.85,0.95,1.35]
    const A11 = [5,-26,25,-35,0,-8,15,-13,0.55,-0.75,-0.075,-0.85,-0.85,0.85,1.85,1.85,0.43,0.33,0.63,-1.13,-0.77,0.27,0,-0.11,0.31,-0.11,-0.71,-1.71,-2.21,-1.21,-0.1,1.01,-0.75,1.41,-1.73,-0.73,-3.73,0.33,-0.73,-1.05,0.55,0.55,0.55,0.55,-0.95,-1.95,-0.95,-1.33]
    const x0 = [0.4,0.7,0.45,0.66,0.27,0.77,0.54,0.61,0.6,0.3,0.7,0.8,0.8,0.7,0.2,0.4,0.4,0.66,0.56,0.46,0.36,0.62,0.62,0.52,0.39,0.69,0.69,0.41,0.69,0.59,0.3,0.5,0.4,0.25,0.75,0.65,0.71,0.31,0.51,0.27,0.5,0.4,0.5,0.5,0.7,0.7,0.5,0.15]
    const y0 = [0.6,0.4,0.75,0.33,0.43,0.81,0.1,0.33,0.45,0.45,0.55,0.85,0.85,0.25,0.75,0.55,0.55,0.33,0.43,0.63,0.63,0.44,0.44,0.42,0.42,0.32,0.32,0.52,0.42,0.72,0.5,0.3,0.55,0.41,0.71,0.31,0.47,0.37,0.37,0.67,0.5,0.6,0.5,0.5,0.3,0.3,0.8,0.9]
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
}
//Gaussich deel 2
if (n >= 33 && n <= 40) {
  R_model = A00[m]*Math.exp(A20[m]*Math.pow((X-x0[m]),2) + A02[m]*Math.pow((Y-y0[m]),2) + A11[m]*(X-x0[m])*(Y-y0[m]))
}
//expkubisch
if (n >= 41 && n <= 48) {
  R_model = A00[m]*Math.exp(A20[m]*Math.pow((X-x0[m]),3) + A02[m]*Math.pow((Y-y0[m]),3) + A11[m]*(X-x0[m])*(Y-y0[m]))
}

    R_ruis = R_model * random * Uitbuiter()
    R_final = Math.round(R_ruis*1000)/1000
    R_final = schaal * R_ruis
    R = Math.round(R_final*1000)/1000

    document.getElementById("r").value = R;
    //document.getElementById("x1").value = X;
    //document.getElementById("y1").value = R_model;
}

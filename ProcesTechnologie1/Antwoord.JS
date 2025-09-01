function checkv2(ant){
  var x = [];
  for (let i = 0; i < ant.length; i++) {   // <-- make i block-scoped
    x[i] = document.getElementById("antw"+i).value;

    if (x[i] === "") {
      document.getElementById("vrg"+i).style.visibility = "hidden";
      continue;
    }

    // Try numeric parse (accept comma and scientific notation)
    const raw = String(x[i]).trim().replace(',', '.');
    const num = /^[+-]?\d+(?:\.\d+)?(?:e[+-]?\d+)?$/i.test(raw) ? Number(raw) : NaN;

    // If key is text OR input isn't a number -> do text compare (case-insensitive)
    if (typeof ant[i] === "string" || isNaN(num)) {
      if (raw.toLowerCase() === String(ant[i]).toLowerCase()) {
        correct("vrg"+i);
      } else {
        wrong("vrg"+i);
      }
      continue;
    }

    // Numeric compare with 1% tolerance (works for + and -)
    const key = Number(ant[i]);
    const within = Math.abs(num - key) <= Math.max(1e-12, 0.01 * Math.abs(key));
    if (within) {
      correct("vrg"+i);
    } else {
      wrong("vrg"+i);
    }
  }
}


function setMark(ID, ok){
  const el = document.getElementById(ID);
  if (!el) return;
  el.style.visibility = "visible";
  el.style.color = ok ? "green" : "red";
  el.style.fontStyle = "normal";
  el.textContent = ok ? "✔" : "✖";
  el.className = "";
}

function wrong(ID){ setMark(ID, false); }
function correct(ID){ setMark(ID, true); }

function antwoordzien(ID){

if (document.getElementById(ID).style.display === "block") {
      document.getElementById(ID).style.display = "none";
	  var draggableElements = document.getElementsByClassName("draggable");
   for(var i = 0; i < draggableElements.length; i++){
     dragElement(draggableElements[i]);  };
		} else {


     document.getElementById(ID).style.display = "block";
	 var thenum = ID.match(/\d+/)[0]; // "Find number of ID";
	//alert(thenum);
	var draggableElements = document.getElementById("drag"+thenum);
		//alert(draggableElements);
//for(var i = 0; i < draggableElements.length; i++){
   dragElement(draggableElements);
 // return ID;
   	  var draggableElements = document.getElementsByClassName("draggable");
   for(var i = 0; i < draggableElements.length; i++){
     dragElement(draggableElements[i]);  };
	//}
   }
}


function hint(ID){
if ("Show Hint" == document.getElementById(ID).innerHTML){
document.getElementById(ID).innerHTML = "Hide Answer";
document.getElementById("hint").style.display = "block";

} else{
document.getElementById(ID).innerHTML = "Show Hint";
document.getElementById("hint").style.display = "none";

}
}
var coll = document.getElementsByClassName("accordionantwoord");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
		var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";

    }
  });
}

// Detect whether device supports orientationchange event, otherwise fall back to
// the resize event.
window.onorientationchange = function() { var draggableElements = document.getElementsByClassName("draggable");

for(var i = 0; i < draggableElements.length; i++){
     dragElement(draggableElements[i]);  }};


var coll = document.getElementsByClassName("deelhint");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

function dragElement(elmnt) {
 var thenum = elmnt.id.match(/\d+/)[0]; // "3";

 document.getElementById("drag"+thenum).style.left = document.getElementById("panel"+thenum).offsetLeft +"px";
 document.getElementById("drag"+thenum).style.right = document.getElementById("panel"+thenum).offsetWidth+"px";

document.getElementById("drag"+thenum).style.height = document.getElementById("panel"+thenum).offsetHeight+"px";
document.getElementById("drag"+thenum).style.top = document.getElementById("panel"+thenum).offsetTop+"px";
// myMove(elmnt);

 var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
   document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
   document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;


    } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    	elmnt.ontouchstart = dragMouseDown;
elmnt.onmousedown = dragMouseDown;

  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

       if (e.type === "touchstart"){

pos3 = e.touches[0].clientX;
pos4 = e.touches[0].clientY
    document.ontouchend = closeDragElement;
document.ontouchmove = elementDrag;
}
else{


    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
	}
  }

  function elementDrag(e) {

    e = e || window.event;
    e.preventDefault();

    // Find touch event move:
       if (e.type === "touchmove"){

 pos1 = pos3 - e.touches[0].clientX;
 pos2 =  pos4 - e.touches[0].clientY;
 pos3 =  e.touches[0].clientX;
 pos4 =  e.touches[0].clientY;

  }else{
  //mouse event
	pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    }
	// set the element's new position:
	 var thenum = elmnt.id.match(/\d+/)[0]; // "Find number of ID";

	elmnt.style.top = (elmnt.offsetTop - pos2) + "px"; //Moves the top of the element

 var hgt = document.getElementById("panel"+thenum).clientHeight; //finds height of the panel
 var Paneltop = document.getElementById("panel"+thenum).offsetTop;
 var dragtop = document.getElementById("drag"+thenum).offsetTop;
 const height = hgt + (Paneltop - dragtop)	;
 //document.getElementById("txt"+thenum).innerHTML = pos4 ;
 //document.getElementById("txt"+thenum).innerHTML = document.getElementById("panel"+thenum).offsetTop;
  if (height > -20){
  elmnt.style.height = hgt + (Paneltop - dragtop) +"px";
  }
  else {
  elmnt.style.top = 20 +(Paneltop + hgt) + "px";
  }

  if (height < hgt){
  elmnt.style.height = hgt + (Paneltop - dragtop)+"px";
  }
  else {
  elmnt.style.top = Paneltop + "px";
  }
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}
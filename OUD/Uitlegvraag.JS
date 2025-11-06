function checkv2(ant){
  var x = [];
  for (i = 0; i < ant.length; i++) {
    x[i] = document.getElementById("antw"+i).value;
    if (x[i].includes(`,`)){
    // Remove leading spaces
    x[i] = x[i].trimStart();

    // Replace comma with period
    x[i] = x[i].replace(',', '.');
    }
      if (x[i] == ""){
	        document.getElementById("vrg"+i).style.visibility = "hidden";
        }
      else{
          if(isNaN(x[i])){

              if (x[i].toLowerCase() === ant[i]){
                  correct("vrg"+i)
              }
              else{
                  wrong("vrg"+i)
              }
          }
          else{
            if (Math.sign(x[i]) == -1){
            

              if (x[i] <= ant[i]-ant[i]*0.01 && x[i] >= ant[i]+ant[i]*0.01){
                correct("vrg"+i)
              }
              else{
                wrong("vrg"+i)
              }
            }
           else{
            
            if (x[i] >= ant[i]-ant[i]*0.01 && x[i] <= ant[i]+ant[i]*0.01){
              correct("vrg"+i)
            }
            else{
              wrong("vrg"+i)
            }
           }
          }
      }
  }
}

function wrong(ID){
document.getElementById(ID).style.visibility = "visible"
document.getElementById(ID).className = "glyphicon glyphicon-remove"
document.getElementById(ID).style.color = "red"
}
function correct(ID){
document.getElementById(ID).style.visibility = "visible"
document.getElementById(ID).className = "glyphicon glyphicon-ok"
document.getElementById(ID).style.color = "green"
}
function antwoordzien(ID){

if (document.getElementById(ID).style.display === "block") {
      document.getElementById(ID).style.display = "none";

		} else {


     document.getElementById(ID).style.display = "block";
	 var thenum = ID.match(/\d+/)[0]; // "Find number of ID";
	//alert(thenum);
	var draggableElements = document.getElementById("drag"+thenum);
		//alert(draggableElements);
//for(var i = 0; i < draggableElements.length; i++){
	if (draggableElement.offsetHeight > 0) {
    		dragElement(draggableElement);
	} else {
    		setTimeout(function() {
        		dragElement(draggableElement);
    		}, 200);
	}
	
	//dragElement(draggableElements);
 // return ID;

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


// Function to handle the orientation change or resize events
function handleOrientationChange() {
  const draggableElements = document.getElementsByClassName("draggable");

  for (let i = 0; i < draggableElements.length; i++) {
      dragElement(draggableElements[i]);
  }
}

// Check if the browser supports onorientationchange
const supportsOrientationChange = "onorientationchange" in window;
const orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

// Add event listener for orientation change or resize
window.addEventListener(orientationEvent, handleOrientationChange, false);

// Detect whether device supports orientationchange event, otherwise fall back to
// the resize event.
//window.onorientationchange = function() { var draggableElements = document.getElementsByClassName("draggable");

//for(var i = 0; i < draggableElements.length; i++){
//     dragElement(draggableElements[i]);  }};

//<!-- var supportsOrientationChange = "onorientationchange" in window, -->
//    <!-- orientationEvent = supportsOrientationChange ? "orientationchange" : "resize"; -->

//<!-- window.addEventListener(orientationEvent, function() { -->
//     <!-- var draggableElements = document.getElementsByClassName("draggable");  -->

//<!-- for(var i = 0; i < draggableElements.length; i++){  -->
//    <!-- dragElement(draggableElements[i]); -->
//	<!-- } -->
//<!-- //alert('HOLY ROTATING SCREENS BATMAN:' + window.orientation + " " + screen.width); -->
//<!-- }, false); -->


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
 myMove(elmnt);

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



function myMove(elem) {
  //var elem = document.getElementById("myAnimation");
 // alert(elem);
   var hgt = document.getElementById("panel1").clientHeight;
    var Paneltop = document.getElementById("panel1").offsetTop;
 var dragtop = document.getElementById("drag1").offsetTop;
//alert(hgt);
  var height = hgt;
  var id = setInterval(frame, 10);
  function frame() {
    if (height == 20) {
      clearInterval(id);
	  myMove2(elem);

    } else {
      height--;

      elem.style.top =  (-height + dragtop + hgt) + 'px';
      elem.style.height =  height + 'px';

    }
  }
}

function myMove2(elem) {
  //var elem = document.getElementById("myAnimation");
 // alert(elem);
   var hgt = document.getElementById("panel1").clientHeight;
    var Paneltop = document.getElementById("panel1").offsetTop;
 var dragtop = document.getElementById("drag1").offsetTop;
//alert(hgt);
var height = 20;
  var id2 = setInterval(frame2, 1);
  function frame2() {
    if (height == hgt) {
      clearInterval(id2);

    } else {
      height++;

      elem.style.top = -height + (Paneltop + hgt) + 'px';
      elem.style.height =  height + 'px';

    }
  }
}

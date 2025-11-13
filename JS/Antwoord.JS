// ---------- Helpers ----------
function parseNum(raw) {
  if (raw == null) return NaN;
  const s = String(raw).trim()
    .replace(/\s+/g, '')   // remove spaces
    .replace(',', '.');    // comma -> dot
  // Accept numbers like 1.23, -4, 5e-3, +2.5E6
  if (/^[+-]?\d+(?:\.\d+)?(?:e[+-]?\d+)?$/i.test(s)) return Number(s);
  return NaN;
}

function nearlyEqual(a, b, relTol = 0.01, absTol = 1e-12) {
  if (!isFinite(a) || !isFinite(b)) return false;
  const diff = Math.abs(a - b);
  return diff <= Math.max(absTol, relTol * Math.abs(b));
}

// mark ✔ or ✖ directly
function setMark(id, ok) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.visibility = 'visible';
  el.style.fontStyle = 'normal'; // <i> shouldn't be italic
  el.style.color = ok ? 'green' : 'red';
  el.textContent = ok ? '✔' : '✖';
}

// ---------- Checker ----------
function checkv2(answers) {
  for (let i = 0; i < answers.length; i++) {
    const input = document.getElementById('antw' + i);
    const markId = 'vrg' + i;
    if (!input) continue;

    const raw = String(input.value || '').trim();
    if (!raw) {
      // empty → hide mark
      const icon = document.getElementById(markId);
      if (icon) icon.style.visibility = 'hidden';
      input.style.borderColor = '';
      continue;
    }

    const key = answers[i];

    // --- text answers ---
    if (typeof key === 'string') {
      const ok = raw.toLowerCase() === key.toLowerCase();
      setMark(markId, ok);
      input.style.borderColor = ok ? 'green' : 'crimson';
      continue;
    }

    // --- numeric answers ---
    const val = parseNum(raw);
    if (isNaN(val)) {
      setMark(markId, false);
      input.style.borderColor = 'crimson';
      continue;
    }

    const ok = nearlyEqual(val, Number(key), 0.01, 1e-12);
    setMark(markId, ok);
    input.style.borderColor = ok ? 'green' : 'crimson';
  // inside checkv2, when empty:
  
  
  if (!raw) {
  const icon = document.getElementById(markId);
  if (icon) {
    icon.style.visibility = 'hidden'; // hidden preserves the width we set
    icon.textContent = '';            // no symbol
  }
  input.style.borderColor = '';
  continue;
}

  
  
  
  }


}

function antwoordzien(ID){
  var panel = document.getElementById(ID);
  if (!panel) return;

  // find the corresponding draggable element (dragN for panelN)
  var thenum = (ID.match(/\d+/) || [])[0];
  var dragEl = document.getElementById("drag" + thenum);

  // Toggle panel visibility and only update / move the related draggable
  if (panel.style.display === "block") {
    panel.style.display = "none";
    if (dragEl) dragElement(dragEl);
  } else {
    panel.style.display = "block";
    if (dragEl) {
      // position the draggable to the panel
      dragElement(dragEl);
      // animate ONLY if the panel explicitly has data-animate="true"
      var animateAttr = panel.getAttribute && panel.getAttribute('data-animate');
      if (animateAttr === 'true') {
        setTimeout(function(){ try { myMove(dragEl); } catch(e){} }, 60);
      }
    }
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
document.addEventListener('DOMContentLoaded', function () {
  try {
    var coll = document.getElementsByClassName('accordionantwoord');
    for (var i = 0; i < coll.length; i++) {
      (function(btn){
        // ensure content is collapsed initially
        var content = btn.nextElementSibling;
        if (content) { content.style.maxHeight = null; content.style.overflow = 'hidden'; }
        btn.addEventListener('click', function () {
          this.classList.toggle('active');
          var c = this.nextElementSibling;
          if (!c) return;

          if (c.style.maxHeight && c.style.maxHeight !== '0px') {
            c.style.maxHeight = null;
          } else {
            c.style.maxHeight = c.scrollHeight + 'px';
            c.style.overflow = 'hidden';
          }

          // Only move/animate the associated draggable when the panel explicitly requests animation
          var animate = c.getAttribute && c.getAttribute('data-animate') === 'true';
          if (animate) {
            // try to find numeric id suffix on the panel/content to locate drag element
            var m = (c.id && c.id.match(/\d+/)) || (btn.id && btn.id.match(/\d+/));
            if (m && m[0]) {
              var dragEl = document.getElementById('drag' + m[0]);
              if (dragEl) {
                // position draggable and trigger the automatic slide
                try { dragElement(dragEl); } catch (e) { /* ignore */ }
                setTimeout(function(){ try { myMove(dragEl); } catch(e){/*ignore*/} }, 60);
              }
            }
          }
        });
      })(coll[i]);
    }

    // deelhint setup (unchanged)
    var deels = document.getElementsByClassName('deelhint');
    for (var j = 0; j < deels.length; j++) {
      (function(btn){
        var content = btn.nextElementSibling;
        if (content) { content.style.maxHeight = null; content.style.overflow = 'hidden'; }
        btn.addEventListener('click', function () {
          this.classList.toggle('active');
          var c = this.nextElementSibling;
          if (!c) return;
          if (c.style.maxHeight && c.style.maxHeight !== '0px') {
            c.style.maxHeight = null;
          } else {
            c.style.maxHeight = c.scrollHeight + 'px';
          }
        });
      })(deels[j]);
    }
  } catch (err) {
    console.error('Accordion init error:', err);
  }
});

// Detect whether device supports orientationchange event, otherwise fall back to
// the resize event.
window.onorientationchange = function() { var draggableElements = document.getElementsByClassName("draggable");

for(var i = 0; i < draggableElements.length; i++){
     dragElement(draggableElements[i]);  }};


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

// --------------------
// Automatic slide animation (separate command)
// --------------------
function myMove(elem) {
  if (!elem) return;
  // accept either element or id
  if (typeof elem === 'string') elem = document.getElementById(elem);
  if (!elem || !elem.id) return;
  var thenum = (elem.id.match(/\d+/) || [])[0];
  if (!thenum) return;
  var panel = document.getElementById('panel' + thenum);
  if (!panel) return;

  // starting and target positions
  var startTop = elem.offsetTop;
  // target: move down by roughly half the panel height but limit to 250px
  var moveBy = Math.min(250, Math.max(20, Math.round(panel.clientHeight / 2)));
  var targetTop = startTop + moveBy;

  var duration = 300; // ms
  var startTime = null;

  function step(ts) {
    if (!startTime) startTime = ts;
    var progress = Math.min(1, (ts - startTime) / duration);
    var current = Math.round(startTop + (targetTop - startTop) * progress);
    elem.style.top = current + 'px';
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
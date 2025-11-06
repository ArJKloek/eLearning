// Upgrade your full script with MutationObserver for Brightspace resizing stability

function checkv2(ant) {
  var x = [];
  for (let i = 0; i < ant.length; i++) {
    x[i] = document.getElementById("antw" + i).value;
    if (x[i].includes(`,`)) {
      x[i] = x[i].trimStart();
      x[i] = x[i].replace(',', '.');
    }

    if (x[i] === "") {
      document.getElementById("vrg" + i).style.visibility = "hidden";
    } else {
      if (isNaN(x[i])) {
        if (x[i].toLowerCase() === ant[i]) {
          correct("vrg" + i);
        } else {
          wrong("vrg" + i);
        }
      } else {
        if (x[i] >= ant[i] - ant[i] * 0.01 && x[i] <= ant[i] + ant[i] * 0.01) {
          correct("vrg" + i);
        } else {
          wrong("vrg" + i);
        }
      }
    }
  }
}

function wrong(ID) {
  const elem = document.getElementById(ID);
  elem.style.visibility = "visible";
  elem.className = "glyphicon glyphicon-remove";
  elem.style.color = "red";
}

function correct(ID) {
  const elem = document.getElementById(ID);
  elem.style.visibility = "visible";
  elem.className = "glyphicon glyphicon-ok";
  elem.style.color = "green";
}

function antwoordzien(ID) {
  const el = document.getElementById(ID);
  if (el.style.display === "block") {
    el.style.display = "none";
  } else {
    el.style.display = "block";

    const thenum = ID.match(/\d+/)[0];
    const draggableElement = document.getElementById("drag" + thenum);

    // Short timeout to allow for DOM rendering
    setTimeout(() => {
      dragElement(draggableElement);
    }, 300);
  }
}

function hint(ID) {
  if (document.getElementById(ID).innerHTML === "Show Hint") {
    document.getElementById(ID).innerHTML = "Hide Answer";
    document.getElementById("hint").style.display = "block";
  } else {
    document.getElementById(ID).innerHTML = "Show Hint";
    document.getElementById("hint").style.display = "none";
  }
}

var collAccordion = document.getElementsByClassName("accordionantwoord");
for (let i = 0; i < collAccordion.length; i++) {
  collAccordion[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

var collDeelhint = document.getElementsByClassName("deelhint");
for (let i = 0; i < collDeelhint.length; i++) {
  collDeelhint[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

function dragElement(elmnt) {
  if (!elmnt) return;

  var thenum = elmnt.id.match(/\d+/)[0];
  var panel = document.getElementById("panel" + thenum);
  var drag = document.getElementById("drag" + thenum);

  if (!panel || !drag) return;

  drag.style.left = panel.offsetLeft + "px";
  drag.style.top = panel.offsetTop + "px";
  drag.style.height = panel.offsetHeight + "px";

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  var header = document.getElementById(elmnt.id + "header");
  if (header) {
    header.ontouchstart = dragMouseDown;
    header.onmousedown = dragMouseDown;
  } else {
    elmnt.ontouchstart = dragMouseDown;
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    if (e.type === "touchstart") {
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
      document.ontouchend = closeDragElement;
      document.ontouchmove = elementDrag;
    } else {
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    if (e.type === "touchmove") {
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
    } else {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}

// -- MutationObserver to auto re-align dragElements when page changes dynamically --

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const draggableElements = document.getElementsByClassName("draggable");
    for (let i = 0; i < draggableElements.length; i++) {
      dragElement(draggableElements[i]);
    }
  });
});

observer.observe(document.body, {
  attributes: true,
  childList: true,
  subtree: true
});

// Optional: re-align on window resize/orientationchange too
const supportsOrientationChange = "onorientationchange" in window;
const orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, () => {
  const draggableElements = document.getElementsByClassName("draggable");
  for (let i = 0; i < draggableElements.length; i++) {
    dragElement(draggableElements[i]);
  }
}, false);

AFRAME.registerComponent("ui-logic", {
  init: function() {
    const btn = document.querySelector("#dockingicon");
    const lysozyme = document.getElementById("lysozyme");

    lysozyme.addEventListener("animation-finished", function(event) {
      console.log("Animation finished!", event);
    });

    // handle image clicking
    btn.addEventListener("click", e => {
      lysozyme.setAttribute("animation-mixer", "clip: *; loop: once; clampWhenFinished: true; startAt: 0;");
      btn.style.opacity = 0;
    });
  }
});

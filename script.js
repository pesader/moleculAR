AFRAME.registerComponent("ui-logic", {
  init: function() {
    const btn = document.querySelector("#dockingicon");
    const lysozyme = document.getElementById("lysozyme");

    lysozyme.addEventListener("animation-finished", function(event) {
      console.log("Animation finished!", event);
    });

    // handle image clicking
    btn.addEventListener("click", e => {
      lysozyme.setAttribute("animation-mixer", "clip: *; loop: once; clampWhenFinished: true;");
      btn.style.opacity = 0;
    });
  }
});

// just to make the models brighter
AFRAME.registerComponent("linear-encoding", {
  init: function() {
    this.el.addEventListener("model-loaded", e => {
      const mesh = this.el.getObject3D("mesh");
      mesh.traverse(node => {
        if (!node.material || !node.material.map) return;
        node.material.map.encoding = THREE.LinearEncoding;
      });
    });
  }
});

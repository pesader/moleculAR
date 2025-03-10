AFRAME.registerComponent("ui-logic", {
  init: function () {
    this.animating = false;

    const btn = document.getElementById("dockingicon");
    this.lysozyme = document.getElementById("lysozyme");
    this.marker = document.getElementById("marker");

    this.lysozyme.addEventListener("animation-finished", (_event) => {
      this.animating = false;
      document.getElementById('reset-button').classList.remove('hidden');
    });

    this.marker.addEventListener('markerLost', () => {
      if (this.animating)
        this.lysozyme.setAttribute('animation-mixer', {timeScale: 0});
    });

    this.marker.addEventListener('markerFound', () => {
      if (this.animating)
        this.lysozyme.setAttribute('animation-mixer', {timeScale: 1});
    });

    btn.addEventListener("click", () => {
      this.animating = true;
      this.lysozyme.setAttribute("animation-mixer", {clip: "*", loop: "once", clampWhenFinished: true, timeScale: 1});
      btn.style.opacity = 0;
    });
  }
});

// just to make the models brighter
AFRAME.registerComponent("linear-encoding", {
  init: function () {
    this.el.addEventListener("model-loaded", e => {
      const mesh = this.el.getObject3D("mesh");
      mesh.traverse(node => {
        if (!node.material || !node.material.map) return;
        node.material.map.encoding = THREE.LinearEncoding;
      });
    });
  }
});

function handleClick() {
  const btn = document.querySelector("#dockingicon");
  const lysozyme = document.getElementById("lysozyme");
  const mixer = lysozyme.components['animation-mixer'].mixer
  mixer.stopAllAction();
  lysozyme.removeAttribute("animation-mixer");
  document.getElementById('reset-button').classList.add('hidden');
  btn.style.opacity = 1;
}

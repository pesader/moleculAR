AFRAME.registerComponent("tracked-ui", {
	schema: {
		element: {default: ""},
		autoShow: {default: true},
		offset: {type: 'vec2', default: {x: 0, y: 0}}
	},
    init: function() {
        // THREE.Vector3 helper. 
        this.vector = new THREE.Vector3();
    },
    update: function() {
        // references
        this.element = document.querySelector(this.data.element)
    },
    tick: function() {
        if (!this.element) return;

        // show the UI only if the marker is visible
        if (this.data.autoShow) {
            if (this.el.object3D.visible &&
                (this.el.object3D.rotation._y >= -1.40 && this.el.object3D.rotation._y <= -0.05 && this.el.object3D.rotation._x >= 0.00 && this.el.object3D.rotation._x <= 1.30)
            ) {
                this.element.style.display = "block"
            } else {
                this.element.style.display = "none"
            }
        }

        // project the current marker position
        this.vector.copy(this.el.object3D.position).project(this.el.sceneEl.camera);

        // the vector is now normalized, so we need to adjust it to the dimensions
        this.vector.x = ( this.vector.x + 1) * window.innerWidth / 2;
        this.vector.y = - ( this.vector.y - 1) * window.innerHeight / 2;

	// get distance from camera
	let camera = document.querySelector('[camera]');
	let cameraPosition = camera.object3D.position;
        let markerPosition = this.el.object3D.position;
        let distance = cameraPosition.distanceTo(markerPosition)

        // apply the vector to the style
        this.element.style.left = (this.vector.x + this.data.offset.x / distance) + 'px';
        this.element.style.top = (this.vector.y + this.data.offset.y / distance) + 'px';

	// adjust image size
	let image = document.getElementById('dockingicon');
	image.style.width = (200 / distance) + 'vh';
	}
})

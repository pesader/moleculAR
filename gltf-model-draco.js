AFRAME.registerComponent('gltf-model-draco', {
    schema: { type: 'asset' },

    init: function () {
      var loader = new THREE.GLTFLoader();
      var dracoLoader = new THREE.DRACOLoader();
      dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.137.5/examples/js/libs/draco/');
      loader.setDRACOLoader(dracoLoader);
      loader.load(this.data, (gltf) => {
        this.el.setObject3D('mesh', gltf.scene);
      });
    },

    remove: function () {
      if (this.mixer)
        this.mixer.stopAllAction();

      this.el.removeObject3D('mesh');
    }
  });
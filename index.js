var exports = {"__esModule": true};
//import * as THREE from 'webxrscene/node_modules/three';
//import TWEEN, { update } from '@tweenjs/tween.js';
//const Renderer = require('./src/renderer');
// import Update from './src/Update';
// import Camera from './src/Camera';
// import Loader from './src/Loader';
// import DesktopControls from './src/DesktopControls';

//const Renderer = require('./src/renderer');

export { Renderer } from './src/renderer.js';
export { Update } from './src/Update.js';
export { Camera } from './src/Camera.js';
export { Loader } from './src/Loader.js';
export { DesktopControls } from './src/DesktopControls.js';


// exports.Renderer = require('./src/renderer');
// exports.Update = require('./src/Update');
// exports.Camera = require('./src/Camera');
// exports.Loader = require('./src/Loader');
// exports.DesktopControls = require('./src/DesktopControls');

// module.exports = {
//   Renderer
// };
/*
const MainScene = (function(){

  this.renderer = new Renderer("main-scene-canvas");
  this.scene = new THREE.Scene();
  this.camera = new Camera();
  this.loader = new Loader();
  this.controls ={
    desktop : new DesktopControls(this.camera.camera, this.renderer.renderer.domElement)
  } 

  //load stack of objects
  this.loader.loadStack({
      progress: (percentage,singleProgress)=>{console.log("progress", percentage,singleProgress);},
      stack : vorhangSchiene
}).then((library)=>{
    console.log("library", library);

    Object.keys(library).map((elements, index)=>{
      this.scene.add(library[elements].scene);
    });
  });


  //load single model
  // this.loader.load({
  //   url : model,
  //   progress : (percentage)=>{
  //     console.log(percentage);
  //   },
  // }).then((gltf)=>{
  //   this.scene.add(gltf.scene);
  // }).catch((err)=>{
  //   console.log("error: " , err );
  // }).finally(()=>{
  //   console.log("load complete");
  // });
  

  // var geometry = new THREE.BoxGeometry();
  // var material = new THREE.MeshNormalMaterial();
  // var cube = new THREE.Mesh( geometry, material );
  // this.scene.add( cube );
  
  this.animateCube = () =>{

    const start = {x: 0, y: 0,z:0} // Start at (0, 0)
    const end = {x: 1, y: 1,z:1} // Start at (0, 0)
    const tween = new TWEEN.Tween(start) // Create a new tween that modifies 'coords'.
      .to(end, 1000) // Move to (300, 200) in 1 second.
      .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
      .onUpdate(() => {
        cube.position.set(start.x,start.y,start.z);  
      })
      .start() // Start the tween immediately.
    
  }

  this.loop = new Update();

  this.loop.AddUpdateMethod("common", ()=>{
    TWEEN.update();
    this.renderer.renderer.render( this.scene, this.camera.camera );
  });
  
  
  this.loop.AddUpdateMethod("desktopControls", ()=>{
    this.controls.desktop.controls.update();
  });

});
  
export default MainScene;*/
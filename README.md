# webxrscene Package

## Installation
`npm i webxrscene --save`

## Import into Projekt
```js
import {Renderer,Camera,Update,Loader,DesktopControls} from 'webxrscene';
import * as THREE from 'three';
```

## Create Instances

```js
const renderer = new Renderer("main-scene-canvas");
const scene = new THREE.Scene();
const camera = new Camera();
const loader = new Loader();
const controls ={
  desktop : new DesktopControls(camera.instance, renderer.instance.domElement)
}
```

## Loader loadStack
```js
const loader = new Loader();
loader.loadStack({
  progress: (percentage,singleProgress)=>{console.log("progress", percentage,singleProgress);},
  stack : [{
    url: "URL TO YOUR GLTF MODEL",
    name:"Name of your model"
  }]
}).then((library)=>{
    console.log("library", library);

    Object.keys(library).map((elements, index)=>{
      scene.add(library[elements].scene);
    });
  });
```

## Loader load
```js
  const loader = new Loader();
  loader.load({
    url : ape,
    progress : (percentage)=>{
      console.log(percentage);
    },
  }).then((gltf)=>{
    scene.add(gltf.scene);
  }).catch((err)=>{
    console.log("error: " , err );
  }).finally(()=>{
    console.log("load complete");
  });
```


## Update loop
```js
  const loop = new Update();

  loop.AddUpdateMethod("common", ()=>{
      TWEEN.update();
     renderer.instance.render( scene, camera.instance );
  });
```

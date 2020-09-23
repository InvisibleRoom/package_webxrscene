# webxrscene Package

## Installation
`npm i webxrscene --save`

## Import into Projekt
```js
import {webXRscene} from 'webxrscene';
import * as THREE from 'three';
```

## Create Instances

```js
const webXRScene = new webXRScene("element");
```

## Loader loadStack
```js

webXRScene.Loader.loadStack({
  progress: (percentage,singleProgress)=>{
    console.log(percentage,singleProgress);
  },
  stack : [{
    url: "URL TO YOUR GLTF MODEL",
    name:"Name of your model"
  }]
}).then((library)=>{
    console.log("library", library);

    Object.keys(library).map((elements, index)=>{
      console.log(library[elements].scene);
    });
  });
```

## Loader load
```js
  webXRScene.Loader.load({
    url : "URL TO YOUR GLTF MODEL",
    progress : (percentage)=>{
      console.log(percentage);
    },
  }).then((gltf)=>{
    console.log(gltf.scene);
  }).catch((err)=>{
    console.log("error: " , err );
  }).finally(()=>{
    console.log("load complete");
  });
```


## Update loop
```js
  
  webXRScene.Update.AddUpdateMethod("common", ()=>{
     renderer.instance.render( scene, camera.instance );
  });

  //start the loop
  webXRScene.Update.start();

  //stop the loop
  webXRScene.Update.stop();

```

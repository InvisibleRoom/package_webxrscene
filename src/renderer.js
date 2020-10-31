import * as THREE from 'three';
//import TWEEN from '@tweenjs/tween.js';

import {Events} from './Events';
import { Camera } from './Camera.js';
import { DesktopControls } from './DesktopControls.js';
import { Loader } from './Loader.js';
import {webXRScene}from "../index.js";

class Renderer {
  
  constructor(id = "app", context){
    this.context = context;
    this.clock = new THREE.Clock();
    this.context.Events.registerEvent('OnAnimationLoop');
    
    this.instance = new THREE.WebGLRenderer({
      alpha : true,
      antialias: true,
    });

    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    // this.instance.physicallyCorrectLights = true;
    // this.instance.toneMapping = THREE.LinearToneMapping;
    // this.instance.outputEncoding = THREE.sRGBEncoding;
    // this.instance.toneMappingExposure = 1;

    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setClearColor(0x000000,0);
    this.instance.xr.enabled = true;
    this.instance.setAnimationLoop(()=>{
      this.AnimationLoop();
      
      var delta = this.clock.getDelta();
      this.context.Mixer.update(delta);
    });

    // this.scene = new THREE.Scene();

    // this.camera = new Camera();
   
    this.domElement = document.getElementById(id);

    if(typeof(this.domElement) == "undefined"){console.logwarn("couldn't find an element with id:"+id);}

    this.domElement.appendChild( this.instance.domElement );


    window.addEventListener("resize", ()=>{
      var size = {
        x : window.innerWidth,
        y : window.innerHeight
      }

      if( typeof( this.domElement) != "undefined"){
        var domRect = this.domElement.getBoundingClientRect();
        size.x = domRect.width;
        size.y = domRect.height;
      }


      this.context.Camera.instance.aspect = size.x / size.y;
      this.context.Camera.instance.updateProjectionMatrix();
      this.instance.setSize( size.x , size.y );



    })

  }

  

  AnimationLoop(){
    this.context.Events.dispatchEvent('OnAnimationLoop');

    //this.controls.desktop.update();
    this.instance.render( this.context.Scene, this.context.Camera.instance );
  }

}

export {Renderer};
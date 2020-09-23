import * as THREE from 'three';
//import TWEEN from '@tweenjs/tween.js';

import {Events} from './Events';
import { VRButton } from './VRButton.js';
import { ARButton } from './ARButton.js';
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
      antialias: true
    });
    
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setClearColor(0x000000,0);
    this.instance.xr.enabled = true;
    this.instance.setAnimationLoop(()=>{
      this.AnimationLoop();
      
      var delta = this.clock.getDelta();
      this.context.Mixer.update(delta);
    });

    this.scene = new THREE.Scene();

    this.camera = new Camera();
   
    let domElement = document.getElementById(id);

    if(typeof(domElement) == "undefined"){console.logwarn("couldn't find an element with id:"+id);}

    document.getElementById(id).appendChild( this.instance.domElement );

    this.controls = {
      desktop : new DesktopControls(this.camera.instance,this.instance.domElement),
      update : ()=>{
        this.controls.desktop.instance.update();
      }
    }

    this.vrButton = VRButton.createButton(this.instance);
    this.arButton = ARButton.createButton(this.instance);

    this.vrButton.addEventListener("click",()=>{console.log("AR Mode enabled");})
    this.arButton.addEventListener("click",()=>{console.log("VR Mode enabled");})

    this.GetARButton = this.GetARButton.bind(this);
    this.GetVRButton = this.GetVRButton.bind(this);
  }

  GetVRButton(){
    return this.vrButton;
  }
  
  GetARButton(){
    return this.arButton;
  }

  AnimationLoop(){
    this.context.Events.dispatchEvent('OnAnimationLoop');

    //this.controls.desktop.update();
    this.instance.render( this.scene, this.camera.instance );
  }

}

export {Renderer};
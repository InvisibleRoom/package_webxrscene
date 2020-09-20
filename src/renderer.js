import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import {Events} from './Events';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

class Renderer {
  
  constructor(id = "app"){
    
    this.instance = new THREE.WebGLRenderer({
      alpha : true,
      antialias: true
    });
    
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setClearColor(0x000000,0);
    this.instance.xr.enabled = true;
    this.instance.setAnimationLoop(()=>{
      this.AnimationLoop();
    });
    this.events = new Events();
    this.events.registerEvent('OnAnimationLoop');

    let domElement = document.getElementById(id);

    if(typeof(domElement) == "undefined"){console.logwarn("couldn't find an element with id:"+id);}

    document.getElementById(id).appendChild( this.instance.domElement );

    this.GetARButton = this.GetARButton.bind(this);
    this.GetVRButton = this.GetVRButton.bind(this);
  }

  GetVRButton(){
    
    return VRButton.createButton(this.instance);
  }
  
  GetARButton(){
    return ARButton.createButton(this.instance);
  }

  AnimationLoop(){
    this.events.dispatchEvent('OnAnimationLoop');
  }

}

export {Renderer};
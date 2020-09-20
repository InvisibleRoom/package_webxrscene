import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

class Renderer {
  
  constructor(id = "app"){
    
    this.instance = new THREE.WebGLRenderer({
      alpha : true,
      antialias: true
    });
    
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setClearColor(0x000000,0);

    let domElement = document.getElementById(id);

    if(typeof(domElement) == "undefined"){console.logwarn("couldn't find an element with id:"+id);}

    document.getElementById(id).appendChild( this.instance.domElement );
  }

}

export {Renderer};
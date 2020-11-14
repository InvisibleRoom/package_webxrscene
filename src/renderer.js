import * as THREE from 'three';
//import TWEEN from '@tweenjs/tween.js';

import {Events} from './Events';
import { Camera } from './Camera.js';
import { DesktopControls } from './DesktopControls.js';
import { Loader } from './Loader.js';
import {webXRScene}from "./index.js";
import { Clock } from "three";
import { LoadingManager } from "three";

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
      
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';

class Renderer {
  
  constructor(id = "app", context){
    this.context = context;
    this.clock = new THREE.Clock();
    this.postprocessing = {};
    this.context.Events.registerEvent('OnAnimationLoop');
    
    this.instance = new THREE.WebGLRenderer({
      alpha : true,
      antialias: true,
      // autoClear: false,
      powerPreference: "high-performance",
      // stencil: false,
      // depth: false
    });

    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.colorManagement = true;
    this.instance.setClearColor(0xffffff,0);
    
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.xr.enabled = true;
    this.instance.setAnimationLoop(this.AnimationLoop);
    
    this.domElement = document.getElementById(id);

    if(typeof(this.domElement) == "undefined"){console.logwarn("couldn't find an element with id:"+id);}

    this.domElement.appendChild( this.instance.domElement );
    
   this.context.Events.addEventListener("OnMount",()=>this.InitComposer() );

  }

  InitComposer = () => {
    this.effects = true;

    this.renderPass = new RenderPass( this.context.Scene, this.context.Camera.instance );

    this.postprocessing.bokehPass = new BokehPass( this.context.Scene, this.context.Camera.instance , {
      focus: 50.0,
			aperture: 1,
			maxblur: 0.01,

      width: window.innerWidth,
      height: window.innerHeight
    } );

    this.postprocessing.composer = new EffectComposer( this.instance );
    this.postprocessing.composer.addPass( this.renderPass );
   




    this.fxaaPass = new ShaderPass( FXAAShader );    
    const pixelRatio = this.instance.getPixelRatio();    
    this.fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth* pixelRatio );
    this.fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );   


    this.smaaPass = new SMAAPass( window.innerWidth * this.instance.getPixelRatio(), window.innerHeight * this.instance.getPixelRatio() );
    this.postprocessing.composer.addPass( this.smaaPass );
        
   // this.postprocessing.composer.addPass( this.fxaaPass );
        
    this.postprocessing.composer.addPass( this.postprocessing.bokehPass );

  }



  AnimationLoop = () => {
    this.context.Events.dispatchEvent('OnAnimationLoop');

    this.context.Mixer.update(0.1);

   //this.instance.render(this.context.Scene, this.context.Camera.instance);
   this.postprocessing.composer.render();

//    this.composer.render(delta);
  }

}

export {Renderer};
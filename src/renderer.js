import * as THREE from 'three';
//import TWEEN from '@tweenjs/tween.js';

import {Events} from './Events';
import { Camera } from './Camera.js';
import { DesktopControls } from './DesktopControls.js';
import { Loader } from './Loader.js';
import {webXRScene}from "./index.js";
import { BloomEffect,GodRaysEffect, EffectComposer, EffectPass, RenderPass ,SMAAEffect, SMAAImageLoader} from "postprocessing";
import { Clock } from "three";
import { LoadingManager } from "three";


class Renderer {
  
  constructor(id = "app", context){
    this.context = context;
    this.clock = new THREE.Clock();
    this.context.Events.registerEvent('OnAnimationLoop');
    
    this.instance = new THREE.WebGLRenderer({
      alpha : true,
      //antialias: true,
      powerPreference: "high-performance",
      antialias: false,
      stencil: false,
      depth: false
    });

    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    
    
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setClearColor(0x000000,0);
    this.instance.xr.enabled = true;
    this.instance.setAnimationLoop(()=>{
      this.AnimationLoop();
      var delta = this.clock.getDelta();
      this.context.Mixer.update(delta);
    });
    
    let domElement = document.getElementById(id);

    if(typeof(domElement) == "undefined"){console.logwarn("couldn't find an element with id:"+id);}

    document.getElementById(id).appendChild( this.instance.domElement );


          
    console.log(this.context);

  
    this.context.Events.addEventListener("OnMount",()=> this.InitComposer());

    this.LoadSMAA().then(this.initSMAA).catch(console.error);
  }

  InitComposer(){
    this.effects = true;
    this.composer = new EffectComposer(this.instance);
    this.composer.addPass(new RenderPass(this.context.Scene, this.context.Camera.instance));
   // this.composer.addPass(new EffectPass(this.context.Camera.instance, new BloomEffect()));
    
    this.clock = new Clock();
  }

  LoadSMAA(){

      const assets = new Map();
      const loadingManager = new LoadingManager();
      const smaaImageLoader = new SMAAImageLoader(loadingManager);
    
      return new Promise((resolve, reject) => {
    
        loadingManager.onLoad = () => resolve(assets);
        loadingManager.onError = reject;
    
        smaaImageLoader.load(([search, area]) => {
    
          assets.set("smaa-search", search);
          assets.set("smaa-area", area);
    
        });
    
      });
    
  }

  initSMAA = (assets) => {

    const smaaEffect = new SMAAEffect(
      assets.get("smaa-search"),
      assets.get("smaa-area")
    );
      
    this.composer.addPass(new EffectPass(this.context.Camera.instance, smaaEffect));
  }

  AnimationLoop(){
    this.context.Events.dispatchEvent('OnAnimationLoop');

    this.composer.render(this.clock.getDelta());
    //this.controls.desktop.update();
   // this.instance.render( this.context.Scene, this.context.Camera.instance );
  }

}

export {Renderer};
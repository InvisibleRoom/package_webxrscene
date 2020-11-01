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
      autoClear: true,
      powerPreference: "high-performance",
      antialias: true,
      //stencil: false,
      //depth: false
    });

    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.colorManagement = true;
    this.instance.setClearColor(0xffffff,0);
    
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.xr.enabled = true;
    this.instance.setAnimationLoop(this.AnimationLoop);
    
    let domElement = document.getElementById(id);

    if(typeof(domElement) == "undefined"){console.logwarn("couldn't find an element with id:"+id);}

    document.getElementById(id).appendChild( this.instance.domElement );
  
    this.context.Events.addEventListener("OnMount",()=> this.InitComposer());

  }

  InitComposer(){
    this.effects = true;
    this.composer = new EffectComposer(this.instance);
    this.composer.addPass(this.context.Camera.renderPass);
    
    this.LoadSMAA().then(this.initSMAA).catch(console.error);

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

  AnimationLoop = () => {
    const delta = this.clock.getDelta();
    this.context.Events.dispatchEvent('OnAnimationLoop');

    this.context.Mixer.update(delta);

    this.instance.render(this.context.Scene, this.context.Camera.instance);
    //this.composer.render(delta);
  }

}

export {Renderer};
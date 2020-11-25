import * as THREE from 'three';
//import TWEEN from '@tweenjs/tween.js';

import {Events} from './Events';
import { Camera } from './Camera.js';
import { DesktopControls } from './DesktopControls.js';
import { Loader } from './Loader.js';
import {webXRScene}from "./index.js";
import { Clock, Vector2, Vector3 } from "three";
import { LoadingManager } from "three";

import { BokehShader, BokehDepthShader } from 'three/examples/jsm/shaders/BokehShader2.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import motionBlurShader from './MotionBlur';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { DoFShader } from './DoFShader.js';

class Renderer {
  
  constructor(id = "app", context){
    this.context = context;
    this.clock = new THREE.Clock();
    this.postprocessing = {
      enabled : true,
      initialized : false
    };
    this.context.Events.registerEvent('OnAnimationLoop');
    
    this.instance = new THREE.WebGLRenderer({
      alpha : true,
      antialias: true,
      //autoClear: false,
      logarithmicDepthBuffer: false
      // powerPreference: "high-performance",
      // stencil: false,
      //depth: false
    });
    this.instance.physicallyCorrectLights = true;
    this.size = new Vector2(window.innerWidth, window.innerHeight);

    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    // this.instance.colorManagement = true;
   // this.instance.setClearColor(0xcccccc,1);
    
    this.instance.setSize(this.size.x,this.size.y);
    this.instance.xr.enabled = true;
    this.instance.setAnimationLoop(this.AnimationLoop);

    this.domElement = document.getElementById(id);

    if(typeof(this.domElement) == "undefined"){console.logwarn("couldn't find an element with id:"+id);}

    this.domElement.appendChild( this.instance.domElement );
    
    if(this.postprocessing.enabled){
      this.context.Events.addEventListener("OnMount",()=>this.InitComposer() );
    }
  }

  InitComposer = () => {
    this.effects = true;


    this.renderTarget = new THREE.WebGLRenderTarget( this.size.x ,this.size.y, 
      { 
      minFilter: THREE.LinearFilter, 
      magFilter: THREE.LinearFilter, 
      format: THREE.RGBAFormat, 
      stencilBuffer: true
    });
    this.renderTarget.depthBuffer = true
    this.renderTarget.depthTexture = new THREE.DepthTexture();

    this.motionBlurRenderTarget = new THREE.WebGLRenderTarget(
      this.size.x,
      this.size.y,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false
      }
    )



    this.renderPass = new RenderPass( this.context.Scene, this.context.Camera.instance );
  


    //Init Composer

    this.postprocessing.composer = new EffectComposer( this.instance,this.renderTarget );
    this.postprocessing.composer.addPass( this.renderPass );

    
   
   
    //Bloom
    this.postprocessing.bloomPass = new UnrealBloomPass( new Vector2(512,512), .94,.9,.5 );
    this.postprocessing.bloomPass.threshold = .95;
    this.postprocessing.bloomPass.strength = 2.9;
    this.postprocessing.bloomPass.radius = .2;
    this.postprocessing.bloomPass.exposure = 2.0;
// 
    // 
    this.postprocessing.composer.addPass( this.postprocessing.bloomPass );

   
    //Bokeh
    
    this.postprocessing.bokehPass = new BokehPass( this.context.Scene , this.context.Camera.instance, {
      focus: .62,
      aperture: .09,
      maxblur: 0.02,

      width: this.size.x,
      height: this.size.y
    });
    


    this.postprocessing.savePass = new SavePass( new THREE.WebGLRenderTarget( this.size.x,this.size.y, {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			stencilBuffer: false
    }));
    
    this.postprocessing.blendPass = new ShaderPass( BlendShader, 'tDiffuse1' );
		this.postprocessing.blendPass.uniforms[ 'tDiffuse2' ].value = this.postprocessing.savePass.renderTarget.texture;
		this.postprocessing.blendPass.uniforms[ 'mixRatio' ].value = 0.95;

    this.postprocessing.outputPass = new ShaderPass( CopyShader );
		//outputPass.renderToScreen = true;


		this.postprocessing.composer.addPass( this.postprocessing.blendPass );
		this.postprocessing.composer.addPass( this.postprocessing.savePass );
    this.postprocessing.composer.addPass( this.postprocessing.outputPass );
    
    this.postprocessing.composer.addPass( this.postprocessing.bokehPass );


    this.postprocessing.initialized = true;
  }



  AnimationLoop = () => {
    this.context.Events.dispatchEvent('OnAnimationLoop', this.clock);

    this.context.Mixer.update(0.1);
    if(this.postprocessing.enabled){
      if(!this.postprocessing.initialized){
        this.InitComposer();
      }
      this.postprocessing.composer.render(.1);
    }else{
      this.instance.render(this.context.Scene, this.context.Camera.instance);
    }
  }

}

export {Renderer};
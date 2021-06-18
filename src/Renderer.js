import * as THREE from 'three';
//import TWEEN from '@tweenjs/tween.js';

import {Events} from './Events';
import { Camera } from './Camera.js';
import { DesktopControls } from './DesktopControls.js';
import { Loader } from './Loader.js';
import {webXRScene}from "./index.js";
import { Clock, Vector2, Vector3 } from "three";
import { LoadingManager } from "three";

//import { BloomEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";

//import * as Nodes from 'three/examples/jsm/nodes/Nodes.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

// import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass.js';
// import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader.js';

import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';


//import { BokehShader, BokehDepthShader } from 'three/examples/jsm/shaders/BokehShader2.js';

// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
// import { SavePass } from 'three/examples/jsm/postprocessing/SavePass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// import motionBlurShader from './MotionBlur';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
// import { BlendShader } from 'three/examples/jsm/shaders/BlendShader';
// import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
// import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
// import { DoFShader } from './DoFShader.js';

// import lut1 from './luts/Bourbon 64.CUBE';
// import lut2 from './luts/Remy 24.CUBE';
// import lut3 from './luts/Cubicle 99.CUBE';
// import lut4 from './luts/Chemical 168.CUBE';
// import lut5 from './luts/Clayton 33.CUBE';
// import lut6 from './luts/Emulation.CUBE';
// import lut7 from './luts/roadrunner.CUBE';
// import lut8 from './luts/luminous.CUBE';
// import lut9 from './luts/WarmTeal.CUBE';
// import lut10 from './luts/Optima.CUBE';

// const luts = {
//   'Chemical': lut2,
// 	'Clayton': lut3,
// 	'Cubicle': lut4,
// 	'Remy': lut5,
//   'Bourbon': lut1,
//   'Luminous': lut8,
//   'WarmTeal': lut9,
//   'Optima': lut10,
//   'Emulation' : lut6,
//   'RoadRunner': lut7,
// }

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
      powerPreference: "high-performance",
      alpha : true,
      antialias: true,
      transparent : true,
      //autoClear: false,
      //logarithmicDepthBuffer: false
      powerPreference: "high-performance",
      //ONly for screenshots
      //preserveDrawingBuffer : true
      // stencil: false,
      //depth: false
    });
    this.instance.physicallyCorrectLights = true;
    this.size = new Vector2(window.innerWidth, window.innerHeight);
    this.dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
    
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.autoUpdate = false;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.toneMapping = THREE.ReinhardToneMapping;
    this.instance.toneMappingExposure = 3.5;
    this.instance.outputEncoding = THREE.LinearEncoding;
    this.instance.localClippingEnabled = true;
    //this.instance.gammaOutput = true;
    //this.instance.gammaFactor = 1;
    this.instance.colorManagement = true;
    this.instance.setClearColor(0xffffff,0);

    
    this.instance.setSize(this.size.x,this.size.y);
    this.instance.xr.enabled = true;
    this.instance.setAnimationLoop(this.AnimationLoop);

    this.domElement = document.getElementById(id);

    if(typeof(this.domElement) == "undefined"){console.logwarn("couldn't find an element with id:"+id);}

    this.domElement.appendChild( this.instance.domElement );
    
    if(this.postprocessing.enabled){
      this.context.Events.addEventListener("OnMount",()=>this.InitComposer() );
    }

    window.addEventListener("resize", this.Resize);
  }

  InitComposer = () => {
    this.effects = true;


    console.log("%c Postprocessing enabled ", "background:#2196f3; color:#fff;");

    this.postprocessing.composer = new EffectComposer( this.instance  );
    
    
    /** RenderPass*/
    this.postprocessing.RenderPass = new RenderPass( this.context.Scene, this.context.Camera.instance );
    
    /** FXAA */
    this.postprocessing.fxaaPass = new ShaderPass( FXAAShader );
    
    this.postprocessing.fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( this.size.x * this.dpr );
    this.postprocessing.fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( this.size.y * this.dpr );
    
    /** Bokeh */
    this.postprocessing.bokehPass = new BokehPass( this.context.Scene , this.context.Camera.instance, {
      aperture: 0,
      focus: 37,
      maxblur: 0.004,
      
      width: this.size.x,
      height: this.size.y
    });
    
    // this.postprocessing.renderScene = new RenderPass( this.context.Scene, this.context.Camera.instance  );
    
    /** Bloom */
    var bloomSettings = {
      threshold : .75,
      strength : .15,
      radius : .05
    }

		this.postprocessing.bloomPass = new UnrealBloomPass( new THREE.Vector2( this.size.x ,this.size.y ), bloomSettings.strength, bloomSettings.radius, bloomSettings.threshold );
    
    
    /** LUTs */
    // this.postprocessing.lutPass = new LUTPass();
    // this.lutMap = {
    //   'Chemical': null,
    //   'Clayton': null,
    //   'Cubicle': null,
    //   'Remy': null,
    //   'Bourbon': null,
    //   'RoadRunner': null,
    //   'Luminous': null,
    //   'WarmTeal': null,
    //   'Optima': null,
    //   'Emulation' : null,
    // }
    
    // Object.keys(luts).map((lMap)=>{
      
    //   new LUTCubeLoader().load( luts[lMap] , ( result ) => {
        
    //     this.lutMap[ lMap ] = result.texture;
        
    //     this.postprocessing.lutPass.lut = result.texture;
    //   });
    // })
    
    
    
    // this.postprocessing.lutPass.enabled = true;
		// this.postprocessing.lutPass.intensity = 1;
    
    
    this.postprocessing.composer.addPass( this.postprocessing.RenderPass );
    this.postprocessing.composer.addPass( this.postprocessing.fxaaPass );
		//this.postprocessing.composer.addPass( this.postprocessing.lutPass );
    this.postprocessing.composer.addPass( this.postprocessing.bloomPass );
    this.postprocessing.composer.addPass( this.postprocessing.bokehPass );




    this.postprocessing.initialized = true;
  }

  EnablePostProcessing(cb){
    this.postprocessing.enabled = true;
    this.InitComposer();

    if(typeof(cb)!="undefined"){
      cb();
    }
  }

  SetActiveCamera = (camera) =>{
    console.log("%c this.postprocessing", "background:red;color:#fff;");
  }

  AnimationLoop = () => {
    this.context.Events.dispatchEvent('OnAnimationLoop', this.clock);

    if(this.size.x == 0 || this.size.y === 0){
      this.Resize();
    }

    //console.log(this.postprocessing.composer.passes);
    // this.context.Mixer.update(0.1);
    if(this.postprocessing.enabled){
      if(!this.postprocessing.initialized){
        this.InitComposer();
        return;
      }


      //console.log(this.postprocessing.composer.passes);
      this.postprocessing.composer.passes.map((pass)=>{
        if(pass.hasOwnProperty("scene")){
          pass.scene = this.context.Scene;
        }
        if(pass.hasOwnProperty("camera")){
          pass.scene = this.context.Camera.instance;
        }
      });
      

      this.postprocessing.composer.passes.map((pass)=>{
        if(pass.hasOwnProperty("scene")){
          pass.scene = this.context.Scene;
        }
        
        if(pass.hasOwnProperty("camera")){
          pass.camera = this.context.Camera.instance;
        }
      })
      // this.postprocessing.composer.passes[0].scene = this.context.Scene;
      // this.postprocessing.composer.passes[0].camera = this.context.Camera.instance;
      
      // this.postprocessing.composer.passes[2].scene = this.context.Scene;
      // this.postprocessing.composer.passes[2].camera = this.context.Camera.instance;
      
      // this.postprocessing.composer.passes[3].scene = this.context.Scene;
      // this.postprocessing.composer.passes[3].camera = this.context.Camera.instance;
      
      

      //console.log(this.postprocessing.composer.passes[0]);
      this.postprocessing.composer.render();

    }else{
      this.instance.render(this.context.Scene, this.context.Camera.instance);
    }
    
  }

  Resize = () =>{

    var size = this.domElement.getBoundingClientRect();
    this.size = new Vector2(size.width, size.height);
    this.dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
    this.instance.setSize(this.size.x,this.size.y);

    this.context.Camera.instance.aspect = this.size.x / this.size.y;
    this.context.Camera.instance.updateProjectionMatrix();
    
    
    if(this.postprocessing.enabled){

      this.postprocessing.composer.setSize( this.size.x , this.size.y );
      
    }

  }

}

export {Renderer};

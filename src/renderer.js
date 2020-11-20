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
      
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { DoFShader } from './DoFShader.js';

class Renderer {
  
  constructor(id = "app", context){
    this.context = context;
    this.clock = new THREE.Clock();
    this.postprocessing = {};
    this.context.Events.registerEvent('OnAnimationLoop');
    
    this.instance = new THREE.WebGLRenderer({
      alpha : true,
      antialias: true,
      autoClear: false,
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
    
   this.context.Events.addEventListener("OnMount",()=>this.InitComposer() );

  }

  InitComposer = () => {
    this.effects = true;

  

    this.postprocessing.bokehPass = new BokehPass( this.context.Scene, this.context.Camera.instance , {
      focus: 50.0,
			aperture: 1,
			maxblur: 0.01,

      width: window.innerWidth,
      height: window.innerHeight
    } );


    this.renderTarget = new THREE.WebGLRenderTarget( this.size.x ,this.size.y, { 
      minFilter: THREE.LinearFilter, 
      magFilter: THREE.LinearFilter, 
      format: THREE.RGBAFormat, 
      stencilBuffer: false
    });



    this.renderPass = new RenderPass( this.context.Scene, this.context.Camera.instance );
    
    // this.renderPass.autoClear = false;
    // this.renderPass.clearColor = true;
    // this.renderPass.clearAlpha = false;



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

    this.postprocessing.composer.addPass( this.postprocessing.bokehPass );

    


    // save pass
    // this.savePass = new SavePass(
    //   new THREE.WebGLRenderTarget(
    //     this.size.x,
    //     this.size.y,
    //     {
    //       minFilter: THREE.LinearFilter,
    //       magFilter: THREE.LinearFilter,
    //       stencilBuffer: false
    //     }
    //   )
    // );
    // // blend pass
    // this.blendPass = new ShaderPass(BlendShader, "tDiffuse1");
    // this.blendPass.uniforms["tDiffuse2"].value = this.savePass.renderTarget.texture;
    // this.blendPass.uniforms["mixRatio"].value = 0.9;

    // // output pass
    // this.outputPass = new ShaderPass(CopyShader);
    // this.outputPass.renderToScreen = true;

    // // adding passes to composer
    // this.postprocessing.composer.addPass(this.blendPass);
    // this.postprocessing.composer.addPass(this.savePass);
    // this.postprocessing.composer.addPass(this.outputPass);




   // const depthShader = BokehDepthShader;

    // this.materialDepth = new THREE.ShaderMaterial( {
    //   uniforms: depthShader.uniforms,
    //   vertexShader: depthShader.vertexShader,
    //   fragmentShader: depthShader.fragmentShader
    // } );

    // this.materialDepth.uniforms[ 'mNear' ].value = this.context.Camera.instance.near;
    // this.materialDepth.uniforms[ 'mFar' ].value = this.context.Camera.instance.far;

    // const pars = { 
    //   minFilter: THREE.LinearFilter, 
    //   magFilter: THREE.LinearFilter, 
    //   format: THREE.RGBFormat 
    // };
		// this.postprocessing.rtTextureDepth = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, pars );
		// this.postprocessing.rtTextureColor = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, pars );

		// 	const bokeh_shader = BokehShader;

		// this.postprocessing.bokeh_uniforms = THREE.UniformsUtils.clone( bokeh_shader.uniforms );

		// this.postprocessing.bokeh_uniforms[ 'tColor' ].value = this.postprocessing.rtTextureColor.texture;
		// this.postprocessing.bokeh_uniforms[ 'tDepth' ].value = this.postprocessing.rtTextureDepth.texture;
		// this.postprocessing.bokeh_uniforms[ 'textureWidth' ].value = window.innerWidth;
		// this.postprocessing.bokeh_uniforms[ 'textureHeight' ].value = window.innerHeight;

		// this.postprocessing.materialBokeh = new THREE.ShaderMaterial( {

		// 		uniforms: this.postprocessing.bokeh_uniforms,
		// 		vertexShader: bokeh_shader.vertexShader,
		// 		fragmentShader: bokeh_shader.fragmentShader,
		// 		defines: {
		// 			RINGS: 3,
		// 			SAMPLES: 4
		// 		}

		// 	} );

		// this.postprocessing.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight ), this.postprocessing.materialBokeh );
		// this.postprocessing.quad.position.z = - 500;
		// this.context.Scene.add( this.postprocessing.quad );


   

        

    ///
    // depth of field
    
		// this.postprocessing.dof = new ShaderPass( DoFShader );
		// this.postprocessing.dof.uniforms[ 'tDepth' ].value = this.depthTarget;
		// this.postprocessing.dof.uniforms[ 'size' ].value = this.size;//.set( size.x , size.y );
		// this.postprocessing.dof.uniforms[ 'textel' ].value = new Vector2(1.0 / this.size.x,1.0 / this.size.y);// .set( 1.0/size.x, 1.0/size.y);

		// //make sure that these two values are the same for your camera, otherwise distances will be wrong.
		// this.postprocessing.dof.uniforms[ 'znear' ].value = 1;//this.context.Camera.instance.near; //camera clipping start
		// this.postprocessing.dof.uniforms[ 'zfar' ].value = 200;//this.context.Camera.instance.far; //camera clipping end

		// this.postprocessing.dof.uniforms[ 'focalDepth' ].value = 100.0; //focal distance value in meters, but you may use autofocus option below
		// this.postprocessing.dof.uniforms[ 'focalLength' ].value	= this.context.Camera.instance.focalLength; //focal length in mm
		// this.postprocessing.dof.uniforms[ 'fstop' ].value = 4.01; //f-stop value
		// this.postprocessing.dof.uniforms[ 'showFocus' ].value = false; //show debug focus point and focal range (orange = focal point, blue = focal range)

		// this.postprocessing.dof.uniforms[ 'manualdof' ].value = true; //manual dof calculation
		// this.postprocessing.dof.uniforms[ 'ndofstart' ].value = 5.90; //near dof blur start
		// this.postprocessing.dof.uniforms[ 'ndofdist' ].value = 5.02; //near dof blur falloff distance	
		// this.postprocessing.dof.uniforms[ 'fdofstart' ].value = 10.1; //far dof blur start
		// this.postprocessing.dof.uniforms[ 'fdofdist' ].value = 10.002; //far dof blur falloff distance	

		// this.postprocessing.dof.uniforms[ 'CoC' ].value = 0.03;//circle of confusion size in mm (35mm film = 0.03mm)	

		// this.postprocessing.dof.uniforms[ 'vignetting' ].value = true; //use optical lens vignetting?
		// this.postprocessing.dof.uniforms[ 'vignout' ].value = 1.5;//vignetting outer border
		// this.postprocessing.dof.uniforms[ 'vignin' ].value = 0.1;//vignetting inner border
		// this.postprocessing.dof.uniforms[ 'vignfade' ].value = 100.0;//f-stops till vignete fades	

		// this.postprocessing.dof.uniforms[ 'autofocus' ].value = true;//use autofocus in shader? disable if you use external focalDepth value
		// this.postprocessing.dof.uniforms[ 'focus' ].value = new Vector2(0.5, 0.5);// autofocus point on screen (0.0,0.0 - left lower corner, 1.0,1.0 - upper right) 
		// this.postprocessing.dof.uniforms[ 'maxblur' ].value = 2.2; //clamp value of max blur (0.0 = no blur,1.0 default)	

		// this.postprocessing.dof.uniforms[ 'threshold' ].value = 0.5;//highlight threshold;
		// this.postprocessing.dof.uniforms[ 'gain' ].value = 2.0; //highlight gain;

    // this.postprocessing.dof.uniforms[ 'bias' ].value = 0.5;//bokeh edge bias		
		// this.postprocessing.dof.uniforms[ 'fringe' ].value = 3.7;//bokeh chromatic aberration/fringing

    // this.postprocessing.dof.uniforms[ 'noise' ].value = false; //use noise instead of pattern for sample dithering
		// this.postprocessing.dof.uniforms[ 'namount' ].value	= 0.0001; //dither amount

    // this.postprocessing.dof.uniforms[ 'depthblur' ].value = true;//blur the depth buffer?
		// this.postprocessing.dof.uniforms[ 'dbsize' ].value  = 1.25;//depthblursize
    // this.postprocessing.composer.addPass( this.postprocessing.dof );



    //this.smaaPass = new SMAAPass( this.size.x, this.size.y );
    //this.postprocessing.composer.addPass( this.smaaPass );

    
    // this.postprocessing.composer.addPass( this.fxaaPass );
    
    //this.postprocessing.composer.addPass( this.postprocessing.bokehPass );
    

  
    
    // this.postprocessing.fxaaPass = new ShaderPass( FXAAShader );    
    // const pixelRatio = this.instance.getPixelRatio();    
    // this.postprocessing.fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( this.size.x * pixelRatio );
    // this.postprocessing.fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / (  this.size.y * pixelRatio ); 
    
    // this.postprocessing.composer.addPass(  this.postprocessing.fxaaPass );





  }



  AnimationLoop = () => {
    this.context.Events.dispatchEvent('OnAnimationLoop', this.clock);

    this.context.Mixer.update(0.1);

   //this.instance.render(this.context.Scene, this.context.Camera.instance);
    this.postprocessing.composer.render(.1);

//    this.composer.render(delta);
  }

}

export {Renderer};
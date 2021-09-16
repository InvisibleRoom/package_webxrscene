import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { IPass } from "./IPass";

class FXAAEffect implements IPass{
  composer: EffectComposer
  pass : ShaderPass
  dpr: number = window.devicePixelRatio ? window.devicePixelRatio : 1

  constructor(composer:EffectComposer){
    this.composer = composer;
    this.pass = new ShaderPass( FXAAShader );

    this.composer.addPass( this.pass );
		
    this.Resize();
  }

  Resize = ()=>{
    this.pass.uniforms['resolution'].value.set(1 / (window.innerWidth * this.dpr), 1 / (window.innerHeight * this.dpr));

  }
  
}

export {FXAAEffect}

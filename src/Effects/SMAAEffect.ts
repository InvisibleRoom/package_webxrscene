import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { IPass } from "./IPass";

class SMAAEffect implements IPass{
  composer: EffectComposer
  pass : SMAAPass
  dpr: number = window.devicePixelRatio ? window.devicePixelRatio : 1

  constructor(composer:EffectComposer){
    this.composer = composer;

    this.pass = new SMAAPass( window.innerWidth * this.dpr, window.innerHeight * this.dpr );
    
    this.composer.addPass( this.pass );
		
    this.Resize();
  }

  Resize = ()=>{
    //this.pass.uniforms['resolution'].value.set(1 / (window.innerWidth * this.dpr), 1 / (window.innerHeight * this.dpr));

  }
  
}

export {SMAAEffect}

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { IPass } from "./IPass";
import IWorld from "../World/IWorld";

class SAOEffect implements IPass{
  composer: EffectComposer
  pass : SAOPass
  dpr: number = window.devicePixelRatio ? window.devicePixelRatio : 1
  world:IWorld

  constructor(composer:EffectComposer, world:IWorld){
    this.composer = composer;
    this.world = world;

    this.pass = new SAOPass(this.world.sceneController.GetActiveScene(), this.world.camera.instance , false,true);
  
    
    this.composer.addPass( this.pass );
		
    this.Resize();
  }

  Resize = ()=>{
    //this.pass.uniforms['resolution'].value.set(1 / (window.innerWidth * this.dpr), 1 / (window.innerHeight * this.dpr));

  }
  
}

export {SAOEffect}

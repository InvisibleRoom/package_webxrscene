import { Vector2, WebGLRenderer, WebGLRenderTarget ,LinearFilter,RGBAFormat} from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import IWorld from '../World/IWorld';


class Composer {
  world:IWorld
  renderer:WebGLRenderer
  
  composer:EffectComposer

  size : Vector2 = new Vector2(window.innerWidth, window.innerHeight)
  dpr: number = window.devicePixelRatio ? window.devicePixelRatio : 1



  constructor(world: IWorld){
    this.world = world;
    this.renderer = this.world.renderer.instance;
   

    this.composer = new EffectComposer( this.renderer );

    this.composer.addPass( new RenderPass( this.world.sceneController.GetActiveScene(), this.world.camera.instance) );

  }

  Resize = () =>{

    const size = this.renderer.domElement.getBoundingClientRect();
    this.size = new Vector2(size.width, size.height);
    this.dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
    this.composer.setSize(this.size.x,this.size.y);
    
  }

}

export {Composer}
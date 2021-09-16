import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { PerspectiveCamera} from 'three';
import  {degToRad} from 'three/src/math/MathUtils';
import IWorld from '../World/IWorld';
import { IPass } from './IPass';

class BokehEffect implements IPass{
  
  composer:EffectComposer
  pass: BokehPass

  constructor(composer:EffectComposer, world:IWorld){

    this.composer = composer;
  
    this.pass = new BokehPass( world.sceneController.GetActiveScene(), world.camera.GetActiveCamera(), {
      focus: 1.0,
      aperture: 0.025,
      maxblur: 0,

      width: window.innerWidth,
      height: window.innerHeight
    });

		this.composer.addPass( this.pass );
		
  }

  Resize = () =>{

  }

}

export { BokehEffect }
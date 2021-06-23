
import { Vector3 } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {StaticControls} from './StaticControls';

class DesktopControls {
  
  constructor(camera,domElement, context = null){
    this.context = context;
    this.orbit = new OrbitControls(camera,domElement);
    this.static = new StaticControls(camera,domElement, context);
    this.static.enabled = false;
    
    this.instance = this.orbit;
    // this.instance.enableZoom = true;
		// this.instance.enablePan = false;
		// this.instance.enableDamping = true;
    // this.instance.rotateSpeed = 0.5;
    
  }

  ChangeToStatic = () =>{

    this.instance = this.static;
    this.static.SetActive(true);
    this.orbit.enabled = false;
  }
  ChangeToDefault = () =>{
    this.instance = this.orbit;
    this.static.SetActive(false);
    this.orbit.enabled = true;
  }

  SetTarget = (x,y,z)=>{
    this.static.target.set(x,y,z);
    this.orbit.target.set(x,y,z);

    this.static.update();
    this.orbit.update();
  }

  SetActiveCamera = (camera) =>{
    this.orbit.object = camera;
    this.static.object = camera;
  }

  SetEnabled = (boolean)=>{
    this.orbit.enabled = boolean;
    this.static.enabled = boolean;
    this.static.controls.enabled = boolean;
  }
  
}

export {DesktopControls};
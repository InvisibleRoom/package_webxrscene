import { Euler, Object3D, Quaternion, Vector3, Matrix4, Vector2 } from 'three';
import { Utils } from './Utils';

import CustomTrackballControls from './CustomTrackballControls';
import mainConfig from '../../../main.config';

class StaticControls {
  
  enabled = true;
  
  mouse = new Vector2();
  target = new Vector2();
  dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
  windowHalf = new Vector2( window.innerWidth / (2 * this.dpr), window.innerHeight / (2 * this.dpr));

  
  constructor(camera,domElement, context = null){

    this.object = camera;
    this.domElement = domElement;
    this.mousedown = false;
    this.context = context;

    this.controls = new CustomTrackballControls( camera );

    if(!mainConfig.changeControlsToStatic){
      this.controls.enabled = false;
    }

    this.controls.rotateSpeed = .1;
    this.controls.zoomSpeed = 0;
    this.controls.panSpeed = 0;

    this.controls.noPan = false;

    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.5;

  }
  
  
  SetActive(boolean){
    this.enabled = boolean;
    //this.controls.enabled = boolean;
    var t = this.context.Controls.Desktop.orbit.target.clone();
    this.controls.target.set(t.x,t.y,t.z);
    this.controls.update();
  }

  update = (t)=>{
    if( typeof(t) === "undefined" ){return;}
    if(this.enabled){
      this.controls.update();
    }
  }
}

export {StaticControls};
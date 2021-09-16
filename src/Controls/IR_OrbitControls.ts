import { EventDispatcher, Vector3 } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import ICamera from '../Camera/ICamera';
import IRenderer from '../Renderer/IRenderer';
import IControls from "./IControls";

export default class IR_OrbitControls implements IControls{

  camera
  instance
    
  constructor(camera:ICamera , renderer: IRenderer){
    this.camera = camera;

    this.instance = new OrbitControls( this.camera.instance, renderer.instance.domElement );
  }

  SetPosition(position:Vector3){

    
    this.camera.SetPosition(position);
    this.instance.update();
  }
  
  SetTarget(target:Vector3){
    this.instance.target.set(target.x,target.y,target.z);
    this.instance.update();
  }

  GetPosition(){
    return this.camera.GetPosition();
  }

  GetTarget(){
    return this.instance.target;
  }



}
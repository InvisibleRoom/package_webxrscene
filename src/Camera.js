import {PerspectiveCamera,Vector2} from 'three';
import StereoCamera from './StereoCamera';

import { RenderPass } from "postprocessing";

class Camera {
  constructor(context){
    this.context = context;
    this.instance = new PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.01, 200 );
   

    this.context.Events.addEventListener("OnMount",this.AddEvents);
    
    this.cameras = [];
    this.renderPass = new RenderPass(this.context.Scene, this.instance);
    
  }

  SetActiveCamera = (camera, sceneName) =>{
    this.instance = camera;


    console.warn("=> ToDo WebXRScene: SetActiveCamera! Change Camera in Camera and Controls");
    this.context.Controls.SetActiveCamera(this.instance, sceneName);
    this.context.Renderer.SetActiveCamera(this.instance, sceneName);

  }

  AddEvents = ()=>{
    this.context.Events.addEventListener("OnAnimationLoop",this.update);
    
  }

  SetPosition(vector3){
    this.SetPosition({...vector3});
  }
  SetPosition(x,y,z){
    this.instance.position.set(x,y,z);
  }
  GetPosition(){
    
    let _currentControls = this.context.Controls.GetCurrentXRMode();
    switch(_currentControls){
      case "VR":
        return this.context.Renderer.instance.xr.getCamera(this.instance).position;
      break;
      default:
        return this.instance.position;
        break;
    }
  }
 
  update = ()=>{
        
  }

}

export {Camera};
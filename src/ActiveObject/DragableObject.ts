import { Object3D, Event } from "three";
import IXRWorld from "../World/IXRWorld";
import IActiveObject from "./IActiveObject";

class DragableObject implements IActiveObject{
  
  object: Object3D<Event>
  world:IXRWorld
  selected: { [key: string]: { [key: string]: boolean } } = {
    controller : {
      "0" : false,
      "1" : false
    }
  }
  
  constructor(object:Object3D, world:IXRWorld){
    this.object = object;
    this.object.userData.grabable = true;
    this.object.userData.grabbed = {};
    this.world = world;
    
  }
  

  OnHover = (index:number, event:any)=>{
    console.log("hover");
  }
  OnHoverEnd = (index:number, event:any)=>{
    console.log("hover end");
  }
  OnSelectStart = (index:number, event:any) => {

    this.object.userData.grabbed[index] = true;
    event.target.attach(this.object);
  }
  OnSelectEnd = (index:number, event:any) => {
    this.object.userData.grabbed[index] = false;
    this.world.sceneController.GetActiveScene().attach(this.object);
  }

  AddToScene(sceneName?:string){
    if(sceneName){
      this.world.sceneController.AddToScene(this.object, sceneName);
    }else{
      this.world.sceneController.AddToScene(this.object);
    }

    this.world.xrController.AddInteractiveObject(this);
  }
  
  RemoveFromScene(sceneName?:string){
    if(sceneName){
      this.world.sceneController.RemoveFromScene(this.object, sceneName);
    }else{
      this.world.sceneController.RemoveFromScene(this.object);
    }

    this.world.xrController.RemoveInteractiveObject(this);
  }
}

export default DragableObject;

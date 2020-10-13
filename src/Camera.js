import {PerspectiveCamera} from 'three';
class Camera {

  constructor(context){
    this.context = context;
    // this.context.Events.addEventListener("OnChangeXRMode", ()=>{
    //   console.log("Camera");
    // })
    this.instance = new PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.01, 100 );
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

}

export {Camera};
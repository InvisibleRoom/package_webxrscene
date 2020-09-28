import {DesktopControls} from './DesktopControls';

class Controls{
  
  constructor(context){
    this.context = context;
    this.Desktop = new DesktopControls(context.Camera.instance,context.Renderer.instance.domElement),
      

    
    this.Update = this.Update.bind(this);
    this.SetPosition = this.SetPosition.bind(this);
    this.SetTarget = this.SetTarget.bind(this);
  }
  Update(){
    this.Desktop.instance.update();
  }

  SetPosition (x,y,z){
    this.context.Camera.instance.position.set(x,y,z);
  }
  SetTarget (x,y,z){
    this.Desktop.instance.target.set(x,y,z);
    this.Desktop.instance.update();
  }
}

export {Controls};
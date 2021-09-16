import { WebGLRenderer, XRAnimationLoopCallback , XRFrame} from "three";
import IRenderer from "../Renderer/IRenderer";
import IAnimationLoop from "./IAnimationLoop";
import AnimationCallbacks from "./TAnimationCallback";

export default class IR_AnimationLoop implements IAnimationLoop{

  renderer:IRenderer
  callbacks: AnimationCallbacks[] = []

  constructor(renderer: IRenderer){
    this.renderer = renderer;

    this.renderer.instance.setAnimationLoop(this.OnAnimationLoop);

  }

  OnAnimationLoop = (time: number, frame?: XRFrame | undefined) => {

    this.callbacks.map((cb)=>{
      cb(time, frame);
    });

  }
  
  AddAnimationLoop(fn: XRAnimationLoopCallback | null){
    if(fn != null){
      this.callbacks.push(fn);
    }
  }
  
  RemoveAnimationLoop(fn: XRAnimationLoopCallback | null){
    
    
  }
  

  
}
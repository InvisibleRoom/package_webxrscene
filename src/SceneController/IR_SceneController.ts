import { moduleExpression } from '@babel/types';
import {CanvasTexture, Color, Object3D, Scene} from 'three'
import ISceneController from './ISceneController'

export default class IR_SceneController implements ISceneController {
  readonly currentScene = new Scene()
  readonly scenes:{ [key: string]: Scene; } = {
    default : this.currentScene
  }

  c : any
  backgroundTexture: CanvasTexture


  constructor(){
    this.currentScene.name = "default";

    this.backgroundTexture = new CanvasTexture(this.GetCanvas());

    this.currentScene.background = this.backgroundTexture;
  }

  GetActiveScene(){
    return this.currentScene;
  }

  AddToScene(model:Object3D, sceneName:string = "default", createIfNotExist:boolean = false):Object3D{

    if(!Object.prototype.hasOwnProperty.call(this.scenes, sceneName) && !createIfNotExist){ 
      throw `IR_SceneController => doesn't have a Scene with name: ${sceneName}.`;
    }else if(!Object.prototype.hasOwnProperty.call(this.scenes, sceneName) && createIfNotExist){
      this.scenes[sceneName] = new Scene();
      this.scenes[sceneName].name = sceneName;

      this.scenes[sceneName].background = this.backgroundTexture;
    }

    this.scenes[sceneName].add(model);

    return model;
  }
  GetCanvas(){
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.style.width = "512px";
    canvas.height = 512;
    canvas.style.height = "512px";
    canvas.style.position = "fixed";
    canvas.style.display = "none";

    document.body.appendChild(canvas);

    this.c = canvas.getContext("2d");
    
    this.c.fillRect(0, 0 ,512,512);
    
    return canvas;
  }

  UpdateCanvas(fn: ((that:IR_SceneController) => void) | null ){
    fn ? fn(this) : null;
  }

  RemoveFromScene(model:Object3D, sceneName?:string){
    if(typeof(sceneName) == "undefined"){
      sceneName = "default";
    }
    if(!Object.prototype.hasOwnProperty.call(this.scenes, sceneName)){ console.warn(`WorldSceneController doesn't have a Scene with name: ${sceneName}.`); return false;}

    this.scenes[sceneName].remove(model);
  }




  AnimateBackground(name: string){

    const grd = this.c.createLinearGradient(0, 0, 0, 512);

    switch(name){
      case 'LandingPage':
        grd.addColorStop(0, "#000");
        grd.addColorStop(1, "#333");
      break;
      case 'MainPage':
        grd.addColorStop(0, "#eee");
        grd.addColorStop(1, "#ccc");
      break;
    }
   

    // Fill with gradient
    this.c.fillStyle = grd;
    this.c.fillRect(0,0,512,512);

    this.backgroundTexture.needsUpdate = true;
  }

}


export { IR_SceneController }
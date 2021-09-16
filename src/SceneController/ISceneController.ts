import {Mesh, Object3D, Scene} from 'three';

export default interface ISceneController {
  currentScene: Scene
  scenes:{ [key: string]: Scene; }
  GetActiveScene(): Scene
  AddToScene(model:Object3D, sceneName?:string,createIfNotExist?:boolean) :Object3D
  RemoveFromScene(model:Object3D, sceneName?:string) :void

}
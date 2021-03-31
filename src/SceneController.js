import * as THREE from 'three';

class SceneController{
  constructor(context){
    this.context = context;
    this.activeScene = "default";

    this.scenes = {
      default : new THREE.Scene()
    };

    this.scenes.default.name = this.activeScene;

    //set default Scene
    this.SetActiveScene("default");
  }

  AddToScene = (sceneName = "default", model) =>{
    
    if(!this.scenes.hasOwnProperty(sceneName)){
      this.scenes[sceneName] = new THREE.Scene();
      this.scenes[sceneName].name = sceneName;
    }
    
    this.scenes[sceneName].add(model);
  }

  SetActiveScene = (sceneName) => {
    if(!this.scenes.hasOwnProperty(sceneName)){
      console.warn(`Scene with Name:"${sceneName}" does not exist`);
      return false;
    }


    if(this.currentScene === sceneName){
      console.warn(`Scene with Name:"${sceneName}" is already current Scene`);
      return false;
    }

    this.context.Scene = this.scenes[sceneName];
    this.activeScene = this.scenes[sceneName].name;

    let newActiveCamera = null;
    this.scenes[sceneName].traverse(obj => {
      if(obj.type === "PerspectiveCamera"){
        newActiveCamera = obj;
        newActiveCamera.name = "Camera for Scene "+sceneName;
      }
    });

    if(newActiveCamera != null){
      this.context.Camera.SetActiveCamera(newActiveCamera);
    }
  }
}

export {SceneController};
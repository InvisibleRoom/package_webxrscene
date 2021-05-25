import * as THREE from 'three';
import {PMREMGenerator} from 'three';

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
      
      this.scenes[sceneName].reflectiveObjects = [];
    }

    model.traverse(child =>{
      if(child.type == "Mesh" || child.type =="SkinnedMesh"){
            
        if(child.material.hasOwnProperty("metalness")){
          
          if(child.material.metalness > 0){
            this.scenes[sceneName].reflectiveObjects.push(child);
            child.material.envMap = this.scenes[sceneName].environment;
          }
        }

      }
    })
    
    this.scenes[sceneName].add(model);
  }
  AddSkyToScene = (sceneName = "default", sky)=>{
    
    this.scenes[sceneName].sky = sky;
    this.scenes[sceneName].environment = sky.skyTexture;
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
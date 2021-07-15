import * as THREE from 'three';
import {PMREMGenerator} from 'three';

import {TransformControls} from 'three/examples/jsm/controls/TransformControls';

class SceneController{
  constructor(context){
    this.context = context;
    this.transformControlsEnabled = false;
    this.context.Events.registerEvent("ChangeScene");
    
    this.activeScene = "default";

    this.scenes = {
      default : new THREE.Scene()
    };

    this.sceneGroups = {
      default : new THREE.Group()
    }

    this.sceneTarget = {
      default : new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial())
    }

    window._sceneGroup = this.sceneGroups;
    
    this.scenes.default.name = this.activeScene;

    
    this.transformControls = null;

    //set default Scene
    this.SetActiveScene("default");
  }

  AddToScene = (sceneName = "default", model) =>{
    
    if(!this.scenes.hasOwnProperty(sceneName)){
      this.scenes[sceneName] = new THREE.Scene();
      this.scenes[sceneName].name = sceneName;
      
      this.scenes[sceneName].reflectiveObjects = [];

      this.sceneGroups[sceneName] = new THREE.Group();
      this.sceneGroups[sceneName].name = "sceneGroup-" + sceneName;

      this.scenes[sceneName].attach(this.sceneGroups[sceneName]);


      this.sceneTarget[sceneName] = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial());
      this.sceneTarget[sceneName].position.set(0, 0, 20);
      this.sceneTarget[sceneName].userData.noClip = true;
      this.sceneGroups[sceneName].attach(this.sceneTarget[sceneName]);


    }

    model.traverse(child =>{
      if(child.type == "Mesh" || child.type =="SkinnedMesh"){
            
        if(child.material.hasOwnProperty("metalness")){
          
          if(child.material.hasOwnProperty("envMap")){
            this.scenes[sceneName].reflectiveObjects.push(child);
            child.material.envMap = this.scenes[sceneName].environment;
          }
        }
      }
    });
    
    this.sceneGroups[sceneName].add(model);
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


    if(this.transformControls == null && this.context.hasOwnProperty("Camera") && this.context.hasOwnProperty("Renderer") && this.transformControlsEnabled ){
      this.transformControls = new TransformControls(this.context.Camera.instance, this.context.Renderer.instance.domElement);
      this.transformControls.addEventListener( 'dragging-changed', ( event ) => {

        this.context.Controls.interactivityEnabled = !event.value;
        this.context.Controls.Desktop.orbit.enabled = !event.value;
        this.context.Controls.currentControls = event.value ? "custom" : "Desktop";

        
      });

      window.addEventListener("keydown", (event)=>{
        switch(event.key){
          case "g": // W
            this.transformControls.setMode( "translate" );
					break;
					case "r": // E
            this.transformControls.setMode( "rotate" );
					break;
					case "s": // R
            this.transformControls.setMode( "scale" );
					break;
        }
      })
    }
    if(this.transformControls != null){
      this.context.Scene.attach(this.transformControls);
      this.transformControls.attach( this.sceneGroups[sceneName] );
      
    }


    if(this.context.hasOwnProperty("Controls")){
      
      this.context.Controls.ChangeScene(sceneName);

    }

    let newActiveCamera = null;
    this.scenes[sceneName].traverse(obj => {
      if(obj.type === "PerspectiveCamera"){
        newActiveCamera = obj;
        newActiveCamera.name = "Camera for Scene "+sceneName;
      }
    });


    this.context.Events.dispatchEvent("ChangeScene" , {
      sceneName : sceneName,
      newScene : this.scenes[sceneName]
    })

    // if(newActiveCamera != null){
    //   //this.context.Camera.SetActiveCamera(newActiveCamera, sceneName);
    // }

    this.context.Renderer.instance.shadowMap.needsUpdate = true;
  }
}

export {SceneController};
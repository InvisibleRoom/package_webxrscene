import {Scene} from 'three';

class CSSSceneController{
  constructor(context){
    this.context = context;
    
    // this.scenes = {
    //   default : new THREE.Scene()
    // };

    this.sceneModels = {
      default : []
    }
    this.activeScene = new Scene();
    this.activeScene.name = "default";
    //this.scenes.default.name = "default";

    //set default Scene
    this.SetActiveScene("default");
  }

  AddToScene = (sceneName = "default", model) =>{

    if(!this.sceneModels.hasOwnProperty(sceneName)){
      
      // this.scenes[sceneName] = new THREE.Scene();
      // this.scenes[sceneName].name = sceneName;

      this.sceneModels[sceneName] = [];
    }
    
    model.userData.scene = sceneName;
    model.scale.divideScalar(this.context.CSSRenderer.scaleFactor);
    this.sceneModels[sceneName].push(model);

    this.activeScene.add(model);
  }

  RemoveAll = () =>{
    console.log("REMOVE ALL CSS OBJS")
    for( var i = this.activeScene.children.length - 1; i >= 0; i--) { 
      obj = this.activeScene.children[i];
      this.activeScene.remove(obj); 
 }
  }

  SetActiveScene = (sceneName) => {
    
    if(this.activeScene.name != sceneName){

      // while(this.activeScene.children.length > 0){ 
      //   this.activeScene.remove(this.activeScene.children[0]); 
      // }

      this.activeScene.children.map(child => {
        if(child.userData.scene == sceneName){
          child.visible = true;
        }else{
          child.visible = false;
        }
      })
      
    }
    this.activeScene.name = sceneName;

   // this.sceneModels[sceneName].map(child => this.activeScene.add(child));
    this.context.CSSRenderer.Resize();
  }
}

export {CSSSceneController};
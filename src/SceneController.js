import * as THREE from 'three';

class SceneController{
  constructor(context){
    this.context = context;

    this.rooms = {
      default : new THREE.Scene()
    };

    this.rooms.default.name = this.currentScene;

    //set default Scene
    this.SetActiveScene("default");
  }

  AddToScene = (model) =>{
    var roomName = "default";

    if(model.userData.hasOwnProperty("Room")){
      roomName = model.userData.Room;
    }

    if(!this.rooms.hasOwnProperty(roomName)){
      this.rooms[roomName] = new THREE.Scene();
      this.rooms[roomName] = roomName;
    }

    this.rooms[roomName].add(model);
  }

  SetActiveScene = (name) => {
    if(!this.rooms.hasOwnProperty(name)){
      console.warn(`Scene with Name:"${name}" does not exist`);
      return false;
    }


    if(this.currentScene === name){
      console.warn(`Scene with Name:"${name}" is already current Scene`);
      return false;
    }

    this.context.Scene = this.rooms[name];
    this.activeScene = this.rooms[name].name;
  }
}

export {SceneController};
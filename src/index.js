var exports = {"__esModule": true};

import * as THREE from 'three';
import { Renderer } from "./Renderer.js";
import { Update } from './Update.js';
import { Loader } from './Loader.js';
import { CustomTextureLoader } from './CustomTextureLoader.js';
import { Events } from './Events.js';
import { Camera } from './Camera.js';
import { Controls } from './Controls.js';
import {AnimationMixer} from 'three';
import StatClass from './StatClass';

class webXRScene{
  constructor(elementID){
    this.Events = new Events(this);


    this.Events.registerEvent("OnMount");

    this.Mixer = new AnimationMixer();
    this.Renderer = new Renderer(elementID,this);
    this.Loader = new Loader(this);
    this.CustomTextureLoader = new CustomTextureLoader(this);
    this.Update = new Update(this);
    this.Scene = new THREE.Scene();

    //this.Scene = new SceneController(this);
    //SceneController.rooms (IRoom)
    //{AddToSCene(model) => scene exists in room? => model.props.ownProperty.room == room.Name => room.add(model)}
    //this.xr.SwitchScene(this.currentRoom)
    //{check currentroom, transition, camera übergabe??, setzte camerainstance in renderer }.then{this.currentRoom = this.rooms.House;}
    //SceneControoler.SetSCene(
    //SceneControoler.context.Scene = SceneControoler.currentScene)

    

    this.Camera = new Camera(this);

    this.Controls = new Controls(this);

    this.Stats  = new StatClass(this);

    this.Events.dispatchEvent("OnMount");
  }
}
export default webXRScene;
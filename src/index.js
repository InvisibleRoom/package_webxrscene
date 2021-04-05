var exports = {"__esModule": true};

import * as THREE from 'three';
import { Renderer } from "./Renderer.js";
import { CSSRenderer } from "./CSSRenderer.js";
import { Update } from './Update.js';
import { Loader } from './Loader.js';
import { CustomTextureLoader } from './CustomTextureLoader.js';
import { Events } from './Events.js';
import { Camera } from './Camera.js';
import { Controls } from './Controls.js';
import {AnimationMixer} from 'three';
import {SceneController} from './SceneController.js';
import {CSSSceneController} from './CSSSceneController.js';
import StatClass from './StatClass';

class webXRScene{
  constructor(elementID){
    this.Events = new Events(this);

    this.Events.registerEvent("OnMount");

    this.Mixer = new AnimationMixer();
    this.Renderer = new Renderer(elementID,this);
    
    //CSS Rendering
    this.CSSScene = null;
    this.CSSRenderer = new CSSRenderer(elementID,this);
    
    this.Loader = new Loader(this);
    this.CustomTextureLoader = new CustomTextureLoader(this);
    this.Update = new Update(this);
    
    this.Scene = null; // wird durch den SceneController gesetzt => vorerst
    this.SceneController = new SceneController(this);
    this.CSSSceneController = new CSSSceneController(this);

    //this.Scene = new SceneController(this);
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
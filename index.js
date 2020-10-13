var exports = {"__esModule": true};

import * as THREE from 'three';
import { Renderer } from './src/Renderer.js';
import { Update } from './src/Update.js';
import { Loader } from './src/Loader.js';
import { Events } from './src/Events.js';
import { Camera } from './src/Camera.js';
import { Controls } from './src/Controls.js';
import {AnimationMixer} from 'three';


class webXRScene{
  constructor(elementID){
    this.Events = new Events(this);
    this.Mixer = new AnimationMixer();
    this.Renderer = new Renderer(elementID,this);
    this.Loader = new Loader(this);
    this.Update = new Update(this);

    this.Scene = new THREE.Scene();

    this.Camera = new Camera(this);

    this.Controls = new Controls(this);
    
  }
}
export {webXRScene};
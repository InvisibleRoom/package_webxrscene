var exports = {"__esModule": true};

import * as THREE from 'three';
import { Renderer } from "./Renderer";
import { Update } from './Update';
import { Loader } from './Loader';
import { Events } from './Events';
import { Camera } from './Camera';
import { Controls } from './Controls';
import {AnimationMixer} from 'three';
import StatClass from './StatClass';

class webXRScene{
  constructor(elementID){
    this.Events = new Events(this);


    this.Events.registerEvent("OnMount");

    this.Mixer = new AnimationMixer();
    this.Renderer = new Renderer(elementID,this);
    this.Loader = new Loader(this);
    this.Update = new Update(this);

    this.Scene = new THREE.Scene();

    this.Camera = new Camera(this);

    this.Controls = new Controls(this);

    this.Stats  = new StatClass(this);

    this.Events.dispatchEvent("OnMount");
  }
}
export default webXRScene;
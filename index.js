var exports = {"__esModule": true};

import { Renderer } from './src/Renderer.js';
import { Update } from './src/Update.js';
import { Loader } from './src/Loader.js';
import { Events } from './src/Events.js';
import {AnimationMixer} from 'three';


class webXRScene{
  constructor(elementID){
    this.Events = new Events(this);
    this.Mixer = new AnimationMixer();
    this.Renderer = new Renderer(elementID,this);
    this.Loader = new Loader(this);
    this.Update = new Update(this);

  }
}
export {webXRScene};
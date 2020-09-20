import {PerspectiveCamera} from 'three';
class Camera {

  constructor(){
    this.instance = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.instance.position.z = 5;
  }

}

export {Camera};
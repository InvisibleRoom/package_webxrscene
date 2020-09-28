import {PerspectiveCamera} from 'three';
class Camera {

  constructor(){
    this.instance = new PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.01, 100 );
  }

  SetPosition(vector3){
    this.SetPosition({...vector3});
  }
  SetPosition(x,y,z){
    this.instance.position.set(x,y,z);
  }
}

export {Camera};
import {PerspectiveCamera} from 'three';
class Camera {

  constructor(){
    this.instance = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.instance.position.z = 5;
  }

  SetPosition(vector3){
    this.SetPosition({...vector3});
  }
  SetPosition(x,y,z){
    this.instance.position.set(x,y,z);
  }
}

export {Camera};
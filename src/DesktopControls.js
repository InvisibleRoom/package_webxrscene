import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

class DesktopControls {
  constructor(camera,domElement){
    this.instance = new OrbitControls(camera,domElement);
  }
}

export {DesktopControls};
import {PerspectiveCamera, Vector3} from 'three';
import ICamera from './ICamera';


export default class IR_PerspectiveCamera implements ICamera{
  instance = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 100);

  constructor(props? : {fov?: number | undefined, aspect?: number | undefined, near?: number | undefined, far?: number | undefined}){
    window.addEventListener("resize", this.Resize, false);
  }

  SetPosition(position: Vector3){
    this.instance.position.set(position.x,position.y,position.z);
  }
  SetTarget(target: Vector3){
    this.instance.lookAt(target.x,target.y,target.z);
  }

  GetPosition(){
    return this.instance.position;
  }
  GetTarget(){
    const dirVector = new Vector3();
      this.instance.getWorldDirection(dirVector);

    return dirVector;
  }

  Resize = () =>{
    this.instance.aspect = window.innerWidth / window.innerHeight;
    this.instance.updateProjectionMatrix();
  }

  GetActiveCamera(){
    return this.instance;
  }
}
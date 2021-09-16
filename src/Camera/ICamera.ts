import { Camera, Vector3 } from "three";

export default interface ICamera {
  instance: Camera,
  Resize: ()=>void
  GetActiveCamera : () => Camera
  SetPosition: (position:Vector3)=>void
  SetTarget: (target:Vector3)=>void
  GetPosition: ()=>Vector3
  GetTarget: ()=>Vector3
}
import { EventDispatcher, Vector3 } from "three";
import ICamera from "../Camera/ICamera";

export default interface IControls{
  instance: EventDispatcher
  camera: ICamera
  SetPosition: (position:Vector3)=>void
  SetTarget: (target:Vector3)=>void
  
  GetPosition: ()=>Vector3
  GetTarget: ()=>Vector3
}
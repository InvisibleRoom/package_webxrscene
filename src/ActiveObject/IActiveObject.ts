import { Object3D } from "three";
import IXRWorld from "../World/IXRWorld";

interface IActiveObject{
  object:Object3D
  world: IXRWorld
  selected : { [key: string]: { [key: string]: boolean } }

  OnHover:(index:number, event: any)=>void
  OnHoverEnd:(index:number, event: any) => void

  OnSelectStart:(index:number, event:any)=>void
  OnSelectEnd:(index:number, event:any)=>void

  AddToScene:(sceneName?:string) => void
  RemoveFromScene:(sceneName?:string) => void
}

export default IActiveObject;
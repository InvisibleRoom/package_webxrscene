import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface IMeshLoader{
  instance : GLTFLoader
  dracoLoader : DRACOLoader
  LoadMultiple: (stack:{[name:string] : { [url:string] : string }}, OnProgress?:(totalLoadPercentage:number,loadEvent:any)=>void)=>Promise<{[name:string] : {progress:number,gltf:GLTF | null}}>
  Load(url:string, OnProgress?:(progress:number)=>void):Promise<GLTF | PromiseLike<void>>
} 

export {IMeshLoader}
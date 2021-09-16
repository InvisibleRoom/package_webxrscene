import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';


import Promise from 'promise-polyfill';
import { IMeshLoader } from './IMeshLoader';



class MeshLoader implements IMeshLoader{
  instance = new GLTFLoader();
  dracoLoader = new DRACOLoader();
  constructor(){
    this.dracoLoader.setDecoderConfig({ type: 'js' });
    this.dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'); //'./gltf/'
    this.instance.setDRACOLoader( this.dracoLoader );

  }
  

  LoadMultiple(stack:{[name:string] : { [url:string] : string }}, OnProgress?:(totalLoadPercentage:number, loadEvent:any)=>void):Promise<{[name:string] : {progress:number,gltf:GLTF | null}}>{
    const progress = 0;
    const completeProgress = 0;
    const maxProgress = Object.keys(stack).length;

    const lib:{[name:string]: {
      progress:number,
      gltf:GLTF | null
    }} = {};

    Object.keys(stack).map((stackElement:string)=>{
      lib[stackElement] = {
        progress : 0,
        gltf : null
      }
    })

    const loadArray = Object.keys(stack).map((stackElement:string)=>{
      

      return this.Load(stack[stackElement].url, (progress)=>{

        lib[stackElement].progress = progress;

        //calculate total load Percentage
        let total = 0;        
        Object.keys(lib).map((keyName)=>{ total += lib[keyName].progress });

        OnProgress ? OnProgress(total / maxProgress, lib) : null;

      }).then((loadedElement)=>{
        lib[stackElement].progress = 1;
        lib[stackElement].gltf = loadedElement;

        return lib;
      });

    });

    return Promise.all(loadArray).then(()=>{
      return lib;
    });


  }

  Load(url: string, OnProgress?: (progress: number) => void): Promise<GLTF> {

    return new Promise((resolve,reject)=>{
      
      this.instance.load(url, (gltfScene: GLTF)=>{
          resolve(gltfScene);
        },(progress:ProgressEvent<EventTarget>)=>{
          OnProgress ? OnProgress(progress.loaded / progress.total) : null;
        },(err:ErrorEvent)=>{
          reject(err);
        })
      
    });
    
  }

}

export default MeshLoader;
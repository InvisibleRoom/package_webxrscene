import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import {AnimationMixer} from 'three';
import Promise from 'promise-polyfill';
import {Events} from './Events';
import mainConfig from '../../../main.config';

class Loader {
  constructor(context){
    this.context = context;
    this.instance = new GLTFLoader();

    this.context.Events.registerEvent('OnLoadStack');
    this.context.Events.registerEvent('OnLoad');
    this.context.Events.registerEvent('OnProgress');
    
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath( mainConfig.PAGE_BASE_URL+ "/gltf/");
    this.instance.setDRACOLoader( this.dracoLoader );
  }


  loadStack(stack){
    
    return new Promise((resolve,reject)=>{

      let promises = stack.stack.map((s)=>{
        return this.load(s, stack.OnProgress).then((m)=>{
          return m;
        });
      });


      Promise.all(promises).then((el)=>{

        console.log("Loader.js OnLoadStack " , el);
        let library = {};
        el.map((obj)=>{
          library[obj.name] = obj;
        });

        this.context.Events.dispatchEvent('OnLoadStack',library);
        resolve(library);

        return library;
      }).catch(error =>{
        console.log(error);

        reject(error);
      });
    });
  }
  
  load = (arg, OnProgress) => {
    let {name, url,progress} = arg; 


    return new Promise((resolve,reject)=>{

      this.instance.load(url,(gltf)=>{

        gltf.name = name;
        
        console.log("Loader.js load " , gltf);
        resolve(gltf);

      },(_step)=>{
        const total = _step.total == Infinity ? 1  : _step.total; 
        const percentage = _step.loaded / total;
        OnProgress({
          name : name,
          isLoading:( percentage == 1 ? false : true), 
          progress: percentage
        });
      },(error)=>{
        console.log(error);
        reject(error);
      });
    });
  }
}


export {Loader};
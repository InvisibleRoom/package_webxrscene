import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import {AnimationMixer} from 'three';
import Promise from 'promise-polyfill';
import {Events} from './Events';

class Loader {
  constructor(context){
    this.context = context;
    this.instance = new GLTFLoader();

    this.context.Events.registerEvent('OnLoadStack');
    this.context.Events.registerEvent('OnLoad');
    this.context.Events.registerEvent('OnProgress');
    
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath("./gltf/");
    this.instance.setDRACOLoader( this.dracoLoader );
  }


  loadStack(stack){
    
    return new Promise((resolve,reject)=>{

      let promises = stack.stack.map((s)=>{
        return this.load(s, stack.OnProgress).then((m)=>{
          return m;
        }).catch(error => console.log(error, s));
      });


      Promise.all(promises).then((el)=>{

        let library = {};
        el.map((obj)=>{
          library[obj.name] = obj;
        });

        //this.context.Events.dispatchEvent('OnLoadStack',library);
        resolve(library);
      }).catch(error =>{
        console.log(error);

        reject(error);
      });
    });
  }
  
  load = (arg, OnProgress) => {
    let {name, url,progress} = arg; 

    // const OnLoad = (opt) => {

    //   if(opt.name === name){
        
    //     console.log("opt" , opt);
    //     this.context.Events.removeEventListener("OnProgress", progress);
    //     this.context.Events.removeEventListener("OnLoad", this.OnLoad);
        
    //   }
    // }

    // if(typeof(progress) != "undefined"){
    //   console.log(progress);
    //   this.context.Events.addEventListener("OnProgress", progress);
    //   this.context.Events.addEventListener("OnLoad",OnLoad);

    // }

    return new Promise((resolve,reject)=>{

      this.instance.load(url,(gltf)=>{

        gltf.name = name;
        
        resolve(gltf);
      },(_step)=>{
        const total = _step.total == Infinity ? 1  : _step.total; 
        const percentage = _step.loaded / total;
        console.log(total,percentage);
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
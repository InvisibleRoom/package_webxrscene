import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import Promise from 'promise-polyfill';
import {Events} from './Events';
class Loader {
  constructor(context){
    this.context = context;
    this.instance = new GLTFLoader();

    this.context.Events.registerEvent('OnLoadStack');
    this.context.Events.registerEvent('OnLoad');
    
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
    this.instance.setDRACOLoader( this.dracoLoader );
    this.load = this.load.bind(this);
  }
  loadStack(stack){
    function progress(progress){
      stack.progress(progress, stack);
    }
    return new Promise((resolve,reject)=>{
      let promises = stack.stack.map((s,index)=>{
        return this.load(Object.assign(s,{
          progress : stack.progress
        }));
      });    
      Promise.all(promises).then((el)=>{
        let library = {};
        
        el.map((obj,index)=>{
          library[obj.name] = obj;
        });
        this.context.Events.dispatchEvent('OnLoadStack',library);
        resolve(library);
      }).catch(reject);
    });
  }
  load(...arg){
    let {name, url,progress} = arg[0]; 
    return new Promise((resolve,reject)=>{
      this.instance.load(url,(gltf)=>{
        gltf.name = name;
        resolve(gltf);
        this.context.Events.dispatchEvent('OnLoad',{name: name, scene : gltf.scene});
      },(_step)=>{
        if(typeof(progress) != "undefined"){
          progress({progress: _step.loaded / _step.total,name : name });
        }
      },reject);
    });
  }
}


export {Loader};
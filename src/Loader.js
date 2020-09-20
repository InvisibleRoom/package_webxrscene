import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import Promise from 'promise-polyfill';
import {Events} from './Events';
class Loader {
  constructor(){
    this.instance = new GLTFLoader();

    this.events = new Events();
    this.events.registerEvent('OnLoadStack');
    this.events.registerEvent('OnLoad');
    
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
    this.instance.setDRACOLoader( this.dracoLoader );
    this.load = this.load.bind(this);
  }
  loadStack(stack){
    function progress(progress){
      stack.progress(progress, stack);
    }
    console.log(stack);
    return new Promise((resolve,reject)=>{
      let promises = stack.stack.map((s,index)=>{
        return this.load(Object.assign(s,{
          progress : stack.progress
        }));
      });    
      Promise.all(promises).then((el)=>{
        console.log("all" , el);
        let library = {};
        
        el.map((obj,index)=>{
          library[obj.name] = obj;
        });
        this.events.dispatchEvent('OnLoadStack',library);
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
        this.events.dispatchEvent('OnLoad',{name: name, scene : gltf.scene});
      },(_step)=>{
        if(typeof(progress) != "undefined"){
          progress({progress: _step.loaded / _step.total,name : name });
        }
      },reject);
    });
  }
}


export {Loader};
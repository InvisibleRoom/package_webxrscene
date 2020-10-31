import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import {AnimationMixer} from 'three';
import Promise from 'promise-polyfill';
import {Events} from './Events';
import * as THREE from 'three';

class Loader {
  constructor(context){
    this.context = context;
    this.instance = new GLTFLoader();

    this.context.Events.registerEvent('OnLoadStack');
    this.context.Events.registerEvent('OnLoad');
    this.context.Events.registerEvent('OnProgress');
    
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
    this.instance.setDRACOLoader( this.dracoLoader );
    this.load = this.load.bind(this);
  }
  loadStack(stack){
    
    return new Promise((resolve,reject)=>{
      let promises = stack.stack.map((s,index)=>{

        console.log(s);

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

  load(arg){
   console.log(arg);
    let {name, url,progress} = arg; 


    if(typeof(progress) != "undefined"){
      this.context.Events.addEventListener("OnProgress",progress);
      this.context.Events.addEventListener("OnLoad",()=>{
        this.context.Events.removeEventListener("OnProgress", progress);
        this.context.Events.removeEventListener("OnLoad", progress);
      });
    }

    return new Promise((resolve,reject)=>{
      this.instance.load(url,(gltf)=>{
        gltf.name = name;
        gltf.mixer = new AnimationMixer(gltf.scene);

        gltf.actions = {};
        gltf.animations.map((anim,index)=>{
          let clipAction = gltf.mixer.clipAction( anim );
              clipAction.clampWhenFinished = true;
              clipAction.loop = THREE.LoopOnce;
              clipAction.name = anim.name;
          gltf.actions[anim.name] = clipAction;

        });
        this.context.Events.addEventListener("OnAnimationLoop",()=>{
          gltf.mixer.update(this.context.Renderer.clock.getDelta());
        })

        resolve(gltf);
        this.context.Events.dispatchEvent('OnLoad',{name: name, scene : gltf.scene});
      },(_step)=>{
        this.context.Events.dispatchEvent('OnProgress',{isLoading:( _step.loaded / _step.total == 1 ? false : true), progress: _step.loaded / _step.total,name : name });
      },reject);
    });
  }
}


export {Loader};
import * as THREE from 'three';
import {CSS3DRenderer} from 'three/examples/jsm/renderers/CSS3DRenderer';


class CSSRenderer {
  
  constructor(id = "app", context){
    this.context = context;
    this.clock = new THREE.Clock();

    this.scaleFactor = 100;
    
    this.instance = new CSS3DRenderer();
    this.dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
    this.size = new THREE.Vector2(window.innerWidth, window.innerHeight);

    this.instance.setSize(this.size.x,this.size.y);

    this.instance.domElement.style.width = window.innerWidth + "px";    
    this.instance.domElement.style.height = window.innerHeight + "px";

    this.instance.domElement.classList.add("css-renderer");
    //this.instance.setAnimationLoop(this.AnimationLoop);

    this.domElement = document.getElementById(id);

    if(typeof(this.domElement) == "undefined"){console.logwarn("couldn't find an element with id:"+id);}

    this.domElement.appendChild( this.instance.domElement );

    this.instance.domElement.style.position = "absolute";
    this.instance.domElement.style.top = "0";
    this.instance.domElement.style.left = "0";
    this.instance.domElement.style.right = "0";
    this.instance.domElement.style.bottom = "0";
    this.instance.domElement.style.zIndex = "9999";
    this.instance.domElement.style.pointerEvents = "none";
    
    this.context.Events.addEventListener("OnAnimationLoop", this.AnimationLoop);
    window.addEventListener("resize", this.Resize);

  }

  SetActiveCamera = (camera) =>{
    //console.log("this.postprocessing", camera, this.postprocessing, this.renderPass);
  }

  AnimationLoop = () => {

    if(this.size.x === 0 || this.size.y === 0){
      this.Resize();
    }
    
    this.instance.render(this.context.CSSSceneController.activeScene, this.context.Camera.instance);  
  }

  Resize = () =>{

    var size = this.domElement.getBoundingClientRect();
    this.size = new THREE.Vector2(size.width, size.height );
    this.instance.setSize(this.size.x,this.size.y);

    this.instance.domElement.style.width = window.innerWidth + "px";    
    this.instance.domElement.style.height = window.innerHeight + "px";

    //this.instance.domElement.style.perspective =parseFloat(this.instance.domElement.style.perspective) * this.dpr;

    this.context.Camera.instance.aspect = this.size.x / this.size.y;
    this.context.Camera.instance.updateProjectionMatrix();
    

  }

}

export {CSSRenderer};

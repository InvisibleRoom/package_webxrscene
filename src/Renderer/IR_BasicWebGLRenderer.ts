import { WebGLRenderer } from 'three';
import IRenderer from './IRenderer';

export default class IR_BasicWebGLRenderer implements IRenderer{
  instance: WebGLRenderer = new WebGLRenderer({
    antialias:true
  });
  constructor(id:string){
    this.instance.domElement.style.position = "fixed";
    this.instance.domElement.style.top = "0";
    this.instance.domElement.style.left = "0";
    this.instance.domElement.style.right = "0";
    this.instance.domElement.style.bottom = "0";
    this.instance.domElement.style.zIndex = "0";
    this.instance.autoClear = false;

    this.instance.setClearColor( 0x000000, 0 );

    this.instance.setSize( window.innerWidth, window.innerHeight );
    document.getElementById(id)?.appendChild(this.instance.domElement);

    this.Resize();
    window.addEventListener("resize", this.Resize,false);
  }

  Resize = () =>{
    this.instance.setSize( window.innerWidth, window.innerHeight );
  }
  
}
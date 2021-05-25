import { Euler, Object3D, Quaternion, Vector3, Matrix4 } from 'three';
import { Utils } from './Utils';

class StaticControls {
  minPolarAngle = 0;
  maxPolarAngle =  Math.PI;
  PI_2 = Math.PI / 2;
  enabled = true;
  target = new Vector3();
  movement = {
    x : 0,
    y : 0
  }
  damping = .92;
  threshold = .05;
  speed = 0.001;

  rotationMatrix = new Matrix4();
  targetQuaternion = new Quaternion();
  
  constructor(camera,domElement, context = null){

    this.object = camera;
    this.domElement = domElement;
    this.mousedown = false;
    this.context = context;

    this.camPos = new Vector3().copy(this.object.position);
    this.camShift = new Vector3();


    this.bind();
  }
  
  bind = ()=>{
    this.domElement.ownerDocument.addEventListener( 'mousemove', this.onMouseMove, false );
    this.domElement.ownerDocument.addEventListener( 'mousedown', this.onMouseDown, false );
    window.addEventListener( 'mouseup', this.onMouseUp, false );  
  }

  unbind = ()=>{
    this.domElement.ownerDocument.removeEventListener( 'mousemove', this.onMouseMove, false );
    this.domElement.ownerDocument.removeEventListener( 'mousedown', this.onMouseDown, false );
    window.removeEventListener( 'mouseup', this.onMouseUp, false );
  }

  update = (t)=>{
    if( typeof(t) === "undefined" ){return;}
    
    var clock = t.getDelta();
    this.camShift.set(
    	Math.cos(clock + (Math.PI * 0.5)),
      Math.sin(clock),
      Math.cos(clock + (Math.PI * 0.5))
    ).multiplyScalar(0.2);
    this.object.position.addVectors(this.camPos, this.camShift);

   // console.log(this.context);
    this.context.Controls.Desktop.orbit.update();
    //controls.update();


    return;


    var angle  = this.targetQuaternion.angleTo(this.object.quaternion);

    console.log("update static Controls", this.object);


    if(((Math.abs(this.movement.x) + Math.abs(this.movement.y)) < this.threshold) && angle > 0.0001 ) 
    { 
      return;
    }

    var euler = new Euler( 0, 0, 0, 'YXZ' );
      
    euler.setFromQuaternion( this.object.quaternion );
  
    euler.y -= this.movement.x * this.speed;
    euler.x -= this.movement.y * this.speed;
  
    euler.x = Math.max( this.PI_2 - this.maxPolarAngle, Math.min( this.PI_2 - this.minPolarAngle, euler.x ) );

    this.object.quaternion.setFromEuler( euler );

    this.movement.x *= this.damping;
    this.movement.y *= this.damping;
  }

  onMouseDown = (event) =>{
    if(event.target.classList.contains("sprungmarke")){
      return;
    }
    
    this.mousedown = true;
  }
  onMouseUp = (event) =>{
    this.mousedown = false;
  }

  onMouseMove = (event) =>{



    if(!this.enabled) {return;} //!this.mousedown || 
    
      var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
      
      this.movement = {
        x : movementX,
        y : movementY
      }
      
      
  }
  
  SetActive(boolean){
    this.enabled = boolean;
    
    if(this.enabled){
      this.camPos = this.object.position.clone();
    }
  }
}

export {StaticControls};
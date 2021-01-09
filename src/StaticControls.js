import { Euler, Vector3 } from 'three';
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

  constructor(camera,domElement){

    this.camera = camera;
    this.domElement = domElement;
    this.mousedown = false;

    this.bind();
  }
  
  bind = ()=>{
    this.domElement.ownerDocument.addEventListener( 'mousemove', this.onMouseMove, false );
    this.domElement.ownerDocument.addEventListener( 'mousedown', this.onMouseDown, false );
    this.domElement.ownerDocument.addEventListener( 'mouseup', this.onMouseUp, false );  
  }

  unbind = ()=>{
    this.domElement.ownerDocument.removeEventListener( 'mousemove', this.onMouseMove, false );
    this.domElement.ownerDocument.removeEventListener( 'mousedown', this.onMouseDown, false );
    this.domElement.ownerDocument.removeEventListener( 'mouseup', this.onMouseUp, false );
  }

  update = ()=>{

    if((Math.abs(this.movement.x) + Math.abs(this.movement.y)) < this.threshold){return;}

    var euler = new Euler( 0, 0, 0, 'YXZ' );
      
    euler.setFromQuaternion( this.camera.quaternion );
  
    euler.y -= this.movement.x * this.speed;
    euler.x -= this.movement.y * this.speed;
  
    euler.x = Math.max( this.PI_2 - this.maxPolarAngle, Math.min( this.PI_2 - this.minPolarAngle, euler.x ) );

    this.camera.quaternion.setFromEuler( euler );

    this.movement.x *= this.damping;
    this.movement.y *= this.damping;


    
    var targetScreenPos = Utils.WorldToScreenPosition(this.target, this.camera, this.domElement);
    
    if(
      this.movement.x !== targetScreenPos.x ||
      this.movement.y !== targetScreenPos.y
      ){
        var diffX = targetScreenPos.x - this.movement.x;
        var diffY = targetScreenPos.y - this.movement.y;
        
        // this.movement.x += diffX * .1;
        // this.movement.y += diffY * .1;
        //console.log(targetScreenPos, this.movement, diffX , diffY);
        //transition zu Target Position
        //this.camera.lookAt(this.target);

    }
  }

  onMouseDown = (event) =>{


    this.mousedown = true;
  }
  onMouseUp = (event) =>{
    this.mousedown = false;
  }

  onMouseMove = (event) =>{
    if(!this.mousedown || !this.enabled) {return;}
    
      var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
      
      this.movement = {
        x : movementX,
        y : movementY
      }
      
      
  }
  
}

export {StaticControls};
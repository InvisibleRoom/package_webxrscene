import {Mesh,SpriteMaterial,Sprite,CanvasTexture, Raycaster,MeshBasicMaterial,Geometry ,BoxBufferGeometry,Matrix4, Vector3, Color} from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

import {MeshLine, MeshLineMaterial} from '../../Scene/meshline';


class VRController {

  constructor(context){
    this.context = context;
    this.controllers = [];
    this.controllerGrips = [];
    this.raycaster = new Raycaster();

    this.controllerModelFactory = new XRControllerModelFactory();
    this.dummyMatrix = new Matrix4();


    const lineMat = new MeshLineMaterial({
      color: new Color(0xF38D2F),
      lineWidth: .01,
      sizeAttenuation :1,
      useAlphaMap: 1,
      alphaMap : new CanvasTexture( this.GetRayTexture() ),
    });


    /////////////////
    // Point helper
    /////////////////

    this.spriteMaterial = new SpriteMaterial({
      color:  0xF38D2F,
      map: new CanvasTexture( this.GetPointerTexture() ),
      sizeAttenuation: false,
      //depthTest: false
    });

    this.pointer = new Sprite( this.spriteMaterial );

    this.pointer.scale.set(0.015, 0.015, 1)
    this.pointer.renderOrder = Infinity;

    ////////////////
    // Controllers
    ////////////////

    this.controller1 = this.context.Renderer.instance.xr.getController( 0 );
    this.controller2 = this.context.Renderer.instance.xr.getController( 1 );

    this.controller1.name = "controller-right";
    this.controller2.name = "controller-left";

    this.controllerGrip1 = this.context.Renderer.instance.xr.getControllerGrip( 0 );
    this.controllerGrip2 = this.context.Renderer.instance.xr.getControllerGrip( 1 );

    if ( this.controller1 ) this.controllers.push( this.controller1 );
    if ( this.controller2 ) this.controllers.push( this.controller2 );

    if ( this.controllerGrip1 ) this.controllerGrips.push( this.controllerGrip1 );
    if ( this.controllerGrip2 ) this.controllerGrips.push( this.controllerGrip2 );

    this.controllers.forEach( (controller)=> {
      
      const rayLine = new MeshLine();
      rayLine.setPoints([
        new Vector3(0,0,0),
        new Vector3(0,0,-1),
      ]);
      const ray = new Mesh( rayLine, lineMat );
      
      //const ray = this.linesHelper.clone();
      const point = this.pointer.clone();

      controller.add( ray, point );
      controller.ray = ray;
      controller.line = rayLine;
      controller.point = point;
      controller.userData.noClip = true;

      // var renderOrder = 1;
      // controller.renderOrder = renderOrder;
      
      // controller.children.map((child)=>{
      //   child.userData.noClip = true;
      //   child.renderOrder = renderOrder;
      // })
    });

    this.controllerGrips.forEach( (controllerGrip)=> {
      controllerGrip.add( this.controllerModelFactory.createControllerModel( controllerGrip ) );
    });

  }
	// Set the passed ray to match the given controller pointing direction

	SetFromController( controllerID, ray ) {

		const controller = this.controllers[ controllerID ];

		// Position the intersection ray

		this.dummyMatrix.identity().extractRotation( controller.matrixWorld );

		ray.origin.setFromMatrixPosition( controller.matrixWorld );
		ray.direction.set( 0, 0, - 1 ).applyMatrix4( this.dummyMatrix );

	}

	// Position the chosen controller's pointer at the given point in space.
	// Should be called after raycaster.intersectObject() found an intersection point.

	SetPointerAt( controllerID, vec ) {

		const controller = this.controllers[ controllerID ];
		const localVec = controller.worldToLocal( vec );

		controller.point.position.copy( localVec );
		controller.point.visible = true;


    var geometry = controller.ray.geometry.setFromPoints([
      new Vector3(0,0,0),
      vec,
    ]);
    controller.line.setGeometry(geometry);
	}

  GetRayTexture() {

    var canvas = document.createElement( 'canvas' );
        canvas.width = 64;
        canvas.height = 64;

        var c = canvas.getContext("2d");

    var gradient = c.createLinearGradient(0, 0, 0, 64);
        gradient.addColorStop(0, "black");
        gradient.addColorStop(1, "white");

        c.fillStyle = gradient;
        c.fillRect(0, 0, 64, 64);

        return canvas;

  }
  GetPointerTexture() {

    var canvas = document.createElement( 'canvas' );
    canvas.width = 64;
    canvas.height = 64;

    var c = canvas.getContext("2d");

    c.beginPath();
    c.arc(32, 32, 29, 0, 2 * Math.PI);
    c.lineWidth = 5;
    c.stroke();
    c.fillStyle = "white";
    c.fill();

    return canvas;

  }
}

export {VRController};

// //////////////////////////////
// // CANVAS TEXTURE GENERATION
// //////////////////////////////

// // Generate the texture needed to make the intersection ray fade away

// function GetRayTexture() {

// 	var canvas = document.createElement( 'canvas' );
// 	canvas.width = 64;
// 	canvas.height = 64;

// 	var ctx = canvas.getContext("2d");

// 	var gradient = ctx.createLinearGradient(0, 0, 64, 0);
// 	gradient.addColorStop(0, "black");
// 	gradient.addColorStop(1, "white");

// 	ctx.fillStyle = gradient;
// 	ctx.fillRect(0, 0, 64, 64);

// 	return canvas;

// };

// // Generate the texture of the point helper sprite

// function GetPointerTexture() {

// 	var canvas = document.createElement( 'canvas' );
// 	canvas.width = 64;
// 	canvas.height = 64;

// 	var ctx = canvas.getContext("2d");

// 	ctx.beginPath();
// 	ctx.arc(32, 32, 29, 0, 2 * Math.PI);
// 	ctx.lineWidth = 5;
// 	ctx.stroke();
// 	ctx.fillStyle = "white";
// 	ctx.fill();

// 	return canvas;

// };

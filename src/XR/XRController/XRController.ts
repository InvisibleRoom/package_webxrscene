import IWorld from "../../World/IWorld";
import {XRControllerModelFactory} from "three/examples/jsm/webxr/XRControllerModelFactory";
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute, Group, Line, LineBasicMaterial, Matrix4, Mesh, MeshBasicMaterial, Object3D, Ray, Raycaster, RingGeometry } from "three";

class XRController{
  world:IWorld
  
  controllerModelFactory:XRControllerModelFactory = new XRControllerModelFactory();

  readonly activeObjects:Object3D[] = []


  constructor(world:IWorld){
    this.world = world;
  }

  AddInteractiveObject(obj:Object3D){
    this.activeObjects.push(obj);
  }
  
  RemoveInteractiveObject(obj:Object3D){
    const index = this.activeObjects.indexOf(obj);
    if(index != -1){
      this.activeObjects.splice(index,1);
    }
  }

  GetController = (index:number, OnSelectStart:(index:number,event:any)=>void | null,OnSelectEnd:(index:number, event:any)=>void | null,OnHover?:(index:number, event:any)=>void | null) =>{
    const controller = this.world.renderer.instance.xr.getController( index );
          controller.name = "ControllerGroup-" + index;

          controller.userData.matrix = new Matrix4();
          controller.userData.raycaster = new Raycaster();

    this.world.animationLoop.AddAnimationLoop(()=>{
      controller.userData.matrix.identity().extractRotation(controller.matrixWorld);
      controller.userData.raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
      controller.userData.raycaster.ray.direction.set(0,0,-1).applyMatrix4(controller.userData.matrix);
      controller.userData.intersections = [];

      controller.userData.intersections = controller.userData.raycaster.intersectObjects(this.activeObjects);

      OnHover ? OnHover(index, {
        type: "hover",
        data: null,
        target: controller
      }) : null;
    });
          
          controller.addEventListener( 'selectstart', (event)=>{
            controller.userData.isSelecting = true;
            
            console.log(event);
            OnSelectStart ? OnSelectStart(index, event) : null;
          });
          controller.addEventListener( 'selectend', (event)=>{
            controller.userData.isSelecting = false;
            OnSelectEnd ? OnSelectEnd(index, event) : null;
          });
          controller.addEventListener( 'connected', ( event ) => {
            controller.add( this.buildController(index, event.data ) );
          });

          controller.addEventListener( 'disconnected', () => {
            controller.remove( controller.children[ 0 ] );
          });

          this.world.sceneController.AddToScene( controller );
    return controller;
  }



  buildController(index:number, data:any ):Object3D {

    let geometry, material;
    let mesh = new Object3D();

    switch ( data.targetRayMode ) {

      case 'tracked-pointer':

        geometry = new BufferGeometry();
        geometry.setAttribute( 'position', new Float32BufferAttribute( [ 0, 0, 0, 0, 0, - 1 ], 3 ) );
        geometry.setAttribute( 'color', new Float32BufferAttribute( [ 0.5, 0.5, 0.5, 0, 0, 0 ], 3 ) );

        material = new LineBasicMaterial( { vertexColors: true, blending: AdditiveBlending } );

        mesh = new Line( geometry, material );
        
      break;
      case 'gaze':

        geometry = new RingGeometry( 0.02, 0.04, 32 ).translate( 0, 0, - 1 );
        material = new MeshBasicMaterial( { opacity: 0.5, transparent: true } );
        mesh = new Mesh( geometry, material );
      break;
    }

    mesh.name = "Controller-" + index;
    return mesh;
  }

}

export default XRController;
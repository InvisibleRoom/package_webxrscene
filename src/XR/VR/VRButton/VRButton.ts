import IRenderer from "../../../Renderer/IRenderer";
import IWorld from "../../../World/IWorld";
import IXRButton from "../../IXRButton";



class VRButton implements IXRButton{
  world:IWorld
  currentSession: any = null
  navigator:any = window.navigator

  constructor(world:IWorld){

    this.world = world;
    
  }
  
  IsSupported(): Promise<boolean>{
    return new Promise((resolve, reject)=>{
      
      if( "xr" in this.navigator === false ){ reject(false); }
      
      return this.navigator.xr.isSessionSupported( 'immersive-vr' ).then( ( supported:boolean ) => {
        
        resolve(supported);
        

        console.log("VR is :" , supported);
      });      
    });
  }

  Enable = (features = ['local-floor', 'bounded-floor', 'hand-tracking', 'layers']):Promise<any> => {

    console.log("features" , features);
    
    return this.navigator.xr.requestSession( 'immersive-vr',  { optionalFeatures: features } ).then( async (session:any)=>{
      this.currentSession = session;

      await this.world.renderer.instance.xr.setSession( this.currentSession );

      return session;
    });
  }

  Disable():Promise<boolean>{
    return new Promise((resolve, reject)=>{
      if(this.currentSession == null){ reject(false); }
      
      this.currentSession.end();

      this.currentSession = null;
      resolve(true);

    })
  }

}

export default VRButton;
import {Handy} from './Handy';

import { XRHandModelFactory } from './XRHandModelFactory.js';

import {Color} from 'three';


class VRHands {

  constructor(context){
    this.visible = true;
    this.initialized = false;
    this.context = context;
    this.context.Events.registerEvent("HandPoseChanged");

    
    
    const	handModelFactory = new XRHandModelFactory();

    var colors = {

        default: new Color( 0xFFFFFF ),//  White glove.
        left:    new Color( 0x00FF00 ),//  Green glove for left.
        right:   new Color( 0xFF0000 ) //  Red glove for right.
      }


      const [ hand0, hand1 ] = [ {}, {} ].map( ( hand, i ) => {


        hand = this.context.Renderer.instance.xr.getHand( i );

        

        hand.models = [

          handModelFactory.createHandModel( hand, 'boxes' ),
          handModelFactory.createHandModel( hand, 'spheres' ),
          handModelFactory.createHandModel( hand, 'mesh' )
        ]
        hand.modelIndex = 2
        hand.isDefaultColor = true

        //  This is what makes detecting hand poses easy!
        this.context.Controls.cameraHelper.attach( hand );
        Handy.makeHandy( hand );


        hand.addEventListener( 'connected', function( event ){

          hand.handedness = event.data.handedness;

          console.log("%c Hand is connected",  "background:#ff9800;font-weight:700;");
          //console.log(hand.models);
          

          hand.models.forEach( function( model ){

            hand.attach( model )
            model.visible = false
          })	
          hand.models[ hand.modelIndex ].visible = true
        })


        hand.addEventListener( 'pose changed', ( event ) => {

          this.context.Events.dispatchEvent("HandPoseChanged" , event);

        });

        hand.displayFrame.visible = this.visible;

        

        return hand;
      });


      this.context.Events.addEventListener("OnAnimationLoop", this.Animate);
  }

  Animate = (t)=>{
    //console.log("update hands");

    if(this.context.Controls.GetCurrentXRMode() == "VR" && this.initialized){
      //console.log("VR is enabled => update handy");

      Handy.update();
    }
  }
}

  export {VRHands};
import {Handy} from './Handy';

import { XRHandModelFactory } from './XRHandModelFactory.js';

import {Color} from 'three';


class VRHands {

  constructor(context){
    this.visible = true;
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

        console.log("Controls", hand , this.context);
        this.context.Controls.cameraHelper.add( hand );

        hand.models = [

          handModelFactory.createHandModel( hand, 'boxes' ),
          handModelFactory.createHandModel( hand, 'spheres' ),
          handModelFactory.createHandModel( hand, 'mesh' )
        ]
        hand.modelIndex = 2
        hand.isDefaultColor = true

        //  This is what makes detecting hand poses easy!

        Handy.makeHandy( hand );


        hand.addEventListener( 'connected', function( event ){

          hand.handedness = event.data.handedness;

          console.log("%c Hand is connected",  "background:#ff9800;font-weight:700;");
          console.log(hand.models);
          

          hand.models.forEach( function( model ){

            hand.add( model )
            model.visible = false
          })	
          hand.models[ hand.modelIndex ].visible = true
        })


        hand.addEventListener( 'pose changed', ( event ) => {

          this.context.Events.dispatchEvent("HandPoseChanged" , event);

        });

        hand.displayFrame.visible = this.visible;


        return hand
      })
  }
}

  export {VRHands};
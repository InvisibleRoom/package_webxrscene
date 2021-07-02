import {Scene, ShaderMaterial,BoxGeometry,Mesh, Color, Vector3} from 'three';

const vertexShader = '\
uniform vec3 color;\
varying vec3 pixelNormal;\
\
void main() {\
  \
  pixelNormal = normal;\
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\
  \
}';

const fragment = '\
uniform vec3 color;\
varying vec3 pixelNormal;\
\
void main( void ) {\
  \
  float shade = (\
      3.0 * pow ( abs ( pixelNormal.y ), 2.0 )\
    + 2.0 * pow ( abs ( pixelNormal.z ), 2.0 )\
    + 1.0 * pow ( abs ( pixelNormal.x ), 2.0 )\
  ) / 3.0;\
  \
  gl_FragColor = vec4( color * shade, 1.0 );\
  \
}';

const uniforms = {

	clipping: {
		color:        { type: "c",  value: new Color( 0x3d9ecb ) },
		clippingLow:  { type: "v3", value: new Vector3( 0, 0, 0 ) },
		clippingHigh: { type: "v3", value: new Vector3( 0, 0, 0 ) }
	},

	caps: {
		color: { type: "c", value: new Color( 0xf83610 ) }
	}

}

class CapsController{
  instance = new Scene();

  constructur(){
    
    let capsGeometry = new BoxGeometry(10,10,10);
    let capsMaterial = new ShaderMaterial( {
      uniforms:  uniforms.caps,
      vertexShader:   vertexShader,
      fragmentShader: fragment
    }) 
    this.capsMesh = new Mesh(capsGeometry, capsMaterial );
    this.instance.add(this.capsMesh);
  }
}

export {CapsController};
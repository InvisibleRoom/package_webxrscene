import { EffectComposer, Pass } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

interface IPass{
  composer: EffectComposer
  pass: Pass
  Resize: ()=>void
}

export {IPass}
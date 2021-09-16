import { XRFrame } from "three";


type AnimationCallbacks = (
  (time: number, frame?: XRFrame | undefined) => void
);

export default AnimationCallbacks;
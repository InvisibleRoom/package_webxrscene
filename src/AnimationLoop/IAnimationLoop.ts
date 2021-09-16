import { XRAnimationLoopCallback , XRFrame} from "three";
import AnimationCallbacks from "./TAnimationCallback";

export default interface IAnimationLoop {
  readonly callbacks: AnimationCallbacks[]
  OnAnimationLoop: (time: number, frame?: XRFrame | undefined)=>void
  AddAnimationLoop: (fn: XRAnimationLoopCallback | null)=>void
  RemoveAnimationLoop: (fn: XRAnimationLoopCallback | null)=>void
}
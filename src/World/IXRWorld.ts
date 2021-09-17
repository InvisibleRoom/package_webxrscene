import XRController from "../XR/XRController/XRController";
import IWorld from "./IWorld";


interface IXRWorld extends IWorld{
  xrController: XRController
}

export default IXRWorld;
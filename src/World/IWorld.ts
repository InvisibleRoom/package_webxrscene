import IAnimationLoop from '../AnimationLoop/IAnimationLoop';
import ICamera from '../Camera/ICamera';
import IControls from '../Controls/IControls';
import IRenderer from '../Renderer/IRenderer';
import ISceneController from '../SceneController/ISceneController';

export default interface IWorld {
  renderer: IRenderer;
  camera: ICamera;
  sceneController: ISceneController;
  controls : IControls | null;
  animationLoop: IAnimationLoop
};
 
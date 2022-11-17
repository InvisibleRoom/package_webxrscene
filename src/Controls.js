import { DesktopControls } from "./DesktopControls";
import { VRController } from "./VRController";
import { VRButton } from "./VRButton.js";
import { ARButton } from "./ARButton.js";
import { Raycaster, Group, Vector2, Vector3 } from "three";

import mainConfig from "../../../main.config";

class Controls {
	constructor(context) {
		/// REDUCE FPS FOR INTERSECTIONS
		this.frameCount = 0;
		this.fps = 10;
		this.fpsInterval = 1000 / this.fps;
		this.now = 0;
		this.then = Date.now();
		this.startTime = this.then;
		this.elapsed = 0;

		//console.log("CONTROLS", context);

		this.enabled = true;
		this.interactivityEnabled = true;
		this.context = context;
		this.currentControls = "Desktop";
		//Binding
		this.SetupMouse = this.SetupMouse.bind(this);
		this.getClientBox = this.getClientBox.bind(this);
		this.mousedown = this.mousedown.bind(this);
		this.mousemove = this.mousemove.bind(this);
		this.mouseup = this.mouseup.bind(this);
		this.touchstart = this.touchstart.bind(this);
		this.touchend = this.touchend.bind(this);

		this.size = this.getClientBox();
		(this.Desktop = new DesktopControls(
			context.Camera.instance,
			context.Renderer.instance.domElement,
			this.context
		)),
			(this.Update = this.Update.bind(this));
		this.SetPosition = this.SetPosition.bind(this);
		this.SetTarget = this.SetTarget.bind(this);
		this.GetTarget = this.GetTarget.bind(this);
		this.GetCameraPosition = this.GetCameraPosition.bind(this);

		this.cameraHelper = new Group();
		this.cameraHelper.name = "cameraHelper";
		this.context.Scene.add(this.cameraHelper);

		this.ui_cameraHelper = new Group();
		this.ui_cameraHelper.name = "ui_cameraHelper";
		this.context.SceneController.AddToScene("UI", this.ui_cameraHelper);

		this.ui3D_cameraHelper = new Group();
		this.ui3D_cameraHelper.name = "ui3D_cameraHelper";
		this.context.SceneController.AddToScene("UI_3D", this.ui3D_cameraHelper);

		this.controller_cameraHelper = new Group();
		this.controller_cameraHelper.name = "controller_cameraHelper";
		this.context.SceneController.AddToScene(
			"Controller",
			this.controller_cameraHelper
		);

		this.isClickEnabled = true;

		this.gamepad = null;
		this.gamepad2 = null;

		//array of active elements in scene
		this.ActiveObjects = [];
		this.raycaster = new Raycaster();

		this.SetupMouse();
		this.selectState = false;
		this.selectState2 = false;

		this.context.Events.registerEvent("gamepad");
		this.context.Events.registerEvent("gamepad2");

		this.context.Events.registerEvent("mouse-down");
		this.context.Events.registerEvent("mouse-up");
		this.context.Events.registerEvent("ui-mouse-down");
		this.context.Events.registerEvent("ui-hovered");
		this.context.Events.registerEvent("ui-idle");
		this.context.Events.registerEvent("OnChangeXRView");

		/** VR AR DOM ELEMENTS - Buttons */
		this.vrButton = VRButton.createButton(
			this.context.Renderer.instance,
			this.context
		);
		this.arButton = ARButton.createButton(
			this.context.Renderer.instance,
			this.context
		);

		this.SetupVR = this.SetupVR.bind(this);
		this.SetupAR = this.SetupAR.bind(this);

		this.context.Events.addEventListener("OnChangeXRView", (settings) => {
			this.currentControls = settings.xrMode;

			switch (settings.xrMode) {
				case "VR":
					this.SetupVR(settings);
					break;
				case "AR":
					this.SetupAR(settings);
					break;
				default:
					this.SetupDesktop(settings);
					break;
			}
		});

		this.GetARButton = this.GetARButton.bind(this);
		this.GetVRButton = this.GetVRButton.bind(this);

		/**VR Controls */
		this.vr_controller = new VRController(this.context);

		this.context.SceneController.AddToScene(
			"Controller",
			this.vr_controller.controllerGrips[0]
		);
		this.context.SceneController.AddToScene(
			"Controller",
			this.vr_controller.controllers[0]
		);

		this.context.SceneController.AddToScene(
			"Controller",
			this.vr_controller.controllerGrips[1]
		);
		this.context.SceneController.AddToScene(
			"Controller",
			this.vr_controller.controllers[1]
		);

		//CONTROLLER 1
		this.vr_controller.controllers[0].addEventListener("selectstart", () => {
			this.selectState = true;
			this.context.Events.dispatchEvent("mouse-down", {});
		});

		this.vr_controller.controllers[0].addEventListener("selectend", () => {
			this.selectState = false;
			this.context.Events.dispatchEvent("mouse-up", {});
		});

		this.vr_controller.controllers[0].addEventListener("connected", (e) => {
			this.gamepad = e.data.gamepad;
		});

		//CONTROLLER 2
		this.vr_controller.controllers[1].addEventListener("selectstart", () => {
			this.selectState2 = true;
			this.context.Events.dispatchEvent("mouse-down", {});
		});

		this.vr_controller.controllers[1].addEventListener("selectend", () => {
			this.selectState2 = false;
			this.context.Events.dispatchEvent("mouse-up", {});
		});
		this.vr_controller.controllers[1].addEventListener("connected", (e) => {
			this.gamepad2 = e.data.gamepad;
		});

		this.context.Events.addEventListener("OnAnimationLoop", this.Update);
	}

	SetClickDisabled = (clickDisabled) => {
		this.clickDisabled = clickDisabled;
	};

	SetupMouse(settings) {
		this.mouse = new Vector2();
		this.mouse.x = null;
		this.mouse.y = null;

		this.selectState = false;

		this.context.Renderer.instance.domElement.addEventListener(
			"pointermove",
			this.mousemove,
			false
		);
		this.context.Renderer.instance.domElement.addEventListener(
			"pointerdown",
			this.mousedown,
			false
		);
		this.context.Renderer.instance.domElement.addEventListener(
			"pointerup",
			this.mouseup,
			false
		);
		this.context.Renderer.instance.domElement.addEventListener(
			"touchstart",
			this.touchstart,
			false
		);
		this.context.Renderer.instance.domElement.addEventListener(
			"touchend",
			this.touchend,
			false
		);
		this.context.Renderer.instance.domElement.addEventListener(
			"resize",
			this.getClientBox,
			false
		);
	}
	getClientBox = () => {
		var size = {
			width:
				this.context.Renderer.instance.domElement.width *
				this.context.Renderer.factor,
			height:
				this.context.Renderer.instance.domElement.height *
				this.context.Renderer.factor,
			x: 0,
			y: 0,
		};

		this.size = size;
		return size;
	};
	GetCurrentXRMode() {
		return this.currentControls;
	}
	mousedown = () => {
		this.selectState = true;
	};
	mouseup = () => {
		this.selectState = false;
	};
	mousemove(e) {
		if (this.size.width === 0 || this.size.height === 0) {
			this.getClientBox();
		}

		this.mouse.x = (e.clientX / this.size.width) * 2 - 1;
		this.mouse.y = -(e.clientY / this.size.height) * 2 + 1;
	}
	touchstart(e) {
		this.selectState = true;
		this.mouse.x = (e.touches[0].clientX / this.size.width) * 2 - 1;
		this.mouse.y = -(e.touches[0].clientY / this.size.height) * 2 + 1;
	}
	touchend(e) {
		this.selectState = false;
		this.mouse.x = null;
		this.mouse.y = null;
	}
	//
	ChangeToDefault = () => {
		if (this.currentControls == "Desktop") {
			this.Desktop.ChangeToDefault();

			this.getClientBox();
		}
	};
	ChangeToStatic = () => {
		if (mainConfig.log.controls) {
			console.log("%c Change TO Static ", "background:#eee;");
		}
		if (this.currentControls == "Desktop") {
			this.Desktop.ChangeToStatic();
			this.getClientBox();
		}
	};
	ChangeScene = (sceneName) => {
		if (mainConfig.log.controls) {
			console.log(
				`%c Change Scene => Controls: ${sceneName}`,
				"background:#673ab7;color:#fff"
			);
		}
		this.context.Scene.attach(this.cameraHelper);
	};
	SetActiveCamera = (camera, sceneName) => {
		this.Desktop.SetActiveCamera(camera);

		this.getClientBox();
	};

	SetupDesktop(settings) {
		if (this.context.Camera.instance.parent.name == "cameraHelper") {
			var pos = this.context.Camera.instance.parent.position.clone();
			var rot = this.context.Camera.instance.parent.rotation.clone();

			this.cameraHelper.remove(this.context.Camera.instance);
			this.context.Scene.add(this.context.Camera.instance);
			this.context.Camera.instance.position = pos;
			this.context.Camera.instance.rotation = rot;
			this[this.currentControls].instance.update();
		}
		this.context.Renderer.instance.setClearColor(0xffffff, 0);
		this.getClientBox();
	}

	SetupVR(settings) {
		var vrCamera = this.context.Renderer.instance.xr.getCamera(
			this.context.Camera.instance
		);
		//this.cameraHelper.add(vrCamera);
		var _position = vrCamera.position.clone();
		this.cameraHelper.position.set(_position.x, _position.y, _position.z);
		this.ui_cameraHelper.position.set(_position.x, _position.y, _position.z);
		this.ui3D_cameraHelper.position.set(_position.x, _position.y, _position.z);
		this.controller_cameraHelper.position.set(
			_position.x,
			_position.y,
			_position.z
		);
		this.cameraHelper.attach(this.context.Camera.instance);

		this.Desktop.SetEnabled(false);
		//vrCamera.position.set(0,1.7,0);
		//this.cameraHelper.position.set(_position.x,_position.y,_position.z);

		this.context.Renderer.instance.autoClear = true;
		this.context.Renderer.instance.setClearColor(0xffffff, 1);

		this.vr_controller.controllerGrips.forEach((controller) => {
			controller.userData.noClip = true;
			this.controller_cameraHelper.add(controller);
		});
		this.vr_controller.controllers.forEach((controller) => {
			controller.userData.noClip = true;
			this.controller_cameraHelper.add(controller);
		});

		this.getClientBox();
	}

	SetupAR() {
		this.cameraHelper.add(this.context.Camera.instance);
		var _position = this.context.Camera.instance.position.clone();
		// this.context.Camera.instance.position.set(0,0,0);
		// this.cameraHelper.position.set(_position.x,_position.y,_position.z);
		this.context.Renderer.instance.setClearColor(0xffffff, 0);

		// this.vr_controller.controllerGrips.forEach((controller)=>{
		//
		// this.cameraHelper.attach(controller)
		// });
		// this.vr_controller.controllers.forEach((controller)=>{
		// this.cameraHelper.attach(controller);
		// });

		this.getClientBox();
	}

	GetVRButton() {
		return this.vrButton;
	}

	GetARButton() {
		return this.arButton;
	}
	Update(t) {
		if (mainConfig.savePositions) {
			if (this.gamepad != null) {
				this.context.Events.dispatchEvent("gamepad", this.gamepad);
			}

			if (this.gamepad2 != null) {
				this.context.Events.dispatchEvent("gamepad2", this.gamepad2);
			}
		}

		this.now = Date.now();
		this.elapsed = this.now - this.then;

		// if enough time has elapsed, draw the next frame

		if (this.elapsed > this.fpsInterval) {
			// Get ready for next frame by setting then=now, but also adjust for your
			// specified fpsInterval not being a multiple of RAF's interval (16.7ms)
			this.then = this.now - (this.elapsed % this.fpsInterval);

			// Put your drawing code here

			if (
				this.ActiveObjects.length > 0 &&
				this.interactivityEnabled &&
				!this.clickDisabled
			) {
				this.FindIntersection();
			}
		}

		// if(this.currentControls == "VR"){
		//   this.vr_controller.Update();
		// }

		if (this.currentControls == "Desktop") {
			this[this.currentControls].instance.enabled = this.enabled;
			this[this.currentControls].instance.update(t);
		}
	}
	GetPosition() {
		return this.context.Camera.instance.position;
	}

	SetPosition(x, y, z) {
		switch (this.currentControls) {
			case "Desktop":
				this.context.Camera.instance.position.set(x, y, z);
				break;
			case "VR":
				this.cameraHelper.position.set(x, y, z);
				this.ui_cameraHelper.position.set(x, y, z);
				this.ui3D_cameraHelper.position.set(x, y, z);
				this.controller_cameraHelper.position.set(x, y, z);
				break;

			default:
				break;
		}
	}

	TranslatePosition(x, y, z) {
		switch (this.currentControls) {
			case "Desktop":
				this.context.Camera.instance.position.add(new Vector3(x, y, z));
				break;
			case "VR":
				this.cameraHelper.position.add(new Vector3(x, y, z));
				this.ui_cameraHelper.position.add(new Vector3(x, y, z));
				this.ui3D_cameraHelper.position.add(new Vector3(x, y, z));
				this.controller_cameraHelper.position.add(new Vector3(x, y, z));
				break;

			default:
				break;
		}
	}

	TranslateRotation(x, y, z) {
		switch (this.currentControls) {
			case "Desktop":
				this.context.Camera.instance.rotation.x += x;
				break;
			case "VR":
				this.cameraHelper.rotation.x += x;
				this.cameraHelper.rotation.y += y;
				this.cameraHelper.rotation.z += z;

				this.ui_cameraHelper.rotation.x += x;
				this.ui_cameraHelper.rotation.y += y;
				this.ui_cameraHelper.rotation.z += z;

				this.ui3D_cameraHelper.rotation.x += x;
				this.ui3D_cameraHelper.rotation.y += y;
				this.ui3D_cameraHelper.rotation.z += z;

				this.controller_cameraHelper.rotation.x += x;
				this.controller_cameraHelper.rotation.y += y;
				this.controller_cameraHelper.rotation.z += z;
				break;

			default:
				break;
		}
	}

	SetTarget(x, y, z) {
		switch (this.currentControls) {
			case "VR":
				this.cameraHelper.lookAt(new Vector3(x, y, z));
				this.cameraHelper.rotation.x = 0;
				this.cameraHelper.rotation.z = 0;

				this.ui_cameraHelper.lookAt(new Vector3(x, y, z));
				this.ui_cameraHelper.rotation.x = 0;
				this.ui_cameraHelper.rotation.z = 0;

				this.ui3D_cameraHelper.lookAt(new Vector3(x, y, z));
				this.ui3D_cameraHelper.rotation.x = 0;
				this.ui3D_cameraHelper.rotation.z = 0;

				this.controller_cameraHelper.lookAt(new Vector3(x, y, z));
				this.controller_cameraHelper.rotation.x = 0;
				this.controller_cameraHelper.rotation.z = 0;
				break;
			default:
				this[this.currentControls].SetTarget(x, y, z);
				break;
		}

		this.context.Scene._target = new Vector3(x, y, z);
	}

	GetTarget() {
		switch (this.currentControls) {
			case "VR":
				return new Vector3(0, 0, 0); //{x:0,y:0,z:0}
				break;
			default:
				return this[this.currentControls].instance.target;
				break;
		}
	}

	GetCameraPosition() {
		switch (this.currentControls) {
			case "VR":
				return this.context.Renderer.instance.xr.getCamera(
					this.context.Camera.instance
				).position;
				break;
			case "AR":
				return this.context.Renderer.instance.xr.getCamera(
					this.context.Camera.instance
				).position;
				// return this.context.Camera.instance.position;//this.cameraHelper.position;
				break;
			default:
				return this.context.Camera.instance.position.clone();
				break;
		}
	}

	GetInputPosition() {
		if (this.currentControls == "VR") {
			//console.log(this.vr_controller);
			return this.vr_controller.controllers[0].position;
		}

		if (this.currentControls == "Desktop") {
			if (this.mouse.x !== null && this.mouse.y !== null) {
				console.log(this.mouse);
				return this.mouse;
			}
		}
	}

	/**Interactive Objects */
	Raycast() {
		return this.ActiveObjects.reduce((closestIntersection, obj) => {
			if (!obj.isClickEnabled || !obj.visible) {
				return closestIntersection;
			}

			const intersection = this.raycaster.intersectObject(obj, true);

			if (!intersection[0]) return closestIntersection;

			if (
				!closestIntersection ||
				intersection[0].distance < closestIntersection.distance
			) {
				intersection[0].object = obj;

				return intersection[0];
			} else {
				return closestIntersection;
			}
		}, null);
	}
	FindIntersection() {
		// Find closest intersecting object
		let intersect;
		let intersect2;

		if (this.currentControls == "VR") {
			this.vr_controller.SetFromController(0, this.raycaster.ray);
			intersect = this.Raycast();
			//Position the little white dot at the end of the controller pointing ray
			if (intersect) this.vr_controller.SetPointerAt(0, intersect.point);

			this.vr_controller.SetFromController(1, this.raycaster.ray);
			intersect2 = this.Raycast();
			//Position the little white dot at the end of the controller pointing ray
			if (intersect2) this.vr_controller.SetPointerAt(1, intersect2.point);
		}

		if (this.currentControls == "Desktop") {
			if (this.mouse.x !== null && this.mouse.y !== null) {
				this.raycaster.setFromCamera(this.mouse, this.context.Camera.instance);
				intersect = this.Raycast();
			}
		}

		//Intersect
		if (
			intersect &&
			intersect.object.isClickEnabled &&
			intersect.object.visible
		) {
			if (this.selectState) {
				// Component.setState internally call component.set with the options you defined in component.setupState
				intersect.object.setState("selected");
				this.context.Events.dispatchEvent("ui-mouse-down", intersect.object);
				//console.log(intersect.object, intersect.object.name);
			} else {
				// Component.setState internally call component.set with the options you defined in component.setupState
				intersect.object.setState("hovered");
				this.context.Events.dispatchEvent("ui-hovered", intersect.object);
			}
		}

		//Intersect
		if (
			intersect2 &&
			intersect2.object.isClickEnabled &&
			intersect2.object.visible
		) {
			if (this.selectState2) {
				// Component.setState internally call component.set with the options you defined in component.setupState
				intersect2.object.setState("selected");
				this.context.Events.dispatchEvent("ui-mouse-down", intersect2.object);
				//console.log(intersect2.object, intersect2.object.name);
			} else {
				// Component.setState internally call component.set with the options you defined in component.setupState
				intersect2.object.setState("hovered");
				this.context.Events.dispatchEvent("ui-hovered", intersect2.object);
			}
		}

		//Deselect every activeObject that is not the current intersect object
		this.ActiveObjects.forEach((obj) => {
			if (
				(!intersect || obj !== intersect.object) &&
				(!intersect2 || obj !== intersect2.object) &&
				(obj.isUI || obj.isClickEnabled)
			) {
				// Component.setState internally call component.set with the options you defined in component.setupState
				obj.setState("idle", obj);
				this.context.Events.dispatchEvent("ui-idle", null);
			}
		});
	}
}

export { Controls };

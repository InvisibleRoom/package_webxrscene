import { Vector3 } from "three/build/three.module";
import {
	MapControls,
	OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";

import { MOUSE, TOUCH } from "three";

import { StaticControls } from "./StaticControls";

class DesktopControls {
	constructor(camera, domElement, context = null) {
		this.context = context;
		this.orbit = new OrbitControls(camera, domElement);
		this.static = new StaticControls(camera, domElement, context);
		this.static.enabled = false;

		this.map = new MapControls(camera, domElement, context);
		this.map.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
		this.map.dampingFactor = 0.05;
		this.map.screenSpacePanning = false;
		this.map.minDistance = 0.1;
		this.map.maxDistance = 50;
		this.map.maxPolarAngle = Math.PI / 2;

		this.instance = this.orbit;
	}

	ChangeToStatic = (changeToMapControls = false) => {
		console.log("ChangeToStatic", changeToMapControls);
		if (changeToMapControls) {
			this.instance = this.map;
			this.orbit.enabled = false;
			this.static.SetActive(false);
			return;
		}

		this.instance = this.static;
		this.static.SetActive(true);
		this.orbit.enabled = false;
	};
	ChangeToDefault = () => {
		this.instance = this.orbit;
		this.static.SetActive(false);
		this.orbit.enabled = true;

		console.log("ChangeToDefault");
	};

	SetTarget = (x, y, z) => {
		this.static.target.set(x, y, z);
		this.orbit.target.set(x, y, z);

		this.static.update();
		this.orbit.update();
	};

	SetActiveCamera = (camera) => {
		this.orbit.object = camera;
		this.static.object = camera;
	};

	SetEnabled = (boolean) => {
		this.orbit.enabled = boolean;
		this.static.enabled = boolean;
		this.static.controls.enabled = boolean;
	};
}

export { DesktopControls };

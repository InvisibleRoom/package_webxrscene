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

		this.mapMode = false;
		this.map = new MapControls(camera, domElement);
		this.map.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
		this.map.dampingFactor = 0.05;
		this.map.screenSpacePanning = false;
		this.map.enableRotate = false;
		this.map.minDistance = 0.5;
		this.map.maxDistance = 7;
		this.map.maxPolarAngle = Math.PI / 2;
		this.map.enabled = false;

		this.instance = this.orbit;
	}

	ChangeToStatic = (changeToMapControls = false) => {
		this.instance = this.static;
		this.static.SetActive(true);
		this.orbit.enabled = false;
	};
	ChangeToDefault = (changeToMapControls = false) => {
		if (changeToMapControls) {
			this.mapMode = true;

			this.instance = this.map;
			this.static.SetActive(false);
			this.orbit.enabled = false;
			this.map.enabled = true;

			return;
		}

		this.instance = this.orbit;
		this.static.SetActive(false);
		this.orbit.enabled = true;

		console.log("ChangeToDefault");
	};

	SetTarget = (x, y, z) => {
		this.static.target.set(x, y, z);
		this.orbit.target.set(x, y, z);
		this.map.target.set(x, y, z);

		this.static.update();
		this.orbit.update();
		this.map.update();
	};

	SetActiveCamera = (camera) => {
		this.orbit.object = camera;
		this.map.object = camera;
		this.static.object = camera;
	};

	SetEnabled = (boolean) => {
		this.orbit.enabled = boolean;
		this.static.enabled = boolean;
		this.static.controls.enabled = boolean;
	};
}

export { DesktopControls };

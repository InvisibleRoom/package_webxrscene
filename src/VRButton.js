var VRButton = {
	createButton: function(renderer, context) {
		var button = document.createElement("button");
		button.id = "VRButton";
		var currentSession = null;

		const onSessionStarted = async (session) => {
			session.addEventListener("end", onSessionEnded);

			const gl = renderer.getContext();
			try {
				await gl.makeXRCompatible();
			} catch (err) {
				console.log("GL error ", err);
			}

			renderer.xr.setSession(session);
			button.textContent = "EXIT VR";

			console.log("callbackSession", button.callbackSession);

			if (button.callbackSession) {
				button.callbackSession();
			}

			currentSession = session;

			context.Events.dispatchEvent("OnChangeXRView", {
				xrMode: "VR",
				previousXRMode: context.Controls.GetCurrentXRMode(),
				session: session,
			});
		};

		function onSessionEnded(/*event*/) {
			currentSession.removeEventListener("end", onSessionEnded);

			button.textContent = "In VR starten";

			currentSession = null;

			context.Events.dispatchEvent("OnChangeXRView", {
				xrMode: "Desktop",
				previousXRMode: "VR",
				session: null,
			});
		}

		button.textContent = "In VR starten";

		button.onclick = function() {
			if (currentSession === null) {
				// WebXR's requestReferenceSpace only works if the corresponding feature
				// was requested at session creation time. For simplicity, just ask for
				// the interesting ones as optional features, but be aware that the
				// requestReferenceSpace call will fail if it turns out to be unavailable.
				// ('local' is always available for immersive sessions and doesn't need to
				// be requested separately.)

				var sessionInit = {
					optionalFeatures: ["local-floor", "local"],
				};
				navigator.xr
					.requestSession("immersive-vr", sessionInit)
					.then(onSessionStarted);
			} else {
				currentSession.end();
			}
			//};
		};

		function disableButton() {
			button.onclick = null;
		}

		function showEnterVR(/*device*/) {
			button.textContent = "In VR starten";
		}

		function showWebXRNotFound() {
			disableButton();

			button.textContent = "VR nicht unterstützt";
		}

		if ("xr" in navigator) {
			//Safari Fix
			if (
				!Object.prototype.hasOwnProperty.call(navigator, "xr") ||
				typeof navigator.xr.isSessionSupported !== "object" ||
				typeof navigator.xr.isSessionSupported !== "function" ||
				navigator.xr.isSessionSupported === null
			) {
				return;
			}

			console.log(navigator.xr);

			navigator.xr.isSessionSupported("immersive-vr").then(function(supported) {
				supported ? showEnterVR() : showWebXRNotFound();

				if (!supported) {
					if (button.parentNode != null) {
						button.parentNode.removeChild(button);
					}
				}
			});

			return button;
		} else {
			var message = document.createElement("a");

			if (window.isSecureContext === false) {
				message.href = document.location.href.replace(/^http:/, "https:");
				message.innerHTML = "WEBXR NEEDS HTTPS"; // TODO Improve message
			} else {
				message.href = "https://immersiveweb.dev/";
				message.innerHTML = "WEBXR NOT AVAILABLE";
			}
			return message;
		}
	},
};

export { VRButton };

var ARButton = {
	domOverlay : null,
	createButton: function ( renderer, context) {

		function showStartAR( /*device*/ ) {

			var currentSession = null;

			var sessionInit = { 
				optionalFeatures: [ 'local-floor',"local", 'dom-overlay' ],
				domOverlay: { root: ARButton.domOverlay }
			}

			function onSessionStarted( session ) {

				session.addEventListener( 'end', onSessionEnded );

				renderer.xr.setSession( session );				
				
				button.textContent = 'STOP AR';
				
				currentSession = session;

				context.Events.dispatchEvent("OnChangeXRView",  {
					xrMode : "AR",
					previousXRMode : context.Controls.GetCurrentXRMode(), 
					session: session
				});

			}

			function onSessionEnded( /*event*/ ) {

				currentSession.removeEventListener( 'end', onSessionEnded );

				button.textContent = 'START AR';

				currentSession = null;
				context.Events.dispatchEvent("OnChangeXRView", {
					xrMode : "Desktop",
					previousXRMode : "AR",
					session: null
				});

			}

			button.textContent = 'START AR';

			button.onclick = function () {

				if ( currentSession === null ) {
					sessionInit.domOverlay.root = typeof(button._domOverlayElement) != "undefined" ? button._domOverlayElement : sessionInit.domOverlay.root;
					navigator.xr.requestSession( 'immersive-ar', sessionInit ).then( onSessionStarted );

				} else {

					currentSession.end();

				}

			};

		}

		function disableButton() {

			button.onclick = null;

		}

		function showARNotSupported() {

			disableButton();

			button.textContent = 'AR NOT SUPPORTED';

		}

		if ( 'xr' in navigator ) {

			var button = document.createElement( 'button' );
			button.id = 'ARButton';
			
			navigator.xr.isSessionSupported( 'immersive-ar' ).then( function ( supported ) {

				supported ? showStartAR() : showARNotSupported();

			} ).catch( showARNotSupported );

			return button;

		} else {

			var message = document.createElement( 'a' );

			if ( window.isSecureContext === false ) {

				message.href = document.location.href.replace( /^http:/, 'https:' );
				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {

				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}

			return message;

		}
	}
};

export { ARButton };

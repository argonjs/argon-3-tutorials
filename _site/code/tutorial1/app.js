	//These commands initiate the Argon context and three.js
	
	var options = THREE.Bootstrap.createArgonOptions( Argon.immersiveContext )
	options.renderer = { klass: THREE.CSS3DRenderer }
	var three = THREE.Bootstrap( options )
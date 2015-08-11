var options = THREE.Bootstrap.createArgonOptions( Argon.immersiveContext )
options.renderer = { klass: THREE.CSS3DRenderer }
var three = THREE.Bootstrap( options )

var eyeOrigin = three.argon.objectFromEntity(Argon.immersiveContext.eyeOrigin)

// creating 6 divs to indicate the x y z positioning
var divXpos = document.createElement('div')
var divXneg = document.createElement('div')
var divYpos = document.createElement('div')
var divYneg = document.createElement('div')
var divZpos = document.createElement('div')
var divZneg = document.createElement('div')

// Put content in each one  (should do this as a couple of functions)
// for X
divXpos.id = "cssContent"
divXpos.style.width = "100px"
divXpos.style.height = "100px"
divXpos.style.backgroundColor = "red"
divXpos.style.position = 'absolute'
divXpos.style.fontSize = "16px"
divXpos.innerText = "Pos X = East"

divXneg.id = "cssContent"
divXneg.style.width = "100px"
divXneg.style.height = "100px"
divXneg.style.backgroundColor = "red"
divXneg.style.position = 'absolute'
divXneg.style.fontSize = "16px"
divXneg.innerText = "Neg X = West"

// for Y
divYpos.id = "cssContent"
divYpos.style.width = "100px"
divYpos.style.height = "100px"
divYpos.style.backgroundColor = "blue"
divYpos.style.position = 'absolute'
divYpos.style.fontSize = "16px"
divYpos.innerText = "Pos Y = Up"

divYneg.id = "cssContent"
divYneg.style.width = "100px"
divYneg.style.height = "100px"
divYneg.style.backgroundColor = "blue"
divYneg.style.position = 'absolute'
divYneg.style.fontSize = "16px"
divYneg.innerText = "Neg Y = Down"

//for Z
divZpos.id = "cssContent"
divZpos.style.width = "100px"
divZpos.style.height = "100px"
divZpos.style.backgroundColor = "green"
divZpos.style.position = 'absolute'
divZpos.style.fontSize = "16px"
divZpos.innerText = "Pos Z = South"

divZneg.id = "cssContent"
divZneg.style.width = "100px"
divZneg.style.height = "100px"
divZneg.style.backgroundColor = "green"
divZneg.style.position = 'absolute'
divZneg.style.fontSize = "16px"
divZneg.innerText = "Neg Z = North"

// create 6 CSS3DObjects in the scene graph
var cssObjectXpos = new THREE.CSS3DObject(divXpos)
var cssObjectXneg = new THREE.CSS3DObject(divXneg)
var cssObjectYpos = new THREE.CSS3DObject(divYpos)
var cssObjectYneg = new THREE.CSS3DObject(divYneg)
var cssObjectZpos = new THREE.CSS3DObject(divZpos)
var cssObjectZneg = new THREE.CSS3DObject(divZneg)

// the width and height is used to align things.
cssObjectXpos.position.x = 200.0
cssObjectXpos.position.y = 0.0
cssObjectXpos.position.z = 0.0
cssObjectXpos.rotation.y = - Math.PI / 2

cssObjectXneg.position.x = -200.0
cssObjectXneg.position.y = 0.0
cssObjectXneg.position.z = 0.0
cssObjectXneg.rotation.y =  Math.PI / 2

// for Y
cssObjectYpos.position.x = 0.0
cssObjectYpos.position.y = 200.0
cssObjectYpos.position.z = 0.0
cssObjectYpos.rotation.x = Math.PI / 2

cssObjectYneg.position.x = 0.0
cssObjectYneg.position.y = - 200.0
cssObjectYneg.position.z = 0.0
cssObjectYneg.rotation.x = - Math.PI / 2

// for Z
cssObjectZpos.position.x = 0.0
cssObjectZpos.position.y = 0.0
cssObjectZpos.position.z = 200.0
cssObjectZpos.rotation.y = Math.PI

cssObjectZneg.position.x = 0.0
cssObjectZneg.position.y = 0.0
cssObjectZneg.position.z = -200.0
//no rotation need for this one

eyeOrigin.add(cssObjectXpos)
eyeOrigin.add(cssObjectXneg)
eyeOrigin.add(cssObjectYpos)
eyeOrigin.add(cssObjectYneg)
eyeOrigin.add(cssObjectZpos)
eyeOrigin.add(cssObjectZneg)
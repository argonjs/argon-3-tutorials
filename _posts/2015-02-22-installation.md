---
layout: post
title:  "Getting Started with Argon"
date:   2015-02-22 13:35:15
short_description: "This tutorial shows you how to get your Argon environment ready."
source_directory: tutorial1
---

Setting Up The Camera
---------------------
The first thing that you should do in every Argon app is to set up the camera. In Argon, there are 2 cameras: the 3D camera and the physical camera. The 3D camera is the camera that shows the viewport, which renders virtual objects. Argon.js uses the same 3D camera from Three.js. The physical camera is the camera that is in the iPhone. It is used to render the real world.

In order to produce Augmented Reality, we need to bind both cameras so that they act as one. In this case, your phone's camera will be your eye into the virtual world. Argon makes the process of binding cameras, as well as the gyroscope and other sensors, as easy as a function call.

{% highlight js %}

var options = THREE.Bootstrap.createArgonOptions( ARGON.immersiveContext )
options.renderer = { klass: THREE.CSS3DRenderer }
var three = THREE.Bootstrap( options )

three.argon.bindComponent(new ARGON.Component.CameraTarget, three.camera)

var cameraLocationTarget = new ARGON.Component.CameraTarget
cameraLocationTarget.setFilter(ARGON.filters.onlyPosition)

var cameraLocation = new THREE.Object3D
three.argon.bindComponent(cameraLocationTarget, cameraLocation)
three.scene.add(cameraLocation)

{% endhighlight %}

Creating Virtual Objects
------------------------


{% highlight js %}

// creating 2 in opposite x y z positions
var divZpos = document.createElement('div')
var divZneg = document.createElement('div')

// Put content in each one div
divZpos.id = "cssContent"
divZpos.style.width = "100px"
divZpos.style.height = "100px"
divZpos.style.backgroundColor = "green"
divZpos.style.position = 'absolute'
divZpos.style.fontSize = "16px"
divZpos.innerText = "Pos Z = North"

divZneg.id = "cssContent"
divZneg.style.width = "100px"
divZneg.style.height = "100px"
divZneg.style.backgroundColor = "green"
divZneg.style.position = 'absolute'
divZneg.style.fontSize = "16px"
divZneg.innerText = "Neg Z = South"

// create 2 CSS Objects in the scene graph
var cssObjectZpos = new THREE.CSS3DObject(divZpos)
var cssObjectZneg = new THREE.CSS3DObject(divZneg)

// Set the objects' positions
cssObjectZpos.position.x = 0.0
cssObjectZpos.position.y = 0.0
cssObjectZpos.position.z = 200.0
cssObjectZpos.rotation.y = Math.PI

cssObjectZneg.position.x = 0.0
cssObjectZneg.position.y = 0.0
cssObjectZneg.position.z = -200.0
//no rotation need for this one

// Add the objects to the scene
cameraLocation.add(cssObjectZpos)
cameraLocation.add(cssObjectZneg)

{% endhighlight %}

Yo wazzup?
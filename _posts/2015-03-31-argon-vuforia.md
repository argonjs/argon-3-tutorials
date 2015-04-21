---
layout: post
title:  "Using Argon.js with Vuforia"
date:   2015-03-31 13:35:15
short_description: "This tutorial shows you how to use Argon.js with Vuforia to do image recognition."
source_directory: tutorial4
---

Vuforia Tutorial
----------------

So you wanna track images, cylinders, boxes and the like in your Augmented Reality App?

Look no further than Vuforia with Argon! In this tutorial you will see how stupefyingly easy it is to track images with Argon & Vuforia.

If you haven't read about 

## Creating a Vuforia "Target"
1. Go to the [Vuforia Developer Portal](https://developer.vuforia.com/)
2. Register!  (Login -> Create an account now)
3. Once logged-in go to Target Manager
4. Create a database
5. Click on your created database and then 'Add Target'
6. Upload a picture (if Single Image) and provide its width in cm
7. Other models we be supported later
8. Something something... BAM!
9. New Model Added. Click download to add it
10. You should have downloaded a zip file with a .xml file and a .dat file

## The Argon Boilerplate

To quickly make an argon app you just need to write up a quick HTML boiler plate:

```HTML
<!doctype html>
<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

<title>Vuforia</title>

<script src="<Path to THREE.JS>"></script>
<script src="<Path to argon threestrap.js>"></script>
<script src="<Path to argon.js>"></script>
<script src="<Path to argon-three.js>"></script>

<body></body>

<script>
/*
  We will fill in our argon code here
*/
</script>
```

## An argon.js boilerplate

```Javascript
  var options = THREE.Bootstrap.createArgonOptions( ARGON.immersiveContext )
  var three = THREE.Bootstrap( options )

  // bind a camera target to our camera
  three.argon.bindComponent(new ARGON.Component.CameraTarget, three.camera)

  // create a camera target that only uses the camera's position
  var cameraLocationTarget = new ARGON.Component.CameraTarget
  cameraLocationTarget.setFilter(ARGON.filters.onlyPosition)
  var cameraLocation = new THREE.Object3D
  three.argon.bindComponent(cameraLocationTarget, new THREE.Object3D)
  three.scene.add(cameraLocation)
```

The first two lines give you a THREE.js instance that gets integrated straight into Argon!
Next we bind our physical camera to the THREE's camera, to line up the views and make the AR believable.

Finally we create a THREE object that is bound to our camera's location ( by filtering by only position ).


## Lets light up the room
Lets add a light source to our scene and create a *very* generic box.

```Javascript
  // add light
  var light = new THREE.DirectionalLight( 0xffffff, 1 )
	light.position.set( 0, -4, -4 ).normalize()
	three.scene.add( light )
  var pointLight = new THREE.PointLight( 0xffffff, 1.5, 1000 )
  three.camera.add(pointLight)

  // create a box
  var box = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), new THREE.MeshNormalMaterial())
  box.position.z = 25
  var boxSpin = 0
```

## The exciting part: Vuforia

First we can check if our client supports Vuforia (it most likely will):

```Javascript
if (ARGON.System.Vuforia) {
  // We have Vuforia!!!
} else {
  // No Vuforia available :(
}
```

Argon also provides a way to load Vuforia data sets (the zip file containing the .xml & .dat files).
Unzip that dataset folder and place in a directory on your server, make sure you keep the .xml and .dat files together (in the same directory).

Lets load our Vuforia Dataset:

```Javascript
// My dataset is called StonesAndChips, and its in the dataset folder:
ARGON.System.Vuforia.loadAndActivateDataSet('dataset/StonesAndChips.xml')
```

To get a certain target ( like a picture of a bunch of stones ) we can use ARGON.Component

```Javascript
// Get the Stones Target
var stonesTarget = new ARGON.Component.VuforiaImageTarget({name:'stones'})
```

Now we create a THREE.Object3D that will be attatched to the target when Vuforia tracks it:

```Javascript
var stones = new THREE.Object3D
three.argon.bindComponent(stonesTarget, stones)
stones.name = "stones"
three.scene.add(stones)
```

The above code creates a THREE.Object3D and binds it to our target, we give it a name so we can find it later.
Finally we add it to the scene.

Next we make use of our listeners to make our box visible when we find the target (effectively attatching it to the target) and detaching it when we lose visibility.

```Javascript
stones.addEventListener('found', function() {
  stones.add(box)
  boxSpin = 10
})
stones.addEventListener('lost',  function() {
  stones.remove(box)
})
```

## Animating the box!

We can animate this cube to make it slightly more exciting!

```
three.on('update', function() {
  // animate the cube
  box.rotation.z += boxSpin * three.Time.delta
  if (boxSpin > 0) boxSpin -= 10 * three.Time.delta
  else             boxSpin = 0
})
```

## Final Words

Congratulations! You have just tracked an image/object in augmented reality! It looks super impressive (especially on newer hardware)!

Wondering what that stones & chips example is? Want free good trackable objects? Look no further than [here](https://developer.vuforia.com/sites/default/files/sample-apps/targets/imagetargets_targets.pdf).




---
layout: post
title:  "Geolocation"
date:   2015-03-24 13:35:15
short_description: "This is a geolocation tutorial."
source_directory: tutorial2
---

Geolocation Tutorial
--------------------
The Argon3 browser allows the developer to place 3D content in the world for display to the user and interaction with the user. The content can be located 1. relative to the device itself or 2. relative to the earth or the celestial frame. *argon.js* uses Cesium (http://cesiumjs.org) to establish a precise geolocation for a local point of origin on the earth and then uses that origin for its local frame of reference to locate the camera and any 3D objects the application creates. (See the Background for a fuller explanation of how *argon.js* uses Cesium.)

This example illustrates both ways of locating content: 1. It finds the current location of the viewer and positions a cube at a well-known nearby location (the Georgia Tech campus, for us). This cube is covered with a texture of Buzz, the Georgia Tech mascot.  2. It creates a second cube a small distance away from where the user was positioned when the example was loaded.  It does this by adding a small amount to the user's current east-west location, in the local taronhree.js cartesian coordinates.  This illustrates how to create geospatial content based on the current location and update the internal geospatial location of the object.

## Main file (index.html)

In the index.html, the body tag is in two parts.  The "argon-immersive-context" div is used to create a small dynamic information box at the bottom of the screen that will track the user's location and the position of the two objects.  Text outside this special div is rendered only when the user enters "Page Mode" by touching the icon in the top right corner of the interface. In this case,  the text in Page Mode offers an explanation of the example that appears on the screen over the background context. 

{% highlight html %}
<body>
  <div id="argon-immersive-context">
<div id="menu">
<button id="location">lon (0) lat (0)</button>
    </div>  
  </div>
  <h1>A Simple Geolocation example</h1>
  <p>This example takes the current location of the viewer, and positions a cube at a well-known nearby location (the Georgia Tech campus, for us), and creates a second cube a small distance away from where the viewer was positioned when the example was loaded.  We do this by adding a small amount to our current east-west location, in the local Three.js cartesian coordinates.  This illustrates how to create geospatial content based on the current location, and update the internal geospatial location of the object.</p>
</body>
{% endhighlight %}

## Code file (app.js)

As indicated in 1-Getting Started, we place the javascript itself in a separate file: app.js.  In the javascript file, we first initialize the immersive context and *three.js* (using the threestrap bootstrapping library):


{% highlight js %}
  var context = Argon.immersiveContext;
  var options = THREE.Bootstrap.createArgonOptions( context );
  var three = THREE.Bootstrap( options );
{% endhighlight %}

Next we create two geospatial objects to display in the application. One of the objects will be located at a particular place on the globe (specified by latitude, longitude, and altitude or LLA). This will be a cube with the Georgia Tech mascot, Buzz, textured mapped on it. The other will be a cube that is texture-mapped to look like a wooden box: this one will be positioned near the starting location and then will move so that it will always be in the vicinity of the camera (phone). 

As explained in the Overview, every geospatial object has two components: a Cesium Entity (which determines its location) and a *three.js* Object3D (which determines its characteristics as a 3D object, such as shape and texture). 


## The "Buzz" cube positioned at Georgia Tech

First we use *three.js* to create a large cube 10mx10mx10m  and attach the Buzz texture.  This cube has the variable name buzz.

{% highlight js %}
var buzz = new THREE.Object3D;
  var loader = new THREE.TextureLoader();
  loader.load( 'buzz.png', function ( texture ) {
  var geometry = new THREE.BoxGeometry(10, 10, 10)
  var material = new THREE.MeshBasicMaterial( { map: texture } 
  var mesh = new THREE.Mesh( geometry, material );
  mesh.scale.set(10,10,10);
  buzz.add( mesh );
  })

{% endhighlight %}

Now we create a Cesium Entity located at the longitude and latitude near Georgia Tech. You can adjust this to a position near you by substituting your lon/lat, which you can find from Google Maps.  (You can also add height in meters as a third parameter.) 

{% highlight js %}
  var gatechGeo = new Argon.Cesium.Entity({
      name: "Georgia Tech",
      position: Argon.Cesium.Cartesian3.fromDegrees(-84.398881, 33.778463)  
    })
{% endhighlight %}

Finally we create the *argon.js* object that is linked to this Cesium Entity and attach the buzz cube. This adds the cube to the scene graph for display. 

{% highlight js %}
  var gatechGeoTarget = three.argon.objectFromEntity(gatechGeo);
  gatechGeoTarget.add(buzz);
{% endhighlight %}

## The  wooden box (position moves with the camera)

We now create the second object:  a 1mx1mX1m cube with a wooden texture. (This wooden texture comes from https://www.flickr.com/photos/photoshoproadmap/8640003215/sizes/l/in/photostream/, licensed under https://creativecommons.org/licenses/by/2.0/legalcode)

We create two *three.js* Object3Ds:  the box itself and another called boxGeoObject.  

{% highlight js %}
 var boxGeoObject = new THREE.Object3D; 
 var box = new THREE.Object3D;
 var loader = new THREE.TextureLoader();
 loader.load( 'box.png', function ( texture ) {
   var geometry = new THREE.BoxGeometry(1, 1, 1)
   var material = new THREE.MeshBasicMaterial( { map: texture } )
   var mesh = new THREE.Mesh( geometry, material )
   box.add( mesh );
  })
{% endhighlight %}

Now we add the box to the boxGeoObject and the boxGeoObject to the scene graph. 

{% highlight js %}
  boxGeoObject .add(box)
  three.scene.add(boxGeoObject );
{% endhighlight %}

The boxGeoObject is the object that we will move around (and box will move with it).  So we need to make an entity for the boxGeoObject . 

{% highlight js %}
 var boxGeoEntity = three.argon.entityFromObject(boxGeoObject);
{% endhighlight %}

## The argon:realityChange event

Finally we create two event handlers. One is for assigning and changing the Reality (the background view) that the application will use.  An *argon.js* context consists of AR content and a Reality (See the Background for a further explanation.)   Each time the Context is assigned a new Reality, including the first time, we receive a "realityChange" event.  The application should do initialization that is based on the state of the world here. *argon.js* has a state parameter with the following entries:

{% highlight js %}
{
    reality: Argon.Reality,
    previousReality: Argon.Reality 
  }
{% endhighlight %}

 The  state.previousReality will be undefined the first time. The following code checks for the reality change.  Unless the user moves 5 km from her initial position, this event will only fire once, when the application is launched.  It is here that we set the position of the wooden box to be near the camera. We only need to reposition the box when the Reality changes. Otherwise it will just move to remain near the camera. 

{% highlight js %}
   var realityInit = false
   var boxPos= [0,0,0]  
   three.on("argon:realityChange", function(event) {
   realityInit = true;
    // set the position to be near the camera
    var cameraPosition = three.camera.getWorldPosition();
    cameraPosition.x += 5;    
    boxGeoObject.position.copy(cameraPosition)
    three.argon.updateEntityFromObject(boxGeoObject)
    // getCartographicDegreesFromObject will return undefined if geoObject is not defined in geographic coordinates  which would happen if this Reality does not support geographic coordinates
    geoObjectPos = three.argon.getCartographicDegreesFromObject(boxGeoObject) || [0,0,0]
  })   

{% endhighlight %}

## The update event

Our second event listener is code that we want to fire each time three.js  updates (redraws) the scene. In this example, we update the screen element with the current numerical information  (lat and lon of the camera etc.)  We also make the boxes rotates for visual interest. This update event is where the developer can put anything that needs to change dynamically every time the scene is redrawn. 
 *argon.js*'s update state is stored in the threestrap update event.argonState field. In general, this is only needed if you need to know lower-level information from  *argon.js* , such as the raw geolocation, which we grab and print in a div on the bottom of the screen.


The state parameter has the following entries:
{% highlight js %}
    {
    frameNumber: integer,
    time: a Cesium time for the update,
    referenceFrame: the root reference, either Cesium ReferenceFrame.FIXED or {id: frameId},
    position: {
        cartesian: Cesium.Cartesian,
        cartographicDegrees: [longitude, latitude, height] 
     },
    orientation: {
        unitQuaternion: Cesium.Quaternion                 //  The orientation in reference frame 
        unitQuaternionRelative: Cesium.Quaternion,        //  The orientation relative to local origin
     },
    frustum: {
        fov: number, 
        fovy: number, 
        aspectRatio: number
     },
    reality: {id: realityID}
    }   
{% endhighlight %}

 Here is the update function.
 {% highlight js %}
    three.on('update', function(event) {
    var elem = document.getElementById('location');     
    var state = event.argonState
  {% endhighlight %}
  
  We ignore updates until we have a reality:
   {% highlight js %}
      if (!realityInit) {
      elem.innerText = "No Reality Yet"
      return
    }
   {% endhighlight %}
   
   We want the position of the device: CartographicDegrees is a 3 element array containing [longitude, latitude, height]. We get this from the state vector.
   
   {% highlight js %}
   var gpsPos = [0,0,0];
    if (state.position.cartographicDegrees) {
      gpsPos = state.position.cartographicDegrees;
    }
   {% endhighlight %}
   
   
 Now we make both boxes rotate to add some visual interest.
 
   {% highlight js %}
    buzz.rotation.y += 2 * three.Time.delta
    box.rotation.y += 3 * three.Time.delta
   {% endhighlight %}

Now, we compute the distance from the camera to each of the two cubes to the cube. If the cube could be "far" away, we'd want to use Cesium.EllipsoidGeodesic, rather than Euclidean distance, but this is fine here.

   {% highlight js %}
    var point1 = three.camera.getWorldPosition();
    var point2 = buzz.getWorldPosition();
    var point3 = box.getWorldPosition();
    var distance = point1.distanceTo( point2 );
    var distance2 = point1.distanceTo( point3 );
   {% endhighlight %}
   
Finally we format the text that will go into the div element created in index.html and displayed at the bottom of the user's screen.  This information will change as the user walks around with the phone. 
Note that we do not read or assign text to the DOM element itself until the very end, in order to prevent unnecessary DOM invalidations. (See the warning about DOM invalidations in the Overview.)       
   {% highlight js %}
    var infoText = "Geospatial Argon3 example:\n"
    infoText += "eye (" + toFixed(gpsPos[0],6) + ", ";
    infoText += toFixed(gpsPos[1], 6) + ", " + toFixed(gpsPos[2], 2) + ")\n";
    infoText += "cube(" + toFixed(boxPos[0], 6) + ", ";
    infoText += toFixed(boxPos[1], 6) + ", " + toFixed(boxPos[1],2) + ")\n";
    infoText += "distance to GT (" + toFixed(distance,2) + ")";
    infoText += " distance to box (" + toFixed(distance2,2) + ")";

    if (lastInfoText !== infoText) {  
      elem.innerText = infoText;
      lastInfoText = infoText;   
   {% endhighlight %}
   
This tutorial (2) showed how to position geoObjects using GPS. In the next tutorial (3), we will see how to position objects using Vuforia's image tracking system:  ([Vuforia](vuforia.html)). 
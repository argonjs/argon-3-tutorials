---
layout: post
title:  "Geolocation"
date:   2015-03-24 13:35:15
short_description: "This is a geolocation tutorial."
source_directory: tutorial2
---

Geolocation Tutorial
--------------------
This is a geolocation tutorial.

## Setting up

First set up your environment with the classic javascript includes and the meta tag to prevent scaling:

{% highlight html %}
<!doctype html>
<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
<title>GeoTargets Example</title>

<script src="../../vendor/three.js"></script>
<script src="../../vendor/threestrap.js"></script>
<script src="../../vendor/argon/argon.js"></script>
<script src="../../vendor/argon/argon-three.js"></script>
{% endhighlight %}

## Ceating a Context

Now onto the javascript, make sure all the previous includes load before this one loads.

This will set our context to video, and attach a THREE Camera object to our real camera.

{% highlight js %}
ARGON.immersiveContext.setBackgroundPreference(ARGON.Background.Video);
var three = ARGON.THREE.Bootstrap(ARGON.immersiveContext, {
    renderer: {
        klass: THREE.CSS3DRenderer
    }
})
ARGON.THREE.bind(new ARGON.Component.CameraTarget, three.camera);
{% endhighlight %}

## Creating a GeoTarget

Now we create the GeoTarget, its just as simple as adding these few lines of code:

{% highlight js %}
var geoTarget = new ARGON.Component.GeoTarget;
var geoObject = ARGON.THREE.bind(ARGON.immersiveContext, geoTarget, new THREE.Object3D());
three.scene.add(geoObject);
{% endhighlight %}

1. First we create a GeoTarget object.
2. Then we bind it to our Video Context and receive a THREE object in return
3. Finally we add this object to the scene

Now this wouldn't be interesting at all if we didn't add any content to our GeoTarget

Lets create a simple box containing information:
{% highlight js %}
var infoBox = document.createElement('div');
    infoBox.id = "cssContent";
    infoBox.style.width = "100px";
    infoBox.style.height = "100px";
    infoBox.style.backgroundColor = "blue";
    infoBox.style.position = 'absolute';
    infoBox.style.fontSize = "16px";
    infoBox.innerText = "INFORMATION";

var cssObjectIBox = new THREE.CSS3DObject(infoBox);
    cssObjectIBox.position.x = 0.0;
    cssObjectIBox.position.y = 0.0;
    // cssObjectIBox.position.z = 200.0;
    cssObjectIBox.rotation.x = Math.PI;
    cssObjectIBox.rotation.z = Math.PI;

geoObject.add(cssObjectIBox);
{% endhighlight %}

This creates a blue div with the word 'INFORMATION' in it, and rotates it some. Now you might try this out and realize that our div can be actually in any rotational orientation depending on where you stand and where it is located, you might even realize that we haven't specified where it is located yet. Fear not for we will describe the solutions to the above immediatley:

## Positioning a GeoTarget

You can position your GeoTarget using LLA or UTM (LLA is shown):

{% highlight js %}
loc.setLLA({
   latitude:   33.777824,
   longitude: -84.402315,
   altitude:    600
});
geoTarget.setLocation(loc);
{% endhighlight %}

## Helpful Events

A helpful event to listen to is 'stateUpdate' which will be called when your position or orientation changes. This can be used to highlight your geotarget when it comes into view of the user.

{% highlight js %}
ARGON.Device.frame.on('stateUpdate', function() {
  // Listen to changes in position and update your GeoTarget!
});
{% endhighlight %}

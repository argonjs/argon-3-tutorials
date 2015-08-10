---
layout: default
title: Argon.js Tutorials
---

{% assign sortedPosts = site.posts | sort: 'source_directory' %}

The initial release of *argon.js* works primarily in the *Argon3 browser* for iOS, and 
these tutorials focus specifically on using *argon.js* to create and debug AR web applications for the *Argon3 browser*.  As additional support is added to *argon.js* for other platforms, we will expand the tutorials as appropriate.

As noted in the *argon.js* [overview](index.html), in addition to supporting *argon.js* content, the *Argon3 browser* allows multiple AR applications to run at the same time, with their content overlaid.  Designers create AR experiences using the *argon.js* framework and other familiar web technologies, including HTML, CSS3, and popular javascript frameworks, mixing traditional web media content (images, audio, video) with 3D content rendered via WebGL. These tutorials illustrate  basic concepts and functions for coding AR experiences in Argon, using the [three.js](http://threejs.org) library to manage and render HTML and WebGL content.

All of our tutorial examples follow a similar structure, which is discussed in the first tutorial.  This tutorial also explains how to initialize *argon.js* and *argon-three.js* in your code.
{% assign post1 = sortedPosts[0] %}
<div id="tutorials">
    <div class="tutorial-item">
        <div class="tutorial-item-number">1</div>
        <div class="tutorial-item-details">
            <a href='{{ site.baseurl }}{{ post1.url }}'>{{ post1.title }}</a>
            <p>{{ post1.short_description }}</p>
        </div>
    </div>
</div>

Argon's **Reference Frames** are represented in geospatial coordinates using [Cesium.js](http://cesiumjs.org) Entity objects. The next tutorial shows how to create content that is positioned relative to the world and manipulate the *three.js* objects and Argon entities properly.
{% assign post1 = sortedPosts[1] %}
<div id="tutorials">
    <div class="tutorial-item">
        <div class="tutorial-item-number">2</div>
        <div class="tutorial-item-details">
            <a href='{{ site.baseurl }}{{ post1.url }}'>{{ post1.title }}</a>
            <p>{{ post1.short_description }}</p>
        </div>
    </div>
</div>

One of the motivations for Argon's **Context** and **Reality** abstractions is to separate the details of the platform from the application.  However, different types of **Realities** on different platforms will have different capabilities, and sometimes an AR application requires specific capabilities.  Rather than write an application that only works on a particular platform, *argon.js* asks the programmer to express capabilities they need and tries to satisfy them, encouraging *argon.js* programmers to create applications that fail gracefully.   There are currently two **Realities** that the *Argon3 browser* provides: live video from the camera view and panoramic images. A panorama (see the *Panorama* tutorial) is a 360-degree image that can serve as a geolocated static background.  The live video reality supports computer vision tracking (currently using [Qualcomm's Vuforia SDK](https://www.qualcomm.com/products/vuforia), and the next tutorial shows how to request the capability to do vision tracking with Vuforia, initialize the Vuforia tracker, and attach content to the Argon entities corresponding to the real-world objects tracked by Vuforia.
{% assign post1 = sortedPosts[2] %}
<div id="tutorials">
    <div class="tutorial-item">
        <div class="tutorial-item-number">3</div>
        <div class="tutorial-item-details">
            <a href='{{ site.baseurl }}{{ post1.url }}'>{{ post1.title }}</a>
            <p>{{ post1.short_description }}</p>
        </div>
    </div>
</div>

Often, a developer may want to position content near the viewer, but not attach it to their heads-up-display.  Argon's special ```eyeOrigin``` reference frame provides basic support for this. The next tutorial shows how to use the ```eyeOrigin``` to create a simple directions display around the user.
{% assign post1 = sortedPosts[3] %}
<div id="tutorials">
    <div class="tutorial-item">
        <div class="tutorial-item-number">4</div>
        <div class="tutorial-item-details">
            <a href='{{ site.baseurl }}{{ post1.url }}'>{{ post1.title }}</a>
            <p>{{ post1.short_description }}</p>
        </div>
    </div>
</div>

In *argon.js*, we explicitly decided to not provide a rendering library, but instead to create the necessary hooks to use any renderer with geospatial and computer vision based AR.  The advantage of this is that existing content can be reused in an AR environment.   In the next example, we take one of the standard *three.js* demonstration examples and repurpose it for AR.
{% assign post1 = sortedPosts[4] %}
<div id="tutorials">
    <div class="tutorial-item">
        <div class="tutorial-item-number">5</div>
        <div class="tutorial-item-details">
            <a href='{{ site.baseurl }}{{ post1.url }}'>{{ post1.title }}</a>
            <p>{{ post1.short_description }}</p>
        </div>
    </div>
</div>

*argon.js* supports the use of geolocated panoramic images as a **Reality**. In the next tutorial, we show how to request the panoramic **Reality**, and display content relative to a panorama.
{% assign post1 = sortedPosts[5] %}
<div id="tutorials">
    <div class="tutorial-item">
        <div class="tutorial-item-number">6</div>
        <div class="tutorial-item-details">
            <a href='{{ site.baseurl }}{{ post1.url }}'>{{ post1.title }}</a>
            <p>{{ post1.short_description }}</p>
        </div>
    </div>
</div>

Finally, debugging AR content in a mobile web browser like *argon.js* can be challenging.  To ease creating and debugging content, we have built an example web application framework on top of the [jspm](http://jspm.io) package manager that supports remote debugging of an *argon.js* application.  This framework can also be used to debug any *argon.js* application that uses static web pages. The next tutorial discusses this framework, how to set it up, and how to use it to debug *argon.js* applications.
{% assign post1 = sortedPosts[6] %}
<div id="tutorials">
    <div class="tutorial-item">
        <div class="tutorial-item-number">7</div>
        <div class="tutorial-item-details">
            <a href='{{ site.baseurl }}{{ post1.url }}'>{{ post1.title }}</a>
            <p>{{ post1.short_description }}</p>
        </div>
    </div>
</div>
---
layout: post
title:  "Building and Debugging"
date:   2015-05-01 13:35:15
short_description: "This tutorial shows how to use the jspm-generator to create and debug argon.js apps."
source_directory: tutorial7
---

The code and html that goes into an Argon3 applications can be debugged in various ways. Any html that is going to appear on the screen or in the "Page Mode" can be tested and refined in the browser on the a laptop or desktop machine. Much of the javascript can be tested in the some way. However, an "end-to-end" test of Argon3 application for the iPhone or iPad presents a challenge to debug. We include a system to facilitate real-time debugging of the app running on the phone.  
 
The idea is to connect the phone or tablet to a computer running the Safari or Chrome browser. (You should be able to use Chrome on Windows or Linux; Chrome or Safari on Mac OS X.) The html and javascript code runs in the browser while taking position and orientation input from the phone or tablet. The developer can therefore use the debugging tools available on the browser to track variables,  report errors, etc. This combination of browser and phone makes it possible to test and debug much of the look and feel of the application.  
 
The Argon3 debugger uses node.js (the open source, runtime environment for server-side applications) to serve the application to the laptop browser and direct input from phone or tablet. In addition, setting up the debugger requires jspm, gulp and yeoman.  jspm is a javascript package manager for the SystemJS universal module loader (jspm.io).  We use this to download the necessary Javascript libraries, including the latest version of argon.js and others. Gulp is a streaming build system for node.js. And Yeoman (yeoman.io) helps you kickstart new projects using installed templates.  
 
##Two ways to use the debugging system  
 
The system described here can be used in two ways:  
 
* to generate a shell for new project that you are starting. This shell will consists of folders and files to help you structure the project according to current best practices: separating the html from the code (as we showed you in the preceding examples) and also providing dynamic links to help ensure that the argon.js and other resources stay up to date. 
 
* to debug existing completed Argon3 applications without rewriting or refactoring the code or other assets.  
 
##Getting started 
 
To use the Argon generator, do the following. Note that all the commands below are entered in to the Terminal utility on your Mac OS X or similar utlity on Window or Linix.  
 
1. Install [node.js/npm](http://nodejs.org). Go to http://node.js.org and install node.js/npm on your computer. The npm stands for node package manager, which you will use in the following steps 
 
2. Install gulp, jspm, yo, and generator-argon: The node package manager is used to  download the other packages needed: gulp, jspm,  yo (from yeoman), and our package, generator-argon. This command will download all four and install them so that they are available from any directory on your machine (-g). 
 
        npm install -g gulp jspm yo generator-argon 
  
Depending on the speed of your connection and machine, these installations may take many minutes to complete. Once these steps are complete (without error messages), you can use yeoman to bootstrap a new Argon project, as shown below.   
 
##Case 1: Using the generator to create a new project  
 
The next step is to create a new, empty directory where ever you'd like your new project to be (but not in the generator-argon directory that you created above), cd into it, and use 'yo argon' to fill it with a new sample project. These are the commands that will create the directory my-argon-project and populate it: 
 
    mkdir my-argon-project 
    cd my-argon-project 
    yo argon 
 
The project is set up with an index.html file at the top level, that uses SystemJS to load the application's Javascript from src/app.js. The preceding tutorials (2-6) have already shown you how to separate the html file from the app.js file. This project template follows that same practice. You write your html into the index.html file. All the javascript code goes in the src/app.js file (or multiple files in the src folder if you prefer).  
 
When you are ready to test the code that you have written, use your Terminal to cd back to the top level of your project (the my-argon-project directory or whatever the name is). Then issue this command: 
 
    gulp dev 
  
This will set up the server to run on your computer. In order to debug, your computer and your phone must be on the same local area network. Find the ip address of your computer. (On a Mac you can find this address by looking at the Network utility under System Preferences.) 

To simply see your application running, open Argon on your phone and enter `<your-ip-address>:1337`.  (The server will be serving  your application on port 1337.)  

To debug your application, there are two steps:  
 
1. ON YOUR COMPUTER: Type the path name of your index.html file into your Safari or Chrome browser. In this case you would type: <your-ip-address>:1337/my-argon-project/index.html 
    
2. ON YOUR PHONE:  type <your-ip-address>:1337/debug 
 
This two urls should succeed in connecting your phone to the computer. The computer browser will display all the 3D and html content of your application. It will not, however, be able to display the background video from the phone's camera. Instead you will see the 3D objects and html against a white background. The phone will provide the orientation and position input. As you move the phone around, the content of your application will respond just as they would in the normal operation of your application on the phone. Also, you can use any of the debugging features of Safari or Chrome to examine the code and check for errors.  
 
##Case 2: Using the generator to debug an existing project application 
 
To debug an existing application without refactoring the code,  you create a new directory and use yeoman as in Case 1.  That is, open your Terminal program, cd to where ever you want to setup your test directory and do the following: 
 
    mkdir my-argon-project  [you can use any directory name you like] 
    cd my-argon-project 
    yo argon 
 
This last step creates all the scaffolding files and folders just as in Case 1. After yo has finished, stay in the same directory and create another subdirectory, which must be called "www": 
 
    mkdir www 
 
Then take the file and folder hierarchy of your application and copy them into this www directory.  You can test and debug your application in exactly the same way that we describe in Case 1. To repeat: 
 
Issue this command: 
 
    gulp dev 
  
This will set up the server to run on your computer. In order to debug, your computer and your phone must be on the same local area network. Find the ip address of your computer. (On a Mac you can find this address by looking at the Network dialogue box under System Preferences.)   
 
To simply see your application running, open Argon on your phone and enter `<your-ip-address>:1337/my-argon-project/www/index.html`. 
 
To debug your application, there are two steps:  
 
1. ON YOUR COMPUTER: Type the path name of your index.html file into your Safari or Chrome browser. In this case you would type: <your-ip-address>:1337/my-argon-project/www/index.html (or whatever the pathname is). 
    
2. ON YOUR PHONE:  type <your-ip-address>:1337/debug 
 
These two urls should succeed in connecting your phone to the computer. The computer browser will display all the 3D and html content of your application. It will not, however, be able to display the background video from the phone's camera. Instead you will see the 3D objects and html against a white background. The phone will provide the orientation and position input. As you move the phone around, the content of your application will respond just as they would in the normal operation of your application on the phone. Also, you can use any of the debugging features of Safari or Chrome to examine the code and check for errors. 
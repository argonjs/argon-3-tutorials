  var panoramaReality = new Argon.Reality.Panorama
  Argon.immersiveContext.setRequiredReality(panoramaReality)

  var pano = {
    type: 'equirectangular',
    source: 'pano2.jpg',
    headingOffset:0,
    cartographicDegrees: [33.7758,84.3947]
  }

  var woodruffPano = {
    type: 'skybox',
    source: {
      up:    'woodruff/up.png',
      down:  'woodruff/down.png',
      north: 'woodruff/north.png',
      east:  'woodruff/east.png',
      south: 'woodruff/south.png',
      west:  'woodruff/west.png'
    },
    headingOffset:0,
    cartographicDegrees: [33.7758,84.3947,0]
  }

    panoramaReality.setPanorama(woodruffPano)

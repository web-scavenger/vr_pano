

'use strict';
var panoramicApp = {
  opt: {
    linksArr: [],
    preloader: false,
    data: '',
    scenes: '',
    viewerLeft: '',
    viewerRight: '',
    enabled: false,
    controls: '',
    deviceOrientationControlMethod: '',
    deviceOrientationControlMethodBackUp: '',
    toggleElement: '',
    samePoint: false
  },
  initScreenApp: function () {
    this.opt.data = window.APP_DATA;
    var self = this;
    // Create viewer.
    //use for fullscreen mode like main image and in VRmode like left eye
    this.opt.viewerLeft = new Marzipano.Viewer(document.getElementById('panoLeft'));
    // use only in VR mode like right eye
    this.opt.viewerRight = new Marzipano.Viewer(document.getElementById('panoRight'));

    this.opt.toggleElement = document.getElementById('toggleDeviceOrientation');
    // Register the custom control method.
    this.opt.deviceOrientationControlMethod = new DeviceOrientationControlMethod();
    this.opt.deviceOrientationControlMethodBackUp = this.opt.deviceOrientationControlMethod;
    this.opt.controls = this.opt.viewerLeft.controls();
    // use for fullscreen mode. 
    document.body.classList.add('no-touch');
    window.addEventListener('touchstart', function () {
      document.body.classList.remove('no-touch');
      document.body.classList.add('touch');
    });

    this.opt.controls.registerMethod('deviceOrientation', this.opt.deviceOrientationControlMethod);
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      //open at mobiles vr mode first
      this.opt.enabled = false;
      this.toggle()

    }
    else {
      //open at desctops fullscreen mode  first
      this.opt.enabled = true;
      this.toggle()
    }
    // init all rooms and there link from data.js file
    this.opt.scenes = this.opt.data.scenes.map(function (data) {
      var urlPrefix = "media";
      var source_left = Marzipano.ImageUrlSource.fromString(
        urlPrefix + "/" + data.left_id + "/{z}/{f}/{y}/{x}.jpg",
        { cubeMapPreviewUrl: urlPrefix + "/" + data.left_id + "/preview.jpg" });
      var source_right = Marzipano.ImageUrlSource.fromString(
        urlPrefix + "/" + data.left_id + "/{z}/{f}/{y}/{x}.jpg",
        { cubeMapPreviewUrl: urlPrefix + "/" + data.left_id + "/preview.jpg" });
      var geometry = new Marzipano.CubeGeometry(data.levels);

      var limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
      var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);
      var scene = self.opt.viewerLeft.createScene({
        source: source_left,
        geometry: geometry,
        view: view,
        pinFirstLevel: true
      });
      var sceneRight = self.opt.viewerRight.createScene({
        source: source_right,
        geometry: geometry,
        view: view,
        pinFirstLevel: true
      });


      // Create link hotspots.
      data.linkHotspots.forEach(function (hotspot) {
        var element = self.createLinkHotspotElement(hotspot, data.name);
        scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      });


      return {
        data: data,
        scene: scene,
        sceneRight: sceneRight,
        view: view
      };
    });

    this.switchScene(this.opt.scenes[0]);
    this.opt.toggleElement.addEventListener('click', this.toggle.bind(this));
  },
  switchScene: function (scene) {
    panoramicApp.opt.linksArr = []
    for (var i = 0; i < scene.data.linkHotspots.length; i++) {
      var link = new LinkPointer(scene.data.linkHotspots[i], scene.data.name); // create every links like object with their methods. linkData.js
      panoramicApp.opt.linksArr.push(link);
    }

    scene.view.setParameters(scene.data.initialViewParameters);
    scene.scene.switchTo();
    scene.sceneRight.switchTo();

  },

  createLinkHotspotElement: function (hotspot, name) {
    var self = this;
    // Create wrapper element to hold icon and tooltip.
    
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('link-hotspot');
    wrapper.classList.add(name + hotspot.target);
    wrapper.id = hotspot.target;

    // Create image element.
    var icon = document.createElement('img');
    icon.src = 'img/link.png';
    icon.classList.add('link-hotspot-icon');

    // Set rotation transform.
    var transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];
    for (var i = 0; i < transformProperties.length; i++) {
      var property = transformProperties[i];

      icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
    }

    // Add click event handler.
    wrapper.addEventListener('click', function () {
      console.log(hotspot.target)
      self.switchScene(self.findSceneById(hotspot.target));
    });

    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
    self.stopTouchAndScrollEventPropagation(wrapper);

    // Create tooltip element. Open in fullscreen mode like name of room on link hover
    var tooltip = document.createElement('div');
    tooltip.classList.add('hotspot-tooltip');
    tooltip.classList.add('link-hotspot-tooltip');
    tooltip.innerHTML = self.findSceneDataById(hotspot.target).name;
    // console.log(self.findSceneDataById(hotspot.target).name)

    wrapper.appendChild(icon);
    wrapper.appendChild(tooltip);

    return wrapper;
  },
  stopTouchAndScrollEventPropagation: function (element, eventList) {

    var eventList = ['touchstart', 'touchmove', 'touchend', 'touchcancel',
      'wheel', 'mousewheel'];
    for (var i = 0; i < eventList.length; i++) {
      element.addEventListener(eventList[i], function (event) {


        event.stopPropagation();
      });
    }
  },
  findSceneById: function (id) {
    var self = this;
    for (var i = 0; i < self.opt.scenes.length; i++) {
      if (self.opt.scenes[i].data.left_id === id) {
        return self.opt.scenes[i];
      }
    }
    return null;
  },
  enable: function () {
    var self = this;
    
    document.getElementById('js-mobile__touchBLock').style.display = 'block';
    document.getElementById('js-point-block').style.display = 'flex';
    document.getElementById('panoLeft').style.width = '50%'
    document.getElementById('panoRight').style.width = '50%'
    this.opt.viewerLeft._updateSizeListener();
    this.opt.viewerRight._updateSizeListener()
    this.opt.deviceOrientationControlMethod.getPitch(function (err, pitch) {


      if (!err) {
        self.opt.scenes[0].view.setPitch(pitch);
      }
    });
    this.opt.enabled = true;
    this.opt.controls.enableMethod('deviceOrientation');
    this.opt.toggleElement.className = 'enabled';
  },

  disable: function () {
    
    this.opt.controls.disableMethod('deviceOrientation');
    this.opt.enabled = false;
    this.opt.toggleElement.className = '';
    document.getElementById('js-mobile__touchBLock').style.display = 'none';
    document.getElementById('js-point-block').style.display = 'none';
    
    document.getElementById('panoLeft').style.width = '100%'
    document.getElementById('panoRight').style.width = '0'
    this.opt.viewerLeft._updateSizeListener()
  },
  findSceneDataById: function (id) {
    var self = this;
    for (var i = 0; i < self.opt.data.scenes.length; i++) {
      if (self.opt.data.scenes[i].left_id === id) {
        return self.opt.data.scenes[i];
      }
    }
    return null;
  },

  toggle: function () {
    var self = this;
    
    if (this.opt.enabled) {
      self.disable();
    } else {
      self.enable();
    }
  },

}














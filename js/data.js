var APP_DATA = {
  "scenes": [
    {
      "left_id": "first_room/left",
      "right_id": "first_room/right",
      "name": "first__room",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "yaw": 2.8566080999656993,
        "pitch": 0.05606565234433347,
        "fov": 1.4134061960355204
      },
      "linkHotspots": [
        {
          "yaw": -2.435713032897233,
          "pitch": 0.06798434332706549,
          "rotation": 0,
          "target": "forth_room/left"
        },
        {
          "yaw": 1.5189078552005126,
          "pitch": 0.05774733283932143,
          "rotation": 0,
          "target": "second_room/left"
        }
      ],
      "infoHotspots": []
    },
    {
      "left_id": "second_room/left",
      "right_id": "second_room/right",
      "name": "second_room",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -3.06573922664718,
          "pitch": 0.04569193071841404,
          "rotation": 0,
          "target": "third_room/left"
        },
        {
          "yaw": -1.6449936209570062,
          "pitch": 0.0813433448256049,
          "rotation": 0,
          "target": "first_room/left"
        }
      ],
      "infoHotspots": []
    },
    {
      "left_id": "third_room/left",
      "right_id": "third_room/right",
      "name": "third_room",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [{
        "yaw": -2.3645133410861465,
        "pitch": -0.13093824114673502,
        "rotation": 0,
        "target": "second_room/left"
      }],
      "infoHotspots": []
    },
    {
      "left_id": "forth_room/left",
      "right_id": "forth_room/right",
      "name": "forth_room",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [{
        "yaw": -0.8650999406211497,
        "pitch": 0.0638337003881766,
        "rotation": 0,
        "target": "first_room/left"
      }],
      "infoHotspots": []
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "qtvr",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};

var map_01 = {
  "spawn": {
    "x": 0,
    "y": 3
  },
  "crystal": {
    "x": 15,
    "y": 5
  },
  "width": 16,
  "height": 9,
  "base_tile": {
    "buildable": true,
    "images": [
      "grass"
    ]
  },
  "tiles": [
    {
      "x": 5,
      "y": 5,
      "buildable": false,
      "images": [
        "grass",
        "rock-1"
      ]
    }
  ],
  "waves": [
    {
      "health": 4,
      "speed": 4,
      "amount": 5,
      "gold": 2,
      "gems": 0,
      "scale": 1,
      "images": [
        "creep-1"
      ]
    },
    {
      "health": 2,
      "speed": 8,
      "amount": 5,
      "gold": 1,
      "gems": 0,
      "scale": 0.5,
      "images": [
        "creep-2"
      ]
    },
    {
      "health": 20,
      "speed": 1,
      "amount": 1,
      "gold": 0,
      "gems": 1,
      "scale": 1.5,
      "images": [
        "creep-3"
      ]
    }
  ]
};

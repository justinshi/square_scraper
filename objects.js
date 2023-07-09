function Stage() {
  this.bottomLeft = {
    vertices: new Float32Array([
      -1.0, 0.0, -1.0,
      -1.0, -4, -1.0,
      -1.0, 0.0, 1.0,
      -1.0, -4, 1.0
    ]),
    triangleIndices: new Uint16Array([
      0, 1, 2,
      1, 3, 2
    ]),
    numVertices: 4,
    numTriangles: 2,
    color: [0.125, 0.125, 0.125, 1]
  };
  this.bottomRight = {
    vertices: new Float32Array([
      1.0, 0.0, 1.0,
      1.0, -4, 1.0,
      -1.0, 0.0, 1.0,
      -1.0, -4, 1.0
    ]),
    triangleIndices: new Uint16Array([
      0, 1, 2,
      1, 3, 2
    ]),
    numVertices: 4,
    numTriangles: 2,
    color: [0.375, 0.375, 0.375, 1]
  };
  this.topLeft = {
    vertices: new Float32Array([
      1.0, 0.0, -1.0,
      1.0, -4, -1.0,
      -1.0, 0.0, -1.0,
      -1.0, -4, -1.0
    ]),
    triangleIndices: new Uint16Array([
      0, 1, 2,
      1, 3, 2
    ]),
    numVertices: 4,
    numTriangles: 2,
    color: [0.875, 0.875, 0.875, 1]
  };
  this.topRight = {
    vertices: new Float32Array([
      1.0, 0.0, -1.0,
      1.0, -4, -1.0,
      1.0, 0.0, 1.0,
      1.0, -4, 1.0
    ]),
    triangleIndices: new Uint16Array([
      0, 1, 2,
      1, 3, 2
    ]),
    numVertices: 4,
    numTriangles: 2,
    color: [0.625, 0.625, 0.625, 1]
  };
}

function Character(wall) {
  if (wall == 0) {
    this.vertices = new Float32Array([
      -1.0, 0, -0.125,
      -1.0, 0.25, -0.125,
      -1.0, 0, 0.125,
      -1.0, 0.25, 0.125,
    ]);
    this.color = [0.5, 0, 0, 1];
  }
  else if (wall == 1) {
    this.vertices = new Float32Array([
      -0.125, 0, 1,
      -0.125, 0.25, 1,
      0.125, 0, 1,
      0.125, 0.25, 1,
    ]);
    this.color = [0, 0.5, 0, 1];
  }
  else if (wall == 2) {
    this.vertices = new Float32Array([
      -0.125, 0, -1,
      -0.125, 0.25, -1,
      0.125, 0, -1,
      0.125, 0.25, -1,
    ]);
    this.color = [1, 1, 0, 1];
  }
  else if (wall == 3) {
    this.vertices = new Float32Array([
      1.0, 0, -0.125,
      1.0, 0.25, -0.125,
      1.0, 0, 0.125,
      1.0, 0.25, 0.125,
    ]);
    this.color = [0, 0, 0.5, 1];
  }
  this.triangleIndices = new Uint16Array([
    0, 1, 2,
    2, 1, 3
  ]);
  this.numTriangles = 2;
  this.numVertices = 4;
  this.wall = wall;
  this.alive = true;
}

function Meteor(wall, initial, v) {
  this.v = v
  if (wall == 0) {
    this.vertices = new Float32Array([
      -1, 3, initial - 0.0625,
      -1, 3.125, initial - 0.0625,
      -1, 3, initial + 0.0625,
      -1, 3.125, initial + 0.0625,
    ]);
    this.color = [0.5, 0, 0, 1];
  }
  else if (wall == 1) {
    this.vertices = new Float32Array([
      initial - 0.0625, 3, 1,
      initial - 0.0625, 3.125, 1,
      initial + 0.0625, 3, 1,
      initial + 0.0625, 3.125, 1,
    ]);
    this.color = [0, 0.5, 0, 1];
  }
  else if (wall == 2) {
    this.vertices = new Float32Array([
      initial - 0.0625, 3, -1,
      initial - 0.0625, 3.125, -1,
      initial + 0.0625, 3, -1,
      initial + 0.0625, 3.125, -1,
    ]);
    this.color = [1, 1, 0, 1];
  }
  else if (wall == 3) {
    this.vertices = new Float32Array([
      1.0, 3, initial - 0.0625,
      1.0, 3.125, initial - 0.0625,
      1.0, 3, initial + 0.0625,
      1.0, 3.125, initial + 0.0625,
    ]);
    this.color = [0, 0, 0.5, 1];
  }
  this.triangleIndices = new Uint16Array([
    0, 1, 2,
    2, 1, 3
  ]);
  this.numTriangles = 2;
  this.numVertices = 4;
  this.wall = wall;
}

function Lava(wall, initial) {
  if (wall == 0) {
    this.vertices = new Float32Array([
      -1.05, 0.01, initial - 0.125,
      -0.95, 0.01, initial - 0.125,
      -1.05, 0.01, initial + 0.125,
      -0.95, 0.01, initial + 0.125,
    ]);
    this.color = [0, 0, 0, 1];
  }
  else if (wall == 1) {
    this.vertices = new Float32Array([
      initial - 0.125, 0.01, 1.05,
      initial - 0.125, 0.01, 0.95,
      initial + 0.125, 0.01, 1.05,
      initial + 0.125, 0.01, 0.95,
    ]);
    this.color = [0, 0, 0, 1];
  }
  else if (wall == 2) {
    this.vertices = new Float32Array([
      initial - 0.125, 0.01, -1.05,
      initial - 0.125, 0.01, -0.95,
      initial + 0.125, 0.01, -1.05,
      initial + 0.125, 0.01, -0.95,
    ]);
    this.color = [0, 0, 0, 1];
  }
  else if (wall == 3) {
    this.vertices = new Float32Array([
      1.05, 0.01, initial - 0.125,
      0.95, 0.01, initial - 0.125,
      1.05, 0.01, initial + 0.125,
      0.95, 0.01, initial + 0.125,
    ]);
    this.color = [0, 0, 0, 1];
  }
  this.triangleIndices = new Uint16Array([
    0, 1, 2,
    2, 1, 3
  ]);
  this.numTriangles = 2;
  this.numVertices = 4;
  this.wall = wall;
  this.alive = 0;
  setInterval(function (self) {
    self.alive = 1;
    self.color = [1, 1, 1, 1];
    setInterval(function (self) {
      self.alive = 2;
    }, 3000, self)
  }, 3000, this);
}

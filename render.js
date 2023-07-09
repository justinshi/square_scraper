var vertexBuffer = null;
var indexBufferTriangles = null;
var shaderProgram = null;
var aPositionIndex = 0;
var uModelViewProjectionLocation = -1;
var uColorLocation = -1;
var angle = 35;

function initShaders() {
  var vertexShaderSource = "\
    uniform mat4 u_modelviewprojection;\n\
    attribute vec3 a_position;\n\
    void main(void) {\n\
      gl_Position = u_modelviewprojection * vec4(a_position, 1.0);\n\
    }\n\
  ";

  var fragmentShaderSource = "\
    precision highp float;\n\
    uniform vec4 u_color;\n\
    void main(void) {\n\
      gl_FragColor = u_color;\n\
    }\n\
  ";

  var vertexShader = context.createShader(context.VERTEX_SHADER);
  context.shaderSource(vertexShader, vertexShaderSource);
  context.compileShader(vertexShader);

  var fragmentShader = context.createShader(context.FRAGMENT_SHADER);
  context.shaderSource(fragmentShader, fragmentShaderSource);
  context.compileShader(fragmentShader);

  shaderProgram = context.createProgram();
  context.attachShader(shaderProgram, vertexShader);
  context.attachShader(shaderProgram, fragmentShader);
  context.bindAttribLocation(shaderProgram, aPositionIndex, "a_position");
  context.linkProgram(shaderProgram);

  uColorLocation = context.getUniformLocation(shaderProgram, "u_color");
  uModelViewProjectionLocation = context.getUniformLocation(shaderProgram, "u_modelviewprojection");
}

function createBuffers(primitive) {
  vertexBuffer = context.createBuffer();
  context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
  context.bufferData(context.ARRAY_BUFFER, primitive.vertices, context.STATIC_DRAW);
  context.bindBuffer(context.ARRAY_BUFFER, null);

  indexBufferTriangles = context.createBuffer();
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBufferTriangles);
  context.bufferData(context.ELEMENT_ARRAY_BUFFER, primitive.triangleIndices, context.STATIC_DRAW);
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
}

function drawPrimitive(primitive) {
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;

  context.viewport(0, 0, width, height);
  var projMat = SglMat4.perspective(0.7, width / height, 0.1, 10);
  var viewMat = SglMat4.lookAt([0, 2, 5.5], [0, 0.25, 0], [0, 1, 0]);
  var modelMat = SglMat4.rotationAngleAxis(sglDegToRad(angle), [0, 1, 0]);
  var modelviewprojMat = SglMat4.mul(projMat, SglMat4.mul(viewMat, modelMat));

  context.enable(context.DEPTH_TEST);
  context.useProgram(shaderProgram);

  context.uniformMatrix4fv(uModelViewProjectionLocation, false, modelviewprojMat);

  context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
  context.enableVertexAttribArray(aPositionIndex);
  context.vertexAttribPointer(aPositionIndex, 3, context.FLOAT, false, 0, 0);

  context.enable(context.POLYGON_OFFSET_FILL);
  context.polygonOffset(1.0, 1.0);
  context.uniform4f(uColorLocation, primitive.color[0], primitive.color[1], primitive.color[2], primitive.color[3]);
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBufferTriangles);
  context.drawElements(context.TRIANGLES, primitive.triangleIndices.length, context.UNSIGNED_SHORT, 0);

  context.disable(context.POLYGON_OFFSET_FILL);
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, null);
  context.disableVertexAttribArray(aPositionIndex);
  context.bindBuffer(context.ARRAY_BUFFER, null);
  context.useProgram(null);
  context.disable(context.DEPTH_TEST);
  if (document.getElementById("rotation").checked) {
    angle += 0.04;
    if (angle == 360) {
      angle = 0;
    }
  }
}

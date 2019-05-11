uniform mat4 worldViewProjection;

attribute vec4 position;
attribute vec2 texcoord;

varying vec4 v_position;
varying vec2 v_texCoord;

void main() {
  v_texCoord = texcoord;
  gl_Position = worldViewProjection * position;
}

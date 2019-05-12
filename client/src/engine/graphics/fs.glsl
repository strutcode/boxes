precision mediump float;

uniform sampler2D diffuseTex;
varying vec2 v_texCoord;

void main() {
  gl_FragColor = texture2D(diffuseTex, v_texCoord);
}

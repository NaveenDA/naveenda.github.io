
varying vec2 vUv;
// import time
uniform float uTime;

void main() 
{
    vUv = uv;
    vec4 modelPosition = vec4(position, 1.0);
    // just add a little bit of noise to the y position
    modelPosition.y += sin(position.x * 5.0 + uTime) * 0.1;
    //same for the x position
    modelPosition.x -= cos(position.y * 5.0 + uTime) * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * modelPosition;
}
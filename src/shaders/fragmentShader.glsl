varying vec2 vUv;
uniform sampler2D globalTexture;

void main() 
{
    vec4 color = texture2D(globalTexture, vUv);

    gl_FragColor = vec4(color.r, color.g, color.b, 1.0);
}
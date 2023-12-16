// src/main.ts

import * as THREE from "three";
import "./style.css";
import vertexShader from "./shaders/vertexShader.glsl?raw";
import fragmentShader from "./shaders/fragmentShader.glsl?raw";

// Create a Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  // alpha: true,
  antialias: true
});

// reset the size of the renderer and canvas
let innerWidth = window.innerWidth - 20;
let innerHeight = window.innerHeight - 20;

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// add scene background as radial gradient from #F6F6F6 to #E8ECF5
scene.background = new THREE.Color(0x000000);

// create a group to hold all the objects
const group = new THREE.Group();

// create new material for the sphere
const sphereMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  wireframe: false,
  uniforms: {
    uTime: { value: 0 },
    uFrequency: { value: new THREE.Vector2(20, 15) },
    globalTexture: { value: new THREE.TextureLoader().load("/img/Mars_Map.png") }
  }
});

const geometry = new THREE.SphereGeometry(1, 60, 60);
const sphere = new THREE.Mesh(geometry, sphereMaterial);

// add the sphere to the group
group.add(sphere);

// Add the sphere to the scene
scene.add(sphere);

// add another sphere to the scene to atmosphere effect
const atmosphereGeometry = new THREE.SphereGeometry(1.1, 60, 60);
const atmosphereMaterial = new THREE.ShaderMaterial({
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    void main() {
     
      float intensity = pow(0.8 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
      gl_FragColor = vec4(0.4, 0.1, 0.0, 1.0) * intensity;
    }
  `,
  wireframe: false,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  uniforms: {
    uTime: { value: 0 },
    uFrequency: { value: new THREE.Vector2(20, 15) },
  }
});
const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
scene.add(atmosphere);

// add atmosphere to the group
group.add(atmosphere);



// Position the camera
camera.position.z = 5;

// add a directional light just above the sphere
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 0);
scene.add(light);

// add an ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


// add around 1000 stars using a random position
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({
  color: 0xffffff
});

const stars = [];
for (let i = 0; i < 1000; i++) {
  const star = new THREE.Vector3();
  star.x = THREE.MathUtils.randFloatSpread(2000);
  star.y = THREE.MathUtils.randFloatSpread(2000);
  star.z = THREE.MathUtils.randFloatSpread(2000);
  stars.push(star);
}

starsGeometry.setFromPoints(stars);
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);


// add shooting stars using a random position
const shootingStarsGeometry = new THREE.BufferGeometry();
const shootingStarsMaterial = new THREE.PointsMaterial({
  color: 0xffffff
});

const shootingStars = [];
for (let i = 0; i < 10; i++) {
  const shootingStar = new THREE.Vector3();
  shootingStar.x = THREE.MathUtils.randFloatSpread(2000);
  shootingStar.y = THREE.MathUtils.randFloatSpread(2000);
  shootingStar.z = THREE.MathUtils.randFloatSpread(2000);
  shootingStars.push(shootingStar);
}

shootingStarsGeometry.setFromPoints(shootingStars);
const shootingStarsField = new THREE.Points(shootingStarsGeometry, shootingStarsMaterial);
scene.add(shootingStarsField);


const time = new THREE.Clock();

const loop = () => {
  const delta = time.getDelta();

  // update the time uniform
  sphereMaterial.uniforms.uTime.value += delta;

  // rotate the sphere
  sphere.rotation.y += 0.005;

  // move the shooting stars
  shootingStarsField.position.y -= 0.5;
  shootingStarsField.position.x -= 0.5;
  
  // reset the shooting stars position
  if (shootingStarsField.position.y < -1000) {
    shootingStarsField.position.y = 1000;
  }
  if (shootingStarsField.position.x < -1000) {
    shootingStarsField.position.x = 1000;
  }

  requestAnimationFrame(loop);

  renderer.render(scene, camera);
};

loop();

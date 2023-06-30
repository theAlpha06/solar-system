import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn ring.png';
import uranusTexture from '../img/uranus.jpg';
import uranusRingTexture from '../img/uranus ring.png';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';

const progressBarContainer = document.querySelector('.progress-bar-container');
const progressBar = document.getElementById('progress-bar');
THREE.DefaultLoadingManager.onLoad = function ( ) {
    progressBarContainer.style.display = 'none';
};
THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	progressBar.value = itemsLoaded / itemsTotal * 100;
};

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
]);


const sunGeometry = new THREE.SphereGeometry(16, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(sunTexture),
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const textureLoader = new THREE.TextureLoader();

const createPlanet = (radius, texture, x, ringPlanet) => {
    const geometry = new THREE.SphereGeometry(radius, 35, 35);
    const material = new THREE.MeshStandardMaterial();
    var tex = textureLoader.load(texture);
    material.map = tex;
    const planet = new THREE.Mesh(geometry, material);
    planet.position.x = x;
    const origin = new THREE.Object3D();
    if (ringPlanet) {
        const ringGeometry = new THREE.RingGeometry(ringPlanet.innerRadius, ringPlanet.outerRadius, 35);
        const ringMaterial = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(ringPlanet.texture),
            side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        origin.add(ring);
        ring.position.x = x;
        ring.rotation.x = Math.PI / 2;
    }
    origin.add(planet);
    scene.add(origin);
    return { planet, origin };
};

const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const saturn = createPlanet(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture,
});
const uranus = createPlanet(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture,
});
const neptune = createPlanet(7, neptuneTexture, 200);
const pluto = createPlanet(2.8, plutoTexture, 216);


const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);

function animate() {
    sun.rotateY(0.004);
    mercury.planet.rotateY(0.004);
    mercury.origin.rotateY(0.04);
    venus.planet.rotateY(0.002);
    venus.origin.rotateY(0.015);
    earth.planet.rotateY(0.02);
    earth.origin.rotateY(0.01);
    mars.planet.rotateY(0.018);
    mars.origin.rotateY(0.008);
    jupiter.planet.rotateY(0.04);
    jupiter.origin.rotateY(0.002);
    saturn.planet.rotateY(0.038);
    saturn.origin.rotateY(0.0009);
    uranus.planet.rotateY(0.03);
    uranus.origin.rotateY(0.0004);
    neptune.planet.rotateY(0.032);
    neptune.origin.rotateY(0.0001);
    pluto.planet.rotateY(0.008);
    pluto.origin.rotateY(0.00007);
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

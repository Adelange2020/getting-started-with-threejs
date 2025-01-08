import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.1;

const geosize = 2.0;
const geodetail = 3;

// Icosphere geo1
const geo = new THREE.IcosahedronGeometry(geosize, geodetail);
const mat = new THREE.MeshToonMaterial({
    color: 0xff1568,
    flatShading: true,
    wireframe: false,
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// Wireframe geo2
const geo2 = new THREE.IcosahedronGeometry((geosize*2), geodetail);
const mat2 = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const mesh2 = new THREE.Mesh(geo2, mat2)
mesh2.scale.setScalar(1.1);
scene.add(mesh2);

const hemilight = new THREE.HemisphereLight(0xffffff, 0xff5500);
scene.add(hemilight);

function animate(t = 0){
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0002;
    mesh2.rotation.y = t * -0.0001;
    renderer.render(scene, camera);
    controls.update();
}

animate()

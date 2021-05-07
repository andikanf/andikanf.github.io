var cam_pos_refs = [
    [0, 20, 0],
    [0, 3, 10],
    [5, 3, 5],
    [5, 3, -5],
    [-5, 3, -5],
    [-5, 3, 5]
];
var pov_id = 0;
var max_pov_id = cam_pos_refs.length - 1;
var inf_loop = false;
var trans_speed = 1000;
var fontLoader = new THREE.FontLoader();
var gltfLoader = new THREE.GLTFLoader();
var objLoader = new THREE.OBJLoader();

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(cam_pos_refs[pov_id][0], cam_pos_refs[pov_id][1], cam_pos_refs[pov_id][2]);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Objects
var geometry, material;

geometry = new THREE.CircleBufferGeometry(5, 100, 0, Math.PI * 2);
material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
mesh.rotation.x = Math.PI / 2;
scene.add(mesh);

geometry = new THREE.CircleBufferGeometry(5, 100, 0, Math.PI)
material = new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide });
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);

material = new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide });
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
mesh.rotation.y = Math.PI / 2;
scene.add(mesh);

geometry = new THREE.BoxBufferGeometry();
material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(1, 1, -1);

geometry = new THREE.TorusKnotBufferGeometry();
material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const torus = new THREE.Mesh(geometry, material);
torus.position.set(2, 2, 2);

scene.add(cube, torus);

fontLoader.load('/fonts/helvetiker_regular.typeface.json', function (font) {
    var textGeo = new THREE.TextGeometry("Hehehe XD", {
        font: font,
        size: 1,
        height: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05
    });
    var textMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    var mesh = new THREE.Mesh(textGeo, textMaterial);
    mesh.position.set(-4, 0, -3);
    scene.add(mesh);
});

gltfLoader.load('/models/mosque/mosque.gltf', function (gltf) {
    let mesh = gltf.scene;
    mesh.position.set(-2, 0, -2);
    mesh.scale.set(0.2, 0.2, 0.2);
    mesh.rotation.y = Math.PI;
    scene.add(mesh);
});

objLoader.load('/models/bench/bench.obj', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material.color.setHex(0x964B00);
        }
    });
    object.position.set(-2, 0, -5);
    object.scale.set(0.1, 0.1, 0.1);
    scene.add(object);
});
objLoader.load('/models/stickman/stickman.obj', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material.color.setHex(0xba34eb);
            child.geometry.center();
        }
    });
    object.position.set(3, 0.5, 3);
    object.scale.set(0.01, 0.01, 0.01);
    console.log(object);
    scene.add(object);
});

function addStar() {
    geometry = new THREE.SphereBufferGeometry(0.25, 24, 24);
    material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

// Lights
const ambientLight = new THREE.AmbientLight(0x666666);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-1, 2, 1);

scene.add(ambientLight, pointLight);

// Helper
const ligthHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper()

scene.add(ligthHelper);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.02;
    cube.rotation.y += 0.04;
    cube.rotation.z += 0.06;

    torus.rotation.x -= 0.02;
    torus.rotation.y -= 0.04;
    torus.rotation.z -= 0.06;

    TWEEN.update();
    camera.lookAt(0, 0.5, 0);

    renderer.render(scene, camera);
}

function moveCamera(pov_id) {
    new TWEEN.Tween(camera.position).to({
        x: cam_pos_refs[pov_id][0],
        y: cam_pos_refs[pov_id][1],
        z: cam_pos_refs[pov_id][2]
    }, trans_speed)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
}

function next_pov() {
    pov_id += 1;
    if (pov_id > max_pov_id) {
        if (inf_loop) {
            pov_id = 0;
        }
        else {
            pov_id = max_pov_id;
        }
    }
    moveCamera(pov_id);
}

function prev_pov() {
    pov_id -= 1;
    if (pov_id < 0) {
        if (inf_loop) {
            pov_id = max_pov_id;
        }
        else {
            pov_id = 0;
        }
    }
    moveCamera(pov_id);
}

// window.onwheel = e => {
//     if (e.deltaY >= 0) {
//         // Scrolling Down with mouse
//         next_pov();
//     } else {
//         // Scrolling Up with mouse
//         prev_pov();
//     }
// }

$("#btn-next").on('click', function () {
    next_pov();
});
$("#btn-prev").on('click', function () {
    prev_pov();
});
animate();
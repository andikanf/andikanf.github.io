// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x222222 );

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-4, 4, 7);

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Objects
var geometry;
var material;

geometry = new THREE.BoxBufferGeometry();
material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-1, -1, -1);

geometry = new THREE.TorusKnotBufferGeometry();
material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const torus = new THREE.Mesh(geometry, material);
torus.position.set(2, 2, 2);

scene.add(cube, torus);

var loader = new THREE.FontLoader();
loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
    var textGeo = new THREE.TextGeometry( "Hehehe XD", {
        font: font,
		size: 1,
		height: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05
    } );
    var textMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    var mesh = new THREE.Mesh( textGeo, textMaterial );
    mesh.position.set( -4, 0, -3 );
    scene.add( mesh );
} );

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

scene.add(ligthHelper, gridHelper);

// Control
const controls = new THREE.OrbitControls(camera, renderer.domElement)


function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.02;

    torus.rotation.x -= 0.01;
    torus.rotation.y -= 0.01;
    torus.rotation.z -= 0.02;

    controls.update();

    renderer.render(scene, camera);
}
animate();
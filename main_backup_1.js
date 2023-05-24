// document.addEventListener('click', musicPlay);
window.addEventListener('load', function() {
  $("#div-invitee").show();
  $("#btn-audio").show();
  $("#btn-start").show();
})

// function musicPlay() {
//     document.getElementById('playAudio').play();
//     document.removeEventListener('click', musicPlay);
// }

var hidingHeight = 100;
const startCoord = [40,40,30];
const lookAt = [0,3,0];
var objLoader = new THREE.OBJLoader();
var fontLoader = new THREE.FontLoader();
// var imageLoader = new THREE.ImageLoader();
var mtlLoader = new THREE.MTLLoader();
var gltfLoader = new THREE.GLTFLoader();
// var stlLoader = new THREE.STLLoader();
// var fbxLoader = new THREE.FBXLoader();
var mixer;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x101010 );

// Camera
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(startCoord[0], startCoord[1], startCoord[2]);

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Objects
var geometry;
var material;

var clock = new THREE.Clock();

var ring1 = new THREE.Mesh();
mtlLoader.load( "/models/ring/ring2.mtl", function( materials ) {
    materials.preload();
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.load( "/models/ring/ring2.obj", function ( object ) {
        ring1 = object;
        ring1.position.set(startCoord[0]*0.5,startCoord[1]*0.5,startCoord[2]*0.6);
        ring1.rotation.set(Math.PI*-1/6,0,0);
        ring1.scale.set(1,1,1);
        scene.add( ring1 );
    });
});

var ring2 = new THREE.Mesh();
mtlLoader.load( "/models/ring/ring2.mtl", function( materials ) {
    materials.preload();
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.load( "/models/ring/ring2.obj", function ( object ) {
        ring2 = object;
        ring2.position.set(startCoord[0]*0.5,startCoord[1]*0.45,startCoord[2]*0.45);
        ring2.rotation.set(Math.PI*1/6,0,0);
        ring2.scale.set(1,1,1);
        scene.add( ring2 );
    });
});

geometry = new THREE.BoxBufferGeometry(20,0.1,20);
material = new THREE.MeshStandardMaterial({ color: 0x7c5e42});
const base = new THREE.Mesh(geometry, material);
base.scale.set(0,0,0);
base.position.set(0, -0.05, 0);

geometry = new THREE.BoxBufferGeometry();
material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-1, 3, -1);

geometry = new THREE.TorusKnotBufferGeometry();
material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const torus = new THREE.Mesh(geometry, material);
torus.position.set(2, 2, 2);

scene.add(base
  // , cube, torus
);


var bench = new THREE.Mesh();
mtlLoader.load( "/models/bench/bench2.mtl", function( materials ) {
    materials.preload();
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.load( "/models/bench/bench2.obj", function ( object ) {
      bench = object;
      bench.position.set(-3,0,4);
      bench.rotation.set(0,Math.PI*0.7,0);
      bench.scale.set(0,0,0);
        scene.add( bench );
    });
});
function bench_animate() {
  var scale = {x: 0,y: 0, z: 0};
  if ([1,2,3,4,5].includes(pov_id)) {
    var scale = {x: 0.03,y: 0.03, z: 0.03};
  }
  new TWEEN.Tween(bench.scale).to(scale, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

var tree;
mtlLoader.load( "/models/tree/tree.mtl", function( materials ) {
    materials.preload();
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.load( "/models/tree/tree.obj", function ( object ) {
        tree = object;
        tree.position.set(-8,0,0);
        tree.scale.set(0,0,0);
        scene.add( tree );
    });
});
function tree_animate() {
  var scale = {x: 0, y: 0, z: 0};
  if ([1,2].includes(pov_id)) {
    var scale = {x: 0.5, y: 0.5, z: 0.5};
  }
  if ([3,4].includes(pov_id)) {
    var scale = {x: 0.4, y: 0.4, z: 0.4};
  }
  if ([5].includes(pov_id)) {
    var scale = {x: 0.3, y: 0.3, z: 0.3};
  }
  new TWEEN.Tween(tree.scale).to(scale, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

var dika1_mat = new THREE.MeshBasicMaterial({
  map:new THREE.TextureLoader().load('/img/dika.jpg')
});
dika1_mat.map.minFilter = THREE.LinearFilter;
var dika1_geo = new THREE.BoxBufferGeometry(12, 12, 0.1);
var dika1 = new THREE.Mesh(dika1_geo, dika1_mat);
dika1.geometry.center();
dika1.scale.set(0,0,0);
dika1.position.set(0, 7, 0);
dika1.rotation.set(0,Math.PI*1/2,0);
// scene.add(dika1);
function dika1_animate() {
  if (pov_id == 2) {
    var scale = {x: 1,y: 1, z: 1};
  }
  else {
    var scale = {x: 0,y: 0, z: 0};
  }
  new TWEEN.Tween(dika1.scale).to(scale, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

var mabelle1_mat = new THREE.MeshBasicMaterial({
  map:new THREE.TextureLoader().load('/img/mabel.jpg')
});
mabelle1_mat.map.minFilter = THREE.LinearFilter;
var mabelle1_geo = new THREE.BoxBufferGeometry(12, 12, 0.1);
var mabelle1 = new THREE.Mesh(mabelle1_geo, mabelle1_mat);
mabelle1.scale.set(0,0,0);
mabelle1.position.set(0, 8, 0);
mabelle1.rotation.set(0,Math.PI*-1/4,0);
// scene.add(mabelle1);
function mabelle1_animate() {
  if (pov_id == 3) {
    var scale = {x: 1,y: 1, z: 1};
  }
  else {
    var scale = {x: 0,y: 0, z: 0};
  }
  new TWEEN.Tween(mabelle1.scale).to(scale, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

var stadium;
mtlLoader.load( "/models/stadium/stadium.mtl", function( materials ) {
    materials.preload();
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.load( "/models/stadium/stadium.obj", function ( object ) {
        stadium = object;
        stadium.position.set(0,0,0);
        stadium.rotation.set(Math.PI*-1/2,0,Math.PI*-1/8);
        stadium.scale.set(0,0,0);
        scene.add( stadium );
    });
});
function stadium_animate() {
  if ([6,7].includes(pov_id)) {
    var scale = {x: 0.0003,y: 0.0003, z: 0.0003};
  }
  else {
    var scale = {x: 0,y: 0, z: 0};
  }
  new TWEEN.Tween(stadium.scale).to(scale, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

// var cake = new THREE.Mesh();
// mtlLoader.load( "/models/cake/cake.mtl", function( materials ) {
//     materials.preload();
//     objLoader = new THREE.OBJLoader();
//     objLoader.setMaterials( materials );
//     objLoader.load( "/models/cake/cake.obj", function ( object ) {
//       cake = object;
//       cake.position.set(0,1,-4);
//       cake.rotation.set(Math.PI*-0.5,Math.PI*0,Math.PI*0)
//       cake.scale.set(0,0,0);
//         scene.add( cake );
//     });
// });

var cake = new THREE.Mesh();
gltfLoader.load( "/models/cake/cake2/scene.gltf", function( object ) {
  cake = object.scene.children[0];
  cake.position.set(2,-1,-6);
  cake.rotation.set(Math.PI*-0.5,Math.PI*0,Math.PI*0)
  cake.scale.set(0,0,0);
  scene.add( cake );
});
function cake_animate() {
  var scale = {x: 0,y: 0, z: 0};
  if ([1,2].includes(pov_id)) {
    var scale = {x: 2,y: 2, z: 2};
  }
  if ([3,4].includes(pov_id)) {
    var scale = {x: 2.2,y: 2.2, z: 2.2};
  }
  if ([5].includes(pov_id)) {
    var scale = {x: 2.5,y: 2.5, z: 2.5};
  }
  new TWEEN.Tween(cake.scale).to(scale, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

var pond = new THREE.Mesh();
gltfLoader.load( "/models/pond/scene.gltf", function( gltf ) {
  pond = gltf.scene.children[0];
  pond.position.set(5,1,5);
  pond.scale.set(0,0,0);
  scene.add( pond );
});
function pond_animate() {
  var scale = {x: 0,y: 0, z: 0};
  if ([1,2,3,4,5].includes(pov_id)) {
    var scale = {x: 0.3,y: 0.3, z: 0.5};
  }
  new TWEEN.Tween(pond.scale).to(scale, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

var calendar_base_mat = new THREE.MeshBasicMaterial({
  map:new THREE.TextureLoader().load('/img/calendar.png')
});
calendar_base_mat.map.minFilter = THREE.LinearFilter;
var calendar_base_geo = new THREE.BoxBufferGeometry(7, 7, 0.5);
var calendar_base = new THREE.Mesh(calendar_base_geo, calendar_base_mat);
calendar_base.scale.set(0,0,0);
calendar_base.position.set(0, 9, -5);
calendar_base.rotation.set(Math.PI/7,0,0);
scene.add(calendar_base);
function calendar_base_animate() {
  if (pov_id == 4) {
    var scale = {x: 1,y: 1, z: 1};
  }
  else {
    var scale = {x: 0,y: 0, z: 0};
  }
  new TWEEN.Tween(calendar_base.scale).to(scale, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

// calendar_mark
var calendar_day;
var bride;
var welcome;
var url_string = window.location.href; 
var url = new URL(url_string);
var welcome_text = "   Dika\nMabelle";
fontLoader.load( '/fonts/geraldine.typeface.json', function ( font ) {
    var welcome_geo = new THREE.TextGeometry( welcome_text, {
        font: font,
        size: 1,
        height: 0.1,
        curveSegments: 30
    });
    var welcome_mat = new THREE.ShaderMaterial({
      uniforms: {
        color1: {
          value: new THREE.Color("white")
        },
        color2: {
          value: new THREE.Color("white")
        }
      },
      vertexShader: `
        varying vec2 vUv;
    
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
      
        varying vec2 vUv;
        
        void main() {
          gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
        }
      `,
      wireframe: true
    });
    welcome = new THREE.Mesh( welcome_geo, welcome_mat );
    welcome.geometry.center();
    welcome.scale.set(1,1,1);
    welcome.rotation.set( Math.PI*-0.05, Math.PI*0.3, Math.PI*0.03 );
    welcome.position.set( startCoord[0]*0.9, startCoord[1]*0.9, startCoord[2]*0.9 );
    scene.add( welcome );
  });


var undang_bool = url.searchParams.get("u");
var undang_text = "Kebahagiaan bagi kami, \n         apabila anda\nberkenan untuk hadir &\n memberikan doa restu.";
if (undang_bool == "n") {
  undang_text = "Mohon maaf kami belum\ndapat mengundang anda.\nAtas doa restunya,\nkami ucapkan terima kasih.";
}
fontLoader.load( '/fonts/helvetiker_regular.typeface.json', function ( font ) {
    var undang_geo = new THREE.TextGeometry(undang_text, {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12
    });
    var undang_mat = new THREE.MeshPhongMaterial( { color: 0xffffff } );
    undang = new THREE.Mesh( undang_geo, undang_mat );
    undang.geometry.center();
    undang.scale.set(1,1,1);
    undang.rotation.set( Math.PI*0, Math.PI*0, Math.PI*0 );
    undang.position.set( 5, hidingHeight, -5 );
    scene.add( undang );

    var intro_geo = new THREE.TextGeometry( " Bismillahirrahmanirrahim,\ndengan ridho Allah SWT,\n    insyaAllah kami akan\nmelaksanakan pernikahan", {
        font: font,
        size: 0.8,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: false,
    });
    var intro_mat = new THREE.MeshPhongMaterial( { color: 0xffffff } );
    intro = new THREE.Mesh( intro_geo, intro_mat );
    intro.geometry.center();
    intro.scale.set(1,1,1);
    intro.rotation.set( 0, Math.PI*1/4, 0 );
    intro.position.set( 5, hidingHeight, -5 );
    scene.add( intro );
    
    var groom_geo = new THREE.TextGeometry( "    Andika\nNur Fadhilah", {
        font: font,
        size: 0.9,
        height: 0.2,
        curveSegments: 12
    });
    var groom_mat = new THREE.MeshPhongMaterial( { color: 0xffffff } );
    groom = new THREE.Mesh( groom_geo, groom_mat );
    groom.geometry.center();
    groom.scale.set(1,1,1);
    groom.rotation.set( Math.PI*0, Math.PI*1/2, Math.PI*0 );
    groom.position.set( 5, hidingHeight, -5 );
    scene.add( groom );
    
    var bride_geo = new THREE.TextGeometry( "        Mabelle\nBudi Sekarwangi", {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12
    });
    var bride_mat = new THREE.MeshPhongMaterial( { color: 0xffffff } );
    bride = new THREE.Mesh( bride_geo, bride_mat );
    bride.geometry.center();
    bride.scale.set(1,1,1);
    bride.rotation.set( 0, Math.PI*3/4, 0 );
    bride.position.set( 5, hidingHeight, -5 );
    scene.add( bride );
    
    var calendar_day_geo = new THREE.TextGeometry("    Resepsi\n11:00-14:00", {
        font: font,
		    size: 1.3,
		    height: 0.1,
        bevelEnabled: false,
        bevelThickness: 0.05,
        bevelSize: 0.05,
    });
    var calendar_day_mat = new THREE.MeshPhongMaterial( { color: 0x00FFFF } );
    calendar_day = new THREE.Mesh( calendar_day_geo, calendar_day_mat );
    calendar_day.geometry.center();
    calendar_day.scale.set(1,1,1);
    calendar_day.rotation.set( Math.PI/6, Math.PI*5/4, Math.PI/8 );
    calendar_day.position.set( 0, hidingHeight, 0 );
    scene.add( calendar_day );

    var venue_geo = new THREE.TextGeometry( "    Telkom\nSportainment\n   Sukasari\n   Bandung", {
      font: font,
      size: 1,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 0.05,
      bevelSize: 0.05,
    });
    var venue_mat = new THREE.MeshPhongMaterial( { color: 0xdddddd } );
    venue = new THREE.Mesh( venue_geo, venue_mat );
    venue.geometry.center();
    venue.scale.set(1,1,1);
    venue.rotation.set( 0, Math.PI*-3/8, 0 );
    venue.position.set( -5, hidingHeight, 5 );
    scene.add( venue );
} );

function intro_animate() {
  var position = {x: 5,y: hidingHeight, z: -5};
  if (pov_id == 1) {
    var position = {x: lookAt[0]-2,y: lookAt[1]+7, z: lookAt[2]-2};
  }
  new TWEEN.Tween(intro.position).to(position, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

function groom_animate() {
  $("#div-parent-groom").hide()
  var position = {x: 5,y: hidingHeight, z: -5};
  if (pov_id == 2) {
    $("#div-parent-groom").show()
    var position = {x: lookAt[0],y: lookAt[1]+7.8, z: lookAt[2]};
  }
  new TWEEN.Tween(groom.position).to(position, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

function bride_animate() {
  $("#div-parent-bride").hide()
  var position = {x: 5,y: hidingHeight, z: -5};
  if (pov_id == 3) {
    $("#div-parent-bride").show()
    var position = {x: lookAt[0],y: lookAt[1]+8.6, z: lookAt[2]};
  }
  new TWEEN.Tween(bride.position).to(position, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

function calendar_day_animate() {
  var position = {x: 0,y: hidingHeight, z: 0};
  if (pov_id == 5) {
    var position = {x: lookAt[0],y: lookAt[1]+6, z: lookAt[2]};
  }
  new TWEEN.Tween(calendar_day.position).to(position, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

function venue_animate() {
  var position = {x: -5,y: hidingHeight, z: 5};
  $("#div-map").hide(200);
  if ([6,7].includes(pov_id)) {
    var position = {x: lookAt[0],y: lookAt[1]+6, z: lookAt[2]};
    if ([7].includes(pov_id)) {
      $("#div-map").show(200);
    }
  }
  new TWEEN.Tween(venue.position).to(position, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

function undang_animate() {
  var position = {x: 0,y: hidingHeight, z: 0};
  $("#div-confirm").hide(200);
  if (pov_id == 0) {
    var position = {x: lookAt[0],y: lookAt[1]+6, z: lookAt[2]-10};
    if (undang_bool != "n") {
      $("#div-confirm").show(200);
    }
  }
  new TWEEN.Tween(undang.position).to(position, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

function calendar_animate() {
  calendar_base_animate();
  calendar_day_animate();
}

////////////
// MATERIAL
////////////

const vertexShader = `
  varying vec2 vUv;
  uniform float time;
  
	void main() {

    vUv = uv;
    
    // VERTEX POSITION
    
    vec4 mvPosition = vec4( position, 1.0 );
    #ifdef USE_INSTANCING
    	mvPosition = instanceMatrix * mvPosition;
    #endif
    
    // DISPLACEMENT
    
    // here the displacement is made stronger on the blades tips.
    float dispPower = 1.0 - cos( uv.y * 3.1416 / 6.0 );
    
    float displacement = sin( mvPosition.z + time * 10.0 ) * ( 0.1 * dispPower );
    mvPosition.z += displacement;
    
    //
    
    vec4 modelViewPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * modelViewPosition;

	}
`;

const fragmentShader = `
  varying vec2 vUv;
  
  void main() {
  	vec3 baseColor = vec3( 0.41, 1.0, 0.5 );
    float clarity = ( vUv.y * 0.5 ) + 0.5;
    gl_FragColor = vec4( baseColor * clarity, 1 );
  }
`;

const uniforms = {
	time: {
  	value: 0
  }
}

const leavesMaterial = new THREE.ShaderMaterial({
	vertexShader,
  fragmentShader,
  uniforms,
  side: THREE.DoubleSide
});

/////////
// MESH
/////////

const instanceNumber = 100000;
const dummy = new THREE.Object3D();

geometry = new THREE.PlaneGeometry( 0.05, 0.5, 1, 4 );
geometry.translate( 0, 0.3, 0 ); // move grass blade geometry lowest point at 0.

const grass = new THREE.InstancedMesh( geometry, leavesMaterial, instanceNumber );
grass.scale.set(0,0,0);
scene.add( grass );

// Position and scale the grass blade instances randomly.

for ( let i=0 ; i<instanceNumber ; i++ ) {

	dummy.position.set(
  	( Math.random() - 0.5 ) * 20,
    0,
    ( Math.random() - 0.5 ) * 20
  );
  
  dummy.scale.setScalar( 0.5 + Math.random() * 0.5 );
  
  dummy.rotation.y = Math.random() * Math.PI;
  
  dummy.updateMatrix();
  grass.setMatrixAt( i, dummy.matrix );

}

function addStar() {
    geometry = new THREE.SphereBufferGeometry(0.1, 10, 10);
    material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(150));

    star.position.set(x, y, z);
    scene.add(star);
}
Array(400).fill().forEach(addStar);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
directionalLight.position.set( -20, 50, 10 ); //default; light shining from top
directionalLight.castShadow = false; // default false

scene.add(ambientLight);
scene.add(directionalLight);

// Control
// const controls = new THREE.OrbitControls(camera, renderer.domElement)


function animate() {
    requestAnimationFrame(animate);
    leavesMaterial.uniforms.time.value = clock.getElapsedTime();
    leavesMaterial.uniformsNeedUpdate = true;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.02;

    torus.rotation.x -= 0.01;
    torus.rotation.y -= 0.01;
    torus.rotation.z -= 0.02;

    // ring1.rotation.x -= 0.01;
    ring1.rotation.y -= 0.01;
    ring1.rotation.z -= 0.0001;

    ring2.rotation.x -= 0.0001;
    ring2.rotation.y += 0.01;
    // ring2.rotation.z -= 0.02;
    var delta = clock.getDelta();
  
    if ( mixer ) mixer.update( delta );

    cake.rotation.z += 0.005;

    // controls.update();
    TWEEN.update();
    camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
    renderer.render(scene, camera);
}
animate();
var axesHelper = new THREE.AxesHelper( 5 );
axesHelper.position.set(0,5,0);
// scene.add( axesHelper );

var isFromWelcome = true;
function camera_animate() {
  let speed = trans_speed;
  if (isFromWelcome) {
    speed = 4000;
    isFromWelcome = false;
    
    new TWEEN.Tween(base.scale).to({x:1,y:1,z:1}, trans_speed)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    
    new TWEEN.Tween(grass.scale).to({x:1,y:1,z:1}, speed)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  }

  new TWEEN.Tween(camera.position).to({
      x: cam_pos_refs[pov_id][0],
      y: cam_pos_refs[pov_id][1],
      z: cam_pos_refs[pov_id][2]
  }, speed)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
}

var cam_default_height = 10;
var cam_default_corner = 12;
var cam_default_edge = 15;

var cam_pos_refs = [
  [0, cam_default_height, cam_default_edge],
  [cam_default_corner, cam_default_height, cam_default_corner],
  [cam_default_edge, cam_default_height, 0],
  [cam_default_corner, cam_default_height, -cam_default_corner],
  [0, cam_default_height, -cam_default_edge],
  [-cam_default_corner, cam_default_height, -cam_default_corner],
  [-cam_default_edge, cam_default_height, 0],
  [-cam_default_corner, cam_default_height, cam_default_corner],
];

var pov_id = 0;
var max_pov_id = cam_pos_refs.length - 1;
var inf_loop = true;
var trans_speed = 1000;

function animate_all () {
  camera_animate();
  dika1_animate();
  mabelle1_animate();
  intro_animate();
  groom_animate();
  bride_animate();
  calendar_animate();
  bench_animate();
  tree_animate();
  cake_animate();
  pond_animate();
  venue_animate();
  stadium_animate();
  undang_animate();
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
  animate_all();
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
  animate_all();
}

// window.onwheel = e => {
//   if (e.deltaY >= 0) {
//       // Scrolling Down with mouse
//       next_pov();
//   } else {z
//       // Scrolling Up with mouse
//       prev_pov();
//   }
// }

// window.ontouchend = e => {
//   next_pov();
// }

var invitee = url.searchParams.get("n")
if (invitee != null) {
  $("#text-invitee-1").text(url.searchParams.get("g"));
  $("#text-invitee-2").text(invitee);
}

$("#text-parent-groom-1").text("putra dari");
$("#text-parent-groom-2").text("Katiyo");
$("#text-parent-groom-3").text("&");
$("#text-parent-groom-4").text("Tossy Mutiara");

$("#text-parent-bride-1").text("putri dari");
$("#text-parent-bride-2").text("Edi Budi Hardayanto");
$("#text-parent-bride-3").text("&");
$("#text-parent-bride-4").text("Maria Goreti Sri Candrati");

$("#btn-start").on('click', function () {
  $("#div-invitee").hide();
  next_pov();
  setTimeout(function (){
  
    $("#btn-next").show();
    $("#btn-prev").show();
              
  }, 4000);
});
$("#btn-next").on('click', function () {
  next_pov();
});
$("#btn-prev").on('click', function () {
  prev_pov();
});
$("#btn-audio").on('click', function () {
  var myAudio = document.getElementById("playAudio");
  myAudio.paused ? myAudio.play() : myAudio.pause();
  // document.getElementById('playAudio').toggleAttribute();
});
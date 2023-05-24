// document.addEventListener('click', musicPlay);
window.addEventListener('load', function () {
  $("#div-invitee").show();
  $("#btn-audio").show();
  $("#btn-start").show();
})

// function musicPlay() {
//     document.getElementById('playAudio').play();
//     document.removeEventListener('click', musicPlay);
// }

var hidingHeight = 100;
const startCoord = [40, 40, 30];
const lookAt = [0, 3, 0];
var objLoader = new THREE.OBJLoader();
var fontLoader = new THREE.FontLoader();
// var imageLoader = new THREE.ImageLoader();
var mtlLoader = new THREE.MTLLoader();
var gltfLoader = new THREE.GLTFLoader();
// var stlLoader = new THREE.STLLoader();
// var fbxLoader = new THREE.FBXLoader();

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);

// Camera
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(startCoord[0], startCoord[1], startCoord[2]);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Objects
var geometry;
var material;

var clock = new THREE.Clock();

var ring1 = new THREE.Mesh();
mtlLoader.load("/models/ring/ring2.mtl", function (materials) {
  materials.preload();
  objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load("/models/ring/ring2.obj", function (object) {
    ring1 = object;
    ring1.position.set(startCoord[0] * 0.5, startCoord[1] * 0.5, startCoord[2] * 0.6-2);
    ring1.rotation.set(Math.PI * -1 / 6, 0, 0);
    ring1.scale.set(1, 1, 1);
    scene.add(ring1);
  });
});

var ring2 = new THREE.Mesh();
mtlLoader.load("/models/ring/ring2.mtl", function (materials) {
  materials.preload();
  objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load("/models/ring/ring2.obj", function (object) {
    ring2 = object;
    ring2.position.set(startCoord[0] * 0.5, startCoord[1] * 0.45, startCoord[2] * 0.45);
    ring2.rotation.set(Math.PI * 1 / 6, 0, 0);
    ring2.scale.set(1, 1, 1);
    scene.add(ring2);
  });
});


// var mabelle1_mat = new THREE.MeshBasicMaterial({
//   map: new THREE.TextureLoader().load('/img/mabel.jpg')
// });
// mabelle1_mat.map.minFilter = THREE.LinearFilter;
// var mabelle1_geo = new THREE.BoxBufferGeometry(12, 12, 0.1);
// var mabelle1 = new THREE.Mesh(mabelle1_geo, mabelle1_mat);
// mabelle1.scale.set(0, 0, 0);
// mabelle1.position.set(0, 8, 0);
// mabelle1.rotation.set(0, Math.PI * -1 / 4, 0);
// scene.add(mabelle1);
// function mabelle1_animate() {
//   if (pov_id == 3) {
//     var scale = { x: 1, y: 1, z: 1 };
//   }
//   else {
//     var scale = { x: 0, y: 0, z: 0 };
//   }
//   new TWEEN.Tween(mabelle1.scale).to(scale, trans_speed)
//     .easing(TWEEN.Easing.Quadratic.InOut)
//     .start();
// }

var sakura = new THREE.Mesh();
gltfLoader.load("/models/env/sakura/scene.gltf", function (object) {
  sakura = object.scene.children[0];
  sakura.position.set(0, -4, 0);
  sakura.rotation.set(Math.PI * -0.5, Math.PI * 0, Math.PI * 1 / 8)
  sakura.scale.set(0, 0, 0);
  scene.add(sakura);
});
function sakura_animate() {
  var scale = { x: 0, y: 0, z: 0 };
  if ([1, 2, 3, 4].includes(pov_id)) {
    var scale = { x: 1.4, y: 1.4, z: 1.3 };
  }
  new TWEEN.Tween(sakura.scale).to(scale, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}


var bridge = new THREE.Mesh();
gltfLoader.load("/models/env/bridge/scene.gltf", function (object) {
  bridge = object.scene.children[0];
  bridge.position.set(0, -4, 0);
  bridge.rotation.set(Math.PI * -0.5, Math.PI * 0, Math.PI * -9 / 8)
  bridge.scale.set(0, 0, 0);
  scene.add(bridge);
});
function bridge_animate() {
  var scale = { x: 0, y: 0, z: 0 };
  if ([0, 5, 6, 7].includes(pov_id)) {
    var scale = { x: 1.6, y: 1.6, z: 1.6 };
  }
  new TWEEN.Tween(bridge.scale).to(scale, trans_speed)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

// var calendar_mat = new THREE.MeshBasicMaterial({
//   map: new THREE.TextureLoader().load('/img/calendar.png')
// });
// calendar_mat.map.minFilter = THREE.LinearFilter;
// var calendar_geo = new THREE.BoxBufferGeometry(7, 7, 0.01);
// var calendar = new THREE.Mesh(calendar_geo, calendar_mat);
// calendar.scale.set(0, 0, 0);
// calendar.position.set(-5, 5, -5);
// calendar.rotation.set(Math.PI * 1/4, Math.PI * 1/4, Math.PI * 1/8);
// scene.add(calendar);
// function calendar_animate() {
//   if (pov_id == 5) {
//     var scale = { x: 1, y: 1, z: 1 };
//   }
//   else {
//     var scale = { x: 0, y: 0, z: 0 };
//   }
//   new TWEEN.Tween(calendar.scale).to(scale, trans_speed)
//     .easing(TWEEN.Easing.Quadratic.InOut)
//     .start();
// }

// calendar_mark
var reseption;
var bride;
var welcome;
var url_string = window.location.href;
var url = new URL(url_string);
var welcome_text = "Andika\nMabelle";
fontLoader.load('/fonts/geraldine.typeface.json', function (font) {
  var welcome_geo = new THREE.TextGeometry(welcome_text, {
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
  welcome = new THREE.Mesh(welcome_geo, welcome_mat);
  welcome.geometry.center();
  welcome.scale.set(1, 1, 1);
  welcome.rotation.set(Math.PI * -0.05, Math.PI * 0.3, Math.PI * 0.03);
  welcome.position.set(startCoord[0] * 0.9, startCoord[1] * 0.9, startCoord[2] * 0.9);
  scene.add(welcome);
});
function ayat_animate() {
  $(".div-ayat").hide();
  if (pov_id == 1) {
    if (isFromWelcome) {
      $(".div-ayat").fadeIn(4000);
    }
    $(".div-ayat").fadeIn(500);
  }
}
function intro_animate() {
  $(".div-intro").hide();
  var position = { x: 5, y: hidingHeight, z: -5 };
  if (pov_id == 1) {
    var position = { x: lookAt[0] - 2, y: lookAt[1] + 7, z: lookAt[2] - 2 };
  }
  if (pov_id == 2) {
    $(".div-intro").fadeIn(500);
  }
  // new TWEEN.Tween(intro.position).to(position, trans_speed)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .start();
}

function bride_animate() {
  $(".div-bride").hide()
  // var position = { x: 5, y: hidingHeight, z: -5 };
  if (pov_id == 3) {
    $(".div-bride").fadeIn(500)
    var position = { x: lookAt[0], y: lookAt[1] + 7.8 + 99999, z: lookAt[2] };
  }
  // new TWEEN.Tween(groom.position).to(position, trans_speed)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .start();
}

function groom_animate() {
  $(".div-groom").hide()
  // var position = { x: 5, y: hidingHeight, z: -5 };
  if (pov_id == 4) {
    $(".div-groom").fadeIn(500)
    var position = { x: lookAt[0], y: lookAt[1] + 8.6 + 99999, z: lookAt[2] };
  }
  // new TWEEN.Tween(bride.position).to(position, trans_speed)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .start();
}

function date_animate() {
  $(".div-date").hide()
  if (pov_id == 5) {
    $(".div-date").fadeIn(500)
  }
}

function time_animate() {
  $(".div-time").hide()
  if (pov_id == 6) {
    $(".div-time").fadeIn(500)
  }
}

function venue_animate() {
  var position = { x: -5, y: hidingHeight, z: 5 };
  $(".div-map").hide();
  if ([7].includes(pov_id)) {
    $(".div-map").fadeIn(500);
    // var position = { x: lookAt[0], y: lookAt[1] + 6, z: lookAt[2] };
  }
  // new TWEEN.Tween(venue.position).to(position, trans_speed)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .start();
}

function photo_animate() {
  var position = { x: 0, y: hidingHeight, z: 0 };
  $(".div-photo").hide();
  if ([0].includes(pov_id)) {
    var position = { x: lookAt[0], y: lookAt[1] + 7, z: lookAt[2] - 10 };
    $(".div-photo").fadeIn(500);
  }
  // new TWEEN.Tween(undang.position).to(position, trans_speed)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .start();
}

function confirm_animate() {
  $("#div-confirm").hide();
  if (pov_id == 0) {
    $("#div-confirm").fadeIn(500);
  }
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
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(10, 40, -10); //default; light shining from top
directionalLight.castShadow = false; // default false

scene.add(ambientLight);
scene.add(directionalLight);

// Control
// const controls = new THREE.OrbitControls(camera, renderer.domElement)


function animate() {
  requestAnimationFrame(animate);

  // ring1.rotation.x -= 0.01;
  ring1.rotation.y -= 0.01;
  ring1.rotation.z -= 0.0001;

  ring2.rotation.x -= 0.0001;
  ring2.rotation.y += 0.01;
  // ring2.rotation.z -= 0.02;

  // controls.update();
  TWEEN.update();
  camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
  renderer.render(scene, camera);
}
animate();
var axesHelper = new THREE.AxesHelper(5);
axesHelper.position.set(0, 5, 0);
// scene.add( axesHelper );

var isFromWelcome = true;
function camera_animate() {
  let speed = trans_speed;
  if (isFromWelcome) {
    speed = 4000;
    isFromWelcome = false;
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

function animate_all() {
  camera_animate();
  sakura_animate();
  bridge_animate();
  intro_animate();
  groom_animate();
  bride_animate();
  ayat_animate();
  date_animate();
  time_animate();
  venue_animate();
  photo_animate();
  confirm_animate();
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

$("#btn-start").on('click', function () {
  $("#div-invitee").hide();
  next_pov();
  setTimeout(function () {
    $("#btn-next").fadeIn(500);
    $("#btn-prev").fadeIn(500);
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
});

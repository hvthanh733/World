import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
// THREE.ColorManagement.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

// Mặt trăng
const moonGroup = new THREE.Group();
moonGroup.rotation.z = -6.7 * Math.PI / 180;
moonGroup.rotation.x = 5.1 * Math.PI / 180; // Nghiêng quỹ đạo Mặt Trăng

scene.add(moonGroup);
const zoomMoon = new OrbitControls(camera, renderer.domElement);
const detailMoon = 20; // Độ chi tiết hình cầu
const loaderMoon = new THREE.TextureLoader();
const geometryMoon = new THREE.IcosahedronGeometry(1, detailMoon);


const materialMoon = new THREE.MeshPhongMaterial({

  map: loaderMoon.load("./textures/thanh_chu_mo.jpg"),

  bumpScale: 0.04,
});

const moonMesh = new THREE.Mesh(geometryMoon, materialMoon);
moonGroup.add(moonMesh);

const fresnelMatMoon = getFresnelMat();
const glowMeshMoon = new THREE.Mesh(geometryMoon, fresnelMatMoon);
glowMeshMoon.scale.setScalar(1.00);
moonGroup.add(glowMeshMoon);


const moonLight = new THREE.DirectionalLight(0xffffff, 1.5);
moonLight.position.set(2, 0, 2); // Điều chỉnh hướng chiếu sáng
scene.add(moonLight);




function animateMoon() {
  requestAnimationFrame(animateMoon);

  moonGroup.rotation.y += 0.006;

  renderer.render(scene, camera);
}


animateMoon();
moonMesh.scale.setScalar(0.5);
moonGroup.position.set(0, 0, 10); // Di chuyển mặt trăng sang bên phải












//-----------------------------------------------------  
const emGroup = new THREE.Group();
emGroup.rotation.z = 0 * Math.PI / 180;
emGroup.rotation.x = 0 * Math.PI / 180; // Nghiêng quỹ đạo Mặt Trăng

scene.add(emGroup);
const zoomEm = new OrbitControls(camera, renderer.domElement);
const detailEm = 20; // Độ chi tiết hình cầu
const loaderEm = new THREE.TextureLoader();
const geometryEm = new THREE.IcosahedronGeometry(1, detailEm);


const materialEm = new THREE.MeshPhongMaterial({

  map: loaderEm.load(`./textures/emy/sech.jpg`),

  bumpScale: 0.04,
});
const emMesh = new THREE.Mesh(geometryEm, materialEm);
emGroup.add(emMesh);

const fresnelMatEm = getFresnelMat();
const glowMeshEm = new THREE.Mesh(geometryEm, fresnelMatEm);
glowMeshEm.scale.setScalar(1.00);
emGroup.add(glowMeshEm);


const emLight = new THREE.DirectionalLight(0xffffff, 1.5);
emLight.position.set(2, 0, 2); // Điều chỉnh hướng chiếu sáng
scene.add(emLight);




function animateEm() {
  requestAnimationFrame(animateEm);


  emGroup.rotation.y += 0.006;

  renderer.render(scene, camera);
}


animateEm();
emMesh.scale.setScalar(5);
emGroup.position.set(0, 0, 50); // Di chuyển mặt trăng sang bên phải





document.addEventListener("click", function() {
  let video = document.getElementById("myVideo");
  video.muted = false;
  video.play();
});



//-----------------------------------------------------  
const emGroupFINAL = new THREE.Group();
scene.add(emGroupFINAL);

// Tạo texture từ video
const video = document.getElementById("myVideo");
const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.generateMipmaps = false;

// Tạo hình hộp (box) thay vì hình cầu
const geometryEmFINAL = new THREE.BoxGeometry(3, 5, 0.1); // Hộp chữ nhật mỏng

const materialEmFINAL = new THREE.MeshBasicMaterial({
  map: videoTexture,  // Gán video vào box
  side: THREE.DoubleSide // Hiển thị cả 2 mặt
});

const emMeshFINAL = new THREE.Mesh(geometryEmFINAL, materialEmFINAL);
emMeshFINAL.rotation.z = Math.PI / 2; // Xoay 90 độ (dọc)
emGroupFINAL.add(emMeshFINAL);


// Tạo viền phát sáng (glow effect)
const fresnelMatEmFINAL = getFresnelMat();
const glowMeshEmFINAL = new THREE.Mesh(geometryEmFINAL, fresnelMatEmFINAL);
glowMeshEmFINAL.scale.setScalar(1); // Lớn hơn 1 chút để tạo viền
emGroupFINAL.add(glowMeshEmFINAL);

// Ánh sáng
const emLightFINAL = new THREE.DirectionalLight(0xffffff, 1.5);
emLightFINAL.position.set(2, 0, 2);
scene.add(emLightFINAL);

// Hàm animation
function animateEmFINAL() {
  requestAnimationFrame(animateEmFINAL);
  emGroupFINAL.rotation.y += 0;
  renderer.render(scene, camera);
}

// Chạy video
video.play();

// Chạy animation
animateEmFINAL();

// Đặt kích thước box
emMeshFINAL.scale.setScalar(10);
emGroupFINAL.position.set(0, 0, 100);



















// Trái đất
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);
const zoom = new OrbitControls(camera, renderer.domElement);

const detail = 20; // Độ chi tiết hình cầu
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);



const material = new THREE.MeshPhongMaterial({
  // Ảnh địa cầu
  map: loader.load("./textures/earth/wp9376106.jpg"),
  // Độ phản chiếu 
  specularMap: loader.load("./textures/earth/02_earthspec1k.jpg"),
  // Độ phản chiếu
  specularMap: loader.load("./textures/earth/02_earthspec1k.jpg"),
  bumpMap: loader.load("./textures/earth/01_earthbump1k.jpg"),
  bumpScale: 0.04,
});

// material.map.colorSpace = THREE.SRGBColorSpace;
//---------------Tạo mô hình trái đất---------------
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);
//---------------Tạo mô hình trái đất---------------


//----------------Thêm ánh sáng ban đêm-------------
const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/earth/03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);
//----------------Thêm ánh sáng ban đêm-------------


// ----------------------Mây------------------------
const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/earth/04_earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load('./textures/earth/05_earthcloudmaptrans.jpg'),
  alphaTest: 1,
});

const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);
// --------------------- Mây------------------------


// -------------------Khi quyen---------------------
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.001);
earthGroup.add(glowMesh);
// -------------------Khi quyen---------------------


// ---------------------Sao-------------------------
const stars = getStarfield({numStars: 1000});
scene.add(stars);
// ---------------------Sao-------------------------


// --------------Ánh sáng mặt trời------------------
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
// scene.add(sunLight);
// --------------Ánh sáng mặt trời------------------


//--------------------------------------------------
let isDragging = false;

function animate() {
  requestAnimationFrame(animate);
 

  if (!isDragging) { // Nếu không kéo thì Trái Đất quay
    earthGroup.rotation.y += 0.0002;
    stars.rotation.y -= 0.0002;
  } else {
    stars.rotation.y -= 0.0002;
  }

  renderer.render(scene, camera);
}


animate();


window.addEventListener("mousedown", () => {
  isDragging = true; // Khi nhấn chuột => dừng quay
});

window.addEventListener("mouseup", () => {
  isDragging = false; // Khi thả chuột => tiếp tục quay
});
//---------------------------------------------------




//-------------------Điểm đỏ-------------------------
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./textures/earth/em_y_thich_anh_nay.jpg'); // ✅ Đúng

//20.973056, 20.973056
function toadonoitinhyeutoisong(lat, lon, radius) {
  const phi = (91.5-lat) * (Math.PI / 180);
  const theta = (lon + 173) * (Math.PI / 180);

  // Công thức tìm xyz của tọa độ 
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}
console.log(toadonoitinhyeutoisong(22.973056, 20.973056,1.01))
const redMark = new THREE.SphereGeometry(0.05, 32, 32);


const marketMaterial = new THREE.MeshPhongMaterial({
  map: texture,
  shininess: 50,
});
const mark = new THREE.Mesh(redMark, marketMaterial);
const position = toadonoitinhyeutoisong(20.973056, 20.973056,1.01);
mark.position.copy(position);

earthGroup.add(mark);
//-------------------Điểm đỏ-------------------------



//-------------------Điểm đỏ-------------------------
// const initialTargetDA = new THREE.Vector3(3, 3, 3); // Tọa độ điểm

// const DongAnh = new THREE.SphereGeometry(0.3, 32, 32); // Nhỏ lại để nhìn rõ

// const colorDA = new THREE.MeshBasicMaterial({
//   color: 0xFF0000
// });

// const markDA = new THREE.Mesh(DongAnh, colorDA);
// const positionDA = initialTargetDA; // Lưu tọa độ Vector3

// markDA.position.copy(positionDA); // ✅ Đúng cú pháp

// earthGroup.add(markDA);
// ------------------- Hình chữ nhật với chữ "Hello World" -------------------
function boxtext(text1, text2, lineH, fontsize, w, h, x, y, z) {
  const scaleFactor = 4; // 🔥 Tăng độ phân giải lên 4x
  const canvas = document.createElement('canvas');
  canvas.width = w * scaleFactor;
  canvas.height = h * scaleFactor;
  const ctx = canvas.getContext('2d');

  // Chỉnh scale để chữ không bị vỡ khi zoom
  ctx.scale(scaleFactor, scaleFactor);

  // Vẽ nền đỏ
  ctx.fillStyle = "red"; 
  ctx.fillRect(0, 0, canvas.width / scaleFactor, canvas.height / scaleFactor);

  // Vẽ chữ trắng
  ctx.fillStyle = "white";
  ctx.font = `bold ${fontsize}px Arial`; 
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Xuống dòng cho chữ
  const textLines = [text1, text2];
  textLines.forEach((line, i) => {
    ctx.fillText(line, (canvas.width / scaleFactor) / 2, (canvas.height / scaleFactor) / 3 + i * lineH);
  });

  // Chuyển canvas thành texture
  const textTexture = new THREE.CanvasTexture(canvas);
  textTexture.minFilter = THREE.LinearMipMapLinearFilter;
  textTexture.magFilter = THREE.LinearFilter;
  textTexture.generateMipmaps = true;
  textTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

  // Tạo box để hiển thị text
  const boxGeo = new THREE.BoxGeometry(2, 1, 0);
  const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });

  const markDA = new THREE.Mesh(boxGeo, textMaterial);
  markDA.position.set(x, y, z);

  return markDA;
}

// Thêm vào scene
scene.add(boxtext("Anh giống Mặt Trăng (hehe)", "Còn em giống Trái Đất nhỉ", 150, 150, 2000, 512, 1, 3, 10));
scene.add(boxtext("Em biết Hà Tây", "Ở đâu khumm", 60, 40, 300, 150, 1, 1, 2));
scene.add(boxtext(
  "Cơ mà chưa chắc đâu vì anh nghĩ", 
  "em còn lớn hơn cả trái đất (ko p cân nặng =))))", 
  250, 220, 5500, 1000, 1, 3, 20
));
scene.add(boxtext(
  "Ôi bỏ mẹ =))))) (Sech nhi... ựa)", 
  "Thoai Zoom thêm i", 
  150, 150, 2500, 512, 1, 3, 60
));

scene.add(boxtext(
  "E trong a Toa Từng nàyy", 
  "Yêu Đông Ahh nhiềuuu", 
  150, 150, 2500, 512, 3, 7, 120  // Thông số tối ưu
));

//-------------------Điểm đỏ-------------------------



//------------------Cập nhật lại địa cầu-------------
function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

}
window.addEventListener('resize', handleWindowResize, false);
//------------------Cập nhật lại địa cầu-------------



//---------------------------------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Độ sáng 0.5 (có thể tăng/giảm)
scene.add(ambientLight);
//---------------------------------------------------



//---------------------- 4 button -----------------

// Lưu vị trí ban đầu của camera
const initialCameraPosition = camera.position.clone();
const initialTarget = new THREE.Vector3(0, 0, 0); // Trái đất ở trung tâm

// Điều khiển zoom với hiệu ứng mượt
function setupZoomControls() {
  document.getElementById("zoomIn").addEventListener("click", () => {
    gsap.to(camera.position, {
      z: initialCameraPosition.z - 2, // Zoom gần hơn
      duration: 1, // Thời gian zoom (giây)
      ease: "power2.out", // Hiệu ứng easing (mềm mại dần)
      
      onUpdate: () => {
        camera.lookAt(initialTarget); // Cập nhật hướng nhìn liên tục
      },

      onComplete: () => {
        controls.target.copy(initialTarget); // Đảm bảo OrbitControls cũng cập nhật
        controls.update();
      }
    });
  });
}

setupZoomControls(); // Gọi hàm để gán sự kiện click



//---------------------- 4 button -----------------


earthGroup.add(moonGroup);
earthGroup.add(emGroup);
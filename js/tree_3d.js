// --- 1. CẤU HÌNH CƠ BẢN THREE.JS ---
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0d112b, 0.02);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// --- CAMERA ---
camera.position.z = 25; 
camera.position.y = 9; 
camera.lookAt(0, 6, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#0d112b", 0); 
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// --- 2. TẠO CÂY THÔNG XOẮN ỐC ---
const particleCount = 3000;
const geometry = new THREE.BufferGeometry();
const positions = [];
const colors = [];

const color1 = new THREE.Color("#e74c3c");
const color2 = new THREE.Color("#f1c40f");

const treeHeight = 20; 
const baseRadius = 7;   
const spiralTurns = 8;  

for (let i = 0; i < particleCount; i++) {
    const t = i / particleCount;
    const angle = t * Math.PI * 2 * spiralTurns;
    const radius = (1 - t) * baseRadius + (Math.random() * 0.5);
    
    const x = radius * Math.cos(angle);
    const y = t * treeHeight;
    const z = radius * Math.sin(angle);
    
    positions.push(x, y, z);

    if (i % 2 === 0) {
        colors.push(color1.r, color1.g, color1.b);
    } else {
        colors.push(color2.r, color2.g, color2.b);
    }
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
});

const treeGroup = new THREE.Group();
scene.add(treeGroup);

const treeParticles = new THREE.Points(geometry, material);
treeGroup.add(treeParticles); 

// --- 3. TẠO NGÔI SAO 3D ---
const starShape = new THREE.Shape();
const outerRadius = 1.0; 
const innerRadius = 0.5;
const spikes = 5;

// Vẽ hình 2D
for (let i = 0; i < spikes * 2; i++) {
    const r = (i % 2 === 0) ? outerRadius : innerRadius;
    const angle = (i / (spikes * 2)) * Math.PI * 2;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) starShape.moveTo(x, y);
    else starShape.lineTo(x, y);
}
starShape.closePath();

// Tạo khối 3D (Extrude)
const extrudeSettings = {
    depth: 0.4,          // Độ dày
    bevelEnabled: true,  
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 3
};

const starGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);

// Chất liệu bóng 3D
const starMaterial = new THREE.MeshPhongMaterial({ 
    color: "#f1c40f",
    shininess: 100,
    specular: "#ffffff"
});

const starMesh = new THREE.Mesh(starGeometry, starMaterial);

// --- VỊ TRÍ MỚI (Đứng thẳng) ---
// Do Extrude tạo hình theo trục Z, nên mặc định nó đã "đứng" mặt hướng về camera.
// Ta chỉ cần đặt nó lên đỉnh là xong.
starMesh.position.y = treeHeight + 1.5; 
// Canh chỉnh lại tâm để ngôi sao nằm giữa trục xoay
// Vì ExtrudeGeometry tạo hình từ gốc (0,0) ra dương Z, nên ta cần lùi lại một nửa độ dày
starMesh.position.z = -0.2; 

treeGroup.add(starMesh); 

// --- 4. ÁNH SÁNG ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xf1c40f, 1.5, 40);
pointLight.position.set(0, treeHeight, 10); // Đèn chiếu từ phía trước để thấy bóng ngôi sao
scene.add(pointLight);

// --- 5. XỬ LÝ RESIZE ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- 6. ANIMATION ---
const animate = () => {
    requestAnimationFrame(animate);

    // Xoay cây
    treeGroup.rotation.y -= 0.008;

    // Lấp lánh
    material.size = 0.3 + Math.sin(Date.now() * 0.003) * 0.05;

    renderer.render(scene, camera);
};

animate();
// --- 1. CẤU HÌNH CƠ BẢN THREE.JS ---
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0d112b, 0.02);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// --- ĐIỀU CHỈNH CAMERA GẦN HƠN VÀ THẤP HƠN ---
// Vì cây nhỏ đi nhiều nên cần đưa camera lại gần để nhìn rõ
camera.position.z = 25; 
camera.position.y = 8; 
camera.lookAt(0, 6, 0); // Nhìn vào trọng tâm cây

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#0d112b", 0); 
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// --- 2. TẠO CÂY THÔNG XOẮN ỐC (PARTICLE SYSTEM) ---
const particleCount = 3000;
const geometry = new THREE.BufferGeometry();
const positions = [];
const colors = [];

const color1 = new THREE.Color("#e74c3c");
const color2 = new THREE.Color("#f1c40f");

// --- CÂY THẤP HƠN NỮA ---
const treeHeight = 20;  // Hạ xuống còn 15 (cũ là 25)
const baseRadius = 7;   // Hạ bán kính xuống 6 (cũ là 9)
const spiralTurns = 8;  // Giảm số vòng xoắn đi 1 chút cho đỡ rối mắt

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
    size: 0.3, // Giảm kích thước hạt đi một chút cho mịn
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

// --- 3. TẠO NGÔI SAO TRÊN ĐỈNH ---
const starShape = new THREE.Shape();
// Giảm kích thước ngôi sao cho cân đối với cây nhỏ
const outerRadius = 1.0; 
const innerRadius = 0.5;
const spikes = 5;

for (let i = 0; i < spikes * 2; i++) {
    const r = (i % 2 === 0) ? outerRadius : innerRadius;
    const angle = (i / (spikes * 2)) * Math.PI * 2;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) starShape.moveTo(x, y);
    else starShape.lineTo(x, y);
}
starShape.closePath();

const starGeometry = new THREE.ShapeGeometry(starShape);
const starMaterial = new THREE.MeshBasicMaterial({ 
    color: "#f1c40f",
    side: THREE.DoubleSide
});
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
starMesh.position.y = treeHeight + 0.3; // Đặt ngay trên đỉnh cây mới
treeGroup.add(starMesh); 

// --- 4. ÁNH SÁNG ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xf1c40f, 1, 30);
pointLight.position.set(0, treeHeight, 0); // Đèn đi theo chiều cao cây
scene.add(pointLight);

// --- 5. XỬ LÝ RESIZE ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- 6. VÒNG LẶP ANIMATION ---
const animate = () => {
    requestAnimationFrame(animate);

    // Xoay đều cả nhóm
    treeGroup.rotation.y -= 0.008; // Tăng tốc độ xoay lên một chút nhìn cho vui mắt

    // Lấp lánh
    material.size = 0.3 + Math.sin(Date.now() * 0.003) * 0.05;

    renderer.render(scene, camera);
};

animate();
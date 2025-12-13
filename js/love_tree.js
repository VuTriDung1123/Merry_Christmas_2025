// --- 1. KHỞI TẠO SCENE ---
const scene = new THREE.Scene();
// Sương mù màu đỏ tối huyền bí
scene.fog = new THREE.FogExp2(0x1a0000, 0.02);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Camera
camera.position.z = 20; 
camera.position.y = 8;
camera.lookAt(0, 5, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// --- 2. TẠO CÂY THÔNG (GROUP) ---
const treeGroup = new THREE.Group();
// Hạ thấp cây xuống để cân đối bố cục
treeGroup.position.y = -7; 
scene.add(treeGroup);

// --- TẠO CÁC HẠT (PARTICLES) - DẠNG NÓN ĐẶC ---
const particleCount = 4000;
const geometry = new THREE.BufferGeometry();
const positions = [];
const colors = [];

const palette = [
    new THREE.Color("#ffeb3b"), // Vàng
    new THREE.Color("#ff1744"), // Đỏ
    new THREE.Color("#00e676"), // Xanh lá
    new THREE.Color("#00bcd4"), // Xanh dương
    new THREE.Color("#ffffff")  // Trắng
];

const treeHeight = 22; 
const baseRadius = 9;  

for (let i = 0; i < particleCount; i++) {
    const y = Math.random() * treeHeight; 
    const rAtHeight = (1 - y / treeHeight) * baseRadius;
    const r = Math.sqrt(Math.random()) * rAtHeight; 
    const angle = Math.random() * Math.PI * 2;

    const x = r * Math.cos(angle);
    const z = r * Math.sin(angle);

    positions.push(x, y, z);

    const color = palette[Math.floor(Math.random() * palette.length)];
    colors.push(color.r, color.g, color.b);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.25,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
});

const treeParticles = new THREE.Points(geometry, material);
treeGroup.add(treeParticles);

// --- 3. TẠO NGÔI SAO 3D (CODE MỚI) ---
const starShape = new THREE.Shape();
const outerRadius = 1.2; // To hơn cây xoắn một chút cho hợp với cây nón
const innerRadius = 0.6; 
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
    color: "#f1c40f",    // Màu vàng
    shininess: 100,
    specular: "#ffffff"
});

const starMesh = new THREE.Mesh(starGeometry, starMaterial);

// --- VỊ TRÍ NGÔI SAO ---
// Đặt lên đỉnh, cao hơn ngọn cây (22) một khoảng an toàn (1.5)
starMesh.position.y = treeHeight + 1.5; 
// Căn giữa trục Z
starMesh.position.z = -0.2; 

// Thêm vào Group để nó xoay cùng cây
treeGroup.add(starMesh); 

// --- 4. ÁNH SÁNG ---
// Cần ánh sáng để ngôi sao 3D hiện khối và bóng
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Đèn chiếu riêng cho ngôi sao và cây
const pointLight = new THREE.PointLight(0xf1c40f, 1.5, 50);
pointLight.position.set(0, treeHeight, 10); 
scene.add(pointLight);

// --- 5. HIỆU ỨNG TƯƠNG TÁC (GLOW SPRITE) ---
function createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); 
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    context.fillStyle = gradient;
    context.fillRect(0,0,32,32);
    return new THREE.CanvasTexture(canvas);
}

const glowMaterial = new THREE.SpriteMaterial({ 
    map: createGlowTexture(), 
    color: 0xffffff,
    transparent: true, 
    blending: THREE.AdditiveBlending,
    opacity: 0 
});
const glowSprite = new THREE.Sprite(glowMaterial);
glowSprite.scale.set(1.5, 1.5, 1.5); 
scene.add(glowSprite);

// --- RAYCASTER ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
raycaster.params.Points.threshold = 0.3; 

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- 6. ANIMATION LOOP ---
const animate = () => {
    requestAnimationFrame(animate);

    // Xoay cây (Ngôi sao nằm trong treeGroup nên cũng sẽ xoay theo)
    treeGroup.rotation.y += 0.003;

    // Xử lý Raycaster (Tương tác chuột)
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(treeParticles);

    if (intersects.length > 0) {
        const intersect = intersects[0];
        // Vì cây đang xoay và bị hạ thấp (trong treeGroup), 
        // ta cần tính toán vị trí thế giới thực (World Position) cho đốm sáng
        // Tuy nhiên, intersect.point trả về vị trí thế giới nên ta dùng trực tiếp được
        glowSprite.position.copy(intersect.point);
        glowSprite.material.opacity = 1; 
        document.body.style.cursor = 'pointer';
    } else {
        glowSprite.material.opacity = 0;
        document.body.style.cursor = 'default';
    }

    renderer.render(scene, camera);
};

animate();
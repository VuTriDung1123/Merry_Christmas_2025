const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');

// Thiết lập kích thước full màn hình
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 600; // Số lượng sao tạo nên cây

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        // Tạo hình nón (Cây thông)
        // y đi từ trên xuống dưới (0 -> height)
        // Nhân 0.7 để cây không quá cao chạm đáy
        this.y = Math.random() * canvas.height * 0.7 + 100;
        
        // Bán kính cây to dần theo y (tạo hình nón)
        const maxRadius = (this.y - 100) * 0.4; 
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * maxRadius;

        // Tọa độ 3D giả lập
        this.x = canvas.width / 2 + Math.cos(angle) * radius;
        this.z = Math.sin(angle) * radius; // Độ sâu (dùng nếu muốn làm hiệu ứng xa gần kỹ hơn)
        
        this.size = Math.random() * 2 + 1;
        // Màu sắc: Random trong dải màu xanh dương -> tím (HSL 200-260)
        this.color = `hsl(${Math.random() * 60 + 200}, 100%, 80%)`; 
        
        this.angle = angle;
        this.radius = radius;
        this.speed = 0.02 + Math.random() * 0.03; // Tốc độ xoay
    }

    update() {
        // Xoay sao quanh trục giữa
        this.angle += this.speed;
        this.x = canvas.width / 2 + Math.cos(this.angle) * this.radius;
        // Z thay đổi để tạo cảm giác 3D (nếu vẽ theo Z-index)
        // this.z = Math.sin(this.angle) * this.radius; 
        
        // Hiệu ứng lấp lánh ngẫu nhiên
        if (Math.random() < 0.05) this.size = Math.random() * 3;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Khởi tạo mảng sao
for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

function animate() {
    // Tạo vệt mờ (Motion Trail) đẹp mắt
    // Thay vì xóa sạch (clearRect), ta vẽ 1 lớp màu đen bán trong suốt đè lên
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cập nhật và vẽ từng ngôi sao
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    // Vẽ ngôi sao đỉnh cây (Màu vàng)
    ctx.fillStyle = '#ffd700';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ffd700';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 90, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // Tắt shadow để không ảnh hưởng các sao khác

    requestAnimationFrame(animate);
}

// Bắt đầu animation
animate();

// Xử lý khi thay đổi kích thước cửa sổ
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Reset lại vị trí các sao để cây không bị méo
    stars.forEach(star => star.reset());
});
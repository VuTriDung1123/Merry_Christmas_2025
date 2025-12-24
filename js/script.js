function createSnowflake() {
    const snow = document.createElement("div");
    snow.classList.add("snowflake");
    
    // Ký tự bông tuyết (hoặc dùng dấu chấm "." nếu muốn giống hệt đốm sáng)
    snow.textContent = "❄"; 
    
    // Random vị trí xuất hiện theo chiều ngang
    snow.style.left = Math.random() * window.innerWidth + "px";
    
    // Random kích thước (10px - 25px)
    // Công thức: Math.random() * (max - min) + min
    const size = Math.random() * 15 + 10; 
    snow.style.fontSize = size + "px";
    
    // Random thời gian rơi (2s - 7s)
    const duration = Math.random() * 5 + 2; 
    snow.style.animationDuration = duration + "s";
    
    // Random độ mờ để tạo chiều sâu
    snow.style.opacity = Math.random();
    
    document.body.appendChild(snow);
    
    // Tự động xóa sau khi rơi xong
    setTimeout(() => {
        snow.remove();
    }, duration * 1000);
}

// Bắt đầu tạo tuyết (cứ 100ms tạo 1 bông)
//setInterval(createSnowflake, 100);
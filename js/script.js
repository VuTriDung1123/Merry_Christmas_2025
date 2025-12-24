document.addEventListener('DOMContentLoaded', () => {
    // 1. Tìm cái "lồng" chứa tuyết (đã thêm trong HTML)
    const snowContainer = document.getElementById('snow-container');

    // Nếu không tìm thấy hộp chứa (do quên thêm vào HTML) thì dừng lại để tránh lỗi
    if (!snowContainer) return;

    function createSnowflake() {
        const snow = document.createElement("div");
        snow.classList.add("snowflake");
        
        // --- TẠO HÌNH DÁNG HẠT TUYẾT ---
        // Thay vì dùng textContent = "❄", ta chỉnh kích thước div thành chấm tròn
        // Kích thước ngẫu nhiên từ 2px đến 5px (nhìn giống bụi tuyết xa xa)
        const size = Math.random() * 3 + 2; 
        snow.style.width = `${size}px`;
        snow.style.height = `${size}px`;
        
        // --- VỊ TRÍ XUẤT PHÁT ---
        // Random vị trí ngang từ 0% đến 100%
        snow.style.left = Math.random() * 100 + "%";
        
        // --- HIỆU ỨNG RƠI (ANIMATION) ---
        // Thời gian rơi ngẫu nhiên từ 5s đến 10s (rơi chậm, nhẹ nhàng)
        const duration = Math.random() * 5 + 5; 
        
        // Sử dụng Web Animations API để tạo chuyển động mượt mà
        // Điểm hay: Dễ dàng điều chỉnh điểm rơi theo chiều cao màn hình hiện tại
        const animation = snow.animate([
            { transform: 'translateY(-10px)', opacity: Math.random() }, // Bắt đầu từ trên nóc
            { transform: `translateY(${window.innerHeight}px)`, opacity: 0 } // Rơi xuống đáy màn hình và mờ dần
        ], {
            duration: duration * 1000, // Đổi giây sang mili giây
            easing: 'linear',
            iterations: 1
        });

        // --- DỌN DẸP ---
        // Khi rơi xong thì tự động xóa phần tử khỏi DOM để nhẹ máy
        animation.onfinish = () => {
            snow.remove();
        };
        
        // QUAN TRỌNG: Gắn hạt tuyết vào snowContainer (thay vì body)
        // Việc này giúp tuyết bị "nhốt" trong khung, không làm tràn trang web
        snowContainer.appendChild(snow);
    }

    // --- KÍCH HOẠT ---
    // Cứ 100ms tạo ra 1 hạt tuyết
    setInterval(createSnowflake, 100);
});
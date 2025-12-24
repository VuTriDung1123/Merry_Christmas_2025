document.addEventListener('DOMContentLoaded', () => {
    
    /* ====================================================== */
    /* 1. TỰ ĐỘNG CHẶN ĐIỆN THOẠI & TABLET (INJECT CSS + HTML) */
    /* ====================================================== */
    (function injectMobileBlocker() {
        // A. Tạo Style CSS cho màn hình chặn
        const style = document.createElement('style');
        style.innerHTML = `
            #mobile-blocker { 
                display: none; /* Mặc định ẩn trên PC */
            }
            
            /* KHI MÀN HÌNH NHỎ HƠN 1100PX (Mobile/Tablet) */
            @media screen and (max-width: 1100px) {
                #mobile-blocker {
                    display: flex !important;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: fixed;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background-color: #000; /* Nền đen kịt */
                    z-index: 99999999; /* Đè lên tất cả */
                    color: #fff;
                    text-align: center;
                    padding: 20px;
                }
                
                /* Ẩn thanh cuộn web gốc */
                body, html { overflow: hidden !important; }
                
                /* Ẩn luôn nội dung web gốc để chắc chắn */
                body > *:not(#mobile-blocker) { display: none !important; }
            }

            .blocker-content h1 { font-size: 3rem; margin-bottom: 20px; color: #e74c3c; font-family: sans-serif; }
            .blocker-content p { font-size: 1.2rem; line-height: 1.6; color: #ccc; font-family: sans-serif; margin: 10px 0; }
            .blocker-icon { font-size: 5rem; margin-bottom: 30px; animation: shake 1s infinite; }
            
            @keyframes shake {
                0% { transform: rotate(0deg); } 25% { transform: rotate(-10deg); } 
                75% { transform: rotate(10deg); } 100% { transform: rotate(0deg); }
            }
        `;
        document.head.appendChild(style);

        // B. Tạo HTML thông báo
        const blocker = document.createElement('div');
        blocker.id = 'mobile-blocker';
        blocker.innerHTML = `
            <div class="blocker-content">
                <div class="blocker-icon">💻 🚫 📱</div>
                <h1>Opps!</h1>
                <p>Trang web này được thiết kế tuyệt đẹp cho <b>PC & Laptop</b>.</p>
                <p>Điện thoại và iPad không đủ "đô" để gánh vẻ đẹp này đâu!</p>
                <br>
                <p style="color: #f1c40f; font-weight: bold;">Vui lòng mở lại trên máy tính nhé!</p>
            </div>
        `;
        document.body.appendChild(blocker);
    })();


    /* ====================================================== */
    /* 2. HIỆU ỨNG TUYẾT RƠI (Code cũ giữ nguyên)             */
    /* ====================================================== */
    const snowContainer = document.getElementById('snow-container');
    if (snowContainer) {
        function createSnowflake() {
            const snow = document.createElement("div");
            snow.classList.add("snowflake");
            const size = Math.random() * 3 + 2; 
            snow.style.width = `${size}px`;
            snow.style.height = `${size}px`;
            snow.style.left = Math.random() * 100 + "%";
            const duration = Math.random() * 5 + 5; 
            
            const animation = snow.animate([
                { transform: 'translateY(-10px)', opacity: Math.random() },
                { transform: `translateY(${window.innerHeight}px)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'linear',
                iterations: 1
            });

            animation.onfinish = () => snow.remove();
            snowContainer.appendChild(snow);
        }
        setInterval(createSnowflake, 100);
    }
});
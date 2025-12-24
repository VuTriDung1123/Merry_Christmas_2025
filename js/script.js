document.addEventListener('DOMContentLoaded', () => {
    
    /* ====================================================== */
    /* 1. GIAO DIỆN NHẮC NHỞ MOBILE (ĐẸP & THÂN THIỆN)        */
    /* ====================================================== */
    (function injectMobileBlocker() {
        // A. Tạo Style CSS đẹp lung linh cho màn hình thông báo
        const style = document.createElement('style');
        style.innerHTML = `
            #mobile-blocker { 
                display: none; /* Ẩn trên PC */
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
                    
                    /* Nền Gradient Đỏ - Đen Giáng Sinh sang trọng */
                    background: radial-gradient(circle at center, #8e0e00, #1f1c18);
                    
                    z-index: 99999999; 
                    color: #fff;
                    text-align: center;
                    padding: 30px;
                    box-sizing: border-box;
                }
                
                /* Ẩn thanh cuộn web gốc */
                body, html { overflow: hidden !important; }
                
                /* Ẩn nội dung phía sau để tối ưu hiệu năng */
                body > *:not(#mobile-blocker) { visibility: hidden !important; }
            }

            .blocker-box {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px); /* Hiệu ứng kính mờ */
                padding: 40px 20px;
                border-radius: 20px;
                border: 2px solid rgba(255, 215, 55, 0.3);
                box-shadow: 0 0 30px rgba(0,0,0,0.5);
                max-width: 90%;
            }

            .blocker-icon { 
                font-size: 5rem; 
                margin-bottom: 20px; 
                animation: floatIcon 3s ease-in-out infinite; 
                display: inline-block;
            }

            .blocker-title { 
                font-size: 2rem; 
                margin-bottom: 15px; 
                color: #ffd700; /* Màu vàng kim */
                font-family: 'Arial', sans-serif;
                font-weight: bold;
                text-transform: uppercase;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
            }

            .blocker-msg { 
                font-size: 1.1rem; 
                line-height: 1.6; 
                color: #eee; 
                font-family: 'Arial', sans-serif; 
                margin-bottom: 20px;
            }

            .blocker-note {
                font-size: 0.9rem;
                color: #aaa;
                font-style: italic;
                margin-top: 20px;
                border-top: 1px solid rgba(255,255,255,0.2);
                padding-top: 10px;
            }

            @keyframes floatIcon {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-10px) rotate(5deg); }
            }
        `;
        document.head.appendChild(style);

        // B. Tạo HTML nội dung thân thiện
        const blocker = document.createElement('div');
        blocker.id = 'mobile-blocker';
        blocker.innerHTML = `
            <div class="blocker-box">
                <div class="blocker-icon">💻✨🎄</div>
                <div class="blocker-title">Trải Nghiệm Tốt Nhất Trên PC</div>
                
                <div class="blocker-msg">
                    Chào bạn! Trang web này chứa rất nhiều <b>hiệu ứng 3D và đồ họa đặc biệt</b> để mừng Giáng Sinh.
                    <br><br>
                    Để ngắm nhìn trọn vẹn vẻ đẹp lung linh này, bạn vui lòng mở liên kết trên <b>Máy Tính (Laptop/PC)</b> nhé!
                </div>

                <div class="blocker-note">
                    (Điện thoại màn hình nhỏ sẽ không hiển thị hết được sự hoành tráng đâu!)
                </div>
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
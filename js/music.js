/* ====================================================== */
/* QUẢN LÝ NHẠC NỀN (GLOBAL) - FIX AUTOPLAY EDGE/CHROME   */
/* ====================================================== */

const songSrc = "music/hoa_nhip_giang_sinh_speedup.mp3";
let bgAudio; // Biến toàn cục lưu thẻ Audio
let musicBtn; // Biến lưu nút nhạc

// 1. Định nghĩa hàm phát nhạc TOÀN CỤC (để Iframe gọi được ngay lập tức)
window.playAudioExternally = function() {
    if (bgAudio) {
        // Cố gắng phát nhạc
        bgAudio.play().then(() => {
            console.log("Music started successfully!");
            if (musicBtn) musicBtn.classList.add('playing');
        }).catch(error => {
            console.warn("Trình duyệt chặn Autoplay (Edge/Chrome strict mode):", error);
            // Nếu vẫn bị chặn, ta không làm gì được hơn ngoài việc chờ user bấm nút nhạc thủ công
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 2. Kiểm tra nếu đã có nhạc thì thôi
    if (document.getElementById('bg-music')) return;

    // 3. Tạo thẻ Audio
    bgAudio = document.createElement('audio');
    bgAudio.id = 'bg-music';
    bgAudio.src = songSrc;
    bgAudio.loop = true; 
    bgAudio.volume = 0.5; 
    document.body.appendChild(bgAudio);

    // 4. Tạo nút Bật/Tắt nhạc (Giao diện)
    musicBtn = document.createElement('div');
    musicBtn.className = 'music-toggle-btn';
    musicBtn.innerHTML = '🎵'; 
    musicBtn.title = "Hòa Nhịp Giáng Sinh";
    document.body.appendChild(musicBtn);

    // 5. Xử lý khi bấm nút tròn trên màn hình (Thủ công)
    musicBtn.onclick = () => {
        if (bgAudio.paused) {
            bgAudio.play();
            musicBtn.classList.add('playing'); 
        } else {
            bgAudio.pause();
            musicBtn.classList.remove('playing'); 
        }
    };

    // 6. Thử tự động phát nhẹ (thường sẽ fail trên Chrome/Edge nhưng cứ thử)
    bgAudio.play().then(() => {
        musicBtn.classList.add('playing');
    }).catch(() => {
        // Im lặng chấp nhận số phận nếu chưa có tương tác
    });
});
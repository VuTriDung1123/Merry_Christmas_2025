// Đường dẫn bài hát DUY NHẤT
const songSrc = "music/hoa_nhip_giang_sinh_speedup.mp3";

function initMusicPlayer() {
    // 1. Kiểm tra xem đã có nhạc chưa (tránh tạo trùng lặp)
    if (document.getElementById('bg-music')) return;

    // 2. Tạo thẻ Audio (ẩn)
    const audio = document.createElement('audio');
    audio.id = 'bg-music';
    audio.src = songSrc;
    audio.loop = true; // Cho lặp lại vô tận
    audio.volume = 0.5; // Âm lượng vừa phải
    document.body.appendChild(audio);

    // 3. Tạo nút Bật/Tắt nhạc hình tròn
    const btn = document.createElement('div');
    btn.className = 'music-toggle-btn';
    btn.innerHTML = '🎵'; // Icon nốt nhạc
    btn.title = "Hòa Nhịp Giáng Sinh";
    document.body.appendChild(btn);

    // 4. Xử lý khi bấm nút
    btn.onclick = () => {
        if (audio.paused) {
            audio.play();
            btn.classList.add('playing'); // Thêm hiệu ứng xoay
        } else {
            audio.pause();
            btn.classList.remove('playing'); // Dừng xoay
        }
    };

    // 5. Tự động phát nhạc (Cố gắng phát ngay khi vào)
    // Lưu ý: Trình duyệt thường chặn tự phát nếu chưa tương tác, 
    // nên ta dùng .catch để không báo lỗi đỏ lòm trong console.
    audio.play().then(() => {
        btn.classList.add('playing');
    }).catch(error => {
        console.log("Chờ người dùng bấm nút để phát nhạc.");
    });
}

// Chạy hàm khởi tạo
window.addEventListener('load', initMusicPlayer);
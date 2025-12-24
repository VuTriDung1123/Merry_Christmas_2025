// Đường dẫn bài hát DUY NHẤT
const songSrc = "music/hoa_nhip_giang_sinh_speedup.mp3";

function initMusicPlayer() {
    // 1. Kiểm tra xem đã có nhạc chưa
    if (document.getElementById('bg-music')) return;

    // 2. Tạo thẻ Audio
    const audio = document.createElement('audio');
    audio.id = 'bg-music';
    audio.src = songSrc;
    audio.loop = true; 
    audio.volume = 0.5; 
    document.body.appendChild(audio);

    // 3. Tạo nút Bật/Tắt nhạc
    const btn = document.createElement('div');
    btn.className = 'music-toggle-btn';
    btn.innerHTML = '🎵'; 
    btn.title = "Hòa Nhịp Giáng Sinh";
    document.body.appendChild(btn);

    // Hàm bật nhạc (Dùng chung)
    const playMusic = () => {
        audio.play().then(() => {
            btn.classList.add('playing');
        }).catch(error => {
            console.log("Chờ tương tác người dùng...");
        });
    };

    // 4. Xử lý khi bấm nút
    btn.onclick = () => {
        if (audio.paused) {
            playMusic();
        } else {
            audio.pause();
            btn.classList.remove('playing'); 
        }
    };

    // 5. Cố gắng tự phát ngay lập tức (thường sẽ bị chặn)
    playMusic();

    // 6. [QUAN TRỌNG] Tạo hàm toàn cục để trang con (welcome.html) gọi được
    window.playAudioExternally = function() {
        if (audio.paused) {
            playMusic();
        }
    };
}

window.addEventListener('load', initMusicPlayer);
// 1. Danh sách bài hát
const songList = [
    { name: "Jingle Bell Rock", src: "music/jingle_bell_rock.mp3" },
    { name: "Hòa Nhịp Giáng Sinh (Speedup)", src: "music/hoa_nhip_giang_sinh_speedup.mp3" },
    { name: "Feliz Navidad (Speedup)", src: "music/feliz_navidad_speedup.mp3" },
    { name: "Last Christmas (Speedup)", src: "music/last_christmas_speedup.mp3" }
];

// 2. Hàm tạo HTML cho máy nghe nhạc
function createMusicPlayer() {
    // Tạo container chính
    const musicContainer = document.createElement('div');
    musicContainer.id = 'music-app';

    // Tạo nút Toggle
    const btn = document.createElement('div');
    btn.className = 'music-toggle-btn';
    btn.innerHTML = '🎵'; 
    btn.onclick = togglePlaylist;

    // Tạo danh sách Playlist
    const playlist = document.createElement('div');
    playlist.className = 'music-playlist';
    playlist.id = 'playlist';

    // Tạo từng dòng bài hát
    songList.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = 'song-item';
        item.innerText = song.name;
        item.onclick = () => playSong(index);
        item.dataset.index = index; 
        playlist.appendChild(item);
    });

    // Tạo thẻ Audio ẩn
    const audio = document.createElement('audio');
    audio.id = 'bg-music';
    
    // --- QUAN TRỌNG: Dòng này giúp nhạc lặp lại vô tận ---
    audio.loop = true; 
    // -----------------------------------------------------

    // Gắn vào HTML
    musicContainer.appendChild(audio);
    musicContainer.appendChild(playlist);
    musicContainer.appendChild(btn);
    document.body.appendChild(musicContainer);
}

// 3. Các hàm xử lý
let isPlaying = false;
let currentSongIndex = -1;

function togglePlaylist() {
    const playlist = document.getElementById('playlist');
    playlist.classList.toggle('show');
}

function playSong(index) {
    const audio = document.getElementById('bg-music');
    const btn = document.querySelector('.music-toggle-btn');
    const items = document.querySelectorAll('.song-item');

    currentSongIndex = index;
    audio.src = songList[index].src;
    audio.play();
    isPlaying = true;

    // Hiệu ứng xoay nút
    btn.classList.add('playing');
    
    // Đổi màu bài đang hát
    items.forEach(it => it.classList.remove('active'));
    items[index].classList.add('active');
}

// 4. Chạy khi tải trang
window.addEventListener('load', createMusicPlayer);
// 1. DANH SÁCH ẢNH GỐC
const waifuList = [
    "ei.jpg", "gawr_gura.jpg", "hatsune_miku.jpg", "hutao.jpg", "pandoru.jpg",
    "shinobu.jpg", "yae_miko.jpg", "yor_forger.jpg", "kanna_kamui.jpg", "tohru.jpg",
    "agnes_tachyon.jpg", "anya_smile.jpg", "special_week.jpg", "haru_urara.jpg", "emilia.jpg",
    "rem.jpg", "klee.jpg", "yotsuba_nakano.jpg", "miku_nakano.jpg", "nino_nakano.jpg",
    "ichika_nakano.jpg", "itsuki_nakano.jpg", "ina_ninomae.jpg", "herta.jpg", "kafka.jpg",
    "megumin.jpg", "paimon.jpg", "yamada_ryo.jpg", "bocchi_the_rock.jpg", "kita_ikuyo.jpg",
    "nijika_ijichi.jpg", "yuno_yasai.jpg", "rimuru_padoru.jpg", "aqua.jpg", "Padoru de No Game No Life.jpg",
    "frieren_evil_smile.jpg", "frieren.jpg", "komi_san.jpg", "louise.jpg", "mahiru_shiina.jpg",
    "senko.jpg", "zero_two.jpg", "kurumi.jpg", "siesta_.jpg", "kafuu_chino.jpg",
    "shirakami_fubuki.jpg", "sagiri.jpg", "inugami_korone.jpg", "lauriel.jpg", "aya.jpg",
    "helen.jpg", "sinestra.jpg", "aoi.jpg", "niconi.jpg", "himemori_luna.jpg",
    "citlati.jpg", "salor_moon.jpg", "makima.jpg", "ackerman_mikasa.jpg"
];

// 2. TẠO DANH SÁCH ĐẦY ĐỦ (118 ẢNH)
let fullList = [...waifuList, ...waifuList];

// Cấu trúc cây
const treeStructure = [1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18, 8, 8, 8];
const root = document.getElementById('treeRoot');

// --- HÀM XÁO TRỘN MẢNG (Fisher-Yates Shuffle) ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// --- HÀM VẼ LẠI CÂY ---
function buildTree() {
    // Xóa hết nội dung cũ chỉ giữ lại ngôi sao
    root.innerHTML = '<div class="star-top">⭐</div>';
    
    let currentIndex = 0;
    treeStructure.forEach(count => {
        const row = document.createElement('div');
        row.classList.add('tree-row');
        for (let i = 0; i < count; i++) {
            if (currentIndex < fullList.length) {
                const fileName = fullList[currentIndex];
                const displayName = fileName.replace('.jpg', '').replace(/_/g, ' ');
                const tile = document.createElement('div');
                tile.classList.add('waifu-tile');
                tile.setAttribute('data-name', displayName);
                const img = document.createElement('img');
                img.src = `pandoru/${fileName}`; 
                img.alt = displayName;
                img.onerror = function() { this.src = 'https://via.placeholder.com/50?text=Waifu'; };
                tile.appendChild(img);
                row.appendChild(tile);
                currentIndex++;
            }
        }
        root.appendChild(row);
    });
}

// === KHỞI CHẠY LẦN ĐẦU ===
shuffleArray(fullList); // Xáo trộn ngay khi vào trang
buildTree(); // Vẽ cây

// === BẮT SỰ KIỆN NÚT RANDOM ===
document.getElementById('randomBtn').addEventListener('click', function() {
    // Hiệu ứng xoay nhẹ nút khi bấm
    this.style.transform = 'rotate(360deg)';
    setTimeout(() => { this.style.transform = 'none'; }, 300);

    shuffleArray(fullList); // Xáo trộn lại danh sách
    buildTree(); // Vẽ lại cây mới
});

// 5. HIỆU ỨNG MƯA SAKURA (Giữ nguyên)
function createSakura() {
    const sakura = document.createElement('div');
    sakura.classList.add('sakura');
    const size = Math.random() * 15 + 10 + 'px';
    sakura.style.width = size; sakura.style.height = size;
    sakura.style.left = Math.random() * 100 + 'vw';
    sakura.style.animationDuration = Math.random() * 3 + 4 + 's';
    const colors = ['#ff9ff3', '#f368e0', '#ffc3a0', '#ffffff'];
    sakura.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(sakura);
    setTimeout(() => sakura.remove(), 8000);
}
setInterval(createSakura, 200);
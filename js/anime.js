// 1. DANH SÁCH ẢNH (59 TÊN)
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

// 2. NHÂN ĐÔI DANH SÁCH -> 118 ẢNH
let fullList = [...waifuList, ...waifuList];

// 3. THUẬT TOÁN XÁO TRỘN (FISHER-YATES SHUFFLE) - Random cực đều
for (let i = fullList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fullList[i], fullList[j]] = [fullList[j], fullList[i]];
}

// 4. CẤU TRÚC CÂY THÔNG (Tổng 118 ô)
const treeStructure = [
    1,  // Đỉnh
    2,
    3,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18, // Tán lá rộng nhất
    8,  // Gốc
    8,  // Gốc
    8   // Gốc
];

const root = document.getElementById('treeRoot');
let currentIndex = 0;

// 5. VẼ CÂY TỪ DANH SÁCH ĐÃ RANDOM
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
            
            img.onerror = function() {
                this.src = 'https://via.placeholder.com/50?text=Waifu';
            };

            tile.appendChild(img);
            row.appendChild(tile);
            currentIndex++;
        }
    }
    root.appendChild(row);
});

// 6. HIỆU ỨNG MƯA SAKURA
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
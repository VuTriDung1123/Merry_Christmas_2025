document.addEventListener('DOMContentLoaded', () => {
    const treeContainer = document.getElementById('gacha-tree-container');

    // 1. Danh sách 17 loại tiền tệ
    const gachaItems = [
        "astrite_wuthering_waves.png",
        "blackcard_punishing_gray_raven.png",
        "clear_drop_reverse1999.png",
        "crystal_granblue_fantasy.png",
        "crystal_hi3.png",
        "dark_crystal_towel_of_fantasy.png",
        "gems_nikke.png",
        "headhunting_permit_arknights.png",
        "hypercube_path_to_nowhere.png",
        "lumamber_alchemy_star.png",
        "polychrome_zzz.png",
        "primogem_genshin.png",
        "pyroxene_blue_archive.png",
        "saint_quartz_fate.png",
        "skystone_epic_seven.png",
        "stellar_jade_hsr.png",
        "wisdom_cube_azurlane.png"
    ];

    const totalCells = 118;
    const minAppearance = 6; 

    // 2. TẠO POOL ẢNH (Giữ nguyên logic cũ)
    let imagePool = [];
    gachaItems.forEach(item => {
        for (let i = 0; i < minAppearance; i++) imagePool.push(item);
    });
    while (imagePool.length < totalCells) {
        imagePool.push(gachaItems[Math.floor(Math.random() * gachaItems.length)]);
    }
    // Trộn (Shuffle)
    for (let i = imagePool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imagePool[i], imagePool[j]] = [imagePool[j], imagePool[i]];
    }

    // --- 3. LOGIC XẾP CÂY MỚI (CHIA 3 PHẦN) ---
    let poolIndex = 0;

    // Hàm hỗ trợ tạo 1 hàng
    function createRow(size, specialClass = '') {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('tree-row');
        
        for (let i = 0; i < size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('gacha-cell');
            if (specialClass) cell.classList.add(specialClass); // Thêm class cho thân/đế

            const imgName = imagePool[poolIndex];
            poolIndex++;

            const img = document.createElement('img');
            img.src = `gacha_pics/${imgName}`;
            img.classList.add('gacha-img');
            cell.title = imgName.replace('.png', '').replace(/_/g, ' ');

            cell.appendChild(img);
            rowDiv.appendChild(cell);
        }
        treeContainer.appendChild(rowDiv);
    }

    // PHẦN A: TÁN LÁ (Top Pyramid)
    // Tổng 105 ô = tháp từ 1 đến 14 hàng
    for (let row = 1; row <= 14; row++) {
        createRow(row);
    }

    // PHẦN B: THÂN CÂY (Trunk)
    // 2 hàng, mỗi hàng 3 ô
    for (let r = 0; r < 2; r++) {
        createRow(3, 'trunk-cell');
    }

    // PHẦN C: ĐẾ CÂY (Base)
    // 1 hàng ngang 7 ô
    createRow(7, 'base-cell');
});
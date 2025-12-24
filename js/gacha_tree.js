document.addEventListener('DOMContentLoaded', () => {
    const treeContainer = document.getElementById('gacha-tree-container');
    const randomBtn = document.getElementById('randomBtn'); // Get the button element

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
    let imagePool = [];

    // --- FUNCTION: Initialize and Shuffle Pool ---
    function initializePool() {
        imagePool = []; // Reset pool
        
        // Add minimum required items
        gachaItems.forEach(item => {
            for (let i = 0; i < minAppearance; i++) imagePool.push(item);
        });
        
        // Fill the rest randomly
        while (imagePool.length < totalCells) {
            imagePool.push(gachaItems[Math.floor(Math.random() * gachaItems.length)]);
        }
        
        // Shuffle logic
        for (let i = imagePool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [imagePool[i], imagePool[j]] = [imagePool[j], imagePool[i]];
        }
    }

    // --- FUNCTION: Build the Tree ---
    function buildGachaTree() {
        // Clear existing tree content
        treeContainer.innerHTML = '';
        
        let poolIndex = 0;

        // Helper function to create a row
        function createRow(size, specialClass = '') {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('tree-row');
            
            for (let i = 0; i < size; i++) {
                const cell = document.createElement('div');
                cell.classList.add('gacha-cell');
                if (specialClass) cell.classList.add(specialClass);

                // Check if we have items left in pool, otherwise wrap around or pick random
                // (Though totalCells logic should prevent running out)
                const imgName = imagePool[poolIndex % imagePool.length]; 
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

        // PHẦN A: TÁN LÁ (Top Pyramid) - 1 to 14 rows
        for (let row = 1; row <= 14; row++) {
            createRow(row);
        }

        // PHẦN B: THÂN CÂY (Trunk) - 2 rows of 3
        for (let r = 0; r < 2; r++) {
            createRow(3, 'trunk-cell');
        }

        // PHẦN C: ĐẾ CÂY (Base) - 1 row of 7
        createRow(7, 'base-cell');
    }

    // --- INITIAL RUN ---
    initializePool();
    buildGachaTree();

    // --- EVENT LISTENER FOR RANDOM BUTTON ---
    if(randomBtn) {
        randomBtn.addEventListener('click', function() {
            // Optional: Button visual feedback
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => { this.style.transform = 'none'; }, 300);

            // Re-shuffle and Re-build
            initializePool();
            buildGachaTree();
        });
    }
});
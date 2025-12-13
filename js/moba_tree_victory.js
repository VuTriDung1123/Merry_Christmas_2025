document.addEventListener('DOMContentLoaded', () => {
    const treeContainer = document.getElementById('moba-tree-container');

    const treeStructure = [
        1, // Ngôi sao (Grandmaster)
        1, // Đỉnh cây (Victory)
        3,
        5,
        7,
        9,
        11,
        13,
        3, // Gốc
        3, 
        3  
    ];

    // --- ĐƯỜNG DẪN ẢNH (Kiểm tra lại đuôi file .png hay .jpg nhé) ---
    const starImgSrc = 'pictures/grandmaster_lien_quan.png';
    const bodyImgSrc = 'pictures/victory_lien_quan.png';

    treeStructure.forEach((count, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('tree-row');

        for (let i = 0; i < count; i++) {
            const img = document.createElement('img');
            // Vẫn dùng class moba-icon để lấy kích thước 60px đã chỉnh
            img.classList.add('moba-icon');

            // Xử lý hàng đầu tiên (Ngôi sao Grandmaster)
            if (rowIndex === 0) {
                img.src = starImgSrc;
                img.alt = "Grandmaster Rank Star";
                // Thêm class riêng để nhận hiệu ứng màu tím/vàng
                img.classList.add('grandmaster-icon');
            } 
            // Xử lý các hàng Victory
            else {
                img.src = bodyImgSrc;
                img.alt = "Victory";
                
                if (rowIndex >= treeStructure.length - 3) {
                    img.classList.add('trunk-icon');
                }
            }

            rowDiv.appendChild(img);
        }
        treeContainer.appendChild(rowDiv);
    });
});
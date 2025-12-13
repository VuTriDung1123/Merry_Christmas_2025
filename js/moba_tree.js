document.addEventListener('DOMContentLoaded', () => {
    const treeContainer = document.getElementById('moba-tree-container');

    // Cấu trúc cây: Mỗi số trong mảng là số lượng ảnh trong một hàng.
    // Hàng đầu tiên là ngôi sao. Các hàng sau tăng dần để tạo hình tháp.
    // 3 hàng cuối cùng là gốc cây.
    const treeStructure = [
        1, // Ngôi sao (Rank Đồng)
        1, // Đỉnh cây (Defeat)
        3,
        5,
        7,
        9,
        11,
        13,
        3, // Gốc cây 1
        3, // Gốc cây 2
        3  // Gốc cây 3
    ];

    // Đường dẫn ảnh (HÃY KIỂM TRA ĐÚNG ĐUÔI FILE CỦA BẠN, ví dụ .png hoặc .jpg)
    const starImgSrc = 'pictures/bronze_lien_quan.png';
    const bodyImgSrc = 'pictures/defeat_lien_quan.png';

    // Duyệt qua từng dòng trong cấu trúc
    treeStructure.forEach((count, rowIndex) => {
        // 1. Tạo một thẻ div đại diện cho một hàng
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('tree-row');

        // 2. Trong mỗi hàng, tạo số lượng ảnh tương ứng
        for (let i = 0; i < count; i++) {
            const img = document.createElement('img');
            img.classList.add('moba-icon');

            // Xử lý hàng đầu tiên (Ngôi sao)
            if (rowIndex === 0) {
                img.src = starImgSrc;
                img.alt = "Bronze Rank Star";
                img.classList.add('star-icon');
            } 
            // Xử lý các hàng thân và gốc cây
            else {
                img.src = bodyImgSrc;
                img.alt = "Defeat";
                
                // Nếu là 3 hàng cuối thì thêm class trunk-icon để làm tối màu gốc cây
                if (rowIndex >= treeStructure.length - 3) {
                    img.classList.add('trunk-icon');
                }
            }

            // Thêm ảnh vào hàng
            rowDiv.appendChild(img);
        }

        // 3. Thêm hàng vào container chính
        treeContainer.appendChild(rowDiv);
    });
});
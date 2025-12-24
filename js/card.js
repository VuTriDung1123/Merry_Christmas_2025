// Tham chiếu các phần tử
const book = document.querySelector("#book");
const papers = [];
// Lấy đủ 5 tờ giấy
for (let i = 1; i <= 5; i++) {
    papers.push(document.querySelector(`#p${i}`));
}

// Thêm sự kiện click cho từng tờ giấy
papers.forEach(paper => {
    paper.addEventListener("click", function(e) {
        // 1. Tính toán vị trí click
        // Lấy khung hình chữ nhật của cuốn sách
        const rect = book.getBoundingClientRect();
        // Tọa độ X của chuột so với lề trái của sách
        const clickX = e.clientX - rect.left;
        
        // 2. Kiểm tra bấm bên Trái hay Phải
        if (clickX > rect.width / 2) {
            // Nếu bấm bên PHẢI -> Đi tiếp
            goNextPage();
        } else {
            // Nếu bấm bên TRÁI -> Quay lại
            goPrevPage();
        }
    });
});

let currentLocation = 1;
const numOfPapers = 5;
const maxLocation = numOfPapers + 1;

// --- HÀM ĐI TIẾP (NEXT) ---
function goNextPage() {
    if(currentLocation < maxLocation) {
        
        // 1. KHI MỞ TRANG ĐẦU TIÊN (Dịch gáy sách ra giữa)
        if (currentLocation === 1) {
            book.classList.add("open-state");
        }

        // 2. KHI LẬT TRANG CUỐI CÙNG (Dịch gáy sách sang phải để trang cuối nằm giữa)
        if (currentLocation === numOfPapers) {
            book.classList.remove("open-state");
            book.classList.add("close-state"); 
        }

        const currentPaper = papers[currentLocation - 1];
        currentPaper.classList.add("flipped");
        
        // Z-index: Trang mới lật phải nằm đè lên trang cũ
        currentPaper.style.zIndex = currentLocation;

        currentLocation++;
    }
}

// --- HÀM QUAY LẠI (PREVIOUS) - MỚI THÊM ---
function goPrevPage() {
    if (currentLocation > 1) {
        
        // Lấy tờ giấy cần đóng lại (Trang vừa lật trước đó)
        // Ví dụ: Đang ở loc 2 (đã lật P1), muốn về loc 1 -> Cần đóng P1 (papers[0])
        const paperToClose = papers[currentLocation - 2];

        // 1. XỬ LÝ VỊ TRÍ SÁCH KHI LÙI
        
        // Nếu đang ở trang cuối cùng (loc 6) lùi về -> Bỏ trạng thái đóng, về trạng thái mở
        if (currentLocation === maxLocation) {
            book.classList.remove("close-state");
            book.classList.add("open-state");
        }

        // Nếu đang ở trang 2 lùi về trang 1 (Đóng bìa sách) -> Bỏ trạng thái mở, về giữa
        if (currentLocation === 2) {
            book.classList.remove("open-state");
        }

        // 2. THỰC HIỆN ĐÓNG TRANG
        paperToClose.classList.remove("flipped");
        
        // Trả lại Z-index ban đầu để nó chìm xuống dưới các trang chưa lật
        // (Công thức z-index gốc: 5, 4, 3, 2, 1)
        const originalZIndex = numOfPapers - (currentLocation - 2);
        
        // Delay nhẹ z-index để không bị chớp hình khi animation đang chạy
        setTimeout(() => {
            paperToClose.style.zIndex = originalZIndex;
        }, 200);

        currentLocation--;
    }
}

// --- HÀM ĐÓNG SÁCH (RESET) ---
function closeBook() {
    book.classList.remove("open-state");
    book.classList.remove("close-state");

    for (let i = numOfPapers - 1; i >= 0; i--) {
        const paper = papers[i];
        
        const delay = (numOfPapers - 1 - i) * 150;

        setTimeout(() => {
            paper.classList.remove("flipped");
        }, delay);

        setTimeout(() => {
            paper.style.zIndex = numOfPapers - i; 
        }, delay + 800); 
    }

    currentLocation = 1;
}
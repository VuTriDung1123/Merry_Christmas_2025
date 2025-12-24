// Tham chiếu các phần tử
const book = document.querySelector("#book");
const papers = [];
// Lấy đủ 5 tờ giấy
for (let i = 1; i <= 5; i++) {
    papers.push(document.querySelector(`#p${i}`));
}

papers.forEach(paper => {
    paper.addEventListener("click", goNextPage);
});

let currentLocation = 1;
const numOfPapers = 5;
const maxLocation = numOfPapers + 1;

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

function closeBook() {
    // --- SỬA LỖI LỆCH TRANG BÌA TẠI ĐÂY ---
    // Phải xóa cả 2 trạng thái để sách về vị trí mặc định (giữa màn hình)
    book.classList.remove("open-state");
    book.classList.remove("close-state"); // <--- Dòng quan trọng mới thêm

    // Đóng từng trang
    for (let i = numOfPapers - 1; i >= 0; i--) {
        const paper = papers[i];
        
        // Tính độ trễ để đóng lần lượt
        const delay = (numOfPapers - 1 - i) * 150;

        // A. Bắt đầu lật giấy về
        setTimeout(() => {
            paper.classList.remove("flipped");
        }, delay);

        // B. SỬA LỖI HÌNH ẢNH: Chỉ trả lại Z-Index SAU KHI giấy đã lật xong (800ms)
        // Nếu trả lại sớm quá, trang bìa sẽ hiện đè lên nội dung gây lỗi hiển thị
        setTimeout(() => {
            paper.style.zIndex = numOfPapers - i; 
        }, delay + 800); 
    }

    currentLocation = 1;
}
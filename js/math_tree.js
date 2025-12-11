// Danh sách các lời chúc kiểu Toán học
const mathWishes = [
    "Đời là một bài toán hình học không gian. Chúc bạn luôn tìm được 'thiết diện' hạnh phúc nhất!",
    "Giả sử: Noel = Vui vẻ. Chứng minh: Bạn hạnh phúc tại mọi điểm thuộc miền xác định!",
    "Chúc tình yêu của bạn luôn đồng biến và tịnh tiến đến vô cùng!",
    "Mong niềm vui của bạn là một hàm số mũ, tăng trưởng không giới hạn!"
];

// Hàm chọn ngẫu nhiên lời chúc khi tải trang
function setMathWish() {
    const wishElement = document.getElementById('math-wish-content');
    if (wishElement) {
        const randomWish = mathWishes[Math.floor(Math.random() * mathWishes.length)];
        wishElement.innerHTML = randomWish;
    }
}

// Thêm sự kiện click cho các điểm (Point) để tương tác vui
document.querySelectorAll('.point').forEach(point => {
    point.addEventListener('click', function() {
        alert("Tọa độ điểm này chứa đầy may mắn!");
    });
});

// Chạy hàm khi trang tải xong
window.onload = function() {
    setMathWish();
};
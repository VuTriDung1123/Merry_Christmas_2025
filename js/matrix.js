/* ===== PHẦN 1: TẠO CÂY THÔNG MATRIX (AUTO GENERATE) ===== */
const treeContainer = document.getElementById('tree');
const treeHeight = 35; // ĐỘ CAO CỦA CÂY (Tăng số này để cây to hơn)

let treeHTML = "";

// 1. Tạo tán lá (Tam giác)
for (let i = 1; i <= treeHeight; i++) {
    let rowContent = "";
    // Số lượng ký tự tăng dần theo tầng (1, 2, 3...)
    for (let j = 0; j < i; j++) {
        // Random 0 hoặc 1
        rowContent += (Math.random() > 0.5 ? "1" : "0") + " ";
    }
    treeHTML += `<div class="row">${rowContent}</div>`;
}

// 2. Tạo gốc cây
for (let k = 0; k < 4; k++) {
    treeHTML += `<div class="trunk">|||</div>`;
}

treeContainer.innerHTML = treeHTML;

// 3. Hiệu ứng đổi số liên tục (Real-time Hacking)
setInterval(() => {
    const rows = document.querySelectorAll('.row');
    // Chọn ngẫu nhiên 10 dòng để đổi số (đỡ lag hơn đổi tất cả)
    for(let i=0; i<10; i++) {
        const randomRow = rows[Math.floor(Math.random() * rows.length)];
        if(randomRow) {
            let txt = randomRow.innerText;
            let newTxt = "";
            for(let char of txt) {
                if(char === " ") newTxt += " ";
                else newTxt += Math.random() > 0.5 ? "1" : "0";
            }
            randomRow.innerText = newTxt;
            // Hiệu ứng nháy màu trắng khi đổi số
            randomRow.style.color = "#fff";
            setTimeout(() => randomRow.style.color = "", 100);
        }
    }
}, 50);


/* ===== PHẦN 2: BACKGROUND MATRIX RAIN (CANVAS) ===== */
const canvas = document.getElementById('matrixBg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "0101010101MATRIX"; // Ký tự rơi
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Tạo vệt mờ
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0"; // Màu chữ xanh
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 33);

// Resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
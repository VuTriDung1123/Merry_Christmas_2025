// BẢN ĐỒ PIXEL (RỘNG 25 CỘT)
// g: green, y: yellow, r: red, b: blue, w: wood, 0: blank
const pixelMap = [
    "000000000000y000000000000", // Đỉnh sao
    "00000000000ggg00000000000",
    "0000000000ggggg0000000000",
    "000000000gggrggg000000000",
    "00000000ggggggggg00000000", // Hết tầng 1
    "0000000000ggggg0000000000", // Thắt eo
    "000000000ggggggg000000000",
    "00000000ggbggggrgg0000000",
    "0000000ggggggggggg0000000",
    "000000gggggrggbgggg000000",
    "00000ggggggggggggggg00000", // Hết tầng 2
    "00000000ggggggggg00000000", // Thắt eo
    "0000000gggggrgggggg000000",
    "000000gggggggggbgggg00000",
    "00000gggggbgggggggggg0000",
    "0000gggggggggrgggggggg000",
    "000gggggrggggggggbgggg000",
    "00ggggggggggggggggggggg00", // Hết tầng 3
    "0000000ggggggggggg0000000", // Thắt eo
    "000000gggggbgrggggg000000",
    "00000ggggggggggggggg00000",
    "0000gggggrgggggggbiggg000",
    "000gggggggggbgggggggggg00",
    "00gggggbgggggggggrgggggg0",
    "0ggggggggggggggggggggggg0",
    "gggggggggrggggggggbgggggg", // Đáy tán lá
    "0000000000wwwww0000000000", // Gốc cây
    "0000000000wwwww0000000000",
    "0000000000wwwww0000000000",
    "0000000000wwwww0000000000"
];

const grid = document.getElementById('pixelTree');
pixelMap.forEach(row => {
    for (let char of row) {
        const div = document.createElement('div');
        div.classList.add('pixel');
        if (char === '0') div.classList.add('tr');
        else if (char === 'g') div.classList.add('gr');
        else if (char === 'y') div.classList.add('ye');
        else if (char === 'r') div.classList.add('re');
        else if (char === 'b') div.classList.add('bl');
        else if (char === 'w') div.classList.add('br');
        grid.appendChild(div);
    }
});
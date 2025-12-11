const elementsList = [
    "H",                                                                                                  "He",
    "Li", "Be",                                                             "B",  "C",  "N",  "O",  "F",  "Ne",
    "Na", "Mg",                                                             "Al", "Si", "P",  "S",  "Cl", "Ar",
    "K",  "Ca", "Sc", "Ti", "V",  "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr",
    "Rb", "Sr", "Y",  "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I",  "Xe",
    "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn",
    "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"
];

const pyramidStructure = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; 
let currentElemIndex = 0;

function createElementDiv(symbol, index, extraClass = '') {
    const div = document.createElement('div');
    div.classList.add('element');
    div.classList.add('elem-' + symbol);
    if (extraClass) div.classList.add(extraClass);
    
    const numberSpan = document.createElement('span');
    numberSpan.className = 'atomic-number';
    numberSpan.textContent = index + 1;
    
    div.appendChild(numberSpan);
    div.appendChild(document.createTextNode(symbol));
    return div;
}

// 1. TẠO THÁP (Top)
const topContainer = document.getElementById('tree-top');
pyramidStructure.forEach(rowSize => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'chem-row';
    for (let i = 0; i < rowSize; i++) {
        if (currentElemIndex < 105) { 
            rowDiv.appendChild(createElementDiv(elementsList[currentElemIndex], currentElemIndex));
            currentElemIndex++;
        }
    }
    topContainer.appendChild(rowDiv);
});

// 2. TẠO THÂN (Trunk) - 2x3
const trunkContainer = document.getElementById('tree-trunk');
for (let r = 0; r < 2; r++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'chem-row';
    for (let c = 0; c < 3; c++) {
        if (currentElemIndex < 111) {
            rowDiv.appendChild(createElementDiv(elementsList[currentElemIndex], currentElemIndex, 'trunk-elem'));
            currentElemIndex++;
        }
    }
    trunkContainer.appendChild(rowDiv);
}

// 3. TẠO ĐẾ (Base) - Hàng ngang
const baseContainer = document.getElementById('tree-base');
const baseRowDiv = document.createElement('div');
baseRowDiv.className = 'chem-row';
while (currentElemIndex < elementsList.length) {
    baseRowDiv.appendChild(createElementDiv(elementsList[currentElemIndex], currentElemIndex, 'base-elem'));
    currentElemIndex++;
}
baseContainer.appendChild(baseRowDiv);
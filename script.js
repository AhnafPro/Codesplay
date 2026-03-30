const select        = document.getElementById('langSelect');
const display       = document.getElementById('selectDisplay');
const codeInput     = document.getElementById('codeInput');
const vsCodeOutput  = document.getElementById('vsCodeOutput');
const highlighted   = document.getElementById('highlighted');
const lineNumbers   = document.getElementById('lineNumbers');
const fontSlider    = document.getElementById('fontSlider');
const fontSizeLabel = document.getElementById('fontSizeLabel');
const titleInput    = document.getElementById('titleInput');
const titleIcon     = document.getElementById('titleIcon');
const titleText     = document.getElementById('titleText');
const panel         = document.getElementById('vscodePanel');
const handleRight   = document.getElementById('handleRight');
const handleBottom  = document.getElementById('handleBottom');
const statusLang    = document.getElementById('statusLang');

let currentLang = 'htmlcss';

const statusLabelMap = {
    htmlcss:    'HTML',
    jstsx:      'JavaScript',
    shell:      'Shell',
    cplussharp: 'C++',
    python:     'Python',
    java:       'Java'
};

const langMap = {
    htmlcss:    'html',
    jstsx:      'javascript',
    shell:      'bash',
    cplussharp: 'cpp',
    python:     'python',
    java:       'java'
};

const extMap = {
    htmlcss:    'html',
    jstsx:      'js',
    shell:      'sh',
    cplussharp: 'cpp',
    python:     'py',
    java:       'java'
};

function updateOutput() {
    const code = codeInput.value;
    if (code.trim() === '') {
        highlighted.innerHTML = '';
        lineNumbers.innerHTML = '<span>1</span>';
        return;
    }
    highlighted.removeAttribute('data-highlighted');
    highlighted.className = 'language-' + (langMap[currentLang] || 'html');
    highlighted.textContent = code;
    hljs.highlightElement(highlighted);

    const lineCount = code.split('\n').length;
    lineNumbers.innerHTML = Array.from(
        { length: lineCount },
        (_, i) => `<span>${i + 1}</span>`
    ).join('');
}


function updateTitle() {
    const name = titleInput.value.trim() || 'title';
    const ext  = extMap[currentLang] || 'html';
    titleText.textContent = name + '.' + ext;
}

select.addEventListener('click', (e) => {
    select.classList.toggle('open');
    e.stopPropagation();
});

document.querySelectorAll('.select-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
        document.querySelectorAll('.select-option').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        const icon  = opt.dataset.icon;
        const label = opt.dataset.label;
        currentLang = opt.dataset.value;
        display.innerHTML = `
            <img class="lang-icon" src="${icon}" alt="">
            <span>${label}</span>
            <span class="select-arrow">▼</span>
        `;
        titleIcon.src = icon;
        statusLang.textContent = statusLabelMap[currentLang] || 'HTML';
        updateOutput();
        updateTitle();
        select.classList.remove('open');
        e.stopPropagation();
    });
});

document.addEventListener('click', () => select.classList.remove('open'));


fontSlider.addEventListener('input', () => {
    const size = fontSlider.value + 'px';
    fontSizeLabel.textContent = size;
    highlighted.style.fontSize = size;
    lineNumbers.style.fontSize = size;
});


codeInput.addEventListener('input', updateOutput);
titleInput.addEventListener('input', updateTitle);


const copyBtn   = document.getElementById('copyBtn');
const copyIcon  = document.getElementById('copyIcon');
const checkIcon = document.getElementById('checkIcon');
const copyLabel = document.getElementById('copyLabel');

copyBtn.addEventListener('click', () => {
    const code = codeInput.value;
    if (!code.trim()) return;

    navigator.clipboard.writeText(code).then(() => {
        copyIcon.style.display  = 'none';
        checkIcon.style.display = '';
        copyLabel.textContent   = 'Copied!';
        copyBtn.classList.add('copied');

        setTimeout(() => {
            copyIcon.style.display  = '';
            checkIcon.style.display = 'none';
            copyLabel.textContent   = '';
            copyBtn.classList.remove('');
        }, 2000);
    });
});


vsCodeOutput.addEventListener('scroll', () => {
    lineNumbers.scrollTop = vsCodeOutput.scrollTop;
});

let resizeType = null; 
let startX, startY, startW, startH;

function onMouseDown(e, type) {
    resizeType = type;
    startX = e.clientX;
    startY = e.clientY;
    startW = panel.getBoundingClientRect().width;
    startH = panel.getBoundingClientRect().height;

    if (type === 'right') {
        document.body.style.cursor = 'ew-resize';
        handleRight.classList.add('active');
    } else {
        document.body.style.cursor = 'ns-resize';
        handleBottom.classList.add('active');
    }

    document.body.style.userSelect = 'none';
    e.preventDefault();
}

handleRight.addEventListener('mousedown',  e => onMouseDown(e, 'right'));
handleBottom.addEventListener('mousedown', e => onMouseDown(e, 'bottom'));

document.addEventListener('mousemove', (e) => {
    if (!resizeType) return;

    if (resizeType === 'right') {
        const delta = e.clientX - startX;
        const newW  = Math.max(200, Math.min(window.innerWidth * 0.75, startW + delta));
        panel.style.width = newW + 'px';
    }

    if (resizeType === 'bottom') {
        const delta = e.clientY - startY;
        const newH  = Math.max(120, Math.min(window.innerHeight - 80, startH + delta));
        panel.style.height = newH + 'px';
    }
});

document.addEventListener('mouseup', () => {
    if (!resizeType) return;
    resizeType = null;
    handleRight.classList.remove('active');
    handleBottom.classList.remove('active');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
});

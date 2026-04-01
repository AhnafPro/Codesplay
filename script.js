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
const macHighlighted = document.getElementById('mac-highlighted');
const macTitle       = document.getElementById('mac-title');
const macTitleIcon   = document.getElementById('mac-title-icon');
const vscodeCopyBtn  = document.getElementById('vscodeCopyBtn');
const macCopyBtn     = document.getElementById('macCopyBtn');
const vscodeEmbedBtn   = document.getElementById('vscodeEmbedBtn');
const macEmbedBtn      = document.getElementById('macEmbedBtn');
const vscodeDownloadBtn = document.getElementById('vscodeDownloadBtn');
const macDownloadBtn    = document.getElementById('macDownloadBtn');

let currentLang = 'htmlcss';

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

const statusLabelMap = {
    htmlcss:    'HTML',
    jstsx:      'JavaScript',
    shell:      'Shell',
    cplussharp: 'C++',
    python:     'Python',
    java:       'Java'
};

function updateOutput() {
    const code = codeInput.value;

    if (code.trim() === '') {
        highlighted.innerHTML = '';
        lineNumbers.innerHTML = '<span>1</span>';
        macHighlighted.innerHTML = '';
        return;
    }

    highlighted.removeAttribute('data-highlighted');
    highlighted.className = 'language-' + (langMap[currentLang] || 'html');
    highlighted.textContent = code;
    hljs.highlightElement(highlighted);

    macHighlighted.removeAttribute('data-highlighted');
    macHighlighted.className = 'language-' + (langMap[currentLang] || 'html');
    macHighlighted.textContent = code;
    hljs.highlightElement(macHighlighted);

    const lineCount = code.split('\n').length;
    lineNumbers.innerHTML = Array.from({ length: lineCount }, (_, i) => `<span>${i + 1}</span>`).join('');
}

function updateTitle() {
    const name = titleInput.value.trim() || 'title';
    const ext  = extMap[currentLang] || 'html';
    titleText.textContent = name + '.' + ext;
    macTitle.textContent  = name + '.' + ext;
}

function triggerCopy(btn) {
    const code = codeInput.value;
    if (!code.trim()) return;
    navigator.clipboard.writeText(code).then(() => {
        btn.classList.add('copied');
        btn.querySelector('svg').innerHTML = '<polyline points="20 6 9 17 4 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>';
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.querySelector('svg').innerHTML = '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>';
        }, 1800);
    });
}

const EMBED_CSS = `*{margin:0;padding:0;box-sizing:border-box}body{background:transparent;overflow:hidden;font-family:"Google Sans Code","Consolas",monospace}.vscode{width:100%;height:100vh;background-color:#1f2428;display:flex;flex-direction:column;overflow:hidden}.vscode-head{width:100%;height:25px;background-color:#1f2428;display:flex;align-items:center;flex-shrink:0}.vscode-logo{width:15px;height:15px;margin-left:10px}.vscode-headbar{width:150px;height:10px;background-color:#262b2f;border-radius:2px;border:1px solid #2c3135;font-size:8px;color:#3c3d3e;line-height:10px;text-align:center;margin-left:auto;margin-right:auto}.vscode-codetitlename{width:100%;height:25px;background-color:#222323;display:flex;align-items:center;border-top:1.5px solid #262728;border-bottom:1.5px solid #262728;flex-shrink:0}.vscode-codetitle{height:100%;min-width:80px;max-width:40%;background-color:#262728;border-radius:2px;font-size:10px;color:#eaebec;border-top:2px solid #0078d4;display:flex;align-items:center;padding:0 10px;white-space:nowrap;font-family:"Stack Sans Text",sans-serif}.vscode-codetitle img{margin-right:4px}.vscode-codebody{display:flex;flex:1;min-height:0;margin-bottom:8px;overflow:hidden}.vscode-linenumbers{background-color:#1f2428;color:#4a5568;font-family:"Google Sans Code",monospace;font-size:12px;padding:10px 10px 10px 6px;text-align:right;user-select:none;line-height:1.6;min-width:36px;overflow:hidden;flex-shrink:0;display:block}.vscode-linenumbers span{display:block;line-height:1.6}.vscode-codeinput{flex:1;background-color:#1f2428;overflow:auto;padding:10px}.vscode-codeinput::-webkit-scrollbar{width:6px;height:6px}.vscode-codeinput::-webkit-scrollbar-track{background:transparent}.vscode-codeinput::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:99px}.vscode-codeinput pre{margin:0;padding:0;background:transparent!important}.vscode-codeinput pre code.hljs{background:transparent!important;padding:0!important;font-family:"Google Sans Code",monospace!important;font-size:12px!important;line-height:1.6!important;display:block;white-space:pre;text-align:left}.vscode-statusbar{width:100%;height:20px;background-color:#0078d4;display:flex;align-items:center;justify-content:flex-end;gap:2px;padding:0 8px;flex-shrink:0}.vscode-statusbar-item{font-family:"Stack Sans Text",sans-serif;font-size:10px;color:rgba(255,255,255,0.9);padding:0 6px;height:100%;display:flex;align-items:center;border-radius:2px;white-space:nowrap}.mac{width:100%;height:100vh;background-color:#282c34;display:flex;flex-direction:column;overflow:hidden}.mac-titlebar{width:100%;height:38px;background-color:#21252b;display:flex;align-items:center;padding:0 14px;flex-shrink:0}.mac-dots{display:flex;align-items:center;gap:6px;flex-shrink:0}.mac-dot{width:12px;height:12px;border-radius:50%}.mac-dot-red{background-color:#ff5f57}.mac-dot-yellow{background-color:#febc2e}.mac-dot-green{background-color:#28c840}.mac-title-file{display:flex;align-items:center;margin-left:auto;margin-right:auto;font-family:"Stack Sans Text",sans-serif;font-size:12px;color:rgba(255,255,255,0.55);white-space:nowrap}.mac-codebody{flex:1;overflow:auto;padding:20px;min-height:0}.mac-codebody pre{margin:0;padding:0;background:transparent!important}.mac-codebody pre code.hljs{background:transparent!important;padding:0!important;font-family:"Google Sans Code",monospace!important;font-size:13px!important;line-height:1.7!important;display:block;white-space:pre;text-align:left}.mac-codebody::-webkit-scrollbar{width:6px;height:6px}.mac-codebody::-webkit-scrollbar-track{background:transparent}.mac-codebody::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:99px}`;

const EMBED_JS = `var _={htmlcss:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",jstsx:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",shell:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",cplussharp:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",python:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",java:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"},d={htmlcss:"html",jstsx:"javascript",shell:"bash",cplussharp:"cpp",python:"python",java:"java"},m=window.__EMBED_DATA__||{},p=m.panel||"vscode",l=m.lang||"htmlcss",t=m.title||"untitled.html",c=m.code||"",i=_[l]||_.htmlcss,h=d[l]||"html",e=c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),n=c?c.split("\\n").length:1,o=Array.from({length:n},(_,j)=>"<span>"+(j+1)+"</span>").join(""),r=document.getElementById("embed-root");if(p==="mac"){r.innerHTML='<div class="mac"><div class="mac-titlebar"><div class="mac-dots"><div class="mac-dot mac-dot-red"></div><div class="mac-dot mac-dot-yellow"></div><div class="mac-dot mac-dot-green"></div></div><div class="mac-title-file"><img src="'+i+'" width="13" height="13" alt=""><span>'+t+"</span></div></div><div class=\\"mac-codebody\\"><pre><code class=\\"language-"+h+'">'+e+"</code></pre></div></div>"}else{r.innerHTML='<div class="vscode"><div class="vscode-head"><img class="vscode-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/500px-Visual_Studio_Code_1.35_icon.svg.png" alt=""><div class="vscode-headbar">codesplay vscode snippet</div></div><div class="vscode-codetitlename"><div class="vscode-codetitle"><img src="'+i+'" width="10" height="10" alt=""><span>'+t+'</span></div></div><div class="vscode-codebody"><div class="vscode-linenumbers">'+o+'</div><div class="vscode-codeinput"><pre><code class="language-'+h+'">'+e+'</code></pre></div></div><div class="vscode-statusbar"><span class="vscode-statusbar-item"> main</span><span class="vscode-statusbar-item">'+l.toUpperCase()+'</span><span class="vscode-statusbar-item">UTF-8</span></div></div>'}document.querySelectorAll('code[class*="language-"]').forEach(function(el){hljs.highlightElement(el)})`;

function buildEmbedCode(panelId) {
    const code = codeInput.value;
    if (!code.trim()) return '';
    const lang = langMap[currentLang] || 'htmlcss';
    const title = (titleInput.value.trim() || 'untitled') + '.' + (extMap[currentLang] || 'html');

    const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${EMBED_CSS}</style><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"><\/script></head><body><div id="embed-root"></div><script>window.__EMBED_DATA__={panel:"${panelId}",lang:"${lang}",title:${JSON.stringify(title)},code:${JSON.stringify(code)}};${EMBED_JS}<\/script></body></html>`;

    return `<iframe src="data:text/html;base64,${btoa(unescape(encodeURIComponent(html)))}" width="600" height="400" frameborder="0" style="border-radius:8px;overflow:hidden;" loading="lazy"></iframe>`;
}

function triggerEmbed(btn, panelId) {
    const embed = buildEmbedCode(panelId);
    if (!embed) return;
    navigator.clipboard.writeText(embed).then(() => {
        btn.classList.add('copied');
        btn.querySelector('svg').innerHTML = '<polyline points="20 6 9 17 4 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>';
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.querySelector('svg').innerHTML = '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>';
        }, 1800);
    });
}

function triggerDownload(btn, panelEl, filename) {
    if (!codeInput.value.trim()) return;
    btn.classList.add('copied');
    html2canvas(panelEl, {
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        scale: 2
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = filename + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        setTimeout(() => {
            btn.classList.remove('copied');
        }, 1800);
    }).catch(() => {
        btn.classList.remove('copied');
    });
}

vscodeCopyBtn.addEventListener('click', (e) => { e.stopPropagation(); triggerCopy(vscodeCopyBtn); });
macCopyBtn.addEventListener('click',    (e) => { e.stopPropagation(); triggerCopy(macCopyBtn); });

vscodeEmbedBtn.addEventListener('click', (e) => { e.stopPropagation(); triggerEmbed(vscodeEmbedBtn, 'vscode'); });
macEmbedBtn.addEventListener('click',    (e) => { e.stopPropagation(); triggerEmbed(macEmbedBtn, 'mac'); });

vscodeDownloadBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const name = (titleInput.value.trim() || 'snippet') + '-vscode';
    triggerDownload(vscodeDownloadBtn, document.getElementById('vscodePanel'), name);
});

macDownloadBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const name = (titleInput.value.trim() || 'snippet') + '-mac';
    triggerDownload(macDownloadBtn, document.getElementById('macPanel'), name);
});

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
        titleIcon.src     = icon;
        macTitleIcon.src  = icon;
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
    highlighted.style.fontSize    = size;
    macHighlighted.style.fontSize = size;
    lineNumbers.style.fontSize    = size;
});

codeInput.addEventListener('input', updateOutput);
titleInput.addEventListener('input', updateTitle);

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
    document.body.style.cursor     = type === 'bottom' ? 'ns-resize' : 'ew-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
}

handleRight.addEventListener('mousedown',  e => onMouseDown(e, 'right'));
handleBottom.addEventListener('mousedown', e => onMouseDown(e, 'bottom'));

document.addEventListener('mousemove', (e) => {
    if (!resizeType) return;
    if (resizeType === 'right') {
        const newW = Math.max(200, Math.min(window.innerWidth * 0.75, startW + (e.clientX - startX)));
        panel.style.width = newW + 'px';
    }
    if (resizeType === 'bottom') {
        const newH = Math.max(120, Math.min(window.innerHeight - 80, startH + (e.clientY - startY)));
        panel.style.height = newH + 'px';
    }
});

document.addEventListener('mouseup', () => {
    if (!resizeType) return;
    resizeType = null;
    handleRight.classList.remove('active');
    handleBottom.classList.remove('active');
    document.body.style.cursor     = '';
    document.body.style.userSelect = '';
});

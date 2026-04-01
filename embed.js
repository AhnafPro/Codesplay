const langIconMap = {
    htmlcss:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    jstsx:      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    shell:      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
    cplussharp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    python:     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    java:       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
};

const langHighlightMap = {
    htmlcss:    'html',
    jstsx:      'javascript',
    shell:      'bash',
    cplussharp: 'cpp',
    python:     'python',
    java:       'java'
};

function initEmbed() {
    let panel, lang, title, code;

    if (window.__EMBED_DATA__) {
        const d = window.__EMBED_DATA__;
        panel = d.panel || 'vscode';
        lang  = d.lang  || 'htmlcss';
        title = d.title || 'untitled.html';
        code  = d.code  || '';
    } else {
        const p = new URLSearchParams(location.search);
        panel = p.get('panel') || 'vscode';
        lang  = p.get('lang')  || 'htmlcss';
        title = p.get('title') || 'untitled.html';
        code  = p.get('code')  || '';
    }

    const icon = langIconMap[lang] || langIconMap.htmlcss;
    const highlightLang = langHighlightMap[lang] || 'html';
    const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const lineCount = code ? code.split('\n').length : 1;
    const lines = Array.from({ length: lineCount }, (_, i) => `<span>${i + 1}</span>`).join('');

    const container = document.getElementById('embed-root');

    if (panel === 'mac') {
        container.innerHTML =
            '<div class="mac">' +
                '<div class="mac-titlebar">' +
                    '<div class="mac-dots">' +
                        '<div class="mac-dot mac-dot-red"></div>' +
                        '<div class="mac-dot mac-dot-yellow"></div>' +
                        '<div class="mac-dot mac-dot-green"></div>' +
                    '</div>' +
                    '<div class="mac-title-file">' +
                        '<img src="' + icon + '" width="13" height="13" alt="">' +
                        '<span>' + title + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="mac-codebody">' +
                    '<pre><code class="language-' + highlightLang + '">' + escaped + '</code></pre>' +
                '</div>' +
            '</div>';
    } else {
        container.innerHTML =
            '<div class="vscode">' +
                '<div class="vscode-head">' +
                    '<img class="vscode-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/500px-Visual_Studio_Code_1.35_icon.svg.png" alt="">' +
                    '<div class="vscode-headbar">codesplay vscode snippet</div>' +
                '</div>' +
                '<div class="vscode-codetitlename">' +
                    '<div class="vscode-codetitle">' +
                        '<img src="' + icon + '" width="10" height="10" alt="">' +
                        '<span>' + title + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="vscode-codebody">' +
                    '<div class="vscode-linenumbers">' + lines + '</div>' +
                    '<div class="vscode-codeinput">' +
                        '<pre><code class="language-' + highlightLang + '">' + escaped + '</code></pre>' +
                    '</div>' +
                '</div>' +
                '<div class="vscode-statusbar">' +
                    '<span class="vscode-statusbar-item"> main</span>' +
                    '<span class="vscode-statusbar-item">' + lang.toUpperCase() + '</span>' +
                    '<span class="vscode-statusbar-item">UTF-8</span>' +
                '</div>' +
            '</div>';
    }

    document.querySelectorAll('code[class*="language-"]').forEach(function(el) {
        hljs.highlightElement(el);
    });
}

initEmbed();

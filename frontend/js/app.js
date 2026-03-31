const dropZone    = document.getElementById('drop-zone');
const fileInput   = document.getElementById('file-input');
const previewWrap = document.getElementById('preview-wrapper');
const previewImg  = document.getElementById('preview-img');
const fileName    = document.getElementById('file-name');
const analyzeBtn  = document.getElementById('analyze-btn');
const spinner     = document.getElementById('spinner');
const resultCard  = document.getElementById('result-card');
const resultLabel = document.getElementById('result-label');
const resultConf  = document.getElementById('result-confidence');
const confBar     = document.getElementById('confidence-bar');

let selectedFile = null;

// --- Drop zone events ---
dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));

dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length) handleFile(fileInput.files[0]);
});

function handleFile(file) {
    if (!file.type.startsWith('image/')) return;
    selectedFile = file;
    const url = URL.createObjectURL(file);
    previewImg.src = url;
    fileName.textContent = file.name;
    previewWrap.classList.add('visible');
    analyzeBtn.disabled = false;
    resultCard.classList.remove('visible');
}

// --- Analyze ---
analyzeBtn.addEventListener('click', async () => {
    if (!selectedFile) return;
    analyzeBtn.disabled = true;
    spinner.classList.add('visible');
    resultCard.classList.remove('visible');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
        const res = await fetch('/api/predict', { method: 'POST', body: formData });
        const data = await res.json();

        const isReal = data.label === 'REAL';
        resultLabel.textContent = isReal ? 'REAL Photograph' : 'AI Generated';
        resultLabel.className = 'result-label ' + (isReal ? 'real' : 'ai');
        resultConf.textContent = data.confidence + '%';
        confBar.className = 'confidence-bar ' + (isReal ? 'real' : 'ai');
        setTimeout(() => confBar.style.width = data.confidence + '%', 50);

        resultCard.classList.add('visible');
    } catch {
        alert('Error connecting to the server. Make sure the API is running.');
    } finally {
        spinner.classList.remove('visible');
        analyzeBtn.disabled = false;
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reward-form');
  const beforeInput = document.getElementById('before');
  const afterInput = document.getElementById('after');
  const beforePreview = document.getElementById('before-preview');
  const afterPreview = document.getElementById('after-preview');
  const messageBox = document.getElementById('message');

  // Image preview function
  function previewImage(input, previewContainer) {
    previewContainer.innerHTML = '';
    const file = input.files[0];
    if (file) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.className = 'preview-img';

      const closeBtn = document.createElement('span');
      closeBtn.textContent = '×';
      closeBtn.className = 'close-btn';
      closeBtn.onclick = () => {
        previewContainer.innerHTML = '';
        input.value = '';
      };

      previewContainer.appendChild(img);
      previewContainer.appendChild(closeBtn);
    }
  }

  beforeInput.addEventListener('change', () => previewImage(beforeInput, beforePreview));
  afterInput.addEventListener('change', () => previewImage(afterInput, afterPreview));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    if (response.ok) {
      messageBox.innerHTML = `✅ ${result.message}<br/>🎉 You earned <strong>${result.points}</strong> points!`;
    } else {
      messageBox.innerHTML = `❌ ${result.message || 'Upload failed'}`;
    }
  });
});

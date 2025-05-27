const canvas = document.getElementById('thumbnailCanvas');
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const titleInput = document.getElementById('titleInput');

function drawThumbnail(title) {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background gradient (red-orange typical YouTube vibe)
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#ff0000');
  gradient.addColorStop(1, '#ff9900');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Optional: add subtle dark vignette
  const vignette = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    300,
    canvas.width / 2,
    canvas.height / 2,
    700
  );
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.7)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Text styling
  ctx.font = 'bold 110px Anton, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Shadow for text for pop-out effect
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;

  // Stroke (outline)
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#fff';

  // Draw stroke first
  wrapText(ctx, title.toUpperCase(), canvas.width / 2, canvas.height / 2, 1100, 120);

  // Fill text
  ctx.shadowColor = 'transparent'; // remove shadow for fill
  ctx.fillStyle = '#ffeb3b'; // bright yellow fill
  wrapTextFill(ctx, title.toUpperCase(), canvas.width / 2, canvas.height / 2, 1100, 120);
}

// Function to wrap stroke text (outline)
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let lines = [];
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  const startY = y - (lines.length - 1) * (lineHeight / 2);

  for (let i = 0; i < lines.length; i++) {
    ctx.strokeText(lines[i], x, startY + i * lineHeight);
  }
}

// Function to wrap filled text (fill)
function wrapTextFill(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let lines = [];
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  const startY = y - (lines.length - 1) * (lineHeight / 2);

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, startY + i * lineHeight);
  }
}

generateBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  if (title.length === 0) {
    alert('Please enter a video title.');
    return;
  }
  drawThumbnail(title);
});

downloadBtn.addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'youtube-thumbnail.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

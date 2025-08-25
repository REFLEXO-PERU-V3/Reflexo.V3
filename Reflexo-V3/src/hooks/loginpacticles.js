// Simple fallback particle effect to avoid runtime errors when used in login/changes password screens.
// Returns a cleanup function to remove listeners and DOM nodes.

export function initializeParticles() {
  const container = document.getElementById('particles-js');
  if (!container) {
    return () => {};
  }

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let running = true;

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    const width = container.clientWidth;
    const height = container.clientHeight;
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.5 + Math.random() * 1.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
  }));

  const step = () => {
    if (!running) return;
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    particles.forEach((p) => {
      p.x += p.vx / 100;
      p.y += p.vy / 100;
      if (p.x < 0 || p.x > 1) p.vx *= -1;
      if (p.y < 0 || p.y > 1) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    animationFrameId = requestAnimationFrame(step);
  };
  animationFrameId = requestAnimationFrame(step);

  return () => {
    running = false;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resize);
    if (canvas.parentNode === container) container.removeChild(canvas);
  };
}

export default { initializeParticles };

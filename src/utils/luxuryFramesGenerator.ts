/**
 * Generador procedural de quadros de estúdio de alta joalharia e relojoaria
 * Produz 180 quadros em resolução HD com iluminação chiaroscuro para o canvas do scrollytelling.
 */

export interface FrameAsset {
  canvas: HTMLCanvasElement;
}

export function generateLuxuryFrames(
  totalFrames = 180,
  onProgress?: (percent: number) => void
): Promise<HTMLCanvasElement[]> {
  return new Promise((resolve) => {
    const frames: HTMLCanvasElement[] = [];
    const width = 1000;
    const height = 750;

    let current = 0;
    const batchSize = 10;

    function renderBatch() {
      const end = Math.min(current + batchSize, totalFrames);

      for (let i = current; i < end; i++) {
        const frameCanvas = document.createElement('canvas');
        frameCanvas.width = width;
        frameCanvas.height = height;
        const ctx = frameCanvas.getContext('2d');

        if (ctx) {
          drawLuxuryFrame(ctx, width, height, i, totalFrames);
        }
        frames.push(frameCanvas);
      }

      current = end;
      if (onProgress) {
        onProgress(Math.round((current / totalFrames) * 100));
      }

      if (current < totalFrames) {
        // Yield to browser execution loop for smooth UI updates
        setTimeout(renderBatch, 4);
      } else {
        resolve(frames);
      }
    }

    renderBatch();
  });
}

function drawLuxuryFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  frameIndex: number,
  totalFrames: number
) {
  // Background chiaroscuro com bordas pretas exatas (#0A0A0C)
  ctx.fillStyle = '#0A0A0C';
  ctx.fillRect(0, 0, width, height);

  // Iluminação de estúdio suave no piso de veludo escuro
  const floorGradient = ctx.createRadialGradient(
    width * 0.5,
    height * 0.65,
    40,
    width * 0.5,
    height * 0.65,
    width * 0.45
  );
  floorGradient.addColorStop(0, 'rgba(28, 26, 22, 0.55)');
  floorGradient.addColorStop(0.5, 'rgba(18, 18, 22, 0.25)');
  floorGradient.addColorStop(1, 'rgba(10, 10, 12, 0)');
  ctx.fillStyle = floorGradient;
  ctx.beginPath();
  ctx.ellipse(width * 0.5, height * 0.68, width * 0.42, height * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();

  const progress = frameIndex / totalFrames;
  const angle = progress * Math.PI * 2;

  // 1. Relógio Cronógrafo Mecânico (Centro-Direita com rotação e perspectiva suave)
  drawChronograph(ctx, width * 0.58, height * 0.46, angle, progress);

  // 2. Par de Alianças em Ouro 18K (Centro-Esquerda em primeiro plano)
  drawGoldWeddingBands(ctx, width * 0.42, height * 0.56, angle, progress);

  // Reflexo dourado sutil no piso
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.filter = 'blur(6px)';
  ctx.drawImage(ctx.canvas, 0, height * 0.62, width, height * 0.38, 0, height * 0.72, width, -height * 0.38);
  ctx.restore();
}

function drawGoldWeddingBands(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  angle: number,
  progress: number
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Sombra de contato suave na bancada
  const shadowGrad = ctx.createRadialGradient(0, 42, 5, 0, 42, 90);
  shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
  shadowGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.4)');
  shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = shadowGrad;
  ctx.beginPath();
  ctx.ellipse(0, 42, 95, 26, 0, 0, Math.PI * 2);
  ctx.fill();

  // Rotação tridimensional da aliança principal
  const rotX = Math.sin(angle * 1.5) * 0.22 + 0.35;
  const rotY = Math.cos(angle) * 0.65;

  ctx.rotate(rotY * 0.4);

  // Aliança Masculina 6mm Anatômica Chanfrada (Ouro 18K)
  const ringRadius = 68;
  const ringWidth = 24;

  // Gradiente de ouro nobre com reflexo de estúdio móvel
  const lightShift = Math.sin(angle) * 40;
  const goldGrad = ctx.createLinearGradient(-ringRadius + lightShift, -ringRadius, ringRadius + lightShift, ringRadius);
  goldGrad.addColorStop(0, '#5C4415');
  goldGrad.addColorStop(0.18, '#C9A84C');
  goldGrad.addColorStop(0.35, '#F4DE9C');
  goldGrad.addColorStop(0.5, '#E5C16C');
  goldGrad.addColorStop(0.68, '#8A6721');
  goldGrad.addColorStop(0.85, '#D4943E');
  goldGrad.addColorStop(1, '#4A350E');

  // Face externa da aliança (arco chanfrado)
  ctx.lineWidth = ringWidth;
  ctx.strokeStyle = goldGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, ringRadius, ringRadius * rotX, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Chanfro superior polido (filete de luz intensa)
  const rimGrad = ctx.createLinearGradient(-ringRadius, 0, ringRadius, 0);
  rimGrad.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
  rimGrad.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
  rimGrad.addColorStop(0.5, 'rgba(201, 168, 76, 0.3)');
  rimGrad.addColorStop(0.75, 'rgba(255, 255, 255, 0.9)');
  rimGrad.addColorStop(1, 'rgba(255, 255, 255, 0.05)');

  ctx.lineWidth = 2.2;
  ctx.strokeStyle = rimGrad;
  ctx.beginPath();
  ctx.ellipse(0, -ringWidth * 0.38, ringRadius + 2, (ringRadius + 2) * rotX, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Aliança Feminina 4mm com Diamante Solitário cravado (levemente inclinada atrás)
  ctx.save();
  ctx.translate(-42, -26);
  ctx.rotate(0.25 + Math.sin(angle * 1.2) * 0.15);

  const femaleRadius = 54;
  const femaleWidth = 14;

  const femaleGrad = ctx.createLinearGradient(-femaleRadius, -femaleRadius, femaleRadius, femaleRadius);
  femaleGrad.addColorStop(0, '#4A350E');
  femaleGrad.addColorStop(0.25, '#C9A84C');
  femaleGrad.addColorStop(0.48, '#FFF1C5');
  femaleGrad.addColorStop(0.72, '#9E7728');
  femaleGrad.addColorStop(1, '#5C4415');

  ctx.lineWidth = femaleWidth;
  ctx.strokeStyle = femaleGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, femaleRadius, femaleRadius * rotX, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Brilho do diamante solitário
  const stoneX = Math.cos(angle * 2) * (femaleRadius * 0.7);
  const stoneY = Math.sin(angle * 2) * (femaleRadius * rotX * 0.7) - 6;

  const diamondGlint = ctx.createRadialGradient(stoneX, stoneY, 1, stoneX, stoneY, 14);
  diamondGlint.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  diamondGlint.addColorStop(0.3, 'rgba(200, 230, 255, 0.8)');
  diamondGlint.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = diamondGlint;
  ctx.beginPath();
  ctx.arc(stoneX, stoneY, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
  ctx.restore();
}

function drawChronograph(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  angle: number,
  progress: number
) {
  ctx.save();
  ctx.translate(cx, cy);

  // Sombra do relógio
  const watchShadow = ctx.createRadialGradient(0, 100, 10, 0, 100, 130);
  watchShadow.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
  watchShadow.addColorStop(0.6, 'rgba(0, 0, 0, 0.35)');
  watchShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = watchShadow;
  ctx.beginPath();
  ctx.ellipse(0, 105, 120, 32, 0, 0, Math.PI * 2);
  ctx.fill();

  const caseRadius = 115;

  // Pulseira de elos Ouro & Aço (acima e abaixo)
  drawBraceletLink(ctx, 0, -caseRadius - 35, 68, 60, angle);
  drawBraceletLink(ctx, 0, caseRadius + 35, 68, 60, angle);

  // Caixa em Aço Cirúrgico e Ouro 18K
  const caseGrad = ctx.createRadialGradient(-30, -30, 20, 0, 0, caseRadius);
  caseGrad.addColorStop(0, '#3A3A42');
  caseGrad.addColorStop(0.5, '#1E1E24');
  caseGrad.addColorStop(0.85, '#141418');
  caseGrad.addColorStop(1, '#0C0C0E');

  ctx.fillStyle = caseGrad;
  ctx.beginPath();
  ctx.arc(0, 0, caseRadius, 0, Math.PI * 2);
  ctx.fill();

  // Bezel Taquimétrico Chanfrado em Ouro 18K
  const bezelGrad = ctx.createLinearGradient(-caseRadius, -caseRadius, caseRadius, caseRadius);
  bezelGrad.addColorStop(0, '#7A5B1C');
  bezelGrad.addColorStop(0.2, '#C9A84C');
  bezelGrad.addColorStop(0.4, '#FFE296');
  bezelGrad.addColorStop(0.65, '#8F6B22');
  bezelGrad.addColorStop(0.85, '#D4943E');
  bezelGrad.addColorStop(1, '#523C10');

  ctx.lineWidth = 14;
  ctx.strokeStyle = bezelGrad;
  ctx.beginPath();
  ctx.arc(0, 0, caseRadius - 7, 0, Math.PI * 2);
  ctx.stroke();

  // Marcadores de Taquímetro no Bezel
  ctx.save();
  ctx.strokeStyle = 'rgba(10, 10, 12, 0.7)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 60; i += 5) {
    ctx.rotate((Math.PI * 2) / 12);
    ctx.beginPath();
    ctx.moveTo(0, -caseRadius + 2);
    ctx.lineTo(0, -caseRadius + 12);
    ctx.stroke();
  }
  ctx.restore();

  // Mostrador Sunburst Preto Grafite
  const dialRadius = caseRadius - 16;
  const dialGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, dialRadius);
  dialGrad.addColorStop(0, '#1B1B22');
  dialGrad.addColorStop(0.7, '#111115');
  dialGrad.addColorStop(1, '#09090C');
  ctx.fillStyle = dialGrad;
  ctx.beginPath();
  ctx.arc(0, 0, dialRadius, 0, Math.PI * 2);
  ctx.fill();

  // Submostradores do Cronógrafo (3h, 6h, 9h)
  drawSubdial(ctx, -dialRadius * 0.44, 0, 24, angle * 1.5);
  drawSubdial(ctx, dialRadius * 0.44, 0, 24, angle * 2.2);
  drawSubdial(ctx, 0, dialRadius * 0.42, 26, progress * Math.PI * 4);

  // Marcadores de hora aplicados em ouro com lume suíço
  ctx.save();
  for (let h = 0; h < 12; h++) {
    ctx.rotate((Math.PI * 2) / 12);
    ctx.fillStyle = '#C9A84C';
    ctx.fillRect(-2.5, -dialRadius + 7, 5, 16);
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(-1.2, -dialRadius + 9, 2.4, 12);
  }
  ctx.restore();

  // Logotipo ALIANÇA no mostrador
  ctx.fillStyle = '#C9A84C';
  ctx.font = '600 8.5px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '1.8px';
  ctx.fillText('ALIANÇA', 0, -dialRadius * 0.45);
  ctx.fillStyle = '#9A968E';
  ctx.font = '500 5.5px monospace';
  ctx.letterSpacing = '1.2px';
  ctx.fillText('AUTOMATIC · 28.800 VPH', 0, -dialRadius * 0.35);

  // Ponteiros em Ouro Chanfrado
  const hourAngle = (progress * 12 * Math.PI * 2) / 12 + Math.PI * 0.3;
  const minuteAngle = progress * 60 * Math.PI * 2 * 0.1 + Math.PI * 1.1;
  const secondAngle = progress * Math.PI * 16;

  // Ponteiro das Horas
  drawWatchHand(ctx, hourAngle, dialRadius * 0.52, 4.5, '#C9A84C');
  // Ponteiro dos Minutos
  drawWatchHand(ctx, minuteAngle, dialRadius * 0.74, 3.5, '#E5C16C');
  // Ponteiro dos Segundos do Cronógrafo (Dourado fino com contrapeso)
  ctx.save();
  ctx.rotate(secondAngle);
  ctx.strokeStyle = '#D4943E';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, 18);
  ctx.lineTo(0, -dialRadius * 0.88);
  ctx.stroke();
  ctx.fillStyle = '#D4943E';
  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Cristal de Safira com Reflexo Antirreflexo Curvo Azulado/Dourado
  const glassReflect = ctx.createLinearGradient(-dialRadius, -dialRadius, dialRadius, dialRadius);
  glassReflect.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
  glassReflect.addColorStop(0.3, 'rgba(160, 200, 255, 0.08)');
  glassReflect.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
  glassReflect.addColorStop(0.8, 'rgba(201, 168, 76, 0.08)');
  glassReflect.addColorStop(1, 'rgba(255, 255, 255, 0.12)');

  ctx.fillStyle = glassReflect;
  ctx.beginPath();
  ctx.arc(0, 0, dialRadius, 0, Math.PI * 2);
  ctx.fill();

  // Coroa rosqueada e botões do cronógrafo (à direita)
  drawCrownAndPushers(ctx, caseRadius);

  ctx.restore();
}

function drawBraceletLink(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  angle: number
) {
  ctx.save();
  ctx.translate(x, y);

  // Elo central em Ouro 18k
  const centerGrad = ctx.createLinearGradient(-w * 0.25, 0, w * 0.25, 0);
  centerGrad.addColorStop(0, '#8A6721');
  centerGrad.addColorStop(0.5, '#E5C16C');
  centerGrad.addColorStop(1, '#8A6721');
  ctx.fillStyle = centerGrad;
  ctx.fillRect(-w * 0.25, -h * 0.5, w * 0.5, h);

  // Elos laterais em Aço Escovado
  const sideGrad = ctx.createLinearGradient(-w * 0.5, 0, w * 0.5, 0);
  sideGrad.addColorStop(0, '#222228');
  sideGrad.addColorStop(0.5, '#4A4A54');
  sideGrad.addColorStop(1, '#222228');
  ctx.fillStyle = sideGrad;
  ctx.fillRect(-w * 0.5, -h * 0.5, w * 0.23, h);
  ctx.fillRect(w * 0.27, -h * 0.5, w * 0.23, h);

  ctx.restore();
}

function drawSubdial(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  handAngle: number
) {
  ctx.save();
  ctx.translate(cx, cy);

  ctx.fillStyle = '#0B0B0E';
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(201, 168, 76, 0.35)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Graduação concêntrica azuré
  for (let r = 5; r < radius; r += 5) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Ponteiro do submostrador
  ctx.rotate(handAngle);
  ctx.strokeStyle = '#C9A84C';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.lineTo(0, -radius * 0.75);
  ctx.stroke();

  ctx.restore();
}

function drawWatchHand(
  ctx: CanvasRenderingContext2D,
  handAngle: number,
  length: number,
  width: number,
  color: string
) {
  ctx.save();
  ctx.rotate(handAngle);

  // Ponteiro facetado estilo espada / dauphine
  const grad = ctx.createLinearGradient(-width, 0, width, 0);
  grad.addColorStop(0, '#7A5B1C');
  grad.addColorStop(0.5, color);
  grad.addColorStop(1, '#FFF2D1');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(-width * 0.5, 0);
  ctx.lineTo(0, -length);
  ctx.lineTo(width * 0.5, 0);
  ctx.lineTo(0, length * 0.15);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawCrownAndPushers(ctx: CanvasRenderingContext2D, caseRadius: number) {
  // Coroa em Ouro às 3h
  ctx.save();
  ctx.translate(caseRadius, 0);
  const crownGrad = ctx.createLinearGradient(0, -10, 16, 10);
  crownGrad.addColorStop(0, '#C9A84C');
  crownGrad.addColorStop(0.5, '#FFE296');
  crownGrad.addColorStop(1, '#8A6721');
  ctx.fillStyle = crownGrad;
  ctx.fillRect(0, -9, 14, 18);
  // Ranhuras da coroa
  ctx.fillStyle = '#0A0A0C';
  for (let y = -8; y < 8; y += 3) {
    ctx.fillRect(1, y, 12, 1.2);
  }
  ctx.restore();

  // Botão 2h (Start/Stop Cronógrafo)
  ctx.save();
  ctx.rotate(-Math.PI / 6);
  ctx.translate(caseRadius + 2, 0);
  ctx.fillStyle = '#3E3E48';
  ctx.fillRect(0, -6, 10, 12);
  ctx.restore();

  // Botão 4h (Reset Cronógrafo)
  ctx.save();
  ctx.rotate(Math.PI / 6);
  ctx.translate(caseRadius + 2, 0);
  ctx.fillStyle = '#3E3E48';
  ctx.fillRect(0, -6, 10, 12);
  ctx.restore();
}

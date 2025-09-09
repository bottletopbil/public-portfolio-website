import React, { useEffect, useRef, useState } from 'react';

interface Pointer {
  x?: number;
  y?: number;
}

interface Particle {
  ox: number;
  oy: number;
  cx: number;
  cy: number;
  or: number;
  cr: number;
  pv: number;
  ov: number;
  f: number;
  rgb: number[];
  draw: () => void;
  move: (interactionRadius: number, hasPointer: boolean) => boolean;
}

interface TextBox {
  str: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

export interface ParticleTextEffectProps {
  text?: string;
  colors?: string[];
  className?: string;
  animationForce?: number;
  particleDensity?: number;
  visibleChars?: number; // number of characters to render (for pop-in)
  anchorText?: string; // full text used for centering and gradient width
}

const ParticleTextEffect: React.FC<ParticleTextEffectProps> = ({
  text = 'HOVER!',
  colors = [
    'ffad70', 'f7d297', 'edb9a1', 'e697ac', 'b38dca',
    '9c76db', '705cb5', '43428e', '2c2142'
  ],
  className = '',
  animationForce = 80,
  particleDensity = 4,
  visibleChars,
  anchorText,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef<Pointer>({});
  const hasPointerRef = useRef<boolean>(false);
  const interactionRadiusRef = useRef<number>(100);

  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [textBox] = useState<TextBox>({ str: text });

  const rand = (max = 1, min = 0, dec = 0): number => {
    return +(min + Math.random() * (max - min)).toFixed(dec);
  };

  class ParticleClass implements Particle {
    ox: number;
    oy: number;
    cx: number;
    cy: number;
    or: number;
    cr: number;
    pv: number;
    ov: number;
    f: number;
    rgb: number[];

    constructor(x: number, y: number, rgb: number[] = [rand(128), rand(128), rand(128)]) {
      this.ox = x;
      this.oy = y;
      // Start already in final position and size
      this.cx = x;
      this.cy = y;
      this.or = rand(5, 1);
      this.cr = this.or;
      this.pv = 0;
      this.ov = 0;
      this.f = rand(animationForce + 15, animationForce - 15);
      this.rgb = rgb.map(c => Math.max(0, c + rand(13, -13)));
    }

    draw() {
      const ctx = ctxRef.current;
      if (!ctx) return;
      ctx.fillStyle = `rgb(${this.rgb.join(',')})`;
      ctx.beginPath();
      ctx.arc(this.cx, this.cy, this.cr, 0, 2 * Math.PI);
      ctx.fill();
    }

    move(interactionRadius: number, hasPointer: boolean) {
      let moved = false;

      if (hasPointer && pointerRef.current.x !== undefined && pointerRef.current.y !== undefined) {
        const dx = this.cx - pointerRef.current.x;
        const dy = this.cy - pointerRef.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < interactionRadius && dist > 0) {
          const force = Math.min(this.f, (interactionRadius - dist) / dist * 2);
          this.cx += (dx / dist) * force;
          this.cy += (dy / dist) * force;
          moved = true;
        }
      }

      const odx = this.ox - this.cx;
      const ody = this.oy - this.cy;
      const od = Math.hypot(odx, ody);

      if (od > 1) {
        const restore = Math.min(od * 0.1, 3);
        this.cx += (odx / od) * restore;
        this.cy += (ody / od) * restore;
        moved = true;
      }

      // Pop-in radius growth with ease-out
      if (this.cr < this.or) {
        this.cr += Math.max(0.8, (this.or - this.cr) * 0.25);
        if (this.cr > this.or) this.cr = this.or;
        moved = true;
      }

      this.draw();
      return moved;
    }
  }

  const dottify = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    // Ensure values exist; allow 0 as valid coordinate
    if (
      !ctx ||
      !canvas ||
      textBox.x === undefined ||
      textBox.y === undefined ||
      textBox.w === undefined ||
      textBox.h === undefined
    )
      return;

    const data = ctx.getImageData(textBox.x, textBox.y, textBox.w, textBox.h).data;
    const pixels = data.reduce((arr: any[], _, i, d) => {
      if (i % 4 === 0) {
        arr.push({
          x: (i / 4) % textBox.w!,
          y: Math.floor((i / 4) / textBox.w!),
          rgb: d.slice(i, i + 4),
        });
      }
      return arr;
    }, []).filter(p => p.rgb[3] && !(p.x % particleDensity) && !(p.y % particleDensity));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pixels.forEach((px: any, i: number) => {
      const x = textBox.x! + px.x;
      const y = textBox.y! + px.y;
      const rgb = px.rgb.slice(0, 3);
      const existing = particlesRef.current[i];
      if (existing) {
        existing.ox = x;
        existing.oy = y;
        // Snap current position and size to target to avoid drift
        existing.cx = x;
        existing.cy = y;
        if (existing.cr < existing.or) existing.cr = existing.or;
        existing.rgb = rgb;
        existing.draw();
      } else {
        const p = new ParticleClass(x, y, rgb);
        particlesRef.current[i] = p;
        p.draw();
      }
    });

    particlesRef.current.splice(pixels.length, particlesRef.current.length);
  };

  const write = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const full = text;
    const anchor = anchorText || full;
    const count = typeof visibleChars === 'number' ? Math.max(0, Math.min(full.length, visibleChars)) : full.length;

    textBox.str = full;
    textBox.h = Math.floor(canvas.width / Math.max(1, anchor.length));

    interactionRadiusRef.current = Math.max(50, textBox.h * 1.5);

    ctx.font = `900 ${textBox.h}px Verdana, sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    const anchorWidth = Math.round(ctx.measureText(anchor).width);
    textBox.w = anchorWidth;
    textBox.x = 0.5 * (canvas.width - textBox.w);
    textBox.y = 0.5 * (canvas.height - textBox.h);

    const gradient = ctx.createLinearGradient(textBox.x, textBox.y, textBox.x + textBox.w, textBox.y + textBox.h);
    const N = colors.length - 1;
    colors.forEach((c, i) => gradient.addColorStop(i / N, `#${c}`));
    ctx.fillStyle = gradient;

    // Draw only the visible characters, anchored to the full width
    let offsetX = 0;
    for (let i = 0; i < count; i++) {
      const ch = full[i];
      ctx.fillText(ch, textBox.x + offsetX, 0.5 * canvas.height);
      offsetX += ctx.measureText(ch).width;
    }
    dottify();
  };

  const animate = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesRef.current.forEach(p => p.move(interactionRadiusRef.current, hasPointerRef.current));
    animationIdRef.current = requestAnimationFrame(animate);
  };

  const initialize = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    write();
  };

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    initialize();
  }, [text, colors, animationForce, particleDensity, canvasSize, visibleChars, anchorText]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;
    initialize();

    // Ensure animation starts without requiring pointer movement
    if (!animationIdRef.current) {
      animate();
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    pointerRef.current.x = (e.clientX - rect.left) * scaleX;
    pointerRef.current.y = (e.clientY - rect.top) * scaleY;
    hasPointerRef.current = true;

    if (!animationIdRef.current) animate();
  };

  const handlePointerLeave = () => {
    hasPointerRef.current = false;
    pointerRef.current.x = undefined;
    pointerRef.current.y = undefined;

    if (!animationIdRef.current) animate();
  };

  const handlePointerEnter = () => {
    hasPointerRef.current = true;
  };

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className} cursor-none`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
    />
  );
};

export { ParticleTextEffect };

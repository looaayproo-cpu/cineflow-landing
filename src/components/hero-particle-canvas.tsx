'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/context/language-context';

interface VortexParticle {
  // Polar & vortex coordinates
  baseRadius: number;       // Distance from vortex center (px)
  angle: number;            // Current angle around vortex (radians)
  angularVelocity: number;  // Rotation speed (rad/frame)
  radialAmp: number;        // Amplitude of radial wave oscillation
  radialFreq: number;       // Frequency of wave oscillation
  radialPhase: number;      // Phase offset for wave
  z: number;                // Simulated 3D depth (-1.0 to 1.0)
  zVelocity: number;        // Speed of cycling through depth
  
  // Current screen position & velocity for smooth transitions & mouse interaction
  x: number;
  y: number;
  vx: number;
  vy: number;
  
  // Visual styling
  baseSize: number;
  darkColor: string;
  darkGlow: string;
  lightColor: string;
  lightGlow: string;
  baseAlpha: number;
  tier: 'dust' | 'ambient' | 'accent' | 'desktop';
  
  // Continuous Mouse Orbital Field (Phase 3 & 4.1 Refinement)
  orbitBlend: number;
  localOrbitAngle: number;
  localOrbitSpeed: number;
  localOrbitRadius: number;
  eccentricityX: number;
  eccentricityY: number;
}

interface PointerState {
  x: number;
  y: number;
  isInHero: boolean;
}

interface SmoothPointerState {
  x: number;
  y: number;
}

// Centralized movement-speed control (45% of baseline for a calm, celestial floating feel)
const SPEED_SCALE = 0.45;

const PALETTES = [
  // 1. Electric Blue (Luminous core & highlight streams)
  {
    darkColor: '#38BDF8', // sky-400
    darkGlow: 'rgba(56, 189, 248, 0.8)',
    lightColor: '#0284C7', // sky-600
    lightGlow: 'rgba(2, 132, 199, 0.4)',
  },
  // 2. Cyan / Bright Aqua (Inner vortex high-energy ring)
  {
    darkColor: '#22D3EE', // cyan-400
    darkGlow: 'rgba(34, 211, 238, 0.85)',
    lightColor: '#0891B2', // cyan-600
    lightGlow: 'rgba(8, 145, 178, 0.4)',
  },
  // 3. Vibrant Violet (Mid spiral arms)
  {
    darkColor: '#C084FC', // purple-400
    darkGlow: 'rgba(192, 132, 252, 0.8)',
    lightColor: '#7C3AED', // purple-600
    lightGlow: 'rgba(124, 58, 237, 0.4)',
  },
  // 4. Electric Purple / Indigo (Outer expansive arms)
  {
    darkColor: '#818CF8', // indigo-400
    darkGlow: 'rgba(129, 140, 248, 0.75)',
    lightColor: '#4F46E5', // indigo-600
    lightGlow: 'rgba(79, 70, 229, 0.4)',
  },
  // 5. Deep Orchid / Magenta Accent (Depth contrast)
  {
    darkColor: '#E879F9', // fuchsia-400
    darkGlow: 'rgba(232, 121, 249, 0.75)',
    lightColor: '#A21CAF', // fuchsia-700
    lightGlow: 'rgba(162, 28, 175, 0.4)',
  },
];

// Adaptive particle count based on viewport (Mobile: 75, Tablet: 180, Desktop: 480)
const getTargetParticleCount = (width: number): number => {
  if (width < 768) return 75; // Mobile: ~16% of desktop baseline for subtle, elegant cinematic ambiance
  if (width < 1024) return 180; // Tablet
  return 480; // Desktop immersive field
};

// Flowing Light Ribbons (Mobile only, Phase 3: Organic cinematic energy streams)
function drawMobileLightRibbons(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  timeWave: number,
  isDark: boolean,
  prefersReduced: boolean
) {
  const t = prefersReduced ? 0 : timeWave * 0.75;

  ctx.save();

  // Ribbon 1: Upper Flowing Aurora Stream (Violet -> Electric Blue -> Cyan)
  const r1_startX = -width * 0.15;
  const r1_startY = height * 0.10 + Math.sin(t * 1.1) * 16;
  const r1_cp1X = width * 0.35 + Math.cos(t * 0.9) * 25;
  const r1_cp1Y = height * 0.18 + Math.sin(t * 1.3) * 22;
  const r1_cp2X = width * 0.82 + Math.sin(t * 0.8) * 28;
  const r1_cp2Y = height * 0.32 + Math.cos(t * 1.0) * 24;
  const r1_endX = width * 1.15;
  const r1_endY = height * 0.46 + Math.sin(t * 0.7) * 18;

  ctx.beginPath();
  ctx.moveTo(r1_startX, r1_startY);
  ctx.bezierCurveTo(r1_cp1X, r1_cp1Y, r1_cp2X, r1_cp2Y, r1_endX, r1_endY);

  const grad1 = ctx.createLinearGradient(r1_startX, r1_startY, r1_endX, r1_endY);
  if (isDark) {
    grad1.addColorStop(0, 'rgba(124, 58, 237, 0)');
    grad1.addColorStop(0.20, 'rgba(124, 58, 237, 0.42)');
    grad1.addColorStop(0.50, 'rgba(56, 189, 248, 0.46)');
    grad1.addColorStop(0.78, 'rgba(34, 211, 238, 0.38)');
    grad1.addColorStop(1, 'rgba(6, 182, 212, 0)');
    ctx.shadowBlur = 14;
    ctx.shadowColor = 'rgba(99, 102, 241, 0.55)';
  } else {
    grad1.addColorStop(0, 'rgba(124, 58, 237, 0)');
    grad1.addColorStop(0.25, 'rgba(99, 102, 241, 0.25)');
    grad1.addColorStop(0.65, 'rgba(14, 165, 233, 0.28)');
    grad1.addColorStop(1, 'rgba(6, 182, 212, 0)');
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(79, 70, 229, 0.28)';
  }

  ctx.strokeStyle = grad1;
  ctx.lineWidth = 3.6;
  ctx.lineCap = 'round';
  ctx.globalAlpha = isDark ? 0.75 : 0.50;
  ctx.stroke();

  // Ribbon 2: Lower Flowing Energy Stream (Cyan -> Electric Blue -> Violet)
  const r2_startX = width * 1.15;
  const r2_startY = height * 0.62 + Math.cos(t * 1.0) * 16;
  const r2_cp1X = width * 0.70 + Math.sin(t * 1.2) * 24;
  const r2_cp1Y = height * 0.72 + Math.cos(t * 0.8) * 20;
  const r2_cp2X = width * 0.28 + Math.cos(t * 1.1) * 26;
  const r2_cp2Y = height * 0.80 + Math.sin(t * 1.0) * 22;
  const r2_endX = -width * 0.15;
  const r2_endY = height * 0.86 + Math.cos(t * 0.9) * 16;

  ctx.beginPath();
  ctx.moveTo(r2_startX, r2_startY);
  ctx.bezierCurveTo(r2_cp1X, r2_cp1Y, r2_cp2X, r2_cp2Y, r2_endX, r2_endY);

  const grad2 = ctx.createLinearGradient(r2_startX, r2_startY, r2_endX, r2_endY);
  if (isDark) {
    grad2.addColorStop(0, 'rgba(6, 182, 212, 0)');
    grad2.addColorStop(0.25, 'rgba(34, 211, 238, 0.40)');
    grad2.addColorStop(0.60, 'rgba(37, 99, 235, 0.44)');
    grad2.addColorStop(0.82, 'rgba(168, 85, 247, 0.30)');
    grad2.addColorStop(1, 'rgba(124, 58, 237, 0)');
    ctx.shadowBlur = 12;
    ctx.shadowColor = 'rgba(14, 165, 233, 0.50)';
  } else {
    grad2.addColorStop(0, 'rgba(6, 182, 212, 0)');
    grad2.addColorStop(0.30, 'rgba(14, 165, 233, 0.24)');
    grad2.addColorStop(0.70, 'rgba(99, 102, 241, 0.24)');
    grad2.addColorStop(1, 'rgba(124, 58, 237, 0)');
    ctx.shadowBlur = 6;
    ctx.shadowColor = 'rgba(14, 165, 233, 0.28)';
  }

  ctx.strokeStyle = grad2;
  ctx.lineWidth = 2.8;
  ctx.lineCap = 'round';
  ctx.globalAlpha = isDark ? 0.70 : 0.45;
  ctx.stroke();

  ctx.restore();
}

export function HeroParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const { direction } = useLanguage();

  // Internal physics and lifecycle references
  const particlesRef = useRef<VortexParticle[]>([]);
  const animIdRef = useRef<number | null>(null);
  const isIntersectingRef = useRef<boolean>(true);
  const isDocVisibleRef = useRef<boolean>(true);
  const prevWidthRef = useRef<number>(0);
  const prevHeightRef = useRef<number>(0);
  const prefersReducedMotionRef = useRef<boolean>(false);
  const hasFinePointerRef = useRef<boolean>(true);
  const themeRef = useRef<string>('dark');
  const directionRef = useRef<'rtl' | 'ltr'>('rtl');

  // Mouse & smooth trailing pointer state
  const pointerRef = useRef<PointerState>({
    x: -1000,
    y: -1000,
    isInHero: false,
  });

  const smoothPointerRef = useRef<SmoothPointerState>({
    x: -1000,
    y: -1000,
  });

  // Keep themeRef and directionRef in sync
  useEffect(() => {
    themeRef.current = resolvedTheme || 'dark';
  }, [resolvedTheme]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const heroElement = container.closest('section') || container;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotionRef.current = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Check fine pointer capabilities
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    hasFinePointerRef.current = finePointerQuery.matches;
    const handlePointerMediaChange = (e: MediaQueryListEvent) => {
      hasFinePointerRef.current = e.matches;
    };
    finePointerQuery.addEventListener('change', handlePointerMediaChange);

    // Document visibility listener to halt loop when backgrounded
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      isDocVisibleRef.current = isVisible;
      if (isVisible && isIntersectingRef.current && animIdRef.current === null) {
        animIdRef.current = requestAnimationFrame(animate);
      } else if (!isVisible && animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
        animIdRef.current = null;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Pointer tracking: Active whenever cursor is inside the Hero
    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const rect = heroElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      pointerRef.current.x = x;
      pointerRef.current.y = y;
      pointerRef.current.isInHero = true;

      if (smoothPointerRef.current.x < -500) {
        smoothPointerRef.current.x = x;
        smoothPointerRef.current.y = y;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;

      const rect = heroElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      pointerRef.current.x = x;
      pointerRef.current.y = y;
      pointerRef.current.isInHero = true;

      if (smoothPointerRef.current.x < -500) {
        smoothPointerRef.current.x = x;
        smoothPointerRef.current.y = y;
      }
    };

    const handlePointerLeave = () => {
      // ONLY release orbital influence when cursor leaves the Hero boundary
      pointerRef.current.isInHero = false;
    };

    heroElement.addEventListener('pointerenter', handlePointerEnter as EventListener, { passive: true });
    heroElement.addEventListener('pointermove', handlePointerMove as EventListener, { passive: true });
    heroElement.addEventListener('pointerleave', handlePointerLeave as EventListener, { passive: true });
    heroElement.addEventListener('pointercancel', handlePointerLeave as EventListener, { passive: true });

    // Helper: Compute vortex center coordinates
    const getVortexCenter = (width: number, height: number) => {
      if (width < 768) {
        // Mobile: Centered slightly above midpoint
        return { cx: width * 0.5, cy: height * 0.38 };
      }
      if (directionRef.current === 'rtl') {
        // Arabic (RTL): Text is on the Right, Vortex is on the Center-Left
        return { cx: width * 0.30, cy: height * 0.50 };
      }
      // English (LTR): Text is on the Left, Vortex is on the Center-Right
      return { cx: width * 0.70, cy: height * 0.50 };
    };

    // Helper: Create a single vortex particle
    const createVortexParticle = (width: number, height: number, index: number, total: number): VortexParticle => {
      const palette = PALETTES[index % PALETTES.length];
      const { cx, cy } = getVortexCenter(width, height);
      const isMobile = width < 768;

      let tier: 'dust' | 'ambient' | 'accent' | 'desktop' = 'desktop';
      let baseSize = 1.2 + Math.random() * 1.8;
      let baseAlpha = 0.35 + Math.random() * 0.55;
      let zVelocity = 0.0018 + Math.random() * 0.0035;

      if (isMobile) {
        if (index < 35) {
          // Layer A: Microscopic background dust (35 particles)
          tier = 'dust';
          baseSize = 0.8 + Math.random() * 0.4;
          baseAlpha = 0.22 + Math.random() * 0.18;
          zVelocity = 0.0010 + Math.random() * 0.0018;
        } else if (index < 63) {
          // Layer B: Visible ambient particles (28 particles)
          tier = 'ambient';
          baseSize = 1.3 + Math.random() * 0.7;
          baseAlpha = 0.40 + Math.random() * 0.28;
          zVelocity = 0.0016 + Math.random() * 0.0028;
        } else {
          // Layer C: Luminous accent particles (12 particles)
          tier = 'accent';
          baseSize = 2.2 + Math.random() * 1.0;
          baseAlpha = 0.72 + Math.random() * 0.25;
          zVelocity = 0.0020 + Math.random() * 0.0035;
        }
      }

      // Distribute radii along logarithmic vortex arms
      const maxRadius = Math.max(width, height) * 0.68;
      const radiusRatio = Math.pow(Math.random(), 1.6);
      const baseRadius = 35 + radiusRatio * (maxRadius - 35);

      // Differential galactic angular velocity: calm, majestic pace
      const angularDirection = 1; // Counter-clockwise cosmic swirl
      const speedDecay = 1 / Math.sqrt(baseRadius / 80 + 0.4);
      const angularVelocity = angularDirection * (0.0015 + speedDecay * 0.0045);

      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() * 2) - 1; // -1 (far back) to +1 (foreground)

      // Initial Cartesian position
      const x = cx + baseRadius * Math.cos(angle);
      const y = cy + baseRadius * Math.sin(angle) * 0.78;

      // Mouse orbital parameters with diverse elliptical eccentricities & radii
      const localOrbitRadius = 40 + Math.random() * 180;
      const directionSign = Math.random() < 0.5 ? 1 : -1;
      const localOrbitSpeed = directionSign * (0.007 + Math.random() * 0.014);

      return {
        baseRadius,
        angle,
        angularVelocity,
        radialAmp: 6 + Math.random() * 16,
        radialFreq: 2 + Math.floor(Math.random() * 3),
        radialPhase: Math.random() * Math.PI * 2,
        z,
        zVelocity,

        x,
        y,
        vx: 0,
        vy: 0,

        baseSize,
        darkColor: palette.darkColor,
        darkGlow: palette.darkGlow,
        lightColor: palette.lightColor,
        lightGlow: palette.lightGlow,
        baseAlpha,
        tier,

        orbitBlend: 0,
        localOrbitAngle: Math.random() * Math.PI * 2,
        localOrbitSpeed,
        localOrbitRadius,
        eccentricityX: 0.85 + Math.random() * 0.30,
        eccentricityY: 0.75 + Math.random() * 0.30,
      };
    };

    // Helper: Initialize all vortex particles
    const initParticles = (width: number, height: number) => {
      const count = getTargetParticleCount(width);
      const particles: VortexParticle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push(createVortexParticle(width, height, i, count));
      }
      particlesRef.current = particles;
    };

    // Resize handler
    const handleResize = (width: number, height: number) => {
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      } else {
        const desiredCount = getTargetParticleCount(width);
        if (particlesRef.current.length > desiredCount) {
          particlesRef.current = particlesRef.current.slice(0, desiredCount);
        } else if (particlesRef.current.length < desiredCount) {
          const diff = desiredCount - particlesRef.current.length;
          for (let i = 0; i < diff; i++) {
            particlesRef.current.push(
              createVortexParticle(width, height, particlesRef.current.length + i, desiredCount)
            );
          }
        }
      }

      prevWidthRef.current = width;
      prevHeightRef.current = height;
    };

    // Set initial size
    const initialRect = container.getBoundingClientRect();
    if (initialRect.width > 0 && initialRect.height > 0) {
      handleResize(initialRect.width, initialRect.height);
    }

    // ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        handleResize(width, height);
      }
    });
    resizeObserver.observe(container);

    // High-performance animation loop
    const animate = (timestamp: number) => {
      if (!isIntersectingRef.current || !isDocVisibleRef.current) {
        animIdRef.current = null;
        return;
      }

      const ctx = canvas.getContext('2d');
      const width = prevWidthRef.current;
      const height = prevHeightRef.current;

      if (ctx && width > 0 && height > 0) {
        // Clear previous frame
        ctx.clearRect(0, 0, width, height);

        const isDark =
          themeRef.current === 'dark' ||
          document.documentElement.classList.contains('dark');

        const isMobile = width < 768;
        const prefersReduced = prefersReducedMotionRef.current;
        // Centralized calm velocity scaling (even calmer and more subtle on mobile)
        const speedMultiplier = (prefersReduced ? 0.2 : (isMobile ? 0.65 : 1.0)) * SPEED_SCALE;

        // Current vortex center
        const { cx, cy } = getVortexCenter(width, height);

        // Text-Safe Zone: Calculate spatial falloff so particles never compete with critical copy
        const isRTL = directionRef.current === 'rtl';
        const textZoneCenterX = isMobile ? width * 0.5 : (isRTL ? width * 0.78 : width * 0.22);
        const textZoneCenterY = isMobile ? height * 0.42 : height * 0.50;
        const textZoneRx = isMobile ? width * 0.48 : width * 0.28;
        const textZoneRy = isMobile ? height * 0.32 : height * 0.36;
        const minTextZoneAlpha = isMobile ? 0.18 : 0.45;

        // Pointer state: active whenever cursor is inside the Hero (NO idle decay!)
        const pointer = pointerRef.current;
        const smoothPointer = smoothPointerRef.current;

        // Smooth trailing pointer momentum
        if (pointer.isInHero) {
          smoothPointer.x += (pointer.x - smoothPointer.x) * 0.08;
          smoothPointer.y += (pointer.y - smoothPointer.y) * 0.08;
        }

        // Active as long as pointer is inside Hero, regardless of movement!
        const isPointerActive =
          pointer.isInHero &&
          hasFinePointerRef.current &&
          !prefersReduced;

        // Slower, meditative breathing wave time factor
        const timeWave = timestamp * 0.0005;

        // Draw Flowing Light Ribbons (Mobile only, Phase 3: Organic cinematic energy streams)
        if (isMobile) {
          drawMobileLightRibbons(
            ctx,
            width,
            height,
            timeWave,
            isDark,
            prefersReduced
          );
        }

        const particles = particlesRef.current;
        const len = particles.length;

        // Render loop
        for (let i = 0; i < len; i++) {
          const p = particles[i];

          // 1. Advance vortex orbit angle
          p.angle += p.angularVelocity * speedMultiplier;

          // 2. Advance 3D depth oscillation (-1 to +1)
          p.z += p.zVelocity * speedMultiplier;
          if (p.z > 1.0) p.z = -1.0;

          // 3. Compute organic radial breathing wave
          const wave = Math.sin(p.angle * p.radialFreq + timeWave + p.radialPhase) * p.radialAmp;
          const currentRadius = Math.max(20, p.baseRadius + wave);

          // 4. Target cosmic vortex coordinate (elliptical tilt 0.78 for 3D perspective)
          const vortexTargetX = cx + currentRadius * Math.cos(p.angle);
          const vortexTargetY = cy + currentRadius * Math.sin(p.angle) * 0.78;

          // 5. Continuous Mouse Orbital Field (Always active while cursor is in Hero!)
          let distToPointer = 9999;
          if (pointer.isInHero) {
            const dx = p.x - smoothPointer.x;
            const dy = p.y - smoothPointer.y;
            distToPointer = Math.sqrt(dx * dx + dy * dy);
          }

          if (isPointerActive && distToPointer < 280) {
            // Proximity attraction: smoothly transitions particles into orbit
            const proximity = 1 - (distToPointer / 280);
            const targetBlend = Math.min(1, Math.max(0, Math.pow(proximity, 0.7)));
            p.orbitBlend += (targetBlend - p.orbitBlend) * 0.04;
          } else if (p.orbitBlend > 0) {
            // Smooth release only when cursor exits Hero or particle drifts beyond reach
            p.orbitBlend = Math.max(0, p.orbitBlend - 0.012);
          }

          // 6. Coordinate integration: Continuous circulation around cursor (even if stationary!)
          if (p.orbitBlend > 0.005) {
            // Advance local orbit angle continuously every frame!
            p.localOrbitAngle += p.localOrbitSpeed * speedMultiplier;

            // Add organic radial wave modulation around the cursor
            const orbitBreathing = Math.sin(p.localOrbitAngle * 2 + timeWave + p.radialPhase) * 12;
            const currentOrbitRadius = Math.max(25, p.localOrbitRadius + orbitBreathing);

            // Elliptical mouse orbit target
            const mouseTargetX = smoothPointer.x + currentOrbitRadius * Math.cos(p.localOrbitAngle) * p.eccentricityX;
            const mouseTargetY = smoothPointer.y + currentOrbitRadius * Math.sin(p.localOrbitAngle) * p.eccentricityY;

            // Blend vortex target with local cursor orbit target
            const finalTargetX = vortexTargetX * (1 - p.orbitBlend) + mouseTargetX * p.orbitBlend;
            const finalTargetY = vortexTargetY * (1 - p.orbitBlend) + mouseTargetY * p.orbitBlend;

            // Steering vector with gentle momentum
            p.x += (finalTargetX - p.x) * 0.045 * speedMultiplier;
            p.y += (finalTargetY - p.y) * 0.045 * speedMultiplier;
          } else {
            // Pure cosmic vortex flow
            p.x += (vortexTargetX - p.x) * 0.040 * speedMultiplier;
            p.y += (vortexTargetY - p.y) * 0.040 * speedMultiplier;
          }

          // 7. Text-Safe Zone Spatial Attenuation
          const normDx = (p.x - textZoneCenterX) / textZoneRx;
          const normDy = (p.y - textZoneCenterY) / textZoneRy;
          const distText = Math.sqrt(normDx * normDx + normDy * normDy);
          let textSafeFactor = 1.0;
          if (distText < 1.3) {
            const t = Math.max(0, Math.min(1, (distText - 0.35) / (1.3 - 0.35)));
            const smooth = t * t * (3 - 2 * t);
            textSafeFactor = minTextZoneAlpha + (1 - minTextZoneAlpha) * smooth;
          }

          // 8. 3D Depth Projection: Scale, Opacity, and Glow (Responsive & Calm)
          const depthScale = 1.0 + (p.z * 0.45);

          if (isMobile) {
            // Mobile Multi-Tier Rendering (Phase 4: Dust, Ambient, Accent)
            const apparentRadius = Math.max(0.65, p.baseSize * depthScale * 0.82);
            const depthAlpha = p.baseAlpha * (0.60 + 0.40 * ((p.z + 1) * 0.5));

            if (p.tier === 'dust') {
              // Layer A: Microscopic background dust (crisp, zero glow, faint ambient speck)
              ctx.shadowBlur = 0;
              ctx.globalAlpha = Math.max(0.04, depthAlpha * 0.65 * textSafeFactor);
            } else if (p.tier === 'ambient') {
              // Layer B: Visible ambient particles (moderate opacity, subtle foreground glow)
              if (p.z > 0.35) {
                ctx.shadowBlur = isDark ? 3 : 2;
                ctx.shadowColor = isDark ? p.darkGlow : p.lightGlow;
              } else {
                ctx.shadowBlur = 0;
              }
              ctx.globalAlpha = Math.max(0.08, depthAlpha * 0.82 * textSafeFactor);
            } else {
              // Layer C: Luminous accent particles (distinct celestial glow, high presence)
              ctx.shadowBlur = isDark ? 7 : 4;
              ctx.shadowColor = isDark ? p.darkGlow : p.lightGlow;
              ctx.globalAlpha = Math.max(0.16, depthAlpha * 0.98 * textSafeFactor);
            }

            ctx.fillStyle = isDark ? p.darkColor : p.lightColor;
            ctx.beginPath();
            ctx.arc(p.x, p.y, apparentRadius, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Desktop Baseline Rendering (100% Unchanged)
            const apparentRadius = Math.max(0.6, p.baseSize * depthScale);
            const depthAlpha = p.baseAlpha * (0.55 + 0.45 * ((p.z + 1) * 0.5));
            const baseAlpha = isDark
              ? Math.max(0.15, Math.min(0.95, depthAlpha))
              : Math.max(0.12, Math.min(0.65, depthAlpha * 0.7));
            const alpha = Math.max(0.04, baseAlpha * textSafeFactor);

            ctx.globalAlpha = alpha;
            if (p.z > 0.2) {
              ctx.shadowBlur = isDark ? 8 : 4;
              ctx.shadowColor = isDark ? p.darkGlow : p.lightGlow;
            } else {
              ctx.shadowBlur = 0;
            }

            ctx.fillStyle = isDark ? p.darkColor : p.lightColor;
            ctx.beginPath();
            ctx.arc(p.x, p.y, apparentRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animIdRef.current = requestAnimationFrame(animate);
    };

    // IntersectionObserver to pause loop when scrolled out of view
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting && isDocVisibleRef.current && animIdRef.current === null) {
          animIdRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Start loop
    animIdRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
      }
      mediaQuery.removeEventListener('change', handleMotionChange);
      finePointerQuery.removeEventListener('change', handlePointerMediaChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      heroElement.removeEventListener('pointerenter', handlePointerEnter as EventListener);
      heroElement.removeEventListener('pointermove', handlePointerMove as EventListener);
      heroElement.removeEventListener('pointerleave', handlePointerLeave as EventListener);
      heroElement.removeEventListener('pointercancel', handlePointerLeave as EventListener);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block pointer-events-none"
      aria-hidden="true"
    />
  );
}

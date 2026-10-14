"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const labels = [
  { text: "PRIVATE_EQUITY", position: new THREE.Vector3(0, 3, 3) },
  { text: "VENTURE_CAPITAL", position: new THREE.Vector3(-3, -1, 3.5) },
  { text: "STRATEGIC_ADVISORY", position: new THREE.Vector3(3, -2, 2.5) },
];

export default function Home() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const blobRef = useRef<HTMLDivElement | null>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    mainGroup.position.x = window.innerWidth < 640 ? 1.5 : window.innerWidth < 768 ? 2.5 : 5;
    scene.add(mainGroup);

    const uniforms = {
      uTime: { value: 0 },
      uDistortion: { value: 0.8 },
      uSize: { value: 1.8 },
      uColor: { value: new THREE.Color("#00c8ff") },
      uOpacity: { value: 0.55 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const vertexShader = `
      uniform float uTime, uDistortion, uSize;
      uniform vec2 uMouse;
      varying float vAlpha;

      float snoise(vec3 v) {
        return fract(sin(dot(v, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
      }

      void main() {
        vec3 pos = position;
        float noise = snoise(pos * 0.1 + uTime * 0.05);
        vec3 dir = normalize(pos);
        vec3 finalPos = pos + (dir * noise * uDistortion);
        float mDist = distance(uMouse * 8.0, finalPos.xy);
        finalPos += dir * smoothstep(5.0, 0.0, mDist) * 0.4;
        vec4 mvPos = modelViewMatrix * vec4(finalPos, 1.0);
        gl_Position = projectionMatrix * mvPos;
        gl_PointSize = uSize * (15.0 / -mvPos.z);
        vAlpha = 0.8;
      }
    `;

    const fragmentShader = `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vAlpha;

      void main() {
        if (length(gl_PointCoord - 0.5) > 0.5) discard;
        float alpha = smoothstep(0.5, 0.3, length(gl_PointCoord - 0.5)) * uOpacity * vAlpha;
        gl_FragColor = vec4(uColor, alpha);
      }
    `;

    const particleMesh = new THREE.Points(
      new THREE.SphereGeometry(5, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
      })
    );

    mainGroup.add(particleMesh);

    const moveMouse = (e: MouseEvent) => {
      uniforms.uMouse.value.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );

      if (blobRef.current) {
        blobRef.current.style.left = `${e.clientX}px`;
        blobRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener("mousemove", moveMouse);

    const connections = [
      [0, 1],
      [1, 2],
      [2, 0],
    ];

    let frame = 0;

    const animate = (t: number) => {
      frame = requestAnimationFrame(animate);
      uniforms.uTime.value = t * 0.001;
      particleMesh.rotation.y += 0.001;
      particleMesh.rotation.x += 0.0005;

      const screenPts = labels.map((p, i) => {
        const v = p.position
          .clone()
          .applyEuler(particleMesh.rotation)
          .applyMatrix4(particleMesh.matrix)
          .applyMatrix4(mainGroup.matrixWorld)
          .project(camera);

        const x = (v.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-(v.y * 0.5) + 0.5) * window.innerHeight;

        const marker = markerRefs.current[i];
        if (marker) marker.style.transform = `translate(${x}px, ${y}px)`;

        return { x, y };
      });

      connections.forEach(([a, b], i) => {
        const line = lineRefs.current[i];
        if (!line) return;

        line.setAttribute("x1", String(screenPts[a].x));
        line.setAttribute("y1", String(screenPts[a].y));
        line.setAttribute("x2", String(screenPts[b].x));
        line.setAttribute("y2", String(screenPts[b].y));
      });

      renderer.render(scene, camera);
    };

    frame = requestAnimationFrame(animate);

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      mainGroup.position.x = window.innerWidth < 640 ? 1.5 : window.innerWidth < 768 ? 2.5 : 5;
    };

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("resize", resize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-min-h-screen w-full overflow-x-hidden bg-white text-[#0a0c0e] antialiased selection:bg-cyan-300">
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            background-position: 200% 0;
          }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.45;
            transform: scale(1);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.5);
          }
        }

        @keyframes beamMoveY {
          0% {
            top: -10%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }

        .animate-pulse-slow {
          animation: pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-beam-y {
          animation: beamMoveY 4s linear infinite;
        }
          50% {
            background-position: 0% 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .headline-shimmer {
          background: linear-gradient(
            90deg,
            #020617 0%,
            #00c8ff 40%,
            #38bdf8 50%,
            #00c8ff 60%,
            #020617 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s ease-in-out infinite;
        }

        .svg-line {
          stroke: rgba(34,211,238,.18);
          stroke-width: 0.5;
        }

        .svg-line.active {
          stroke: rgba(34,211,238,.45);
          stroke-dasharray: 2 4;
          animation: dash 15s linear infinite;
        }

        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .ticker-track {
          animation: ticker 40s linear infinite;
          width: max-content;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        ref={blobRef}
        className="pointer-events-none absolute z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,145,255,0.10)_0%,rgba(255,255,255,0)_70%)]"
      />

      <svg className="pointer-events-none absolute inset-0 z-[5] h-full w-full">
        {[0, 1, 2].map((_, i) => (
          <line
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className={i === 0 ? "svg-line active" : "svg-line"}
          />
        ))}
      </svg>

      <div className="absolute inset-0 z-10">
        {labels.map((item, i) => (
          <div
            key={item.text}
            ref={(el) => {
              markerRefs.current[i] = el;
            }}
            className="pointer-events-none absolute z-10 h-0 w-0"
          >
            <div className="absolute h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,.45)]" />
            <div className="absolute left-[-3px] top-[-3px] h-2 w-2 -translate-x-1/2 -translate-y-1/2 border-l border-t border-cyan-400" />
            <div className="absolute bottom-[-3px] right-[-3px] h-2 w-2 -translate-x-1/2 -translate-y-1/2 border-b border-r border-cyan-400" />
            <div className="absolute left-2.5 top-2.5 whitespace-nowrap rounded-[1px] bg-cyan-400 px-1 py-[1px] font-mono text-[8px] tracking-[0.05em] text-white">
              {item.text}
            </div>
          </div>
        ))}
      </div>

      <div ref={mountRef} className="absolute inset-0 z-[1]" />

      <main className="pointer-events-none absolute inset-0 z-20">
        <header className="animate-fade-in absolute left-5 top-6 opacity-0 sm:left-8 sm:top-8 md:left-12">
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-cyan-600">
            SEAINT ENTERPRISE
          </span>
        </header>

        <div className="animate-fade-in absolute left-5 right-5 top-[48%] sm:left-8 sm:right-auto sm:top-[45%] z-30 max-w-xl md:left-12 -translate-y-1/2 opacity-0 md:left-12">
          <h1 className="headline-shimmer text-[42px] font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Build Tomorrow,
            <br />
            Today.
          </h1>

          <p className="mt-5 max-w-[320px] font-mono text-[9px] uppercase tracking-[0.22em] sm:max-w-none sm:text-[10px] sm:tracking-widest text-gray-500">
            VENTURE CAPITAL / PRIVATE EQUITY / STRATEGIC ADVISORY
          </p>

          <div className="pointer-events-auto mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <a
              href="/portfolio"
              className="rounded-full bg-cyan-400 px-5 py-3 text-center text-sm sm:px-6 font-medium text-white transition hover:bg-cyan-500"
            >
              View Portfolio
            </a>

            <a
              href="/contact"
              className="rounded-full border border-cyan-400 bg-white/70 px-5 py-3 text-center text-sm sm:px-6 font-medium text-cyan-600 shadow-sm backdrop-blur transition hover:bg-[#f6f8fb]"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </main>

      <section className="relative z-30 mt-0 bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
              SEAINT ECOSYSTEM
            </p>
          </div>

          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="ticker-track flex items-center gap-16 py-2">
              {[...Array(2)].map((_, group) => (
                <div key={group} className="flex shrink-0 items-center gap-16">
                  {[
                    "SEAINT ENTERPRISE",
                    "SEAINT INTELLIGENCE",
                    "ALMA",
                    "ALMA VE",
                    "FOUNDERS CLUB",
                    "FOUNDERS INFLUENCE",
                    "ALTA SPORTS ECOM",
                    "ALTA GLOBAL",
                    "ALTA EVENTS",
                    "NOCTRAI",
                  ].map((company) => (
                    <div key={company} className="flex items-center gap-3 text-cyan-600 transition-colors duration-300 hover:text-[#00c8ff]">
                      <span className="whitespace-nowrap text-lg font-semibold tracking-tight">
                        {company}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


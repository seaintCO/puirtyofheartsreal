"use client";

import { useEffect, useRef } from "react";

export default function PurityAuraBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vertex = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
    const fragment = [
      "precision mediump float;",
      "uniform vec2 u_res;",
      "uniform float u_time;",
      "float band(float x,float c,float w){float d=(x-c)/w;return exp(-d*d);}",
      "void main(){",
      "vec2 uv=gl_FragCoord.xy/u_res;",
      "float t=u_time*0.10;",
      "vec3 navy=vec3(0.035,0.115,0.165);",
      "vec3 navy2=vec3(0.050,0.175,0.225);",
      "vec3 sage=vec3(0.355,0.610,0.560);",
      "vec3 sageSoft=vec3(0.550,0.710,0.675);",
      "vec3 gold=vec3(0.800,0.690,0.455);",
      "vec3 base=mix(navy,navy2,uv.y*0.8);",
      "float x=uv.x+(1.0-uv.y)*(-0.28);",
      "float topFade=pow(uv.y,1.45);",
      "float rays=0.0;",
      "rays+=0.75*band(x,0.28+0.055*sin(t*1.2),0.055);",
      "rays+=0.50*band(x,0.44+0.05*sin(t*.9+2.0),0.10);",
      "rays+=0.36*band(x,0.64+0.06*sin(t*1.1+4.0),0.17);",
      "rays+=0.24*band(x,0.12+0.035*sin(t*.8+1.0),0.09);",
      "float shimmer=.5+.5*sin(u_time*.35+uv.x*5.0);",
      "vec3 col=base+sage*rays*topFade*.52+sageSoft*rays*rays*topFade*.21;",
      "col+=gold*rays*rays*topFade*.10*(.75+.25*shimmer);",
      "float halo=smoothstep(.58,0.0,distance(uv,vec2(.72,.65)));",
      "col+=sage*halo*.035;",
      "float vignette=smoothstep(1.25,.40,distance(uv,vec2(.5,.52)));",
      "col*=mix(.74,1.0,vignette);",
      "gl_FragColor=vec4(col,.96);",
      "}"
    ].join("");

    const makeShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = makeShader(gl.VERTEX_SHADER, vertex);
    const fs = makeShader(gl.FRAGMENT_SHADER, fragment);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    let raf = 0;
    let mounted = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = (time: number) => {
      if (!mounted) return;
      resize();
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, reduceMotion ? 0 : time * .001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    draw(0);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (buffer) gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={ref} className="purity-aura-canvas" aria-hidden="true" />;
}

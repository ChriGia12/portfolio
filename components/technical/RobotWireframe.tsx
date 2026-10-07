"use client";

import { useAnimationFrame, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

/**
 * Hero visual: a schematic 6-axis arm (side view) printing a non-planar part.
 * The pose is solved with two-link inverse kinematics so the tool stays
 * vertical while the TCP follows the toolpath. Purely decorative data —
 * swap this component for a real render or photo whenever you have one.
 */

type P = { x: number; y: number };

const SHOULDER: P = { x: 150, y: 330 };
const L1 = 165;
const L2 = 150;
const TOOL = 44;
const BED = 432;
const LAYERS = 6;
const PER_LAYER = 40;
const X0 = 300;
const X1 = 440;
const LOOP_MS = 30000;
const PRINT_MS = 26500;

const PATH: (P & { layer: number })[] = [];
for (let k = 0; k < LAYERS; k++) {
  for (let i = 0; i < PER_LAYER; i++) {
    const u0 = i / (PER_LAYER - 1);
    const u = k % 2 === 0 ? u0 : 1 - u0;
    PATH.push({
      x: X0 + (X1 - X0) * u,
      // layers bow upwards as they stack: planar at the bed, curved on top
      y: BED - 6 - k * 8 - (k / (LAYERS - 1)) * 10 * Math.sin(u * Math.PI),
      layer: k,
    });
  }
}

const deg = (r: number) => (r * 180) / Math.PI;

function solve(tcp: P) {
  const wrist = { x: tcp.x, y: tcp.y - TOOL };
  const dx = wrist.x - SHOULDER.x;
  const dy = wrist.y - SHOULDER.y;
  const d = Math.min(Math.hypot(dx, dy), L1 + L2 - 1);
  const t1 =
    Math.atan2(dy, dx) - Math.acos((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d));
  const elbow = {
    x: SHOULDER.x + L1 * Math.cos(t1),
    y: SHOULDER.y + L1 * Math.sin(t1),
  };
  const t2 = Math.atan2(wrist.y - elbow.y, wrist.x - elbow.x);
  return { wrist, elbow, a2: -deg(t1), a3: deg(t2 - t1) };
}

function at(f: number) {
  const i = Math.min(Math.floor(f), PATH.length - 2);
  const t = f - i;
  const a = PATH[i];
  const b = PATH[i + 1];
  return {
    i,
    layer: a.layer,
    tcp: { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t },
  };
}

const fmt = (n: number, d = 1) => {
  const s = Math.abs(n).toFixed(d).padStart(d + 4, "0");
  return (n < 0 ? "−" : "+") + s;
};

function Link({ a, b, w }: { a: P; b: P; w: number }) {
  return (
    <>
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--color-fg)" strokeOpacity={0.55} strokeWidth={w} strokeLinecap="round" />
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--color-bg)" strokeWidth={w - 2} strokeLinecap="round" />
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--color-fg)" strokeOpacity={0.25} strokeWidth={0.75} strokeDasharray="10 3 2 3" />
    </>
  );
}

function Joint({ p, r = 9 }: { p: P; r?: number }) {
  return (
    <g>
      <circle cx={p.x} cy={p.y} r={r} fill="var(--color-bg)" stroke="var(--color-fg)" strokeOpacity={0.7} />
      <circle cx={p.x} cy={p.y} r={1.5} fill="var(--color-fg)" />
    </g>
  );
}

export function RobotWireframe({
  className = "",
  label,
  layerLabel,
}: {
  className?: string;
  label: string;
  layerLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [f, setF] = useState((PATH.length - 1) * 0.62);

  useAnimationFrame((time) => {
    if (reduce || !inView) return;
    const progress = Math.min(1, (time % LOOP_MS) / PRINT_MS);
    setF(progress * (PATH.length - 1));
  });

  const { i, layer, tcp } = at(f);
  const { wrist, elbow, a2, a3 } = solve(tcp);
  const trail =
    PATH.slice(0, i + 1)
      .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(" ") + ` ${tcp.x.toFixed(1)},${tcp.y.toFixed(1)}`;

  const rows = [
    ["X", fmt((tcp.x - X0) * 1.5)],
    ["Y", fmt(0)],
    ["Z", fmt((BED - tcp.y) * 1.5)],
    ["A2", fmt(a2)],
    ["A3", fmt(a3)],
  ];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg
        viewBox="70 160 440 300"
        className="h-auto w-full"
        role="img"
        aria-label={label}
        fill="none"
      >
        {/* floor + print bed */}
        <line x1={70} y1={440} x2={510} y2={440} stroke="var(--color-line)" />
        <line x1={280} y1={BED} x2={460} y2={BED} stroke="var(--color-fg)" strokeOpacity={0.6} />
        {Array.from({ length: 13 }, (_, n) => (
          <line key={n} x1={286 + n * 14} y1={BED} x2={280 + n * 14} y2={440} stroke="var(--color-fg)" strokeOpacity={0.25} strokeWidth={0.75} />
        ))}

        {/* reach envelope */}
        <path
          d={`M ${SHOULDER.x + (L1 + L2) * Math.cos(-0.42)} ${SHOULDER.y + (L1 + L2) * Math.sin(-0.42)} A ${L1 + L2} ${L1 + L2} 0 0 1 ${SHOULDER.x + (L1 + L2) * Math.cos(0.33)} ${SHOULDER.y + (L1 + L2) * Math.sin(0.33)}`}
          stroke="var(--color-line)"
          strokeDasharray="2 6"
        />

        {/* base */}
        <path d="M118 440 L128 366 H172 L182 440 Z" fill="var(--color-bg)" stroke="var(--color-fg)" strokeOpacity={0.55} />
        <line x1={150} y1={452} x2={150} y2={300} stroke="var(--color-fg)" strokeOpacity={0.25} strokeWidth={0.75} strokeDasharray="10 3 2 3" />

        {/* deposited path */}
        <polyline points={trail} stroke="var(--color-accent)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />

        {/* arm */}
        <Link a={SHOULDER} b={elbow} w={18} />
        <Link a={elbow} b={wrist} w={14} />
        <path
          d={`M ${wrist.x - 7} ${wrist.y} L ${wrist.x - 7} ${tcp.y - 14} L ${tcp.x} ${tcp.y - 1} L ${wrist.x + 7} ${tcp.y - 14} L ${wrist.x + 7} ${wrist.y} Z`}
          fill="var(--color-bg)"
          stroke="var(--color-fg)"
          strokeOpacity={0.7}
        />
        <Joint p={SHOULDER} r={12} />
        <Joint p={elbow} r={9} />
        <Joint p={wrist} r={7} />

        {/* TCP marker */}
        <circle cx={tcp.x} cy={tcp.y} r={2.4} fill="var(--color-accent)" />
        <path d={`M ${tcp.x + 5} ${tcp.y - 5} L ${tcp.x + 20} ${tcp.y - 26} H ${tcp.x + 34}`} stroke="var(--color-accent)" strokeWidth={0.75} />
        <text x={tcp.x + 38} y={tcp.y - 23} fill="var(--color-accent)" fontSize={8} fontFamily="var(--font-mono)" letterSpacing={1}>
          TCP
        </text>

        {/* frame at the bed origin */}
        <g stroke="var(--color-fg)" strokeOpacity={0.7} strokeWidth={0.9}>
          <line x1={280} y1={BED} x2={280} y2={BED - 22} />
          <line x1={280} y1={BED} x2={258} y2={BED} />
        </g>
        <text x={246} y={BED - 26} fill="var(--color-muted)" fontSize={7} fontFamily="var(--font-mono)" letterSpacing={1}>
          BASE
        </text>
      </svg>

      <dl
        aria-hidden
        className="absolute right-0 top-0 grid grid-cols-[auto_auto] gap-x-3 gap-y-0.5 font-mono text-[10px] leading-4 text-muted sm:text-[11px]"
      >
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-dim">{k}</dt>
            <dd className="text-right tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>

      <p aria-hidden className="label absolute bottom-0 left-0 flex items-center gap-2 text-dim">
        <span className="inline-block h-1.5 w-1.5 bg-accent" />
        LIN · {layerLabel} {String(layer + 1).padStart(2, "0")} / {String(LAYERS).padStart(2, "0")}
      </p>
    </div>
  );
}

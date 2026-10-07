import type { CoverArtKind } from "@/lib/types";

/**
 * Generated technical drawings used as project covers until real photos or
 * renders are added (set `cover` on the project to replace them).
 */

const mono = { fontFamily: "var(--font-mono)", letterSpacing: 2 } as const;
const FG = "var(--color-fg)";
const ACCENT = "var(--color-accent)";

function Grid({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M80 0H0V80" stroke="var(--color-line)" strokeWidth="1" />
        </pattern>
        <radialGradient id={`${id}-fade`} cx="50%" cy="50%" r="60%">
          <stop offset="35%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}-mask`}>
          <rect width="1600" height="900" fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <rect width="1600" height="900" fill={`url(#${id})`} mask={`url(#${id}-mask)`} opacity="0.7" />
    </>
  );
}

function Toolpath() {
  const layers = 46;
  const cx = 800;
  const active = 37;
  const ring = (i: number) => {
    const rx = 190 + 70 * Math.sin(i * 0.14 + 0.6);
    return { cy: 690 - i * 10, rx, ry: rx * 0.3, tilt: Math.max(0, i - 26) * 0.75 };
  };
  const a = ring(active);
  const rad = (a.tilt * Math.PI) / 180;
  // point on the active layer where the nozzle sits (ellipse param 320°)
  const t = (320 * Math.PI) / 180;
  const lx = a.rx * Math.cos(t);
  const ly = a.ry * Math.sin(t);
  const nx = cx + lx * Math.cos(rad) - ly * Math.sin(rad);
  const ny = a.cy + lx * Math.sin(rad) + ly * Math.cos(rad);

  return (
    <>
      <Grid id="g-toolpath" />
      {/* bed */}
      <ellipse cx={cx} cy={700} rx={420} ry={126} stroke={FG} strokeOpacity="0.18" strokeDasharray="4 10" />
      {Array.from({ length: layers }, (_, i) => {
        const r = ring(i);
        const on = i === active;
        if (i > active) return null;
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={r.cy}
            rx={r.rx}
            ry={r.ry}
            transform={`rotate(${r.tilt} ${cx} ${r.cy})`}
            stroke={on ? ACCENT : FG}
            strokeOpacity={on ? 1 : 0.16 + (i / layers) * 0.3}
            strokeWidth={on ? 2.5 : 1.25}
          />
        );
      })}
      {/* remaining layers, not yet printed */}
      {Array.from({ length: layers - active - 1 }, (_, n) => {
        const r = ring(active + 1 + n);
        return (
          <ellipse key={n} cx={cx} cy={r.cy} rx={r.rx} ry={r.ry} transform={`rotate(${r.tilt} ${cx} ${r.cy})`} stroke={FG} strokeOpacity="0.1" strokeDasharray="2 8" />
        );
      })}

      {/* tool: normal to the layer */}
      <g transform={`rotate(${a.tilt} ${nx} ${ny})`}>
        <path d={`M${nx} ${ny} l-12 -26 v-150 h24 v150 z`} fill="var(--color-surface)" stroke={FG} strokeOpacity="0.75" strokeWidth="1.5" />
        <line x1={nx} y1={ny + 40} x2={nx} y2={ny - 260} stroke={FG} strokeOpacity="0.3" strokeDasharray="14 4 3 4" />
      </g>
      <circle cx={nx} cy={ny} r="5" fill={ACCENT} />

      {/* callout */}
      <path d={`M${nx + 14} ${ny - 6} L1180 250 H1400`} stroke={ACCENT} strokeWidth="1.25" />
      <text x="1180" y="236" fill={ACCENT} fontSize="17" {...mono}>LAYER 38 / 46 · NON-PLANAR</text>
      <text x="1180" y="282" fill="var(--color-muted)" fontSize="15" {...mono}>LIN · TOOL ⟂ SURFACE</text>

      {/* height dimension */}
      <g stroke={FG} strokeOpacity="0.45" strokeWidth="1.25">
        <line x1="420" y1="700" x2="420" y2="240" />
        <line x1="408" y1="700" x2="432" y2="700" />
        <line x1="408" y1="240" x2="432" y2="240" />
      </g>
      <text x="396" y="478" fill="var(--color-muted)" fontSize="15" textAnchor="end" {...mono}>Z</text>

      {/* base frame */}
      <g transform="translate(250 730)" strokeWidth="1.5">
        <line x1="0" y1="0" x2="0" y2="-70" stroke={FG} strokeOpacity="0.7" />
        <line x1="0" y1="0" x2="76" y2="0" stroke={ACCENT} />
        <line x1="0" y1="0" x2="-40" y2="34" stroke={FG} strokeOpacity="0.7" />
        <text x="-34" y="-84" fill="var(--color-muted)" fontSize="15" {...mono}>BASE</text>
      </g>
    </>
  );
}

function Arm() {
  const j = [
    { x: 520, y: 700, n: "J1" },
    { x: 520, y: 590, n: "J2" },
    { x: 770, y: 330, n: "J3" },
    { x: 930, y: 352, n: "J4" },
    { x: 1085, y: 374, n: "J5" },
    { x: 1160, y: 384, n: "J6" },
  ];
  const link = (a: number, b: number, w: number) => (
    <g key={`${a}-${b}`}>
      <line x1={j[a].x} y1={j[a].y} x2={j[b].x} y2={j[b].y} stroke={FG} strokeOpacity="0.6" strokeWidth={w} strokeLinecap="round" />
      <line x1={j[a].x} y1={j[a].y} x2={j[b].x} y2={j[b].y} stroke="var(--color-surface)" strokeWidth={w - 3.5} strokeLinecap="round" />
      <line x1={j[a].x} y1={j[a].y} x2={j[b].x} y2={j[b].y} stroke={FG} strokeOpacity="0.28" strokeDasharray="14 4 3 4" />
    </g>
  );
  const labelPos = [
    [-150, 20],
    [-150, -10],
    [-40, -110],
    [10, -120],
    [30, 120],
    [150, -70],
  ];
  return (
    <>
      <Grid id="g-arm" />
      {/* floor + reach envelope */}
      <line x1="240" y1="770" x2="1360" y2="770" stroke={FG} strokeOpacity="0.25" />
      <path d="M 392 0 A 600 600 0 0 1 1105 705" stroke={FG} strokeOpacity="0.14" strokeDasharray="3 10" />

      {/* base */}
      <path d="M440 770 L462 700 H578 L600 770 Z" fill="var(--color-surface)" stroke={FG} strokeOpacity="0.6" strokeWidth="1.5" />
      <ellipse cx="520" cy="700" rx="58" ry="14" fill="var(--color-surface)" stroke={FG} strokeOpacity="0.6" strokeWidth="1.5" />
      <line x1="520" y1="800" x2="520" y2="470" stroke={FG} strokeOpacity="0.28" strokeDasharray="14 4 3 4" />

      {link(0, 1, 62)}
      {link(1, 2, 52)}
      {link(2, 3, 42)}
      {link(3, 4, 34)}
      {link(4, 5, 24)}

      {/* flange */}
      <path d="M1168 362 l22 3 l-6 44 l-22 -3 z" fill="var(--color-surface)" stroke={FG} strokeOpacity="0.7" strokeWidth="1.5" />

      {/* joint angle arcs */}
      <path d="M 520 500 A 90 90 0 0 1 582 525" stroke={ACCENT} strokeWidth="1.5" />
      <text x="560" y="486" fill={ACCENT} fontSize="16" {...mono}>θ2</text>
      <path d="M 713 389 A 82 82 0 0 0 851 341" stroke={FG} strokeOpacity="0.45" strokeWidth="1.25" />
      <text x="770" y="440" fill="var(--color-muted)" fontSize="16" {...mono}>θ3</text>

      {j.map((p, i) => {
        const r = [0, 30, 26, 20, 17, 11][i];
        const [dx, dy] = labelPos[i];
        return (
          <g key={p.n}>
            {i > 0 && (
              <>
                <circle cx={p.x} cy={p.y} r={r} fill="var(--color-surface)" stroke={FG} strokeOpacity="0.75" strokeWidth="1.5" />
                <circle cx={p.x} cy={p.y} r="3" fill={i === 1 ? ACCENT : FG} />
              </>
            )}
            <line x1={p.x + Math.sign(dx) * (r + 6)} y1={p.y + (dx === 0 ? Math.sign(dy) * (r + 6) : 0)} x2={p.x + dx * 0.72} y2={p.y + dy * 0.82} stroke={FG} strokeOpacity="0.3" />
            <text x={p.x + dx} y={p.y + dy + 6} fill="var(--color-muted)" fontSize="16" textAnchor="middle" {...mono}>
              {p.n}
            </text>
          </g>
        );
      })}

      {/* tool frame */}
      <g transform="translate(1198 388)" strokeWidth="1.5">
        <line x1="0" y1="0" x2="70" y2="10" stroke={ACCENT} />
        <line x1="0" y1="0" x2="10" y2="-64" stroke={FG} strokeOpacity="0.7" />
        <text x="84" y="18" fill={ACCENT} fontSize="15" {...mono}>TCP</text>
      </g>

      <text x="1180" y="640" fill="var(--color-muted)" fontSize="15" {...mono}>6 DOF · DESKTOP</text>
      <text x="1180" y="668" fill="var(--color-dim)" fontSize="15" {...mono}>KINEMATIC LAYOUT · WIP</text>
    </>
  );
}

/** KinePath: choosing the orientation (left), then slicing the part with a plane (right). */
function Slicer() {
  const n = (v: number) => v.toFixed(1);

  // 01 — the same part in three orientations, isometric wireframe
  const S = 33;
  const OY = 520;
  const iso = (x: number, y: number, z: number, ox: number) =>
    `${n(ox + (x - y) * 0.866 * S)} ${n(OY + (x + y) * 0.5 * S - z * S)}`;
  const box = ([x, y, z]: number[], [a, c, h]: number[], ox: number) => {
    const v = (p: number[]) => iso(p[0], p[1], p[2], ox);
    const corners = [
      [x, y], [x + a, y], [x + a, y + c], [x, y + c],
    ];
    let d = "";
    for (let i = 0; i < 4; i++) {
      const [p, q] = [corners[i], corners[(i + 1) % 4]];
      d += `M${v([...p, z])}L${v([...q, z])}M${v([...p, z + h])}L${v([...q, z + h])}M${v([...p, z])}L${v([...p, z + h])}`;
    }
    return d;
  };
  const parts = [
    { ox: 290, label: "+Z", on: false, boxes: [[[0, 0, 0], [1, 2, 3]], [[0, 0, 3], [3, 2, 1]]] },
    { ox: 520, label: "ON SIDE −Y", on: true, boxes: [[[0, 0, 0], [3, 2, 1]], [[0, 0, 1], [1, 2, 3]]] },
    { ox: 750, label: "+X", on: false, boxes: [[[0, 0, 0], [1, 2, 1]], [[2, 0, 2.6], [1, 2, 1]]] },
  ];

  // 02 — a wireframe dome cut by a horizontal plane
  const cx = 1230;
  const base = 610;
  const R = 235;
  const K = 0.34;
  const ring = (i: number) => {
    const a = ((i / 8) * Math.PI) / 2;
    const r = R * Math.cos(a);
    return { r, y: base - R * Math.sin(a) * 0.95 };
  };
  const cut = ring(3);
  const top = base - R * 0.95;

  return (
    <>
      <Grid id="g-slicer" />

      <text x="182" y="250" fill={ACCENT} fontSize="15" {...mono}>01</text>
      <text x="226" y="250" fill="var(--color-muted)" fontSize="15" {...mono}>ORIENTATION</text>
      {parts.map((p) => (
        <g key={p.label}>
          <path
            d={`M${p.ox - 108} ${OY + 34}L${p.ox} ${OY - 28}L${p.ox + 108} ${OY + 34}L${p.ox} ${OY + 96}Z`}
            stroke={FG}
            strokeOpacity="0.25"
            strokeDasharray="4 8"
          />
          <path
            d={p.boxes.map((b) => box(b[0], b[1], p.ox)).join("")}
            stroke={p.on ? ACCENT : FG}
            strokeOpacity={p.on ? 1 : 0.5}
            strokeWidth={p.on ? 2.25 : 1.25}
          />
          <text x={p.ox} y="668" fill={p.on ? ACCENT : "var(--color-muted)"} fontSize="14" textAnchor="middle" {...mono}>
            {p.label}
          </text>
        </g>
      ))}

      <path d="M866 500H918M904 489L918 500L904 511" stroke={ACCENT} strokeWidth="1.5" />

      <text x="1030" y="250" fill={ACCENT} fontSize="15" {...mono}>02</text>
      <text x="1074" y="250" fill="var(--color-muted)" fontSize="15" {...mono}>SLICING · PLANE ∩ MESH</text>
      {Array.from({ length: 7 }, (_, i) => {
        const { r, y } = ring(i + 1);
        return <ellipse key={i} cx={cx} cy={n(y)} rx={n(r)} ry={n(r * K)} stroke={FG} strokeOpacity="0.22" />;
      })}
      <ellipse cx={cx} cy={base} rx={R} ry={n(R * K)} stroke={FG} strokeOpacity="0.5" strokeWidth="1.5" />
      {Array.from({ length: 12 }, (_, j) => {
        const t = (j / 12) * Math.PI;
        const ex = R * Math.cos(t);
        const ez = R * K * Math.sin(t);
        return (
          <g key={j} stroke={FG}>
            <path d={`M${n(cx + ex)} ${n(base + ez)}Q${n(cx + ex * 0.9)} ${n(base - R * 1.05 + ez * 0.2)} ${cx} ${n(top)}`} strokeOpacity="0.2" />
            <path d={`M${n(cx - ex)} ${n(base - ez)}Q${n(cx - ex * 0.9)} ${n(base - R * 1.05 - ez * 0.2)} ${cx} ${n(top)}`} strokeOpacity="0.12" />
          </g>
        );
      })}
      <path
        d={`M${cx - 300} ${n(cut.y + 52)}L${cx - 190} ${n(cut.y - 84)}H${cx + 300}L${cx + 190} ${n(cut.y + 52)}Z`}
        stroke={FG}
        strokeOpacity="0.35"
        strokeDasharray="6 8"
      />
      <ellipse cx={cx} cy={n(cut.y)} rx={n(cut.r)} ry={n(cut.r * K)} stroke={ACCENT} strokeWidth="2.75" />
    </>
  );
}

export function CoverArt({ kind, label }: { kind: CoverArtKind; label: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      fill="none"
      role="img"
      aria-label={label}
    >
      <rect width="1600" height="900" fill="var(--color-surface)" />
      {kind === "toolpath" ? <Toolpath /> : kind === "slicer" ? <Slicer /> : <Arm />}
    </svg>
  );
}

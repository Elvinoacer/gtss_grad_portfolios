"use client";

/**
 * MotifField — discipline-specific visual languages (spec §9)
 * One SVG motif per professional family. The GTSS frame stays constant;
 * the discipline changes the visual language. Rendered in `currentColor`
 * so callers control the local accent.
 */

import type { MotifId } from "@/content/types";

const strokeProps = {
  fill: "none" as const,
  strokeWidth: 1.4,
  vectorEffect: "non-scaling-stroke" as const,
};

function Blueprint() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      {/* truss frame */}
      <path d="M40 210 L110 90 L180 210 M110 90 L110 210 M60 165 L110 165 M110 165 L160 165 M75 130 L110 130 M110 130 L145 130" opacity="0.55" />
      {/* column + footing */}
      <rect x="228" y="70" width="34" height="140" opacity="0.5" />
      <rect x="214" y="210" width="62" height="14" opacity="0.5" />
      <path d="M228 70 L245 46 L262 70" opacity="0.45" />
      {/* dimension line */}
      <path d="M300 70 v140" opacity="0.6" />
      <path d="M294 70 h12 M294 210 h12" opacity="0.6" />
      <path d="M300 140 h8" opacity="0.4" />
      {/* grid hint */}
      <path d="M330 80 h50 M330 110 h70 M330 140 h56 M330 170 h64 M330 200 h44" opacity="0.22" />
    </g>
  );
}

function Circuit() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      <path d="M50 60 H140 L180 100 H260" opacity="0.55" />
      <path d="M70 130 H150 L190 170 H300" opacity="0.45" />
      <path d="M90 200 H200 L230 170" opacity="0.5" />
      <path d="M260 100 L288 128" opacity="0.5" />
      {/* pads */}
      {[
        [50, 60],
        [260, 100],
        [70, 130],
        [300, 170],
        [90, 200],
        [288, 128],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" opacity="0.75" />
      ))}
      {/* chip */}
      <rect x="150" y="112" width="46" height="46" rx="4" opacity="0.6" />
      {[158, 168, 178, 188].map((y) => (
        <path key={y} d={`M150 ${y} h-12 M196 ${y} h12`} opacity="0.5" />
      ))}
    </g>
  );
}

function Waveform() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      <path d="M0 130 h400" opacity="0.3" strokeDasharray="3 6" />
      <path
        d="M20 130 Q 45 60 70 130 T 120 130 T 170 130 T 220 130"
        opacity="0.6"
      />
      <path
        d="M120 130 Q 130 100 140 130 T 160 130 T 180 130 T 200 130 T 220 130 T 240 130 T 260 130"
        opacity="0.45"
      />
      <path
        d="M200 130 Q 230 30 260 130 T 320 130"
        opacity="0.55"
      />
      {/* signal path nodes */}
      <circle cx="320" cy="130" r="5" opacity="0.7" />
      <path d="M320 130 h30 l10 -10 h40" opacity="0.4" />
      {/* antenna */}
      <path d="M360 130 L385 60" opacity="0.5" />
      <path d="M370 92 a26 26 0 0 1 12 -20 M376 104 a40 40 0 0 1 18 -32" opacity="0.4" />
    </g>
  );
}

function Mechanism() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      {/* gear A */}
      <circle cx="120" cy="120" r="46" opacity="0.55" />
      <circle cx="120" cy="120" r="52" opacity="0.28" strokeDasharray="7 7" />
      <circle cx="120" cy="120" r="14" opacity="0.7" />
      {/* gear B */}
      <circle cx="228" cy="168" r="30" opacity="0.5" />
      <circle cx="228" cy="168" r="35" opacity="0.26" strokeDasharray="5 6" />
      <circle cx="228" cy="168" r="9" opacity="0.7" />
      {/* connecting rod */}
      <path d="M120 166 L96 218 L196 218 L166 190" opacity="0.5" />
      {/* dimension */}
      <path d="M280 80 h70 M280 74 v12 M350 74 v12" opacity="0.45" />
      <path d="M292 120 h44 M300 150 h52 M296 180 h40" opacity="0.22" />
    </g>
  );
}

function Process() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      {/* stream lines */}
      <path d="M30 90 H110" opacity="0.5" />
      <path d="M30 170 H110" opacity="0.5" />
      {/* vessels */}
      <rect x="110" y="60" width="64" height="80" rx="10" opacity="0.55" />
      <path d="M110 84 h64" opacity="0.3" />
      <rect x="110" y="140" width="64" height="60" rx="10" opacity="0.4" />
      {/* connecting process arrows */}
      <path d="M174 100 H214 l-8 -8 M214 100 l-8 8" opacity="0.55" />
      <path d="M174 170 H214" opacity="0.4" />
      {/* pump circle */}
      <circle cx="240" cy="100" r="16" opacity="0.6" />
      <path d="M232 100 l16 -6 v12 z" opacity="0.5" fill="currentColor" />
      {/* output */}
      <path d="M256 100 H330 V60" opacity="0.5" />
      <path d="M330 92 v-24 M326 70 l4 -8 l4 8" opacity="0.55" />
      {/* control loop */}
      <path d="M240 84 V44 H150 V60" opacity="0.35" strokeDasharray="4 5" />
      <circle cx="192" cy="44" r="5" opacity="0.5" />
    </g>
  );
}

function Textile() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      {/* weave grid */}
      {[70, 100, 130, 160, 190].map((y) => (
        <path key={y} d={`M40 ${y} H360`} opacity={y % 60 === 10 ? 0.5 : 0.3} />
      ))}
      {[90, 130, 170, 210, 250, 290, 330].map((x) => (
        <path key={x} d={`M${x} 55 V205`} opacity={x % 80 === 130 ? 0.5 : 0.28} />
      ))}
      {/* over-under accents */}
      <path d="M40 100 H360" opacity="0.75" strokeWidth="3.2" />
      <path d="M170 55 V205" opacity="0.75" strokeWidth="3.2" />
      {/* thread curve */}
      <path d="M60 225 Q 200 245 340 225" opacity="0.45" />
      <path d="M60 235 Q 200 255 340 235" opacity="0.3" />
    </g>
  );
}

function System() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      {/* stacked architecture */}
      <rect x="70" y="56" width="120" height="34" rx="5" opacity="0.6" />
      <rect x="70" y="106" width="160" height="34" rx="5" opacity="0.5" />
      <rect x="70" y="156" width="120" height="34" rx="5" opacity="0.42" />
      {/* connectors */}
      <path d="M130 90 V106 M130 140 V156" opacity="0.55" />
      {/* side modules */}
      <rect x="270" y="76" width="84" height="24" rx="5" opacity="0.4" />
      <rect x="270" y="112" width="84" height="24" rx="5" opacity="0.34" />
      <path d="M230 123 h40 M230 88 h40" opacity="0.45" />
      {/* db cylinders */}
      <ellipse cx="152" cy="216" rx="34" ry="9" opacity="0.5" />
      <path d="M118 216 v16 a34 9 0 0 0 68 0 v-16" opacity="0.5" />
      <path d="M152 190 v26" opacity="0.4" />
    </g>
  );
}

function Distribution() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      {/* axes */}
      <path d="M60 40 V200 H360" opacity="0.5" />
      {/* normal curve */}
      <path
        d="M70 199 C 120 197, 140 60, 190 60 C 240 60, 260 197, 350 199"
        opacity="0.7"
        strokeWidth="2"
      />
      {/* shaded area */}
      <path
        d="M70 199 C 120 197, 140 60, 190 60 C 240 60, 260 197, 350 199 Z"
        fill="currentColor"
        opacity="0.12"
      />
      {/* percentile ticks */}
      {[120, 160, 200, 240, 280].map((x) => (
        <path key={x} d={`M${x} 200 v-8`} opacity="0.5" />
      ))}
      {/* second curve — scenario */}
      <path
        d="M150 199 C 190 196, 210 110, 250 110 C 290 110, 310 196, 340 199"
        opacity="0.4"
        strokeDasharray="4 5"
      />
      <path d="M250 60 v40" opacity="0.3" strokeDasharray="2 4" />
    </g>
  );
}

function Scatter() {
  const pts: Array<[number, number, number]> = [
    [80, 180, 3], [100, 170, 2.5], [118, 185, 3], [140, 150, 2.5],
    [160, 158, 3], [175, 140, 2], [195, 132, 3], [215, 118, 2.5],
    [232, 128, 3], [250, 100, 2], [268, 96, 3], [285, 78, 2.5],
    [300, 70, 3], [318, 62, 2], [95, 155, 2], [130, 128, 2],
    [170, 105, 2.5], [205, 88, 2], [240, 72, 2.5], [280, 52, 2],
    [88, 120, 2], [150, 82, 2], [220, 145, 2.5], [260, 130, 2],
  ];
  return (
    <g stroke="currentColor" {...strokeProps}>
      <path d="M60 40 V200 H360" opacity="0.45" />
      {/* regression */}
      <path d="M75 190 L330 58" opacity="0.75" strokeWidth="2" />
      {/* confidence band */}
      <path d="M75 178 L330 46" opacity="0.3" strokeDasharray="3 5" />
      <path d="M75 202 L330 70" opacity="0.3" strokeDasharray="3 5" />
      {pts.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="currentColor" opacity="0.55" stroke="none" />
      ))}
      {/* caption rule */}
      <path d="M70 224 h130" opacity="0.3" />
      <path d="M70 234 h88" opacity="0.2" />
    </g>
  );
}

function Molecule() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      {/* hex ring */}
      <path
        d="M170 78 L214 103 L214 153 L170 178 L126 153 L126 103 Z"
        opacity="0.6"
      />
      {/* nodes */}
      {[
        [170, 78], [214, 103], [214, 153], [170, 178], [126, 153], [126, 103],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="currentColor" opacity="0.65" stroke="none" />
      ))}
      {/* side bonds */}
      <path d="M214 128 H262 M262 128 L288 104 M262 128 L288 152" opacity="0.5" />
      <circle cx="290" cy="102" r="4.5" opacity="0.6" />
      <circle cx="290" cy="154" r="4.5" opacity="0.6" />
      <path d="M126 128 H86" opacity="0.45" />
      <circle cx="82" cy="128" r="6" opacity="0.55" />
      {/* pathway arrows */}
      <path d="M60 210 h90 l-8 -8 M150 210 l-8 8" opacity="0.4" />
      <path d="M180 210 h120" opacity="0.3" strokeDasharray="4 6" />
    </g>
  );
}

function Culture() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      {/* petri dish */}
      <circle cx="150" cy="128" r="72" opacity="0.55" />
      <circle cx="150" cy="128" r="62" opacity="0.3" strokeDasharray="3 6" />
      <circle cx="150" cy="128" r="50" opacity="0.2" />
      {/* colonies */}
      <circle cx="132" cy="112" r="10" opacity="0.55" />
      <circle cx="168" cy="140" r="7" opacity="0.45" />
      <circle cx="148" cy="160" r="5" opacity="0.4" />
      <circle cx="172" cy="104" r="5" opacity="0.4" />
      {/* rods */}
      <path d="M120 148 l16 8 M136 118 l14 -6" opacity="0.5" />
      {/* microscope field right */}
      <circle cx="300" cy="120" r="44" opacity="0.45" />
      <path d="M262 128 a38 38 0 0 1 76 -8" opacity="0.35" strokeDasharray="2 4" />
      {[286, 300, 316].map((x, i) => (
        <circle key={x} cx={x} cy={112 + i * 8} r="4" opacity="0.5" fill="currentColor" stroke="none" />
      ))}
      <path d="M280 148 h44" opacity="0.3" />
    </g>
  );
}

function Archive() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      {/* shelf rows */}
      {[70, 130, 190].map((y) => (
        <g key={y}>
          <path d={`M50 ${y + 42} H350`} opacity="0.45" />
          {/* documents */}
          <rect x="64" y={y} width="26" height="38" rx="2" opacity="0.4" />
          <rect x="98" y={y + 6} width="22" height="32" rx="2" opacity="0.3" />
          <rect x="128" y={y} width="26" height="38" rx="2" opacity="0.35" />
          <rect x="162" y={y + 4} width="20" height="34" rx="2" opacity="0.28" />
          <rect x="196" y={y} width="24" height="38" rx="2" opacity="0.35" />
        </g>
      ))}
      {/* classification labels */}
      <path d="M240 78 h70" opacity="0.3" />
      <path d="M240 92 h56" opacity="0.22" />
      <path d="M240 138 h64" opacity="0.3" />
      <path d="M240 152 h48" opacity="0.22" />
      {/* search node */}
      <circle cx="262" cy="196" r="10" opacity="0.5" />
      <path d="M269 203 l12 12" opacity="0.5" />
    </g>
  );
}

function Editorial() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      {/* headline block */}
      <rect x="60" y="58" width="130" height="16" rx="2" opacity="0.65" fill="currentColor" stroke="none" />
      <rect x="60" y="82" width="88" height="9" rx="2" opacity="0.3" fill="currentColor" stroke="none" />
      {/* column text */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={`c1-${i}`} x="60" y={104 + i * 13} width={i === 5 ? 70 : 118} height="4" rx="2" opacity="0.3" fill="currentColor" stroke="none" />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={`c2-${i}`} x="196" y={104 + i * 13} width={i === 5 ? 54 : 92} height="4" rx="2" opacity="0.26" fill="currentColor" stroke="none" />
      ))}
      {/* image frame */}
      <rect x="300" y="58" width="70" height="70" rx="3" opacity="0.5" />
      <path d="M300 112 l22 -18 l16 12 l14 -10 l18 16" opacity="0.45" />
      <circle cx="360" cy="72" r="6" opacity="0.5" />
      {/* caption */}
      <path d="M300 140 h70" opacity="0.3" />
      <path d="M300 150 h44" opacity="0.22" />
      {/* footer masthead */}
      <path d="M60 208 h310" opacity="0.4" />
      <path d="M60 220 h60 M316 220 h54" opacity="0.28" />
    </g>
  );
}

function Pedagogy() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      {/* lesson blocks */}
      <rect x="64" y="64" width="150" height="26" rx="4" opacity="0.6" />
      <rect x="64" y="100" width="108" height="26" rx="4" opacity="0.42" />
      <rect x="64" y="136" width="132" height="26" rx="4" opacity="0.34" />
      {/* checkboxes */}
      {[196, 232, 268].map((y) => (
        <g key={y}>
          <rect x="250" y={y} width="16" height="16" rx="3" opacity="0.55" />
          <path d={`M253 ${y + 8} l4 5 l7 -9`} opacity="0.75" />
        </g>
      ))}
      {/* outcome curve */}
      <path d="M60 216 C 140 214, 180 186, 260 184 S 350 168, 380 150" opacity="0.5" strokeDasharray="5 5" />
      <circle cx="300" cy="180" r="4" fill="currentColor" opacity="0.6" stroke="none" />
      <path d="M60 226 h90" opacity="0.25" />
    </g>
  );
}

function Field() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      {/* contour lines */}
      <path d="M20 210 Q 140 170 260 200 T 400 170" opacity="0.4" />
      <path d="M0 180 Q 120 140 240 168 T 380 130" opacity="0.45" />
      <path d="M20 140 Q 140 104 260 128 T 400 96" opacity="0.4" />
      <path d="M60 104 Q 160 70 280 90 T 400 62" opacity="0.3" />
      {/* plot rows */}
      {[64, 84, 104].map((y) => (
        <path key={y} d={`M300 ${y} h64`} opacity="0.35" />
      ))}
      {[316, 332, 348].map((x) => (
        <path key={x} d={`M${x} 64 v40`} opacity="0.35" />
      ))}
      {/* growth marker */}
      <path d="M120 190 v-26 M120 164 a8 8 0 1 1 8 8" opacity="0.55" />
      <path d="M120 182 c 6 -6 10 -4 14 2 c 4 6 8 4 12 -2" opacity="0.4" />
    </g>
  );
}

function Policy() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      {/* document */}
      <rect x="90" y="50" width="150" height="180" rx="4" opacity="0.5" />
      <path d="M90 74 h150" opacity="0.35" />
      {/* heading lines */}
      <path d="M110 96 h70" opacity="0.6" />
      <path d="M110 116 h110" opacity="0.3" />
      <path d="M110 132 h96" opacity="0.3" />
      {/* highlighted line */}
      <rect x="102" y="148" width="126" height="14" rx="2" fill="currentColor" opacity="0.14" stroke="none" />
      <path d="M110 155 h110" opacity="0.55" />
      <path d="M110 176 h84" opacity="0.3" />
      <path d="M110 196 h100" opacity="0.3" />
      {/* bracket annotation */}
      <path d="M256 96 v58 M250 96 h6 M250 154 h6" opacity="0.6" />
      {/* side notes */}
      <path d="M270 110 h74" opacity="0.3" />
      <path d="M270 126 h60" opacity="0.24" />
      <path d="M270 150 h68" opacity="0.3" />
      <path d="M270 166 h52" opacity="0.24" />
    </g>
  );
}

function Airspace() {
  return (
    <g stroke="currentColor" {...strokeProps}>
      {/* radar circles */}
      <circle cx="160" cy="140" r="34" opacity="0.5" />
      <circle cx="160" cy="140" r="62" opacity="0.36" />
      <circle cx="160" cy="140" r="90" opacity="0.22" />
      <path d="M100 140 h120 M160 80 v120" opacity="0.25" />
      {/* sweep */}
      <path d="M160 140 L238 88" opacity="0.6" />
      {/* flight path */}
      <path d="M70 196 Q 190 40 330 96" opacity="0.65" strokeDasharray="6 6" />
      {[[70, 196], [160, 108], [250, 68], [330, 96]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="currentColor" opacity="0.7" stroke="none" />
      ))}
      {/* tower */}
      <path d="M300 196 l10 -44 l10 44" opacity="0.5" />
      <path d="M288 196 h44 M310 152 v44" opacity="0.35" />
    </g>
  );
}

const motifs: Record<MotifId, () => React.ReactElement> = {
  blueprint: Blueprint,
  circuit: Circuit,
  waveform: Waveform,
  mechanism: Mechanism,
  process: Process,
  textile: Textile,
  system: System,
  distribution: Distribution,
  scatter: Scatter,
  molecule: Molecule,
  culture: Culture,
  archive: Archive,
  editorial: Editorial,
  pedagogy: Pedagogy,
  field: Field,
  policy: Policy,
  airspace: Airspace,
};

export function MotifField({
  motif,
  className = "",
}: {
  motif: MotifId;
  className?: string;
}) {
  const Motif = motifs[motif] ?? System;
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <Motif />
    </svg>
  );
}

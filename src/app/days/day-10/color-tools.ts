function hsvToColor(h: number, s: number, v: number, n: number): number {
  const k = (n + h / 60) % 6;

  return Math.round(v - v * s * Math.max(Math.min(k, 4 - k, 1), 0));
}

export function hsvToRgb([h, s, v]: [number, number, number]): [
  number,
  number,
  number
] {
  return [
    hsvToColor(h, s, v, 5),
    hsvToColor(h, s, v, 3),
    hsvToColor(h, s, v, 1),
  ];
}

export function rgbToHex(rgb: [number, number, number]): string {
  return rgb
    .map((x) => x.toString(16))
    .map((hex) => (hex.length === 1 ? '0' + hex : hex))
    .join('');
}

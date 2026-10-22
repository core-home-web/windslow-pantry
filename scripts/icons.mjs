// Winslow Pantry: line icons, drawn on a 32px grid with a 2px stroke to
// match the feature icons on the packaging. Rendered once per page as an
// inline sprite and referenced with <use>.

export const ICONS = {
  // packaging feature icons
  leaf: '<path d="M8 26C5 18 7 9 16 5c8 3 11 12 8 20-5 3-11 3-16 1Z"/><path d="M6 6l20 20M16 12v6M12 16h6"/>',
  shield: '<path d="M16 4 6 8v7c0 6.5 4.3 11 10 13 5.7-2 10-6.5 10-13V8Z"/><path d="m11.5 16 3 3 6-6.5"/>',
  magnet: '<path d="M7 5h6v11a3 3 0 0 0 6 0V5h6v11a9 9 0 0 1-18 0Z"/><path d="M7 10h6M19 10h6"/>',
  multi: '<rect x="12.5" y="12.5" width="7" height="7" rx="1"/><circle cx="6" cy="7" r="2.5"/><circle cx="26" cy="6" r="2.5"/><circle cx="6" cy="26" r="2.5"/><circle cx="26" cy="26" r="2.5"/><path d="m8 9 4.5 4M24 8l-4.5 4.5M8 24l4.5-4.5M24 24l-4.5-4.5"/>',
  thumb: '<path d="M10 14v13H5V14Z"/><path d="M10 15l5-9c2 0 3 1.5 2.5 4L16.5 13H25a2 2 0 0 1 2 2.4l-2 9.6A2.5 2.5 0 0 1 22.6 27H10"/>',
  heat: '<path d="M13 19V7a3 3 0 0 1 6 0v12a5 5 0 1 1-6 0Z"/><path d="M16 13v9"/><path d="M22 8h3M22 12h3M22 16h3"/>',
  dishwasher: '<rect x="5" y="4" width="22" height="24" rx="2"/><path d="M5 10h22M9 7h2"/><circle cx="19" cy="19" r="4"/><path d="M10 15h3v5a1.5 1.5 0 0 1-3 0Z"/>',
  // materials and product details
  bamboo: '<path d="M12 4v24M20 4v24"/><path d="M12 11h0M12 19h0"/><path d="M10 10.5h4M10 18.5h4M18 8h4M18 16h4M18 24h4"/><path d="M20 12c3-3 6-3 8-2-2 3-5 4-8 2Z"/>',
  pan: '<ellipse cx="13" cy="17" rx="9" ry="7"/><path d="M22 17h8"/><path d="M9 15c2-2 6-2 8 0"/>',
  spoon: '<ellipse cx="16" cy="8.5" rx="4.5" ry="5.5"/><path d="M16 14v14"/>',
  wood: '<circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="6.5"/><circle cx="16" cy="16" r="2"/>',
  drop: '<rect x="4" y="6" width="24" height="20" rx="3"/><rect x="8" y="10" width="16" height="12" rx="1.5"/>',
  hook: '<rect x="6" y="4" width="20" height="24" rx="3"/><circle cx="11" cy="9" r="2"/>',
  badge: '<path d="M7 7c3 1 6-2 9-2s6 3 9 2c1 2 1 4 0 5 2 1 2 7 0 8 1 1 1 3 0 5-3-1-6 2-9 2s-6-3-9-2c-1-2-1-4 0-5-2-1-2-7 0-8-1-1-1-3 0-5Z"/><path d="M11 14h10M12 18h8"/>',
  sizes: '<path d="M3 9h8l-3 6v4h-2v-4Z"/><path d="M12 7h10l-4 8v6h-2v-6Z"/><path d="M22 11h7l-3 5v4h-1.5v-4Z"/>',
  nest: '<path d="M4 9h24l-9 9v9h-6v-9Z"/><path d="M9 13h14"/>',
  flex: '<path d="M4 20c4-8 8-8 12 0s8 8 12 0"/><path d="M4 12c4-8 8-8 12 0s8 8 12 0"/>',
  // site
  sprig: '<path d="M16 29V9"/><path d="M16 20c-4 0-7-3-7-7 4 0 7 3 7 7ZM16 15c4 0 7-3 7-7-4 0-7 3-7 7ZM16 9c-1.7-1.4-1.7-4.6 0-6 1.7 1.4 1.7 4.6 0 6Z"/>',
  sun: '<circle cx="16" cy="16" r="5.5"/><path d="M16 3v4M16 25v4M3 16h4M25 16h4M6.8 6.8l2.8 2.8M22.4 22.4l2.8 2.8M6.8 25.2l2.8-2.8M22.4 9.6l2.8-2.8"/>',
  store: '<path d="M5 13v14h22V13"/><path d="M3 13 6 5h20l3 8Z"/><path d="M13 27v-7h6v7"/>',
  mail: '<rect x="4" y="7" width="24" height="18" rx="2"/><path d="m5 9 11 8 11-8"/>',
  globe: '<circle cx="16" cy="16" r="12"/><path d="M4 16h24M16 4c4 4 5 8 5 12s-1 8-5 12c-4-4-5-8-5-12s1-8 5-12Z"/>',
  chevron: '<path d="m9 12 7 7 7-7"/>',
  check: '<path d="m7 16.5 6 6L25 10"/>',
  arrow: '<path d="M6 16h20M19 9l7 7-7 7"/>',
  info: '<circle cx="16" cy="16" r="12"/><path d="M16 14v8M16 10v.5"/>',
  cross: '<path d="M9 9l14 14M23 9 9 23"/>',
  eye: '<path d="M3 16s5-9 13-9 13 9 13 9-5 9-13 9S3 16 3 16Z"/><circle cx="16" cy="16" r="4"/>',
};

export const sprite = () =>
  `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">${Object.entries(ICONS)
    .map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 32 32">${v}</symbol>`)
    .join("")}</svg>`;

export const icon = (name, cls = "") => `<svg class="icon ${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;

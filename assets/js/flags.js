/* =========================================================
   Torneo — bandiere in SVG
   Le bandiere emoji non sono affidabili su tutti i browser/OS
   (spesso mostrano solo la sigla testuale, es. "US" invece del
   disegno). Queste SVG semplificate si vedono sempre uguali,
   ovunque. viewBox comune 0 0 60 40 (rapporto 3:2).
   ========================================================= */

(function (global) {
  'use strict';

  const FLAGS = {
    it: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="40" fill="#F4F5F0"/><rect width="20" height="40" fill="#008C45"/><rect x="40" width="20" height="40" fill="#CD212A"/></svg>`,

    fr: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="40" fill="#FFFFFF"/><rect width="20" height="40" fill="#0055A4"/><rect x="40" width="20" height="40" fill="#EF4135"/></svg>`,

    de: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="40" fill="#FFCE00"/><rect width="60" height="13.34" fill="#000000"/><rect y="13.33" width="60" height="13.34" fill="#DD0000"/></svg>`,

    gb: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#00247D"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" stroke-width="8"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#CF142B" stroke-width="3"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#FFFFFF" stroke-width="13"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#CF142B" stroke-width="7"/>
    </svg>`,

    es: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="40" fill="#AA151B"/><rect y="10" width="60" height="20" fill="#F1BF00"/></svg>`,

    se: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="40" fill="#006AA7"/><rect x="20" width="7" height="40" fill="#FECC00"/><rect y="17" width="60" height="7" fill="#FECC00"/></svg>`,

    kr: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#FFFFFF"/>
      <path d="M30,10 A10,10 0 0 1 30,30 A5,5 0 0 1 30,20 A5,5 0 0 0 30,10 Z" fill="#CD2E3A"/>
      <path d="M30,10 A10,10 0 0 0 30,30 A5,5 0 0 0 30,20 A5,5 0 0 1 30,10 Z" fill="#0047A0"/>
    </svg>`,

    us: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#FFFFFF"/>
      <g fill="#B22234">
        <rect width="60" height="3.08"/><rect y="6.15" width="60" height="3.08"/><rect y="12.3" width="60" height="3.08"/>
        <rect y="18.46" width="60" height="3.08"/><rect y="24.6" width="60" height="3.08"/><rect y="30.77" width="60" height="3.08"/><rect y="36.9" width="60" height="3.08"/>
      </g>
      <rect width="27" height="21.5" fill="#3C3B6E"/>
    </svg>`,

    ca: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#FFFFFF"/>
      <rect width="15" height="40" fill="#FF0000"/><rect x="45" width="15" height="40" fill="#FF0000"/>
      <path d="M30,9 L32,16 L39,14 L35,20 L40,24 L33,24 L34,31 L30,27 L26,31 L27,24 L20,24 L25,20 L21,14 L28,16 Z" fill="#FF0000"/>
    </svg>`,

    ie: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="40" fill="#FF883E"/><rect width="40" height="40" fill="#FFFFFF"/><rect width="20" height="40" fill="#169B62"/></svg>`,

    ru: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="40" fill="#D52B1E"/><rect width="60" height="26.67" fill="#0039A6"/><rect width="60" height="13.34" fill="#FFFFFF"/></svg>`,

    co: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="40" fill="#CE1126"/><rect width="60" height="30" fill="#003893"/><rect width="60" height="20" fill="#FCD116"/></svg>`,

    jm: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#000000"/>
      <polygon points="0,0 30,20 0,40" fill="#009B3A"/>
      <polygon points="60,0 30,20 60,40" fill="#009B3A"/>
      <polygon points="0,0 30,20 60,0" fill="#FED100"/>
      <polygon points="0,40 30,20 60,40" fill="#FED100"/>
    </svg>`,

    au: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#00008B"/>
      <rect width="30" height="20" fill="#00008B"/>
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#FFFFFF" stroke-width="4"/>
      <path d="M15,0 V20 M0,10 H30" stroke="#FFFFFF" stroke-width="6"/>
      <path d="M15,0 V20 M0,10 H30" stroke="#CF142B" stroke-width="3"/>
      <g fill="#FFFFFF">
        <circle cx="45" cy="10" r="2.4"/>
        <circle cx="50" cy="22" r="2.4"/>
        <circle cx="42" cy="28" r="2.4"/>
        <circle cx="50" cy="33" r="1.8"/>
        <circle cx="20" cy="30" r="1.8"/>
      </g>
    </svg>`,

    be: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="40" fill="#FAE042"/><rect width="20" height="40" fill="#000000"/><rect x="40" width="20" height="40" fill="#ED2939"/></svg>`,

    no: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#BA0C2F"/>
      <rect x="18" width="11" height="40" fill="#FFFFFF"/>
      <rect y="14.5" width="60" height="11" fill="#FFFFFF"/>
      <rect x="20.5" width="6" height="40" fill="#00205B"/>
      <rect y="17" width="60" height="6" fill="#00205B"/>
    </svg>`,

    md: `<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#FFD200"/>
      <rect width="18" height="40" fill="#0046AE"/>
      <rect x="42" width="18" height="40" fill="#CC092F"/>
      <circle cx="30" cy="15" r="3.2" fill="#8B4513"/>
      <rect x="26" y="17" width="8" height="11" rx="1.5" fill="#A0522D"/>
    </svg>`
  };

  global.TorneoFlags = FLAGS;
})(window);

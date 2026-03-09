"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

// ─── Links ────────────────────────────────────────────────────────────────────
const WHATSAPP_BURGUAN     = "https://api.whatsapp.com/send/?phone=3042108540&text&type=phone_number&app_absent=0";
const WALINK_GRANIZADOS    = "https://wa.link/v0fk7a";
const INSTAGRAM_BURGUAN    = "https://www.instagram.com/burguan_co/";
const INSTAGRAM_GRANIZADOS = "https://www.instagram.com/frozenshots_donjuan/";
const MENU_LINK            = "https://drive.google.com/file/d/1DBDDXr8A9OsxW-Xa5bC4i4ifsBSbckaB/view?usp=drive_link";
const MAPS_LINK            = "https://maps.app.goo.gl/C8JsKQmnqZihfLJi6";
const MAPS_EMBED_LINK      = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3937.4126638751495!2d-75.404945!3d9.296654000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMTcnNDguMCJOIDc1wrAyNCcxNy44Ilc!5e0!3m2!1ses-419!2sco!4v1771857802211!5m2!1ses-419!2sco";

type Theme = "burguan" | "granizados";

const themes = {
  burguan: {
    name: "BURGUAN",
    logo: "/productos/logoburguan.jpeg",
    tagline: "El placer de comer calle con estilo",
    bgSolid: "#b81414", bgDark: "#3d0000",
    primary: "#832324", primaryDark: "#6b1d1d",
    accent: "#caa056", accentLight: "#f5dfa0",
    cardBg: "#fff8f0", text: "#1a0a0a", heroGlow: "#ff4444",
    switchBg: "linear-gradient(135deg,#0288d1,#00e5ff,#0d47a1)",
    switchBorder: "#00e5ff88",
    switchSub: "¿Mucho calor?", switchMain: "¡Tienes sed! 🧊", switchEmoji: "❄️",
    whatsapp: WHATSAPP_BURGUAN, instagram: INSTAGRAM_BURGUAN,
    particles: ["🍔","🍔","🍔","🍔","🍔","🍔"],
    hasDelivery: true,
  },
  granizados: {
    name: "FROZENSHOTS DON JUAN",
    logo: "/productos/logofrozenshots.jpg",
    tagline: "El frío más delicioso de la ciudad",
    bgSolid: "#0d47a1", bgDark: "#001a3d",
    primary: "#0288d1", primaryDark: "#01579b",
    accent: "#00e5ff", accentLight: "#b3f0ff",
    cardBg: "#e8f7ff", text: "#001a2e", heroGlow: "#00cfff",
    switchBg: "linear-gradient(135deg,#832324,#caa056,#6b1d1d)",
    switchBorder: "#caa05688",
    switchSub: "¿Tienes antojo?", switchMain: "¡Tienes hambre! 🍔", switchEmoji: "🔥",
    whatsapp: WALINK_GRANIZADOS, instagram: INSTAGRAM_GRANIZADOS,
    particles: ["🧊","🍧","🥤","❄️","🌈","💧"],
    hasDelivery: true,
  },
};

// ─── Productos Burguan ────────────────────────────────────────────────────────
type Producto = { nombre: string; tipo: "image"|"video"; src: string; alt?: string; poster?: string; desc?: string };

const productosBurguan: Producto[] = [
  { nombre:"Dogs Burguan",  tipo:"image", src:"/productos/hotdogs.jpeg",     alt:"Dogs Burguan",  desc:"Jugosos y cargados de sabor"      },
  { nombre:"Burguers",      tipo:"video", src:"/productos/Burguer3.mp4",     poster:"/productos/burguers.jpg",       desc:"Hechas con amor y fuego"          },
  { nombre:"Salchipapas",   tipo:"image", src:"/productos/salchipapa1.jpeg", alt:"Salchipapas",   desc:"Crujientes e irresistibles"       },
  { nombre:"Desgranados",   tipo:"image", src:"/productos/foto1.jpeg",       alt:"Desgranados",   desc:"Sabor de la calle, nivel gourmet" },
  { nombre:"Asados",        tipo:"video", src:"/productos/Asados.mp4",       poster:"/productos/asados-burguan.jpg", desc:"Al carbón, con todo el sabor"     },
];

// ─── Promos Frozenshots ───────────────────────────────────────────────────────
// diasSemana: 0=Dom,1=Lun,2=Mar,3=Mié,4=Jue,5=Vie,6=Sáb | null = todos los días
type Promo = {
  id: number;
  titulo: string;
  subtitulo: string;
  precio: string;
  badge: string;
  badgeColor: string;
  src: string;
  diasSemana: number[] | null;
  diasLabel: string;
};

const promos: Promo[] = [
  {
    id: 1,
    titulo: "2 Granizados Cremosos",
    subtitulo: "El dúo perfecto para compartir",
    precio: "$24.000",
    badge: "🧊 Todos los días",
    badgeColor: "#0288d1",
    src: "/productos/promo1.jpg",
    diasSemana: null,
    diasLabel: "Todos los días",
  },
  {
    id: 2,
    titulo: "5 Granizados 12oz",
    subtitulo: "Para el grupo, para la familia",
    precio: "$40.000",
    badge: "🎉 Solo los martes",
    badgeColor: "#7b2ff7",
    src: "/productos/promo2.jpeg",
    diasSemana: [2],
    diasLabel: "Promo de los martes",
  },
  {
    id: 3,
    titulo: "2 Granizados 16oz + Toppings",
    subtitulo: "Con todos los toppings que quieras",
    precio: "$20.000",
    badge: "🌈 Solo los miércoles",
    badgeColor: "#e91e8c",
    src: "/productos/promo3.jpeg",
    diasSemana: [3],
    diasLabel: "Promo de los miércoles",
  },
  {
    id: 4,
    titulo: "2×1 en Granizados",
    subtitulo: "Compra uno y el 2do va por la casa",
    precio: "2×1 🎁",
    badge: "🎊 Solo los miércoles",
    badgeColor: "#e91e8c",
    src: "/productos/promo4.jpeg",
    diasSemana: [3],
    diasLabel: "Promo de los miércoles",
  },
];

// Obtiene hora Colombia (UTC-5)
function getHoraColombia(): { hora: number; minutos: number; diaSemana: number } {
  const now = new Date();
  let hora = now.getUTCHours() - 5;
  if (hora < 0) hora += 24;
  // Día de semana en Colombia: si pasó medianoche UTC pero no en CO ajustamos
  const offsetMs = 5 * 60 * 60 * 1000;
  const coCurrent = new Date(now.getTime() - offsetMs);
  return { hora, minutos: now.getUTCMinutes(), diaSemana: coCurrent.getDay() };
}

function getEstadoHorario(hasDelivery: boolean): { texto: string; abierto: boolean } {
  const { hora, minutos } = getHoraColombia();
  const total = hora * 60 + minutos;
  const APERTURA = 17 * 60;
  const CIERRE   = 23 * 60;

  if (total >= APERTURA && total < CIERRE) {
    const extra = hasDelivery ? " · Domicilio disponible" : " · Solo presencial";
    return { texto: `🟢 Abierto ahora${extra}`, abierto: true };
  }
  const falta = total < APERTURA ? APERTURA - total : (24 * 60 - total) + APERTURA;
  const h = Math.floor(falta / 60), m = falta % 60;
  const cuando = h === 0 ? `en ${m} min` : h < 3 ? `en ${h}h${m > 0 ? ` ${m}min` : ""}` : "a las 5 pm";
  return { texto: `🔴 Cerrado · Abrimos ${cuando}`, abierto: false };
}

// SVGs
const WaPath = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";
const IgPath  = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z";

function Stars({ n }: { n: number }) {
  return <span className="text-yellow-400 text-lg">{"★".repeat(n)}</span>;
}
function FloatingParticle({ emoji, style }: { emoji: string; style: React.CSSProperties }) {
  return <span className="absolute pointer-events-none select-none opacity-[0.13] animate-float" style={style}>{emoji}</span>;
}

const resenasBurguan = [
  { nombre:"Valentina M.", texto:"¡Las mejores hamburguesas que he probado! El sabor es increíble 🔥", estrellas:5 },
  { nombre:"Carlos R.",    texto:"El domicilio llegó rapidísimo y todo caliente. 100% recomendado",     estrellas:5 },
  { nombre:"María J.",     texto:"Los dogs son una locura de ricos, ya son mis favoritos en la ciudad", estrellas:5 },
];
const resenasGranizados = [
  { nombre:"Sofía P.",  texto:"¡El granizado de mango es una delicia! Perfecto para el calor 🧊",   estrellas:5 },
  { nombre:"Andrés V.", texto:"El mejor granizado de la ciudad, sin dudas. Vuelvo siempre ❄️",       estrellas:5 },
  { nombre:"Laura C.",  texto:"Los sabores son únicos, no he probado nada igual en toda la región",  estrellas:5 },
];

// ─── Componente Principal ─────────────────────────────────────────────────────
export default function Home() {
  const [theme, setTheme]           = useState<Theme>("burguan");
  const [switching, setSwitching]   = useState(false);
  const [mounted, setMounted]       = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [horarioStatus, setHorarioStatus]     = useState({ texto: "", abierto: false });
  const [promoActiva, setPromoActiva]         = useState<Promo | null>(null);

  const carruselRef   = useRef<HTMLDivElement>(null);
  const isPausedRef   = useRef(false);
  const resumeTimeout = useRef<number | null>(null);
  const touchStartX   = useRef(0);

  const t       = themes[theme];
  const resenas = theme === "burguan" ? resenasBurguan : resenasGranizados;

  // Productos o promos según el tema
  const isBurguan = theme === "burguan";

  // Para granizados: filtrar promos disponibles hoy y ordenar (hoy primero)
  const promosHoy = (() => {
    const { diaSemana } = getHoraColombia();
    return [...promos].sort((a, b) => {
      const aHoy = a.diasSemana === null || a.diasSemana.includes(diaSemana);
      const bHoy = b.diasSemana === null || b.diasSemana.includes(diaSemana);
      if (aHoy && !bHoy) return -1;
      if (!aHoy && bHoy) return 1;
      return 0;
    });
  })();

  const carruselItems = isBurguan ? productosBurguan : promosHoy;

  useEffect(() => { setMounted(true); }, []);

  // Horario dinámico
  useEffect(() => {
    const upd = () => setHorarioStatus(getEstadoHorario(t.hasDelivery));
    upd();
    const id = window.setInterval(upd, 60_000);
    return () => window.clearInterval(id);
  }, [t.hasDelivery]);

  // Intersection observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setVisibleSections(p => new Set([...p, e.target.id])); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-observe]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [theme]);

  // Carrusel autoplay
  useEffect(() => {
    setActiveCard(0);
    const len = carruselItems.length;
    const id = window.setInterval(() => {
      if (!isPausedRef.current) setActiveCard(prev => (prev + 1) % len);
    }, 3200);
    return () => { window.clearInterval(id); if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current); };
  }, [theme, carruselItems.length]);

  // Centrar card activa
  useEffect(() => {
    const el = carruselRef.current;
    if (!el) return;
    const card = el.querySelectorAll("article")[activeCard] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetWidth / 2 + card.offsetWidth / 2, behavior: "smooth" });
  }, [activeCard]);

  const pauseCarrusel  = () => { isPausedRef.current = true; };
  const resumeCarrusel = () => {
    if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current);
    resumeTimeout.current = window.setTimeout(() => { isPausedRef.current = false; }, 2200);
  };
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; pauseCarrusel(); };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40)
      setActiveCard(prev => diff > 0 ? (prev + 1) % carruselItems.length : (prev - 1 + carruselItems.length) % carruselItems.length);
    resumeCarrusel();
  };

  const switchTheme = useCallback(() => {
    setSwitching(true);
    setVisibleSections(new Set());
    setActiveCard(0);
    setTimeout(() => {
      setTheme(prev => prev === "burguan" ? "granizados" : "burguan");
      setSwitching(false);
    }, 380);
  }, []);

  const vis = (id: string) => visibleSections.has(id);

  // ¿Es promo disponible hoy?
  const isPromoHoy = (promo: Promo) => {
    const { diaSemana } = getHoraColombia();
    return promo.diasSemana === null || promo.diasSemana.includes(diaSemana);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700;800;900&family=Dancing+Script:wght@600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        body {
          background: ${t.bgSolid};
          transition: background 0.55s ease;
          font-family: 'Nunito', sans-serif;
          overflow-x: hidden;
        }

        .hero-title { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.07em; }
        .tagline    { font-family: 'Dancing Script', cursive; }

        .theme-overlay {
          transition: opacity 0.38s ease;
          opacity: ${switching ? 1 : 0};
          pointer-events: ${switching ? "all" : "none"};
        }

        .hero-bg {
          background: linear-gradient(160deg, ${t.bgSolid} 0%, ${t.bgDark} 100%);
          transition: background 0.55s ease;
        }

        .accent-line { background: linear-gradient(90deg, transparent, ${t.accent}, transparent); }

        @keyframes float {
          0%,100% { transform: translateY(0)    rotate(0deg);  }
          33%     { transform: translateY(-14px) rotate(6deg);  }
          66%     { transform: translateY(-7px)  rotate(-4deg); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }

        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 18px ${t.heroGlow}44, 0 0 36px ${t.heroGlow}1a; }
          50%     { box-shadow: 0 0 36px ${t.heroGlow}88, 0 0 72px ${t.heroGlow}33; }
        }
        .glow-pulse { animation: glowPulse 2.8s ease-in-out infinite; }

        @keyframes logoSpin {
          0%  { transform: perspective(900px) rotateY(0deg);    }
          20% { transform: perspective(900px) rotateY(-360deg); }
          100%{ transform: perspective(900px) rotateY(-360deg); }
        }
        .logo-spin { animation: logoSpin 3.2s ease-out infinite; transform-style: preserve-3d; }

        @keyframes shimmer {
          0%   { background-position: 250% center; }
          100% { background-position: -250% center; }
        }
        .btn-wa {
          background-image: linear-gradient(135deg, #25D366 0%, #128C7E 35%, #1ee87a 65%, #128C7E 100%);
          background-size: 280% auto;
          animation: shimmer 3.5s linear infinite;
        }
        .btn-maps {
          background-image: linear-gradient(135deg, ${t.primary} 0%, ${t.primaryDark} 45%, ${t.primary} 100%);
          background-size: 280% auto;
          animation: shimmer 3.5s linear infinite;
        }

        @keyframes ripple {
          0%   { transform: scale(0.85); opacity: 0.7; }
          100% { transform: scale(2.5);  opacity: 0;   }
        }
        .ripple-ring { animation: ripple 1.6s ease-out infinite; }

        .section-enter { opacity: 0; transform: translateY(26px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .section-enter.visible { opacity: 1; transform: translateY(0); }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        .card-action { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-action:hover { transform: translateY(-5px); box-shadow: 0 16px 32px rgba(0,0,0,0.28); }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(34px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-up { animation: slideUp 0.65s ease forwards; }

        /* Brillo de promo activa */
        @keyframes promoBrillo {
          0%,100% { box-shadow: 0 0 0 0 transparent; }
          50%     { box-shadow: 0 0 0 4px ${t.accent}55; }
        }
        .promo-hoy { animation: promoBrillo 2s ease-in-out infinite; }

        /* Modal de promo */
        .modal-backdrop {
          animation: fadeInBg 0.2s ease forwards;
        }
        @keyframes fadeInBg {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .modal-card {
          animation: scaleInCard 0.25s cubic-bezier(0.34,1.4,0.64,1) forwards;
        }
        @keyframes scaleInCard {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }

        .noise::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; opacity: 0.04;
        }
      `}</style>

      {/* Overlay transición */}
      <div className="theme-overlay fixed inset-0 z-[100]" style={{ background: t.primary }} />

      {/* ── MODAL DE PROMO ───────────────────────────────────────────────── */}
      {promoActiva && (
        <div
          className="modal-backdrop fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
          onClick={() => setPromoActiva(null)}
        >
          <div
            className="modal-card w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: t.cardBg }}
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-56">
              <img src={promoActiva.src} alt={promoActiva.titulo} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 50%)" }} />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black text-white" style={{ background: promoActiva.badgeColor }}>
                {promoActiva.badge}
              </div>
              <button
                onClick={() => setPromoActiva(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >✕</button>
            </div>
            <div className="p-5">
              <h3 className="hero-title text-3xl mb-1" style={{ color: t.text }}>{promoActiva.titulo}</h3>
              <p className="text-sm mb-2 opacity-60" style={{ color: t.text }}>{promoActiva.subtitulo}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="hero-title text-4xl" style={{ color: t.primary }}>{promoActiva.precio}</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `${t.primary}22`, color: t.primary }}>
                  {promoActiva.diasLabel}
                </span>
              </div>
              <a
                href={MAPS_LINK}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-black text-base text-white"
                style={{ background: `linear-gradient(135deg,${t.primary},${t.primaryDark})` }}
              >
                📍 ¡Ver cómo llegar!
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── BOLITA SWITCH DE NEGOCIO ────────────────────────────────────── */}
      {mounted && (
        <button
          onClick={switchTheme}
          aria-label={`Cambiar a ${theme === "burguan" ? "Frozenshots Don Juan" : "Burguan"}`}
          className="fixed z-50 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-transform duration-200 active:scale-90 hover:scale-110"
          style={{
            right: theme === "burguan" ? "0" : undefined,
            left:  theme === "granizados" ? "0" : undefined,
            background: t.switchBg,
            border: `2px solid ${t.switchBorder}`,
            borderRadius: theme === "burguan" ? "9999px 0 0 9999px" : "0 9999px 9999px 0",
          }}
          title={theme === "burguan" ? "¡Ver Frozenshots Don Juan!" : "¡Ver Burguan!"}
        >
          {t.switchEmoji}
        </button>
      )}

      <div className={`min-h-screen flex flex-col hero-bg noise relative overflow-hidden transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>

        {/* Partículas */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {t.particles.map((emoji, i) => (
            <FloatingParticle key={i} emoji={emoji} style={{
              top: `${10+(i*17)%80}%`, left: `${5+(i*23)%88}%`,
              animationDelay: `${i*0.8}s`, animationDuration: `${5+i*0.6}s`,
              fontSize: `${1.4+(i%3)*0.5}rem`,
            }}/>
          ))}
        </div>

        <main className="flex-1 relative z-10">

          {/* ── HERO ──────────────────────────────────────────────────────── */}
          <section className="pt-12 pb-8 px-5 text-center">
            <div
              className="mx-auto w-36 h-36 sm:w-44 sm:h-44 mb-5 rounded-full overflow-hidden glow-pulse relative"
              style={{ border: `3px solid ${t.accent}` }}
            >
              <div className="logo-spin w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
                <Image
                  src={t.logo} alt={`Logo ${t.name}`}
                  fill className="object-cover"
                  style={{ backfaceVisibility: "hidden" }}
                  sizes="176px" priority
                />
              </div>
            </div>

            <h1 className="hero-title text-5xl sm:text-6xl text-white mb-1 slide-up px-8 leading-tight"
              style={{ textShadow: `0 0 28px ${t.heroGlow}55` }}>
              {t.name}
            </h1>

            <div className="accent-line w-28 h-0.5 mx-auto my-3 rounded-full" />

            <p className="tagline text-2xl sm:text-3xl mb-3" style={{ color: t.accentLight }}>
              {t.tagline}
            </p>

            {/* Badge horario */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold"
              style={{
                background: horarioStatus.abierto ? `${t.accent}22` : "#ffffff12",
                border: `1px solid ${horarioStatus.abierto ? t.accent + "55" : "#ffffff30"}`,
                color: horarioStatus.abierto ? t.accentLight : "#ffaaaa",
              }}
            >
              <span className="w-2 h-2 rounded-full shrink-0"
                style={{ background: horarioStatus.abierto ? t.accent : "#ff6666",
                  animation: horarioStatus.abierto ? "ping 1s cubic-bezier(0,0,0.2,1) infinite" : "none" }}
              />
              {horarioStatus.texto || "Cargando horario..."}
            </div>
          </section>

          {/* ── CTA PRINCIPAL ─────────────────────────────────────────────── */}
          <section id="cta" data-observe className={`px-5 mb-8 section-enter ${vis("cta") ? "visible" : ""}`}>
            <div className="flex flex-col gap-3 max-w-md mx-auto">

              {isBurguan ? (
                <>
                  {/* Burguan: WA arriba ancho completo, luego grid de 3 */}
                  <a href={t.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="relative group flex items-center justify-between gap-3 py-5 px-6 rounded-2xl font-black text-xl text-white shadow-2xl overflow-hidden btn-wa">
                    <span className="absolute inset-0 rounded-2xl ripple-ring opacity-25" style={{ background: "#25D366" }} />
                    <div className="relative z-10 flex items-center gap-3">
                      <svg className="w-8 h-8 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d={WaPath}/></svg>
                      <span className="flex flex-col text-left leading-tight">
                        <span className="text-[11px] font-semibold opacity-75 uppercase tracking-widest">Domicilios</span>
                        <span>¡Pedir por WhatsApp!</span>
                      </span>
                    </div>
                    <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>
                  <div className="grid grid-cols-3 gap-3">
                    <a href={MENU_LINK} target="_blank" rel="noopener noreferrer"
                      className="card-action flex flex-col items-center justify-center gap-1.5 py-4 px-2 rounded-2xl font-bold text-white shadow-lg text-center"
                      style={{ background: `linear-gradient(145deg,${t.primary},${t.primaryDark})`, border: `1.5px solid ${t.accent}44` }}>
                      <span className="text-2xl">📋</span>
                      <span className="text-[10px] opacity-70 uppercase tracking-widest leading-none">Ver todo</span>
                      <span className="font-black text-sm leading-none">Menú</span>
                    </a>
                    <a href={t.instagram} target="_blank" rel="noopener noreferrer"
                      className="card-action flex flex-col items-center justify-center gap-1.5 py-4 px-2 rounded-2xl font-bold text-white shadow-lg text-center"
                      style={{ background: "linear-gradient(145deg,#833ab4,#fd1d1d,#fcb045)", border: "1.5px solid #fd1d1d44" }}>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d={IgPath}/></svg>
                      <span className="text-[10px] opacity-70 uppercase tracking-widest leading-none">Síguenos</span>
                      <span className="font-black text-sm leading-none">Instagram</span>
                    </a>
                    <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
                      className="card-action flex flex-col items-center justify-center gap-1.5 py-4 px-2 rounded-2xl font-bold text-white shadow-lg text-center"
                      style={{ background: "linear-gradient(145deg,#1a1a2e,#16213e)", border: "1.5px solid #ffffff20" }}>
                      <span className="text-2xl">📍</span>
                      <span className="text-[10px] opacity-70 uppercase tracking-widest leading-none">Ir al local</span>
                      <span className="font-black text-sm leading-none">Ubicación</span>
                    </a>
                  </div>
                </>
              ) : (
                <>
                  {/* Frozenshots: ig y ubicacion arriba, WA más pequeño abajo */}
                  <div className="grid grid-cols-2 gap-3">
                    <a href={t.instagram} target="_blank" rel="noopener noreferrer"
                      className="card-action flex flex-col items-center justify-center gap-1.5 py-5 px-2 rounded-2xl font-bold text-white shadow-lg text-center"
                      style={{ background: "linear-gradient(145deg,#833ab4,#fd1d1d,#fcb045)", border: "1.5px solid #fd1d1d44" }}>
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d={IgPath}/></svg>
                      <span className="text-[10px] opacity-70 uppercase tracking-widest leading-none">Síguenos</span>
                      <span className="font-black text-base leading-none">Instagram</span>
                    </a>
                    <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
                      className="card-action flex flex-col items-center justify-center gap-1.5 py-5 px-2 rounded-2xl font-bold text-white shadow-lg text-center"
                      style={{ background: "linear-gradient(145deg,#1a1a2e,#16213e)", border: "1.5px solid #ffffff20" }}>
                      <span className="text-3xl">📍</span>
                      <span className="text-[10px] opacity-70 uppercase tracking-widest leading-none">Ir al local</span>
                      <span className="font-black text-base leading-none">Ubicación</span>
                    </a>
                  </div>
                  {/* WA más pequeño abajo */}
                  <a href={t.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="relative group flex items-center justify-between gap-3 py-3.5 px-5 rounded-2xl font-black text-base text-white shadow-xl overflow-hidden btn-wa">
                    <span className="absolute inset-0 rounded-2xl ripple-ring opacity-20" style={{ background: "#25D366" }} />
                    <div className="relative z-10 flex items-center gap-2.5">
                      <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d={WaPath}/></svg>
                      <span className="flex flex-col text-left leading-tight">
                        <span className="text-[10px] font-semibold opacity-75 uppercase tracking-widest">Domicilios disponibles</span>
                        <span>Pedir por WhatsApp</span>
                      </span>
                    </div>
                    <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>
                </>
              )}

            </div>
          </section>

          {/* ── CARRUSEL BURGUAN (productos) ──────────────────────────────── */}
          {isBurguan && (
            <section id="menu" data-observe className={`mb-10 section-enter ${vis("menu") ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <div className="px-5 mb-5 text-center">
                <h2 className="hero-title text-4xl text-white mb-1">NUESTRA CARTA</h2>
                <div className="accent-line w-20 h-0.5 mx-auto rounded-full" />
              </div>
              <div
                ref={carruselRef}
                className="flex gap-5 overflow-x-auto pb-4 px-10 scrollbar-hide"
                style={{ scrollBehavior: "smooth" }}
                onMouseEnter={pauseCarrusel} onMouseLeave={resumeCarrusel}
                onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
              >
                {productosBurguan.map((p, i) => {
                  const isActive = i === activeCard;
                  return (
                    <article key={p.nombre} onClick={() => { setActiveCard(i); pauseCarrusel(); resumeCarrusel(); }}
                      className="flex-shrink-0 w-[72vw] max-w-[270px] rounded-2xl overflow-hidden cursor-pointer"
                      style={{
                        background: t.cardBg,
                        transform: isActive ? "scale(1.05)" : "scale(0.94)",
                        opacity: isActive ? 1 : 0.58,
                        transition: "transform 0.6s ease, opacity 0.5s ease, box-shadow 0.5s ease",
                        boxShadow: isActive ? `0 18px 42px ${t.heroGlow}33, 0 6px 16px rgba(0,0,0,0.32)` : "0 4px 14px rgba(0,0,0,0.16)",
                      }}>
                      <div className="relative overflow-hidden" style={{ height: "192px" }}>
                        {p.tipo === "image" ? (
                          <img src={p.src} alt={p.alt ?? p.nombre} className="w-full h-full object-cover"
                            style={{ transform: isActive ? "scale(1.06)" : "scale(1)", transition: "transform 0.7s ease" }} loading="lazy" />
                        ) : (
                          <video src={p.src} poster={p.poster} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                        )}
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.42) 0%,transparent 55%)" }} />
                        {isActive && (
                          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-black text-white" style={{ background: t.primary }}>★ Popular</div>
                        )}
                      </div>
                      <div className="px-4 py-3">
                        <p className="font-extrabold text-sm leading-snug" style={{ color: t.text, wordBreak: "break-word" }}>{p.nombre}</p>
                        {p.desc && <p className="text-xs mt-0.5 opacity-55" style={{ color: t.text }}>{p.desc}</p>}
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="flex justify-center gap-2 mt-3">
                {productosBurguan.map((_, i) => (
                  <button key={i} onClick={() => setActiveCard(i)} className="rounded-full"
                    style={{ width: i === activeCard ? "24px" : "8px", height: "8px",
                      background: i === activeCard ? t.accent : `${t.accent}44`,
                      transition: "width 0.35s ease, background 0.35s ease" }} />
                ))}
              </div>
            </section>
          )}

          {/* ── PROMOS FROZENSHOTS ────────────────────────────────────────── */}
          {!isBurguan && (
            <section id="promos" data-observe className={`mb-10 section-enter ${vis("promos") ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <div className="px-5 mb-2 text-center">
                <h2 className="hero-title text-4xl text-white mb-1">NUESTRAS PROMOS</h2>
                <div className="accent-line w-24 h-0.5 mx-auto rounded-full mb-2" />
                <p className="text-sm" style={{ color: `${t.accentLight}99` }}>Toca una promo para ver los detalles</p>
              </div>

              {/* Carrusel de promos */}
              <div
                ref={carruselRef}
                className="flex gap-5 overflow-x-auto pb-4 px-10 scrollbar-hide"
                style={{ scrollBehavior: "smooth" }}
                onMouseEnter={pauseCarrusel} onMouseLeave={resumeCarrusel}
                onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
              >
                {promosHoy.map((promo, i) => {
                  const isActive = i === activeCard;
                  const esHoy    = isPromoHoy(promo);
                  return (
                    <article
                      key={promo.id}
                      onClick={() => { setActiveCard(i); pauseCarrusel(); resumeCarrusel(); setTimeout(() => setPromoActiva(promo), 150); }}
                      className={`flex-shrink-0 w-[78vw] max-w-[290px] rounded-3xl overflow-hidden cursor-pointer ${esHoy ? "promo-hoy" : ""}`}
                      style={{
                        background: t.cardBg,
                        transform: isActive ? "scale(1.05)" : "scale(0.93)",
                        opacity: isActive ? 1 : esHoy ? 0.72 : 0.45,
                        transition: "transform 0.6s ease, opacity 0.5s ease, box-shadow 0.5s ease",
                        boxShadow: isActive
                          ? `0 20px 50px ${t.heroGlow}44, 0 8px 20px rgba(0,0,0,0.35)`
                          : "0 4px 14px rgba(0,0,0,0.16)",
                      }}
                    >
                      {/* Imagen */}
                      <div className="relative overflow-hidden" style={{ height: "200px" }}>
                        <img src={promo.src} alt={promo.titulo} className="w-full h-full object-cover"
                          style={{ transform: isActive ? "scale(1.07)" : "scale(1)", transition: "transform 0.7s ease" }}
                          loading="lazy" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.1) 55%)" }} />
                        {/* Badge día */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-black text-white"
                          style={{ background: promo.badgeColor }}>
                          {promo.badge}
                        </div>
                        {/* Badge "hoy" */}
                        {esHoy && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-black text-white"
                            style={{ background: "#00c853" }}>
                            ✓ Hoy
                          </div>
                        )}
                        {!esHoy && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-black"
                            style={{ background: "#ffffff22", color: "#ffffff99" }}>
                            No disponible hoy
                          </div>
                        )}
                        {/* Precio grande sobre la imagen */}
                        <div className="absolute bottom-3 left-3">
                          <p className="hero-title text-4xl text-white leading-none" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
                            {promo.precio}
                          </p>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="px-4 py-3">
                        <p className="font-extrabold text-sm leading-snug" style={{ color: t.text, wordBreak: "break-word" }}>{promo.titulo}</p>
                        <p className="text-xs mt-0.5 opacity-55 leading-snug" style={{ color: t.text }}>{promo.subtitulo}</p>
                        <div className="mt-2 flex items-center gap-1.5">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${t.primary}22`, color: t.primary }}>
                            {promo.diasLabel}
                          </span>
                          {isActive && <span className="text-xs font-bold" style={{ color: t.primary }}>→ Toca para ver</span>}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-3">
                {promosHoy.map((_, i) => (
                  <button key={i} onClick={() => setActiveCard(i)} className="rounded-full"
                    style={{ width: i === activeCard ? "24px" : "8px", height: "8px",
                      background: i === activeCard ? t.accent : `${t.accent}44`,
                      transition: "width 0.35s ease, background 0.35s ease" }} />
                ))}
              </div>

              {/* Leyenda de promos del día */}
              <div className="px-5 mt-4 max-w-md mx-auto">
                <p className="text-center text-xs font-bold mb-2" style={{ color: `${t.accentLight}88` }}>
                  DISPONIBILIDAD DE PROMOS
                </p>
                <div className="flex flex-col gap-1.5">
                  {promos.map(promo => {
                    const hoy = isPromoHoy(promo);
                    return (
                      <div key={promo.id} className="flex items-center justify-between px-3 py-2 rounded-xl"
                        style={{ background: hoy ? `${t.accent}15` : "#ffffff08", border: `1px solid ${hoy ? t.accent + "33" : "#ffffff12"}` }}>
                        <span className="text-sm font-bold" style={{ color: hoy ? t.accentLight : `${t.accentLight}55` }}>{promo.titulo}</span>
                        <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: hoy ? "#00c85333" : "#ffffff15", color: hoy ? "#00c853" : `${t.accentLight}55` }}>
                          {hoy ? "✓ Hoy" : promo.diasLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ── RESEÑAS ───────────────────────────────────────────────────── */}
          <section id="resenas" data-observe className={`px-5 mb-10 section-enter ${vis("resenas") ? "visible" : ""}`} style={{ transitionDelay: "0.12s" }}>
            <div className="text-center mb-5">
              <h2 className="hero-title text-4xl text-white mb-1">LO QUE DICEN</h2>
              <div className="accent-line w-20 h-0.5 mx-auto rounded-full" />
            </div>
            <div className="flex flex-col gap-3 max-w-md mx-auto">
              {resenas.map((r, i) => (
                <div key={i} className="p-4 rounded-2xl shadow-lg" style={{ background: "#ffffff0d", border: `1px solid ${t.accent}2e` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0"
                      style={{ background: `linear-gradient(135deg,${t.primary},${t.accent})` }}>
                      {r.nombre[0]}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{r.nombre}</p>
                      <Stars n={r.estrellas} />
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: t.accentLight }}>{r.texto}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA URGENCIA ──────────────────────────────────────────────── */}
          <section id="urgencia" data-observe className={`px-5 mb-10 section-enter ${vis("urgencia") ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <div className="rounded-2xl p-6 text-center shadow-2xl max-w-md mx-auto"
              style={{ background: `linear-gradient(135deg,${t.primary},${t.primaryDark})`, border: `2px solid ${t.accent}44` }}>
              <p className="text-4xl mb-2">{t.hasDelivery ? "🔥" : "🧊"}</p>
              <h3 className="hero-title text-3xl text-white mb-2">{t.hasDelivery ? "¿TIENES HAMBRE?" : "¿TIENES CALOR?"}</h3>
              <p className="text-sm mb-4" style={{ color: t.accentLight }}>
                {isBurguan ? "Haz tu pedido ahora y en 30 minutos tienes tu comida en casa" : "Pide tu granizado a domicilio o ven a visitarnos en Sincelejo"}
              </p>
              <a href={t.whatsapp} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm text-white shadow-lg"
                style={{ background: "#25D366" }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={WaPath}/></svg>
                {isBurguan ? "Pedir ahora" : "¡Pedir a domicilio!"}
              </a>
            </div>
          </section>

          {/* ── UBICACIÓN ─────────────────────────────────────────────────── */}
          <section id="ubicacion" data-observe className={`px-5 mb-10 section-enter ${vis("ubicacion") ? "visible" : ""}`} style={{ transitionDelay: "0.12s" }}>
            <div className="text-center mb-5">
              <h2 className="hero-title text-4xl text-white mb-1">ENCUÉNTRANOS</h2>
              <div className="accent-line w-20 h-0.5 mx-auto rounded-full" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto" style={{ border: `2px solid ${t.accent}2e` }}>
              <div className="h-52">
                <iframe title="Ubicación en Google Maps" src={MAPS_EMBED_LINK}
                  className="w-full h-full border-0" loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              </div>
              <div className="p-4 text-center" style={{ background: "#ffffff0d" }}>
                <p className="text-sm text-white/60 mb-3">📍 Sincelejo, Sucre · Horario: 5 pm – 11 pm</p>
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-md"
                  style={{ background: `linear-gradient(135deg,${t.primary},${t.primaryDark})` }}>
                  📍 Cómo llegar
                </a>
              </div>
            </div>
          </section>

          {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
          <section className="px-5 mb-6">
            <a href={t.whatsapp} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full max-w-md mx-auto py-5 rounded-2xl font-black text-xl text-white shadow-2xl btn-wa">
              <svg className="w-7 h-7 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d={WaPath}/></svg>
              {isBurguan ? "¡Hacer mi pedido ahora!" : "¡Pedir granizados a domicilio!"}
            </a>
          </section>

        </main>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer className="py-8 px-5 mt-auto" style={{ background: "#00000030", borderTop: `1px solid ${t.accent}1e` }}>
          <div className="text-center max-w-md mx-auto">
            <p className="hero-title text-2xl text-white mb-1">{t.name}</p>
            <p className="text-sm mb-4" style={{ color: `${t.accentLight}88` }}>Horario: 5 pm – 11 pm · Sincelejo, Sucre</p>
            <div className="flex justify-center gap-3 mb-4">
              <a href={t.whatsapp} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                style={{ background: "#25D366" }}>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d={WaPath}/></svg>
              </a>
              <a href={t.instagram} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d={IgPath}/></svg>
              </a>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md text-lg"
                style={{ background: `linear-gradient(135deg,${t.primary},${t.primaryDark})` }}>
                📍
              </a>
            </div>
            <p className="text-xs" style={{ color: `${t.accentLight}44` }}>© 2026 {t.name}. Todos los derechos reservados.</p>
          </div>
        </footer>

        {/* ── BOTÓN FLOTANTE ──────────────────────────────────────────────── */}
        <a href={t.whatsapp} target="_blank" rel="noopener noreferrer"
          className="fixed bottom-6 right-5 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-40"
          style={{ background: "#25D366" }}>
          <span className="absolute inset-0 rounded-full ripple-ring" style={{ background: "#25D36655" }} />
          <svg className="w-8 h-8 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d={WaPath}/></svg>
        </a>

      </div>
    </>
  );
}
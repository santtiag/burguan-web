"use client";

import { useEffect, useRef, useState } from "react";
import { Dancing_Script } from "next/font/google";
import { Comfortaa } from "next/font/google";
import Image from "next/image";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=3042108540&text&type=phone_number&app_absent=0";
const INSTAGRAM_LINK = "https://www.instagram.com/burguan_co/";
const MENU_LINK = "https://drive.google.com/file/d/1DBDDXr8A9OsxW-Xa5bC4i4ifsBSbckaB/view?usp=drive_link";
const MAPS_LINK = "https://maps.app.goo.gl/C8JsKQmnqZihfLJi6";
const MAPS_EMBED_LINK = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3937.4126638751495!2d-75.404945!3d9.296654000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMTcnNDguMCJOIDc1wrAyNCcxNy44Ilc!5e0!3m2!1ses-419!2sco!4v1771857802211!5m2!1ses-419!2sco";

type ProductoCarrusel = {
  nombre: string;
  tipo: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
};

const productosCarrusel = [
  {
    nombre: "Dogs Burguan",
    tipo: "image",
    src: "/productos/hotdogs.jpeg",
    alt: "Dogs Burguan",
  },
  {
    nombre: "Burguers",
    tipo: "video",
    src: "/productos/Burguer3.mp4",
    poster: "/productos/burguers.jpg",
  },
  {
    nombre: "Salchipapas Burguan",
    tipo: "image",
    src: "/productos/salchipapa1.jpeg",
    alt: "Salchipapas Burguan",
  },
  {
    nombre: "Desgranados Burguan",
    tipo: "image",
    src: "/productos/foto1.jpeg",
    poster: "/productos/desgranados-burguan.jpg",
  },
  {
    nombre: "Asados Burguan",
    tipo: "video",
    src: "/productos/Asados.mp4",
    poster: "/productos/asados-burguan.jpg",
  },
] satisfies ProductoCarrusel[];
const productosCarruselLoop = [...productosCarrusel, ...productosCarrusel];

function WaveTitle({ text }: { text: string }) {
  return (
    <span aria-label={text} role="text" className="inline-block">
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className={`wave-letter${char === " " ? " px-1" : ""}`}
          style={{ animationDelay: `${index * 0.08}s` }}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const carruselRef = useRef<HTMLDivElement | null>(null);
  const [activeCard, setActiveCard] = useState(0);
  const isPausedRef = useRef(false);
  const resumeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const carrusel = carruselRef.current;
    if (!carrusel) return;
    const firstCard = carrusel.querySelector("article");
    if (!firstCard) return;

    const cardWidth = (firstCard as HTMLElement).offsetWidth;
    const gap = parseFloat(window.getComputedStyle(carrusel).columnGap || "16");
    const step = cardWidth + gap;

    let currentIndex = 0;
    const timer = window.setInterval(() => {
      if (isPausedRef.current) return;

      currentIndex += 1;
      setActiveCard(currentIndex);

      carrusel.scrollBy({ left: step, behavior: "smooth" });

      const loopPoint = carrusel.scrollWidth / 2;
      if (carrusel.scrollLeft + step >= loopPoint) {
        window.setTimeout(() => {
          carrusel.scrollLeft = carrusel.scrollLeft - loopPoint;
          currentIndex = currentIndex % productosCarrusel.length;
          setActiveCard(currentIndex);
        }, 700);
      }
    }, 2000);

    return () => {
      window.clearInterval(timer);
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const pauseAutoplay = () => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const resumeAutoplayWithDelay = () => {
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => {
      isPausedRef.current = false;
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 text-center">
          {/* Logo/Icon */}
          <div className="logo-rotate logo-coin mx-auto w-40 h-40 sm:w-44 sm:h-44 mb-6 rounded-full overflow-hidden shadow-lg ring-2 ring-[#caa056]/40 relative">
            <Image
              src="/logoburguan.jpeg"
              alt="Logo Burguan"
              fill
              className="logo-face logo-front object-cover"
              sizes="176px"
              priority
            />
            <Image
              src="/logoburguan.jpeg"
              alt=""
              aria-hidden="true"
              fill
              className="logo-face logo-back object-cover"
              sizes="176px"
            />
          </div>

          {/* Nombre */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
            BURGUAN
          </h1>

          {/* Línea decorativa */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#caa056] via-[#832324] to-[#caa056] mx-auto mb-4 rounded-full"></div>

          <p className={`${dancingScript.className} text-3xl text-[#f9eaea] max-w-xs mx-auto leading-tight`}>
            El placer de comer calle con estilo
          </p>
      </section>

      {/* Botones de Acción */}
      <section className="px-6 mb-10">
        <div className="flex flex-col gap-4">
          {/* WhatsApp - Principal */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 bg-[#832324] text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-[#6b1d1d] transition-all duration-300 transform hover:scale-[1.02] animate-pulse"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Pedir ahora
          </a>

          {/* Grid de botones secundarios */}
          <div className="grid grid-cols-2 gap-4">
            {/* Menú */}
            <a
              href={MENU_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white border-2 border-[#caa056] text-[#131514] py-3 px-4 rounded-xl font-medium shadow-md hover:shadow-lg hover:border-[#832324] hover:text-[#832324] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Ver Menú
            </a>

            {/* Instagram */}
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white py-3 px-4 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </section>

      <div className={comfortaa.className}>
      {/* Carrusel de Productos */}
      <section className="mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-wide text-center text-white mb-6">
          <WaveTitle text="Nuestra Carta" />
        </h2>
        <div
          ref={carruselRef}
          className="flex gap-4 overflow-x-auto pb-4 px-6 snap-x snap-mandatory scrollbar-hide"
          onTouchStart={pauseAutoplay}
          onTouchEnd={resumeAutoplayWithDelay}
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplayWithDelay}
          onPointerDown={pauseAutoplay}
          onPointerUp={resumeAutoplayWithDelay}
        >
          {productosCarruselLoop.map((producto, index) => (
            <article
              key={`${producto.nombre}-${index}`}
              className={`flex-shrink-0 w-[78vw] max-w-sm sm:w-72 rounded-2xl overflow-hidden shadow-lg snap-center bg-white transition-transform duration-500 ${
                index === activeCard || index === activeCard + productosCarrusel.length ? "scale-105" : "scale-100"
              }`}
            >
              <div className="h-48 bg-[#efeeea]">
                {producto.tipo === "image" ? (
                  <img
                    src={producto.src}
                    alt={producto.alt ?? producto.nombre}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={producto.src}
                    poster={producto.poster}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    controls={false}
                    disablePictureInPicture
                  />
                )}
              </div>
              <div className="px-4 py-3">
                <p className="font-semibold text-[#131514]">{producto.nombre}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Ubicación */}
      <section className="px-6 mb-10">
        <h2 className="text-3xl font-extrabold tracking-wide text-center text-white mb-6">
          Encuéntranos
        </h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-56">
            <iframe
              title="Ubicación Burguan en Google Maps"
              src={MAPS_EMBED_LINK}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="p-4 text-center">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#832324] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#6b1d1d] transition-colors"
            >
              Ver ubicación en Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Sección de preguntas frecuentes desactivada */}
      {/* Sección de métodos de pago desactivada */}
      </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#131514] text-white py-8 px-6 mt-auto">
        <div className="text-center">
          <div className="flex justify-center gap-4 mb-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[#832324] rounded-full flex items-center justify-center hover:bg-[#6b1d1d] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
          <p className="text-sm text-gray-300">© 2026 BURGUAN. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

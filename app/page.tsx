"use client";

import { useState } from "react";

const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=3042108540&text&type=phone_number&app_absent=0";
const INSTAGRAM_LINK = "https://www.instagram.com/burguan_co/";
const MENU_LINK = "https://drive.google.com/file/d/1DBDDXr8A9OsxW-Xa5bC4i4ifsBSbckaB/view?usp=drive_link";
const MAPS_LINK = "https://maps.google.com/maps?q=Tu+Direccion+Aqu%C3%AD";

const faqs = [
  {
    pregunta: "¿Hacen delivery?",
    respuesta: "Sí, hacemos delivery a toda la ciudad. ¡Ordena por WhatsApp y te lo llevamos a casa!"
  },
  {
    pregunta: "¿Cuáles son los métodos de pago?",
    respuesta: "Aceptamos Nequi, Bancolombia y pagos en efectivo contra entrega."
  },
  {
    pregunta: "¿Tienen promociones?",
    respuesta: "Sí, síguenos en Instagram para ver nuestras promociones semanales."
  },
  {
    pregunta: "¿Puedo hacer pedidos personalizados?",
    respuesta: "¡Claro! Por WhatsApp puedes pedir tu hamburguesa con los ingredientes que prefieras."
  }
];

const horarios = [
  { dia: "Lunes - Jueves", hora: "12:00 PM - 10:00 PM" },
  { dia: "Viernes - Sábado", hora: "12:00 PM - 11:00 PM" },
  { dia: "Domingo", hora: "12:00 PM - 9:00 PM" }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative py-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffdfe] to-[#f6f5f3]"></div>
        <div className="relative z-10">
          {/* Logo/Icon */}
          <div className="mx-auto w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-[#caa056] to-[#832324] flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold text-white">B</span>
          </div>

          {/* Nombre */}
          <h1 className="text-5xl font-extrabold text-[#131514] mb-2 tracking-tight">
            BURGUAN
          </h1>

          {/* Línea decorativa */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#caa056] via-[#832324] to-[#caa056] mx-auto mb-4 rounded-full"></div>

          <p className="text-lg text-gray-600 max-w-xs mx-auto">
            Hamburguesas artesanales con sabor único
          </p>
        </div>
      </section>

      {/* Botones de Acción */}
      <section className="px-6 mb-10">
        <div className="flex flex-col gap-4">
          {/* WhatsApp - Principal */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 bg-[#832324] text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-[#6b1d1d] transition-all duration-300 transform hover:scale-[1.02]"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Ordenar por WhatsApp
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

      {/* Galería de Fotos - Carrusel Horizontal */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-center text-[#131514] mb-6">
          Nuestras Hamburguesas
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 px-6 snap-x snap-mandatory scrollbar-hide">
          {/* Foto 1 */}
          <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg snap-center relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#832324] to-[#caa056] flex items-center justify-center">
              <span className="text-white text-center px-4">
                <span className="text-5xl block mb-2">🍔</span>
                <span className="font-semibold">Clásica Burguan</span>
              </span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
          </div>

          {/* Foto 2 */}
          <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg snap-center relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#caa056] to-[#832324] flex items-center justify-center">
              <span className="text-white text-center px-4">
                <span className="text-5xl block mb-2">🧀</span>
                <span className="font-semibold">Cheese Bacon</span>
              </span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
          </div>

          {/* Foto 3 */}
          <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg snap-center relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#832324] to-[#131514] flex items-center justify-center">
              <span className="text-white text-center px-4">
                <span className="text-5xl block mb-2">🌶️</span>
                <span className="font-semibold">Spicy Jalapeño</span>
              </span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
          </div>

          {/* Foto 4 */}
          <div className="flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden shadow-lg snap-center relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#131514] to-[#caa056] flex items-center justify-center">
              <span className="text-white text-center px-4">
                <span className="text-5xl block mb-2">🥑</span>
                <span className="font-semibold">Premium Angus</span>
              </span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
          </div>
        </div>
      </section>

      {/* Horarios */}
      <section className="px-6 mb-10">
        <h2 className="text-2xl font-bold text-center text-[#131514] mb-6">
          Horarios de Atención
        </h2>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#832324]">
          <div className="space-y-4">
            {horarios.map((item, index) => (
              <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0">
                <span className="font-semibold text-[#131514]">{item.dia}</span>
                <span className="text-[#832324] font-medium">{item.hora}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Preguntas Frecuentes */}
      <section className="px-6 mb-10">
        <h2 className="text-2xl font-bold text-center text-[#131514] mb-6">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-medium text-[#131514] pr-4">{faq.pregunta}</span>
                <svg
                  className={`w-5 h-5 text-[#832324] flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40' : 'max-h-0'}`}
              >
                <p className="px-4 pb-4 text-gray-600 text-sm">{faq.respuesta}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ubicación */}
      <section className="px-6 mb-10">
        <h2 className="text-2xl font-bold text-center text-[#131514] mb-6">
          Encuéntranos
        </h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Mapa placeholder */}
          <div className="h-48 bg-gradient-to-br from-[#deddd9] to-[#efeeea] flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[#832324] opacity-10"></div>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 flex flex-col items-center gap-2 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-10 h-10 text-[#832324]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="font-medium text-[#131514] text-center">
                Ver en Google Maps
              </span>
            </a>
          </div>
          <div className="p-4 text-center">
            <p className="text-gray-600 text-sm">
              📍 <strong>Tu dirección aquí</strong><br/>
              <span className="text-sm">Ciudad, Colombia</span>
            </p>
          </div>
        </div>
      </section>

      {/* Métodos de Pago */}
      <section className="px-6 mb-10">
        <h2 className="text-2xl font-bold text-center text-[#131514] mb-6">
          Métodos de Pago
        </h2>
        <div className="flex justify-center gap-6">
          {/* Nequi */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-[#832324] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">N</span>
            </div>
            <span className="font-medium text-[#131514]">Nequi</span>
          </div>

          {/* Bancolombia */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-[#caa056] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl text-center">BC</span>
            </div>
            <span className="font-medium text-[#131514]">Bancolombia</span>
          </div>

          {/* Efectivo */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-[#131514] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">$</span>
            </div>
            <span className="font-medium text-[#131514]">Efectivo</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#131514] text-white py-8 px-6">
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
          <p className="text-sm text-gray-400 mb-2">© 2026 Burguan. Todos los derechos reservados.</p>
          <p className="text-xs text-gray-500">Hecho con ❤️ en Colombia</p>
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

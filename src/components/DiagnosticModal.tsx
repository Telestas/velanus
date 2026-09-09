import React, { useEffect, useRef, useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
  X,
} from 'lucide-react';
import { whatsappLink } from '../config';
import { guardarConsulta } from '../data/consultas';
import { Consentimiento } from './home/comunes';
import { mensajeDeError } from '../firebase';
import { useIdioma } from '../i18n/idioma';
import { textos } from '../i18n/textos';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CAMPO =
  'w-full bg-white border border-[#B9B7B2] px-3.5 py-3 text-base text-[#000000] placeholder-[#767676] transition-colors focus:border-[#000000]';

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({ isOpen, onClose }) => {
  const idioma = useIdioma();
  const t = textos(idioma).modal;
  const dialogo = useRef<HTMLDivElement>(null);
  const cerrarBoton = useRef<HTMLButtonElement>(null);
  const focoAnterior = useRef<HTMLElement | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [acepta, setAcepta] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    email: '',
    servicio: 'Contable y legal',
    mensaje: '',
  });

  const cerrar = () => {
    setSubmitted(false);
    setAcepta(false);
    setError('');
    onClose();
  };

  // Foco inicial, cierre con Escape, trampa de foco y restauración al botón
  // que abrió el diálogo.
  useEffect(() => {
    if (!isOpen) return;
    focoAnterior.current = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => cerrarBoton.current?.focus());

    const alTeclado = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        cerrar();
        return;
      }
      if (e.key !== 'Tab' || !dialogo.current) return;

      const elementos = Array.from(
        dialogo.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!elementos.length) return;
      const primero = elementos.at(0) as HTMLElement | undefined;
      const ultimo = elementos.at(-1) as HTMLElement | undefined;
      if (!primero || !ultimo) return;
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener('keydown', alTeclado);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', alTeclado);
      document.body.style.overflow = overflow;
      focoAnterior.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acepta) {
      setError(textos(idioma).formulario.consentimientoFalta);
      return;
    }

    setEnviando(true);
    setError('');
    try {
      await guardarConsulta({
        nombre: formData.nombre,
        empresa: formData.empresa,
        telefono: formData.telefono,
        correo: formData.email,
        servicio: formData.servicio,
        mensaje: formData.mensaje,
        origen: 'diagnostico',
      });
      setSubmitted(true);
    } catch (fallo) {
      setError(`${mensajeDeError(fallo)} Puede escribirnos por WhatsApp mientras lo arreglamos.`);
    } finally {
      setEnviando(false);
    }
  };

  const handleWhatsApp = () => {
    const empresa = formData.empresa ? ` para mi empresa ${formData.empresa}` : '';
    const text = `Hola Vela Nus, deseo agendar un diagnóstico gratuito${empresa}. Área de interés: ${formData.servicio}.`;
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) cerrar();
      }}
    >
      <div
        ref={dialogo}
        role="dialog"
        aria-modal="true"
        aria-labelledby="diagnostico-titulo"
        aria-describedby="diagnostico-descripcion"
        className="font-marca relative w-full max-w-2xl max-h-[calc(100vh-2rem)] overflow-y-auto bg-[#FAFAFA] border-t-4 border-[#F9A600] p-6 sm:p-9 shadow-2xl text-[#000000]"
        id="diagnostic-modal"
      >
        <button
          ref={cerrarBoton}
          onClick={cerrar}
          className="absolute top-4 right-4 p-2 text-[#4A4A4A] hover:text-[#000000] hover:bg-[#EFEFED] transition-colors"
          aria-label={t.cerrar}
          id="close-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-7 pr-10">
              <span className="text-xs uppercase tracking-[0.18em] text-[#8A5800] font-bold">
                {t.etiqueta}
              </span>
              <h2 id="diagnostico-titulo" className="text-[30px] leading-tight font-bold mt-2">
                {t.titulo}
              </h2>
              <p id="diagnostico-descripcion" className="text-base leading-relaxed text-[#4A4A4A] mt-3">
                {t.entradilla}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <CampoConIcono id="diagnostico-nombre" label={t.nombre} icono={<User />}>
                  <input id="diagnostico-nombre" type="text" required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder={t.nombrePlaceholder} className={`${CAMPO} pl-11`} />
                </CampoConIcono>
                <CampoConIcono id="diagnostico-empresa" label={t.empresa} icono={<Building2 />}>
                  <input id="diagnostico-empresa" type="text" required value={formData.empresa} onChange={(e) => setFormData({ ...formData, empresa: e.target.value })} placeholder={t.empresaPlaceholder} className={`${CAMPO} pl-11`} />
                </CampoConIcono>
                <CampoConIcono id="diagnostico-telefono" label={t.telefono} icono={<Phone />}>
                  <input id="diagnostico-telefono" type="tel" required value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} placeholder="+53 5..." className={`${CAMPO} pl-11`} />
                </CampoConIcono>
                <CampoConIcono id="diagnostico-correo" label={t.correo} icono={<Mail />}>
                  <input id="diagnostico-correo" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="contacto@empresa.cu" className={`${CAMPO} pl-11`} />
                </CampoConIcono>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="diagnostico-servicio" className="text-sm font-bold">{t.interes}</label>
                <select id="diagnostico-servicio" value={formData.servicio} onChange={(e) => setFormData({ ...formData, servicio: e.target.value })} className={CAMPO}>
                  {t.servicios.map((servicio) => (
                    <option key={servicio.valor} value={servicio.valor}>{servicio.etiqueta}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="diagnostico-comentarios" className="text-sm font-bold">{t.comentarios}</label>
                <textarea id="diagnostico-comentarios" rows={3} value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} placeholder={t.comentariosPlaceholder} className={CAMPO} />
              </div>

              <Consentimiento idioma={idioma} aceptado={acepta} onCambio={setAcepta} />

              {error && (
                <p role="alert" className="text-sm text-[#5C3B00] bg-[#F9A600]/15 border-l-4 border-[#F9A600] px-4 py-3">{error}</p>
              )}

              <div className="pt-1 flex flex-col sm:flex-row gap-3">
                <button type="submit" disabled={enviando} className="flex-1 bg-[#F9A600] text-[#000000] hover:bg-[#FFC048] disabled:opacity-60 disabled:cursor-not-allowed font-bold py-3.5 px-5 transition-colors flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> {enviando ? t.enviando : t.enviar}
                </button>
                <button type="button" onClick={handleWhatsApp} className="border border-[#000000] text-[#000000] hover:bg-[#EFEFED] font-bold py-3.5 px-5 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center flex flex-col items-center gap-4">
            <CheckCircle2 className="w-14 h-14 text-[#8A5800]" />
            <h2 id="diagnostico-titulo" className="text-[30px] font-bold">{t.recibidoTitulo}</h2>
            <p id="diagnostico-descripcion" className="text-base text-[#4A4A4A] max-w-md">{t.recibido(formData.nombre)}</p>
            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              <button onClick={handleWhatsApp} className="bg-[#F9A600] text-[#000000] hover:bg-[#FFC048] font-bold py-3 px-6 transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" /> {t.adelantar}
              </button>
              <button onClick={cerrar} className="border border-[#000000] hover:bg-[#EFEFED] font-bold py-3 px-6 transition-colors">{t.volver}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CampoConIcono: React.FC<{
  id: string;
  label: string;
  icono: React.ReactElement<{ className?: string; 'aria-hidden'?: boolean }>;
  children: React.ReactNode;
}> = ({ id, label, icono, children }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-bold">{label}</label>
    <div className="relative">
      {React.cloneElement(icono, {
        className: 'w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A5800]',
        'aria-hidden': true,
      })}
      {children}
    </div>
  </div>
);

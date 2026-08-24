import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, Send, Building2, User, Phone, Mail } from 'lucide-react';
import { whatsappLink } from '../config';
import { guardarConsulta } from '../data/consultas';
import { mensajeDeError } from '../firebase';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    email: '',
    servicio: 'Contable y legal',
    mensaje: ''
  });

  if (!isOpen) return null;

  /**
   * Guarda la consulta en Firestore.
   *
   * Antes esto solo cambiaba a estado «enviado» sin mandar nada a ninguna
   * parte: cada persona que rellenaba el formulario se perdía. Si el guardado
   * falla se dice y NO se muestra el acuse, para no dar por recibido un
   * mensaje que no llegó.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setError(
        `${mensajeDeError(fallo)} Puede escribirnos por WhatsApp mientras lo arreglamos.`,
      );
    } finally {
      setEnviando(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  const handleWhatsApp = () => {
    const empresa = formData.empresa ? ` para mi empresa ${formData.empresa}` : '';
    const text = `Hola Vela Nus, deseo agendar un diagnóstico gratuito${empresa}. Área de interés: ${formData.servicio}.`;
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div 
        className="relative w-full max-w-lg bg-[#121716] border border-[#BA8F31]/30 rounded-lg p-6 sm:p-8 shadow-2xl text-[#e3e3df]"
        id="diagnostic-modal"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#d6c4ad] hover:text-[#ffcd7f] transition-colors rounded-full hover:bg-[#1e201e]"
          aria-label="Cerrar modal"
          id="close-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#f3ac20] font-semibold">
                Asesoría Institucional
              </span>
              <h3 className="text-2xl font-serif text-[#ffcd7f] font-semibold mt-1">
                Agenda tu diagnóstico gratuito
              </h3>
              <p className="text-sm text-[#d6c4ad] mt-2">
                Analizamos la situación financiera, legal u operativa de su empresa en Cuba para estructurar un plan de acción a medida.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d6c4ad] mb-1 font-medium">
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#BA8F31]" />
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full bg-[#0a0c0a] border border-[#BA8F31]/30 rounded px-3 py-2.5 pl-10 text-sm text-[#e3e3df] placeholder-[#514534] focus:outline-none focus:border-[#f3ac20]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d6c4ad] mb-1 font-medium">
                  Empresa o Proyecto
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#BA8F31]" />
                  <input
                    type="text"
                    required
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    placeholder="Ej. Restaurante Habana Sol Mypime"
                    className="w-full bg-[#0a0c0a] border border-[#BA8F31]/30 rounded px-3 py-2.5 pl-10 text-sm text-[#e3e3df] placeholder-[#514534] focus:outline-none focus:border-[#f3ac20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d6c4ad] mb-1 font-medium">
                    Teléfono / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#BA8F31]" />
                    <input
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="+53 5..."
                      className="w-full bg-[#0a0c0a] border border-[#BA8F31]/30 rounded px-3 py-2.5 pl-10 text-sm text-[#e3e3df] placeholder-[#514534] focus:outline-none focus:border-[#f3ac20]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d6c4ad] mb-1 font-medium">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#BA8F31]" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contacto@empresa.cu"
                      className="w-full bg-[#0a0c0a] border border-[#BA8F31]/30 rounded px-3 py-2.5 pl-10 text-sm text-[#e3e3df] placeholder-[#514534] focus:outline-none focus:border-[#f3ac20]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d6c4ad] mb-1 font-medium">
                  Área de Interés Principal
                </label>
                <select
                  value={formData.servicio}
                  onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                  className="w-full bg-[#0a0c0a] border border-[#BA8F31]/30 rounded px-3 py-2.5 text-sm text-[#e3e3df] focus:outline-none focus:border-[#f3ac20]"
                >
                  <option value="Contabilidad">Contabilidad y teneduría de libros</option>
                  <option value="Legal corporativo">Asesoría legal corporativa (MIPYME, TCP, CNA, PDL)</option>
                  <option value="Trámites y visas">Trámites, documentos y visas</option>
                  <option value="Eventos">Eventos y capacitación</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d6c4ad] mb-1 font-medium">
                  Comentarios adicionales
                </label>
                <textarea
                  rows={3}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  placeholder="Detalle brevemente las necesidades de su empresa..."
                  className="w-full bg-[#0a0c0a] border border-[#BA8F31]/30 rounded px-3 py-2 text-sm text-[#e3e3df] placeholder-[#514534] focus:outline-none focus:border-[#f3ac20]"
                />
              </div>

              {error && (
                <p className="text-sm text-[#ffcd7f] border-l-2 border-[#f3ac20] pl-3 py-1">
                  {error}
                </p>
              )}

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={enviando}
                  className="flex-1 bg-[#f3ac20] text-[#412402] hover:bg-[#ffdeae] disabled:opacity-60 disabled:cursor-not-allowed font-semibold py-3 px-4 rounded transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {enviando ? 'Enviando…' : 'Solicitar Diagnóstico'}
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="bg-[#1a1c1a] border border-[#BA8F31] text-[#ffcd7f] hover:bg-[#292a28] font-semibold py-3 px-4 rounded transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#f3ac20]/10 border border-[#f3ac20] rounded-full flex items-center justify-center mx-auto text-[#f3ac20]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif text-[#ffcd7f]">¡Solicitud Recibida!</h3>
            <p className="text-sm text-[#d6c4ad] max-w-sm mx-auto">
              Gracias, <span className="text-[#ffcd7f] font-semibold">{formData.nombre}</span>. Un especialista institucional de <span className="font-serif">Vela Nus</span> se pondrá en contacto con usted en breve.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              {/* La consulta ya está guardada; WhatsApp solo acelera la respuesta. */}
              <button
                onClick={handleWhatsApp}
                className="bg-[#f3ac20] text-[#412402] hover:bg-[#ffdeae] font-semibold py-2.5 px-6 rounded transition-colors text-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Adelantar por WhatsApp
              </button>
              <button
                onClick={handleReset}
                className="bg-[#1a1c1a] border border-[#BA8F31] text-[#ffcd7f] hover:bg-[#292a28] font-semibold py-2.5 px-6 rounded transition-colors text-sm"
              >
                Volver al sitio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

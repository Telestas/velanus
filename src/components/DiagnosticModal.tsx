import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, Send, Building2, User, Phone, Mail } from 'lucide-react';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    email: '',
    servicio: 'Contable y legal',
    mensaje: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hola Vela Nus, deseo agendar un diagnóstico gratuito para mi empresa ${formData.empresa || ''}.`);
    window.open(`https://wa.me/5350000000?text=${text}`, '_blank');
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
                  <option value="Contable y legal">Contable y legal (Auditoría, Mypimes, Impuestos)</option>
                  <option value="Impresión">Impresión Corporativa (Identidad visual, papelería)</option>
                  <option value="Eventos">Eventos Empresariales (Cumbres, Juntas)</option>
                  <option value="Trámites">Trámites Oficiales (Licencias, Registros)</option>
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

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#f3ac20] text-[#412402] hover:bg-[#ffdeae] font-semibold py-3 px-4 rounded transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Solicitar Diagnóstico
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
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="bg-[#f3ac20] text-[#412402] hover:bg-[#ffdeae] font-semibold py-2.5 px-6 rounded transition-colors text-sm"
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

import React, { useState } from 'react';
import { mensajeDeError } from '../../firebase';

interface AccesoProps {
  entrar: (correo: string, contrasena: string) => Promise<void>;
  enviarRecuperacion: (correo: string) => Promise<void>;
}

/** Pantalla de acceso al panel: correo y contraseña contra Firebase Auth. */
export const Acceso: React.FC<AccesoProps> = ({ entrar, enviarRecuperacion }) => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [aviso, setAviso] = useState('');
  const [enviando, setEnviando] = useState(false);

  const campo =
    'border border-[#B9B7B2] bg-white text-[#000000] px-3.5 py-3.5 text-base outline-none focus:border-[#000000] transition-colors';

  const acceder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setAviso('');
    setEnviando(true);
    try {
      await entrar(correo, contrasena);
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    } finally {
      setEnviando(false);
    }
  };

  const recuperar = async () => {
    setError('');
    setAviso('');
    if (!correo.trim()) {
      setError('Escriba primero su correo.');
      return;
    }
    try {
      await enviarRecuperacion(correo);
      setAviso('Si esa cuenta existe, le llega un correo para cambiar la contraseña.');
    } catch (fallo) {
      setError(mensajeDeError(fallo));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#000000] font-marca flex items-center justify-center px-6 py-16">
      <form onSubmit={acceder} className="w-full max-w-[420px] flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="w-14 h-[3px] bg-[#F9A600]" />
          <h1 className="text-[32px] leading-tight font-bold">Panel de administración</h1>
          <p className="text-base leading-relaxed text-[#4A4A4A]">
            Acceso restringido. Esta pantalla no forma parte del sitio público.
          </p>
        </div>

        <div className="flex flex-col gap-[7px]">
          <label htmlFor="admin-correo" className="text-sm font-bold">
            Correo
          </label>
          <input
            id="admin-correo"
            type="email"
            autoComplete="username"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className={campo}
          />
        </div>

        <div className="flex flex-col gap-[7px]">
          <label htmlFor="admin-clave" className="text-sm font-bold">
            Contraseña
          </label>
          <input
            id="admin-clave"
            type="password"
            autoComplete="current-password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className={campo}
          />
        </div>

        {error && (
          <p className="text-[15px] text-[#8A5800] border-l-4 border-[#F9A600] pl-4 py-1">
            {error}
          </p>
        )}
        {aviso && <p className="text-[15px] text-[#4A4A4A]">{aviso}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="bg-[#000000] text-[#F9A600] py-4 text-[17px] font-bold disabled:opacity-50 hover:bg-[#333333] transition-colors"
        >
          {enviando ? 'Entrando…' : 'Entrar'}
        </button>

        <button
          type="button"
          onClick={recuperar}
          className="text-[15px] text-[#4A4A4A] hover:text-[#000000] self-start underline underline-offset-4"
        >
          He olvidado la contraseña
        </button>
      </form>
    </div>
  );
};

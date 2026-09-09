import assert from 'node:assert/strict';
import test from 'node:test';
import { VERSION_AVISO } from '../src/content/legal.ts';
import { prepararConsulta } from '../src/data/consultas.ts';

test('el formulario crea un documento aceptado por el contrato de Firestore', () => {
  const marca = Symbol('serverTimestamp');
  const datos = prepararConsulta(
    {
      nombre: '  Ana Pérez  ',
      empresa: '  Ejemplo SRL  ',
      telefono: '  +53 555 000  ',
      correo: '  ana@example.com  ',
      servicio: 'Contabilidad',
      pais: 'Cuba',
      mensaje: '  Necesito una consulta.  ',
      origen: 'contacto-home',
    },
    marca,
  );

  assert.deepEqual(datos, {
    nombre: 'Ana Pérez',
    empresa: 'Ejemplo SRL',
    telefono: '+53 555 000',
    correo: 'ana@example.com',
    servicio: 'Contabilidad',
    pais: 'Cuba',
    mensaje: 'Necesito una consulta.',
    origen: 'contacto-home',
    atendida: false,
    consentimiento: true,
    avisoVersion: VERSION_AVISO,
    creado: marca,
  });
});

test('omite campos vacíos y limita los textos opcionales', () => {
  const datos = prepararConsulta(
    {
      nombre: 'Mario',
      empresa: '   ',
      mensaje: `  ${'a'.repeat(2100)}  `,
      origen: 'diagnostico',
    },
    null,
  );

  assert.equal('empresa' in datos, false);
  assert.equal(String(datos.mensaje).length, 2000);
  assert.equal(datos.origen, 'diagnostico');
});

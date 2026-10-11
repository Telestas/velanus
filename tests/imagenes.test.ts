import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { idImagen } from '../src/data/imagenes.ts';
import { MarcoImagen } from '../src/components/blog/piezas.tsx';

test('reconoce solo referencias de imágenes guardadas', () => {
  assert.equal(idImagen('firestore:Abc12345678901234567'), 'Abc12345678901234567');
  assert.equal(idImagen('https://example.com/foto.jpg'), null);
  assert.equal(idImagen('firestore:../../otro'), null);
});

test('un artículo sin foto no reserva un marcador de imagen', () => {
  const html = renderToStaticMarkup(
    React.createElement(MarcoImagen, {
      src: '',
      alt: 'Artículo',
      proporcion: 'aspect-[16/9]',
    }),
  );
  assert.equal(html, '');
});

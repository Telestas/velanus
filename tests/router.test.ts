import assert from 'node:assert/strict';
import test from 'node:test';
import {
  articuloDeRuta,
  pathForScreen,
  screenForPath,
} from '../src/router.ts';

test('genera las rutas públicas principales', () => {
  assert.equal(pathForScreen('home-desktop'), '/');
  assert.equal(pathForScreen('servicios-desktop'), '/servicios');
  assert.equal(pathForScreen('blog-articulo', 'cambio-fiscal'), '/blog/cambio-fiscal');
});

test('resuelve artículos y conserva su slug', () => {
  assert.equal(screenForPath('/blog/cambio-fiscal'), 'blog-articulo');
  assert.equal(articuloDeRuta('/blog/cambio-fiscal'), 'cambio-fiscal');
});

test('una ruta retirada o desconocida muestra la pantalla 404', () => {
  assert.equal(screenForPath('/casos'), 'not-found');
  assert.equal(screenForPath('/no-existe'), 'not-found');
});

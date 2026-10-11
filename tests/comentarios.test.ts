import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('el índice público de comentarios cubre artículo, aprobación y fecha', () => {
  const archivo = JSON.parse(
    readFileSync(new URL('../firestore.indexes.json', import.meta.url), 'utf8'),
  ) as {
    indexes: {
      collectionGroup: string;
      fields: { fieldPath: string; order: string }[];
    }[];
  };

  assert.ok(archivo.indexes.some((indice) =>
    indice.collectionGroup === 'comentarios' &&
    indice.fields.map(({ fieldPath }) => fieldPath).join(',') === 'entrada,aprobado,creado' &&
    indice.fields[2].order === 'ASCENDING',
  ));
});

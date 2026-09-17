import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { terminalColors } from '../dist/terminal.js';

test('terminal export exactly matches canonical light/dark colors', () => {
  const pencil = JSON.parse(readFileSync(new URL('../dist/tokens.pencil.json', import.meta.url)));
  assert.deepEqual(terminalColors, { light: pencil.colorsLight, dark: pencil.colorsDark });
});
test('terminal package subpath imports through its public export', async () => {
  assert.deepEqual((await import('@aios-alpha/design/terminal')).terminalColors, terminalColors);
});

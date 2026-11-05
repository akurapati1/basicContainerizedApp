const test = require('node:test');
const assert = require('node:assert');
const createApp = require('./app');

test('GET / and /health respond', async (t) => {
  const server = createApp().listen(0);
  t.after(() => server.close());
  const base = `http://127.0.0.1:${server.address().port}`;

  const root = await fetch(base + '/');
  assert.strictEqual(root.status, 200);
  assert.match(await root.text(), /demo Docker/);

  const health = await fetch(base + '/health');
  assert.strictEqual(health.status, 200);
  assert.strictEqual((await health.json()).status, 'ok');
});

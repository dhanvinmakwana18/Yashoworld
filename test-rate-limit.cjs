const test = require('node:test');
const assert = require('node:assert');
const { spawn } = require('node:child_process');

test('Rate Limiting API tests', async (t) => {
  const serverProcess = spawn('node', ['--import', 'tsx', 'server.ts'], { env: { ...process.env, PORT: '3005', DEVELOPER_SECRET: 'test' }, stdio: 'pipe' });
  
  serverProcess.stdout.on('data', d => console.log(d.toString()));
  serverProcess.stderr.on('data', d => console.error(d.toString()));

  // Wait for server to be up
  let isUp = false;
  for(let i = 0; i < 20; i++) {
    try {
      const res = await fetch('http://localhost:3005/health');
      if (res.status === 200) { isUp = true; break; }
    } catch(e) {}
    await new Promise(r => setTimeout(r, 1000));
  }
  
  if (!isUp) {
    serverProcess.kill();
    throw new Error('Server failed to start');
  }

  await t.test('Health endpoint is not rate limited', async () => {
    let status200Count = 0;
    for (let i = 0; i < 210; i++) {
      const res = await fetch('http://localhost:3005/health');
      if (res.status === 200) status200Count++;
    }
    assert.strictEqual(status200Count, 210, 'Health endpoint should not be rate limited');
  });

  await t.test('Global limiter works for /api/products', async () => {
    let lastStatus = 200;
    for (let i = 0; i < 205; i++) {
      const res = await fetch('http://localhost:3005/api/products');
      lastStatus = res.status;
    }
    assert.strictEqual(lastStatus, 429, 'API should return 429 after 200 requests');
  });

  await t.test('Order limiter works for /api/orders', async () => {
    let lastStatus = 200;
    for (let i = 0; i < 15; i++) {
      const res = await fetch('http://localhost:3005/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
      lastStatus = res.status;
    }
    assert.strictEqual(lastStatus, 429, 'Orders API should return 429 after 10 requests');
  });

  serverProcess.kill('SIGTERM');
});

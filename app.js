const express = require('express');

function createApp() {
  const app = express();

  app.get('/', (req, res) => {
    res.send('This is a sample application to demo Docker');
  });

  // Liveness endpoint used by Docker HEALTHCHECK and orchestrators.
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  return app;
}

module.exports = createApp;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  createApp().listen(port, () => console.log(`Server started on port ${port}`));
}

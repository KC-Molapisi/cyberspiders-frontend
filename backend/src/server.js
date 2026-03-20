const env = require('./config/env');
const app = require('./app');

app.listen(env.PORT, () => {
  console.log(`✅  BOCRA API running on http://localhost:${env.PORT}/api`);
  console.log(`    Environment: ${env.NODE_ENV}`);
});

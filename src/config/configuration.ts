export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseUrl: process.env.DATABASE_URL,
  MAILER_HOST: process.env.MAILER_HOST,
  MAILER_PORT: process.env.MAILER_PORT,
  MAILER_USER: process.env.MAILER_USER,
  MAILER_PASS: process.env.MAILER_PASS,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
});

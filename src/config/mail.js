export default {
  host: process.env.MAIL_HOST,
  auth: {
    api_key: process.env.MAIL_KEY,
    domain: process.env.MAIL_DOMAIN
  },
  default: {
    to: 'claraeluizeduardo@gmail.com'
  }
};

export default {
  host: 'api.mailgun.net',
  service: 'gmail',
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    api_key: '7b3eb3b81d78368563300116e417ac50-ee13fadb-af2081f6',
    domain: 'email.camael.club'
  },
  default: {
    from: {
      name: 'Casamento Perfeito',
      address: 'noreply@claraeluizeduardo.com'
    },
    to: 'claraeluizeduardo@gamil.com'
  }
};

import nodemailer from 'nodemailer';

import { resolve } from 'path';
import mailgun from 'nodemailer-mailgun-transport';

import nodemailerhbs from 'nodemailer-express-handlebars';
import exphbs from 'express-handlebars';

import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, auth } = mailConfig;
    this.transporter = nodemailer.createTransport(
      mailgun({
        host,
        auth: auth.api_key ? auth : null
      })
    );

    // this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs'
        }),
        viewPath,
        extName: '.hbs'
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message
    });
  }
}

export default new Mail();

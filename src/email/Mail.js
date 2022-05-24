const nodemailer = require('nodemailer');

class Mail {
  constructor(user) {
    this.user = user;
  }

  async defineTransporterConfig() {
    if (process.env.NODE_ENV === 'production') {
      return {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_NAME,
          password: process.env.PASSWORD_NAME,
        },
        secure: true,
      };
    } else {
      const testAccount = await nodemailer.createTestAccount();

      return {
        host: 'smtp.ethereal.email',
        auth: testAccount,
      };
    }
  }

  async sendMail() {
    const transporterConfig = await this.defineTransporterConfig();

    const transporter = await nodemailer.createTransport(transporterConfig);

    const infos = await transporter.sendMail(this.emailConfig);

    if (process.env.NODE_ENV !== 'production') {
      console.log('URL: ' + nodemailer.getTestMessageUrl(infos));
    }
  }
}

class VerificationMail extends Mail {
  constructor(user, token) {
    super(user);
    this.verifyEmailAddress = this.defineVerifyEmailAddress(
        token,
        'users/verifyEmail',
    );

    this.emailConfig = {
      from: 'Auth-ORM <noreplyauthorm@auth.com.br>',
      to: this.user.email,
      subject: 'E-mail verification',
      text: `Hey! Please verify your e-mail here: ${this.verifyEmailAddress}`,
      html: `<h1>Hey!</h1> <p>Please verify your e-mail here:<a href="${this.verifyEmailAddress}">${this.verifyEmailAddress}</a></p>`,
    };
  }

  defineVerifyEmailAddress(token, route) {
    return `${process.env.BASE_URL}/${route}/${token}`;
  }
}

module.exports = {VerificationMail};

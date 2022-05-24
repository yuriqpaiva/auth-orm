const nodemailer = require('nodemailer');

const defineVerifyEmailAddress = (token, route) => {
  return `${process.env.BASE_URL}/${route}/${token}`;
};

const sendMail = async (user, token) => {
  const account = await nodemailer.createTestAccount();

  const transporter = await nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    auth: account,
  });

  const verifyEmailAddress = defineVerifyEmailAddress(
      token,
      'users/verifyEmail',
  );

  const infos = await transporter.sendMail({
    from: 'Auth-ORM <noreplyauthorm@auth.com.br>',
    to: user.email,
    subject: 'E-mail verification',
    text: `Hey! Please verify your e-mail here: ${verifyEmailAddress}`,
    html: `<h1>Hey!</h1> <p>Please verify your e-mail here:<a href="${verifyEmailAddress}">${verifyEmailAddress}</a></p>`,
  });

  console.log('URL: ' + nodemailer.getTestMessageUrl(infos));
};

module.exports = sendMail;

const nodemailer = require('nodemailer');

module.exports = {

  mailer(emailAddress, subject, emailText) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL,
      to: emailAddress,
      subject: subject,
      text: emailText,
    };
  
    let status = "Success!";
  
    transporter.sendMail(mailOptions, (err) => {
      if(err) status = `Something went wrong: ${err}`
    });
  
    return status;
  },
}

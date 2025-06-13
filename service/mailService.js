var nodemailer = require('nodemailer')

export async function sendEmail(
  subject,
  toEmail,
  replyToEmail,
  textContent,
  attachment
) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW
    }
  })

  var mailOptions = {
    // from: process.env.NODEMAILER_EMAIL,
    from: `AHP Client <${process.env.NODEMAILER_EMAIL}>`,
    replyTo: replyToEmail,
    to: toEmail,
    subject: subject,
    text: textContent,
    attachments: attachment
  }
  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new Error(error)
      } else {
        return true
      }
    })
  } catch (error) {}
}

export async function sendMail2(
  subject,
  toEmail,
  replyToEmail,
  textContent,
  attachment
) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL_2,
      pass: process.env.NODEMAILER_PW_2
    }
  })

  var mailOptions = {
    // from: process.env.NODEMAILER_EMAIL,
    from: `AHP Client <${process.env.NODEMAILER_EMAIL}>`,
    replyTo: replyToEmail,
    to: toEmail,
    subject: subject,
    text: textContent,
    attachments: attachment
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error)
    } else {
      return true
    }
  })
}

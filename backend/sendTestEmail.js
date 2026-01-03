import 'dotenv/config'
import transporter from './config/nodemailer.js'

// Usage:
//   node sendTestEmail.js recipient@example.com
// or set env var TEST_TO and run: node sendTestEmail.js

const recipientArg = process.argv[2]
const recipient = recipientArg || process.env.TEST_TO || process.env.ADMIN_EMAIL || process.env.SMTP_SENDER_EMAIL

async function main() {
  try {
    console.log('Verifying SMTP transporter...')
    await transporter.verify()
    console.log('SMTP transporter verified — ready to send')
  } catch (err) {
    console.error('SMTP verification failed:', err)
    // don't exit immediately — still attempt to send so the provider's error is visible
  }

  const mailOptions = {
    from: process.env.SMTP_SENDER_EMAIL,
    to: recipient,
    subject: 'Test email from Uththama-Water-Liliy',
    text: `This is a test email sent at ${new Date().toISOString()}`,
    html: `<p>This is a test email sent at ${new Date().toISOString()}</p>`,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info)
  } catch (err) {
    console.error('Error sending email:', err)
    process.exitCode = 1
  }
}

main()

import transporter from '../config/nodemailer.js'

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and message.' })
    }

    const mailOptions = {
      from: process.env.SMTP_SENDER_EMAIL,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_SENDER_EMAIL,
      subject: `Website contact from ${name}`,
      replyTo: email,
      html: `
        <h3>New contact message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    }

    const info = await transporter.sendMail(mailOptions)

    return res.json({ success: true, message: 'Message sent successfully.', info })
  } catch (error) {
    console.error('Contact Email Error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

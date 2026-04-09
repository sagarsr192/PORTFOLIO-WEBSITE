import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Portfolio API is running' });
});

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const receiverEmail = process.env.RECEIVER_EMAIL;
  if (!receiverEmail) {
    return res.status(500).json({ error: 'Server email receiver is not configured.' });
  }

  const transporter = createTransporter();
  if (!transporter) {
    return res.status(500).json({
      error: 'SMTP is not configured. Add SMTP env values to enable email notifications.',
    });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: receiverEmail,
      replyTo: email,
      subject: `Portfolio Contact: Message from ${name}`,
      text: `You have received a new portfolio message.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Portfolio Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send message.', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Portfolio server running on http://localhost:${port}`);
});

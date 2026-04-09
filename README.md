# Personal Professional Portfolio Website

Portfolio Owner: **SAGAR S R**

A recruiter-ready full-stack portfolio website built for **Future Interns – Full Stack Web Development Task 1**.

## Live Demo

Add your deployed website URL here:

- Live Portfolio: `https://your-live-portfolio-link.com`

## GitHub Repository

Add your public repo URL here:

- Repository: `https://github.com/sagarsr192/professional-portfolio`

## Features

- Professional homepage introduction
- Projects section with interactive category filtering
- About/Resume section with skills and experience timeline
- Contact form connected to backend API
- Email notifications via SMTP (Nodemailer)
- Responsive design for desktop, tablet, and mobile
- SEO-friendly metadata (title, description, OpenGraph, Twitter card, JSON-LD)

## Tech Stack

### Frontend

- React (Vite)
- CSS
- JavaScript (ES6+)

### Backend

- Node.js
- Express.js
- Nodemailer

## Project Structure

```bash
.
├── client/                  # React frontend
│   ├── src/
│   ├── index.html
│   └── package.json
├── server/                  # Express backend
│   ├── src/index.js
│   └── package.json
├── .env.example
├── package.json             # Root workspace scripts
└── README.md
```

## Setup Instructions

### 1) Clone the repository

```bash
git clone https://github.com/sagarsr192/professional-portfolio.git
cd professional-portfolio
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Copy `.env.example` into `.env` at root:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Update values in `.env`:

- `VITE_API_BASE_URL`
- `PORT`
- `CLIENT_ORIGIN`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `RECEIVER_EMAIL`

> For Gmail SMTP, use an **App Password**, not your account password.

### 4) Run in development mode

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### 5) Build frontend

```bash
npm run build
```

## Deployment Guide

### Recommended setup

- Frontend: Vercel / Netlify
- Backend: Render / Railway / Cyclic

### Environment variables for deployment

Set all variables from `.env.example` in your hosting dashboards.

For frontend hosting, set:

- `VITE_API_BASE_URL` = your deployed backend URL

For backend hosting, set:

- `CLIENT_ORIGIN` = your deployed frontend URL
- SMTP and receiver email credentials

## Customization Checklist

Before submission, update:

- Name, role, and bio in `client/src/data.js`
- GitHub and LinkedIn links
- Project cards (title, stack, links, summary)
- Resume file as `client/public/resume.pdf` (used by `resumeUrl: '/resume.pdf'`)
- SEO URLs in `client/index.html`

## Final Submission Checklist

- [ ] Portfolio deployed and live
- [ ] Source code pushed to public GitHub repository
- [ ] README includes setup and deployment steps
- [ ] Real project content added
- [ ] Shared on LinkedIn with Future Interns tagged

## License

This project is open-source and free to use for personal portfolio building.

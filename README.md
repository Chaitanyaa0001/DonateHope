# 📈 UptimeIQ

UptimeIQ is a modern monitoring and automation platform crafted with React, TypeScript, Node.js, Express,Redis cloud, and MongoDB. It boasts secure authentication, Redis-based session management and caching, and integrated AI-powered analytics. The platform offers intuitive, role-based dashboards for both users and administrators, providing essential features like uptime tracking and smart insights to keep you informed and in control.

## 🌐 Live Demo
https://uptime-iq-eight.vercel.app/

## ✨ Features
-   🔐 Secure JWT-based authentication with refresh tokens
-   🚀 Redis-powered session management and caching
-   🧠 AI-powered analytics integration for smart insights
-   📊 Role-based dashboards for users and admins
-   ⬆️ Real-time uptime tracking and monitoring
-   📧 OTP verification for secure login/signup via email
-   🔄 Automatic access token refreshing
-   📤 Cloudinary integration for robust file uploads
-   🛡️ Anti-spam rate limiting for OTP requests

## 🛠️ Tech Stack
**Frontend:** React, TypeScript, Vite, Redux Toolkit, Tanstack Query, Axios, Tailwind CSS
**Backend:** Node.js, Express, TypeScript
**Database:** MongoDB (via Mongoose ORM)
**Caching & Session Management:** Redis cloud, ioredis
**Authentication:** JWT (JSON Web Tokens), Refresh Tokens
**Email Services:** Nodemailer, Brevo
**File Uploads:** Cloudinary
**Deployment:** Vercel (Frontend), Render (Backend)

## ⚙️ Installation

To set up UptimeIQ locally, follow these steps:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/UptimeIQ.git
    cd UptimeIQ
    ```

2.  **Install frontend dependencies**
    ```bash
    cd frontend
    npm install
    ```

3.  **Install backend dependencies**
    ```bash
    cd ../backend
    npm install
    ```

4.  **Start the frontend server**
    ```bash
    cd ../frontend
    npm run dev
    ```

5.  **Start the backend server**
    ```bash
    cd ../backend
    npm run dev
    ```

### ENVIRONMENT VARIABLES
Create a `.env` file in the root of the `backend` directory and add your environment variables.

## 🚀 Usage / How it Works

UptimeIQ provides a robust and secure authentication system. Here's an overview of the step-by-step flow:

### Authentication System Overview
🔸 **Step-by-Step Flow**

🧾 **1. Request OTP**
*   The user enters their email address.
*   The backend generates a One-Time Password (OTP) using Redis for storage.
*   The OTP is sent to the user's email via a transactional email service (Brevo).
*   Rate limiting is implemented to prevent spam and abuse.

🔑 **2. Verify OTP (Login/Signup)**
*   The user submits their email and the received OTP.
*   The backend verifies the OTP against the one stored in Redis.
*   Upon successful verification:
    *   An access token (valid for 20 minutes) is generated.
    *   A refresh token (valid for 7 days) is generated and stored securely in an HTTP-only cookie.
    *   A Redis session is created to validate the refresh token.

🧠 **3. Refresh Access Token**
*   When the access token expires, the frontend automatically calls the `/api/auth/refresh-token` endpoint.
*   The refresh token (from the HTTP-only cookie) is verified by the backend.
*   If valid, a new access token is returned.
*   The Redis session ensures the refresh token is valid and has not been revoked.

🔒 **4. Logout**
*   The frontend initiates a logout request to the `/api/auth/logout` endpoint.
*   The refresh token cookie is cleared from the user's browser.
*   The corresponding Redis session is deleted, instantly invalidating the refresh token.

## 📂 Folder Structure
```
.
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── redux/
    │   ├── hooks/
    │   ├── services/
    │   ├── styles/
    │   └── main.tsx
    ├── .env.example
    ├── package.json
    └── tailwind.config.js
```

## 🤝 Contributions
We welcome contributions to UptimeIQ! To contribute, please follow these steps:

1.  Fork the repository
2.  Clone your fork: `git clone https://github.com/your-username/UptimeIQ.git`
3.  Create a new branch: `git checkout -b feature/your-feature-name`
4.  Make your changes and commit them: `git commit -m "feat: Add your feature"`
5.  Push to the branch: `git push origin feature/your-feature-name`
6.  Submit a pull request

## 🔮 Upcoming Features
-   ⚡ Real-time dashboard updates via WebSockets
-   📈 Advanced customizable reporting
-   🧪 Integration with more third-party services (e.g., Slack, PagerDuty)
-   🌍 Multi-language support
-   🎨 Dark mode toggle

## ⚖️ License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## 📞 Contact
Chaitanya Khurana
chaitanyakhurana.workk@gmail.com
https://www.linkedin.com/in/chaitanya-khurana-077b702a0




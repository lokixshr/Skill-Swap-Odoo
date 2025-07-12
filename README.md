# Skill Swap Odoo

## Team Information:
Team Name: CodeBloodedDuo
Team Size: 2
Team Leader: Laukik Dharmeshkumar Rajput (BlockChain + Fullstack Developer)
Member 1: Hem Ajit Patel (Machine Learning + Fullstack Developoer)
  
## 🚀 Getting Started (Local Development)

To run this project locally, make sure you have **Node.js** and **npm** installed.

You can install Node.js easily using **nvm**:  
👉 [Install nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### 🧑‍💻 Steps:

```bash
# Step 1: Clone this repository
git clone https://github.com/lokixshr/Skill-Swap-Odoo.git

# Step 2: Navigate into the project directory
cd Skill-Swap-Odoo/skillswap/client

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```
The development server will start, and the app will be live at http://localhost:5173 (or another port shown in the terminal).

---

## 🧪 Tech Stack Overview

Our platform is built using a modern, scalable, and developer-friendly stack:

### 🔷 Frontend (Client)
- **React 18** – Fast, declarative UI with modern hooks and component-based architecture
- **TypeScript** – Ensures type safety and better developer tooling
- **Vite** – Ultra-fast build tool and dev server for modern React apps
- **Tailwind CSS** – Utility-first CSS framework for custom, responsive design
- **shadcn/ui** – Accessible and beautifully styled component primitives for React
- **Zustand** – Lightweight state management (better DX than Redux for small/medium apps)
- **React Router DOM** – Seamless client-side routing

### ⚙️ Backend (Server)
- **Node.js + Express** – Robust, minimalist backend framework
- **MongoDB + Mongoose** – Flexible, document-based NoSQL database with schema modeling
- **JWT (JSON Web Tokens)** – For secure user authentication and session management
- **Cloudinary** – Handles image uploads (profile photos) and optimizations

### 🛠️ DevOps & Tooling
- **ESLint + Prettier** – Ensures code quality and consistent formatting
- **Husky + lint-staged** – Git hooks for pre-commit checks
- **PM2** – Process manager for Node.js apps in production
- **Docker (optional)** – Containerization for consistent environments (future-proofing)

### 🚀 Deployment
- **Vercel** – Zero-config deployment for frontend with custom domain support
- **Render / Railway** – Free & scalable hosting for Node.js backend
- **GitHub Actions** – Automate build & deploy workflows

### 🔐 Admin & Monitoring
- **Admin Panel (Custom React + Tailwind)** – Manage users, swaps, and reports
- **MongoDB Atlas Monitoring** – Built-in dashboard for tracking queries and stats
- **LogRocket / Sentry (optional)** – Frontend and backend error tracking

---

## 🧩 Editing the Code

-You can edit this project using:

-VS Code or any other IDE

-GitHub Web Interface (click the pencil icon on any file)

-GitHub Codespaces (launch a full online IDE environment)

-Any changes you make can be committed and pushed to update the repository.

## 💡 Features
### 👤 User Profile

-Name, location (optional), profile photo (optional)

-List of skills offered

-List of skills wanted

-Availability (e.g., weekends, evenings)

-Public or private profile toggle

### 🔍 Skill Browsing & Searching

-Browse users by skill (e.g., “Photoshop”, “Excel”)

-Filter by availability or interest

### 🔁 Skill Swap System

-Send swap requests

-Accept or reject incoming requests

-View current and pending swap statuses

-Cancel unaccepted swap offers

-Rate or give feedback after swaps

### 🔒 Admin Role

-Admins have platform-wide control with the following abilities:

-Reject inappropriate or spammy skill descriptions

-Ban users violating platform policies

-Monitor all swap activity (pending, accepted, cancelled)

-Send platform-wide announcements (feature updates, downtime alerts)

-Download reports on:

-User activity

-Feedback logs

-Swap statistics

## 🌐 Deployment

To deploy this project manually:

Build the project:

```bash
npm run build
```
Deploy the contents of the dist folder to your preferred hosting provider
(e.g. Netlify, Vercel, GitHub Pages, or your custom domain).

## 🔗 Custom Domain Setup

If you're hosting it under a custom domain:

Configure your domain’s DNS to point to your deployment

Most hosting platforms (e.g. Vercel, Netlify) provide easy custom domain setup in their dashboards


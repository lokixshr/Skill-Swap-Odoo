# Skill Swap Odoo

## Team Information:
Team Name: CodeBloodedDuo

Team Size: 2

Team Leader: Laukik Dharmeshkumar Rajput (BlockChain + Fullstack Developer)

Member 1: Hem Ajit Patel (Machine Learning + Fullstack Developoer)

[![Kaggle Profile](https://img.shields.io/badge/Kaggle-hem%20ajit%20patel-20BEFF?logo=kaggle)](https://www.kaggle.com/hemajitpatel)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Hem%20Ajit%20Patel-0A66C2?logo=linkedin)](https://www.linkedin.com/in/hem-patel19)
[![GitHub](https://img.shields.io/badge/GitHub-hemathens-181717?logo=github)](https://github.com/hemathens)
  
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

## 📁 Folder Structure
```Folder structure
Odoo_Skill_Swap
├── .git
│   ├── COMMIT_EDITMSG
│   ├── HEAD
│   ├── config
│   ├── description
│   ├── hooks
│   │   ├── applypatch-msg.sample
│   │   ├── commit-msg.sample
│   │   ├── fsmonitor-watchman.sample
│   │   ├── post-update.sample
│   │   ├── pre-applypatch.sample
│   │   ├── pre-commit.sample
│   │   ├── pre-merge-commit.sample
│   │   ├── pre-push.sample
│   │   ├── pre-rebase.sample    
│   │   ├── pre-receive.sample   
│   │   ├── prepare-commit-msg.sample
│   │   ├── push-to-checkout.sample
│   │   ├── sendemail-validate.sample
│   │   └── update.sample        
│   ├── index
│   ├── info
│   │   └── exclude
│   ├── logs
│   │   ├── HEAD
│   │   └── refs
│   │       ├── heads
│   │       │   └── main
│   │       └── remotes
│   │           └── origin       
│   │               └── main     
│   ├── objects
│   │   ├── info
│   │   └── pack
│   └── refs
│       ├── heads
│       │   └── main
│       ├── remotes
│       │   └── origin
│       │       └── main
│       └── tags
├── .gitignore
├── README.md
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── components
│   │   ├── AppSidebar.tsx       
│   │   ├── AuthenticatedLayout.tsx
│   │   ├── HorizontalNavbar.tsx 
│   │   ├── SkillCard.tsx        
│   │   └── ui
│   │       ├── accordion.tsx    
│   │       ├── alert-dialog.tsx 
│   │       ├── alert.tsx        
│   │       ├── aspect-ratio.tsx 
│   │       ├── avatar.tsx       
│   │       ├── badge.tsx        
│   │       ├── breadcrumb.tsx   
│   │       ├── button.tsx       
│   │       ├── calendar.tsx     
│   │       ├── card.tsx
│   │       ├── carousel.tsx     
│   │       ├── chart.tsx        
│   │       ├── checkbox.tsx     
│   │       ├── collapsible.tsx  
│   │       ├── command.tsx      
│   │       ├── context-menu.tsx 
│   │       ├── dialog.tsx       
│   │       ├── drawer.tsx       
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx   
│   │       ├── input-otp.tsx    
│   │       ├── input.tsx        
│   │       ├── label.tsx        
│   │       ├── menubar.tsx      
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx   
│   │       ├── popover.tsx      
│   │       ├── progress.tsx     
│   │       ├── radio-group.tsx  
│   │       ├── resizable.tsx    
│   │       ├── scroll-area.tsx  
│   │       ├── select.tsx       
│   │       ├── separator.tsx    
│   │       ├── sheet.tsx        
│   │       ├── sidebar.tsx      
│   │       ├── skeleton.tsx     
│   │       ├── slider.tsx       
│   │       ├── sonner.tsx       
│   │       ├── switch.tsx       
│   │       ├── table.tsx        
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx     
│   │       ├── toast.tsx        
│   │       ├── toaster.tsx      
│   │       ├── toggle-group.tsx 
│   │       ├── toggle.tsx       
│   │       ├── tooltip.tsx      
│   │       └── use-toast.ts     
│   ├── hooks
│   │   ├── use-mobile.tsx       
│   │   └── use-toast.ts
│   ├── index.css
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── Admin.tsx
│   │   ├── Browse.tsx
│   │   ├── Dashboard.tsx        
│   │   ├── Index.tsx
│   │   ├── MySwaps.tsx
│   │   ├── NotFound.tsx
│   │   └── Profile.tsx
│   └── vite-env.d.ts
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
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

>Made by Laukik And Hem

# My Project

## Contributors (Humans Only)
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/hemathens">
        <img src="https://avatars.githubusercontent.com/hemathens" width="100px;" alt=""/>
        <br />
        <sub><b>Hem Patel</b></sub>
      </a>
    </td>
  </tr>
</table>

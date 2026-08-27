# YashoWorld 🌸✨

**YashoWorld** is a premium, bespoke e-commerce platform dedicated to artisan resin mastery and floral preservation. It offers customers a high-end, cinematic shopping experience with interactive 3D product cards, seamless scroll animations, and a seamless checkout process.

## 🌟 Features

- **Cinematic UI/UX:** Built with GSAP and Lenis for buttery-smooth scroll-triggered animations and a boutique browsing experience.
- **3D Product Showcases:** Interactive 3D tilt cards for displaying artisan resin products.
- **Bespoke Customizer:** A dedicated interface allowing users to upload reference images and request custom floral preservation pieces.
- **Robust Cart & Wishlist:** Seamless drawer-based cart and wishlist management.
- **Secure File Uploads:** Customer reference images are securely uploaded and stored in AWS S3 with presigned URL access for admins.
- **Admin Dashboard:** A protected portal for viewing orders, changing order statuses, and securely accessing customer images.
- **Production-Ready Security:** Hardened Express backend featuring strict rate-limiting, Helmet security headers, payload limits, and AWS reverse-proxy trust configurations.

## 🛠 Tech Stack

**Frontend:**
- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) (GreenSock Animation Platform)
- [Lenis](https://lenis.studiofreight.com/) (Smooth Scrolling)
- [Lucide React](https://lucide.dev/) (Icons)

**Backend:**
- [Express.js](https://expressjs.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PGlite](https://pglite.dev/) (Local Dev Database) / PostgreSQL (Production)
- [AWS SDK (S3)](https://aws.amazon.com/sdk-for-javascript/)
- express-rate-limit & helmet (Security)

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher recommended)
- AWS Account (for S3 image uploads, optional for local fallback)

### Installation

1. **Clone the repository**
   `ash
   git clone https://github.com/dhanvinmakwana18/Yashoworld.git
   cd Yashoworld
   `

2. **Install dependencies**
   `ash
   npm install
   `

3. **Set up Environment Variables**
   Create a .env file in the root directory and configure the following:
   `env
   # Required for Admin Panel Access
   DEVELOPER_SECRET=your_super_secret_key

   # Optional: AWS S3 Configuration (Fallback to Base64/PGlite if missing)
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_S3_BUCKET_NAME=your_bucket_name
   `

4. **Initialize the Database (Seed)**
   `ash
   npm run db:seed
   `

5. **Start the Development Server**
   `ash
   npm run dev
   `
   The application will be running at http://localhost:3001.

## 🔒 Security Architecture

This application has undergone a strict security hardening phase to prepare for AWS deployment:
- **Proxy Trust:** Configured to safely extract client IPs behind AWS Application Load Balancers.
- **Rate Limiting:** Staggered limits (Global API limits + strict limits on Order creation) to prevent spam and DoS attacks.
- **Data Sanitization:** Strict JSON body limits (1mb) to prevent memory exhaustion.
- **Graceful Shutdown:** Ensures database connections and HTTP requests are cleanly resolved during server restarts.

## 📦 Build for Production

To build the application for production (compiles the Vite frontend and the Express server):
`ash
npm run build
npm start
`
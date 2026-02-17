# BrightFlow Digital - Scalable Web Platform

> A modern, scalable web application demonstrating professional deployment practices on Vercel with Next.js, TypeScript, and MongoDB.

**Author:** Francesco di Biase

## Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Runtime:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** MongoDB 8 (Atlas in production, Docker in development)
- **ODM:** Mongoose
- **Deployment:** Vercel (Edge Network)
- **Analytics:** Vercel Analytics
- **Testing:** Jest + React Testing Library
- **CI/CD:** GitHub Actions

## Features

- **ISR (Incremental Static Regeneration)** - Automatic revalidation every hour
- **Edge Network** - Global distribution with Vercel
- **Security Headers** - HSTS, X-Frame-Options, CSP
- **Real-time Analytics** - Monitoring with Vercel Analytics
- **Test Coverage** - Complete unit and integration test suite
- **CI/CD Pipeline** - Automatic deployment with GitHub Actions
- **Responsive Design** - Optimized for all devices
- **Image Optimization** - AVIF and WebP with Next.js Image
- **Docker Support** - Containerized development environment

## Project Structure

```
brightflow-digital/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD Pipeline
├── docs/
│   ├── QUICK_START.md          # Quick deployment guide
│   └── DEPLOYMENT.md           # Complete deployment guide
├── docker/
│   └── mongodb/
│       ├── docker-compose.yml  # Local MongoDB setup
│       └── seed/
│           └── init.js         # Initial seed data
├── scripts/
│   └── seed-atlas.ts           # MongoDB Atlas seed
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── services/
│   │   │       ├── route.ts    # Services API endpoint
│   │   │       └── route.test.ts  # API integration tests
│   │   ├── layout.tsx          # Main layout with Analytics
│   │   └── page.tsx            # Homepage with ISR
│   ├── lib/
│   │   └── mongodb.ts          # MongoDB connection with caching
│   ├── models/
│   │   ├── Service.ts          # Services schema
│   │   ├── Client.ts           # Clients schema
│   │   └── __tests__/
│   │       └── Service.test.ts # Model unit tests
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── .env.local.example          # Environment variables template
├── .gitignore                  # Git ignore rules
├── eslint.config.mjs           # ESLint 9 flat config
├── jest.config.js              # Jest configuration
├── jest.setup.ts               # Jest setup file
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── piano_azione.md             # Project action plan
├── README.md                   # This file
├── tsconfig.json               # TypeScript configuration
└── vercel.json                 # Vercel deployment config
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Docker (for local development)
- MongoDB Atlas account (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/[your-username]/brightflow-digital.git
   cd brightflow-digital
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup local MongoDB**
   ```bash
   cd docker/mongodb
   docker-compose up -d
   cd ../..
   ```

4. **Configure environment variables**

   Copy the example file and configure your MongoDB connection:
   ```bash
   cp .env.local.example .env.local
   ```

   Then edit `.env.local` and replace placeholder values with your actual credentials.

5. **Seed the database (optional)**
   ```bash
   # For MongoDB Atlas
   npm run seed:atlas
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

## Testing

### Run all tests
```bash
npm test
```

### Watch mode for development
```bash
npm run test:watch
```

### Coverage report
```bash
npm run test:coverage
```

### Available tests
- **Unit tests:** 10 tests for Service model
- **Integration tests:** 4 tests for API endpoints
- **Coverage:** ~90% code coverage

## Deployment

### Deploying to Vercel

1. **Connect GitHub repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Framework preset: Next.js (auto-detected)

2. **Configure environment variables**
   - Settings → Environment Variables
   - Add `MONGODB_URI` for Production and Preview

3. **Branch configuration**
   - **Production:** `main` branch
   - **Preview:** `develop` branch

4. **Automatic deployment**
   - Push to `main` → Production deployment
   - Push to `develop` → Preview deployment
   - Pull Request → Temporary deployment

### GitFlow Workflow

```bash
# Develop a new feature
git checkout develop
git checkout -b feature/feature-name
git add .
git commit -m "feat: feature description"
git push origin feature/feature-name

# Merge to develop (after PR approval)
git checkout develop
git merge feature/feature-name
git push origin develop

# Release to production
git checkout main
git merge develop
git push origin main
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm run seed:atlas` | Seed MongoDB Atlas |

## Environment Variables

A template file `.env.local.example` is provided with all required variables.

### Development (`.env.local`)
```env
MONGODB_URI=mongodb://admin:dev_password_123@localhost:27017/brightflow?authSource=admin
```

### Production (Vercel Dashboard)
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/brightflow?retryWrites=true&w=majority
```

**Setup:** Copy `.env.local.example` to `.env.local` and replace placeholder values with your credentials.

## Performance

- **ISR:** Revalidation every 3600 seconds (1 hour)
- **Image Optimization:** Automatic with Next.js Image
- **Code Splitting:** Automatic with App Router
- **Edge Runtime:** Global distribution
- **Serverless Functions:** 1024MB RAM, 10s max duration

## Security

- **HSTS:** Strict-Transport-Security header
- **XSS Protection:** X-Frame-Options, X-Content-Type-Options
- **CSP:** Content-Security-Policy configured
- **Environment Variables:** Securely managed on Vercel
- **MongoDB Connection:** Pooling with global cache

## CI/CD Pipeline

The GitHub Actions pipeline automatically runs:

1. **Lint & Type Check** - Code quality verification
2. **Tests** - Complete test suite execution
3. **Build** - Application compilation
4. **Coverage** - Report upload to Codecov (optional)
5. **Deploy Status** - Deployment information display

Triggers:
- Push to `main` or `develop`
- Pull Request to `main` or `develop`

## Additional Documentation

- [Quick Start Guide](docs/QUICK_START.md) - Brief deployment flow and procedures (start here)
- [Deployment Guide](docs/DEPLOYMENT.md) - Detailed deployment procedures
- [Action Plan](piano_azione.md) - Complete project roadmap

## Issues and Support

To report bugs or request new features, open an [issue](https://github.com/[your-username]/brightflow-digital/issues) on GitHub.

## License

Demonstrative project - © 2026 Francesco di Biase

## Acknowledgments

- [Next.js](https://nextjs.org) - React Framework
- [Vercel](https://vercel.com) - Deployment Platform
- [MongoDB](https://www.mongodb.com) - NoSQL Database
- [Tailwind CSS](https://tailwindcss.com) - CSS Framework

---

**Developed by Francesco di Biase** | Demonstration of scalable deployment on Vercel

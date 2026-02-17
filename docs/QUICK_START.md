# Quick Deploy Guide - BrightFlow Digital

> Brief guide covering deployment flow and essential management procedures

**Author:** Francesco di Biase

## Deployment Flow

```
Local Development → Git Push → GitHub Actions (CI) → Vercel (CD) → Production
      (develop)        ↓              ↓                    ↓
                    Lint + Test    Build Check      Auto Deploy
```

### Standard Workflow

1. **Development**
   ```bash
   git checkout develop
   git checkout -b feature/new-feature
   # Make changes
   git commit -m "feat: description"
   git push origin feature/new-feature
   ```

2. **Pull Request**
   - Create PR to `develop`
   - CI runs: lint, tests, build
   - Review and merge

3. **Preview Deploy**
   - Merge to `develop` triggers preview deployment
   - URL: https://brightflow-digital-git-develop.vercel.app

4. **Production Release**
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```
   - Production deploy: https://brightflow-digital.vercel.app

## Essential Management Procedures

### Environment Variables

**Local Setup:**
```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local with your MongoDB connection
MONGODB_URI=mongodb://admin:dev_password_123@localhost:27017/brightflow?authSource=admin
```

**Production (Vercel Dashboard):**
1. Go to Settings → Environment Variables
2. Add `MONGODB_URI` for Production and Preview
3. Redeploy to apply changes

### Quick Rollback

**Method 1: Vercel Dashboard (< 10 seconds)**
1. Vercel Dashboard → Deployments
2. Find last stable deployment
3. Click (...) → "Promote to Production"

**Method 2: Git Revert (2-3 minutes)**
```bash
git revert <commit-hash>
git push origin main
```

### Health Checks

**After each deployment:**
```bash
# Homepage
curl https://brightflow-digital.vercel.app

# API endpoint
curl https://brightflow-digital.vercel.app/api/services

# Security headers
curl -I https://brightflow-digital.vercel.app
```

Expected: HTTP 200 + security headers present

### Monitoring

**Vercel Dashboard → Analytics:**
- Page views and performance
- Error rates
- Core Web Vitals

**Quick metrics check:**
```bash
# Continuous health monitoring
watch -n 5 'curl -s -o /dev/null -w "%{http_code}\n" https://brightflow-digital.vercel.app'
```

## Common Operations

### Run Tests Locally
```bash
npm test                 # All tests
npm run test:coverage    # With coverage report
npm run lint             # ESLint check
npm run type-check       # TypeScript validation
```

### Build Verification
```bash
npm run build            # Production build
npm start                # Test production build locally
```

### Database Seed
```bash
# Ensure .env.local has MONGODB_URI
npm run seed:atlas       # Populate MongoDB Atlas
```

### Branch Management

**Create feature:**
```bash
git checkout develop
git checkout -b feature/feature-name
```

**Merge to develop:**
```bash
git checkout develop
git merge feature/feature-name
git push origin develop
```

**Release to production:**
```bash
git checkout main
git merge develop
git push origin main
```

## Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| Build fails | Check CI logs → Fix errors → Push again |
| Environment vars missing | Add in Vercel Dashboard → Redeploy |
| MongoDB connection error | Verify MONGODB_URI → Check Atlas whitelist (0.0.0.0/0) |
| Tests failing | Run `npm test` locally → Fix → Commit |
| Slow deployment | Normal (2-3 min) → Check Vercel status page |

## Emergency Contacts

- **Vercel Support:** support@vercel.com
- **GitHub Issues:** https://github.com/[username]/brightflow-digital/issues
- **MongoDB Atlas:** https://support.mongodb.com

## Performance Optimization

**Already implemented:**
- ISR with 1-hour revalidation
- Image optimization (AVIF, WebP)
- Edge Network distribution
- Automatic code splitting
- Gzip/Brotli compression

**Monitor via:**
- Vercel Analytics dashboard
- Browser DevTools (Network, Performance)

## Security Features

**Active protections:**
- HSTS (Strict-Transport-Security)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Environment variables in Vercel (not in code)
- MongoDB Atlas IP whitelist

## Key URLs

| Environment | URL | Branch |
|-------------|-----|--------|
| Production | https://brightflow-digital.vercel.app | main |
| Preview | https://brightflow-digital-git-develop.vercel.app | develop |
| Vercel Dashboard | https://vercel.com/dashboard | - |
| GitHub Repo | https://github.com/[username]/brightflow-digital | - |

## CI/CD Pipeline Status

**Every push triggers:**
1. Lint & Type Check (Node.js 20)
2. Unit Tests (14 tests)
3. Integration Tests (API endpoints)
4. Production Build
5. Deploy Status Report

**View status:**
- GitHub → Actions tab
- Vercel → Deployments tab

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript check
npm test                 # Run all tests
npm run format           # Format code with Prettier

# Build
npm run build            # Production build
npm start                # Start production server

# Database
npm run seed:atlas       # Seed MongoDB Atlas

# Git
git status               # Check status
git log --oneline -10    # Recent commits
git checkout develop     # Switch to develop
git pull origin develop  # Update from remote
```

---

**For detailed procedures, refer to:**
- Complete deployment guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- Full project documentation: [../README.md](../README.md)

**Project maintained by Francesco di Biase** | BrightFlow Digital - 2026

# Deployment Guide - BrightFlow Digital

> Complete guide for deploying the application on Vercel with MongoDB Atlas

**Author:** Francesco di Biase

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Vercel Configuration](#vercel-configuration)
4. [GitHub Configuration](#github-configuration)
5. [Automatic Deployment](#automatic-deployment)
6. [Environment Variables](#environment-variables)
7. [Pre-Deploy Testing](#pre-deploy-testing)
8. [Post-Deploy Monitoring](#post-deploy-monitoring)
9. [Rollback Procedures](#rollback-procedures)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting deployment, ensure you have:

- GitHub account with project repository
- Vercel account (free tier)
- MongoDB Atlas account (free tier)
- Git installed locally
- Node.js 20+ installed
- Project working locally

## MongoDB Atlas Setup

### 1. Create MongoDB Cluster

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Click "Build a Database"
3. Select **FREE (M0)** plan
4. Choose:
   - **Provider:** AWS
   - **Region:** Choose closest region (e.g., Frankfurt eu-central-1)
   - **Cluster Name:** brightflow-cluster
5. Click "Create"

### 2. Configure Database Access

1. Go to **Database Access** in sidebar
2. Click "Add New Database User"
3. Configure:
   - **Authentication Method:** Password
   - **Username:** `brightflow_user`
   - **Password:** Generate secure password (save it!)
   - **Database User Privileges:** Read and write to any database
4. Click "Add User"

### 3. Configure Network Access

1. Go to **Network Access** in sidebar
2. Click "Add IP Address"
3. Choose **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Required for Vercel Edge Functions
4. Click "Confirm"

### 4. Get Connection String

1. Go to **Database** in sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select:
   - **Driver:** Node.js
   - **Version:** 5.5 or later
5. Copy the connection string, should look like:
   ```
   mongodb+srv://brightflow_user:<password>@brightflow-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with password created in step 2
7. Add database name at the end:
   ```
   mongodb+srv://brightflow_user:your_password@brightflow-cluster.xxxxx.mongodb.net/brightflow?retryWrites=true&w=majority
   ```

### 5. Seed Database (Optional)

To populate database with initial data:

```bash
# Create .env.local with Atlas connection string
echo "MONGODB_URI=mongodb+srv://brightflow_user:password@cluster.mongodb.net/brightflow?retryWrites=true&w=majority" > .env.local

# Run seed script
npm run seed:atlas
```

Verify:
```bash
# Expected output:
# Connected to MongoDB Atlas
# Collections cleaned
# 4 services inserted
# 3 clients inserted
# Seed completed successfully!
```

## Vercel Configuration

### 1. Import Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select GitHub repository `brightflow-digital`
4. Vercel will auto-detect Next.js

### 2. Configure Project

**Framework Preset:** Next.js (auto-detected)

**Build Settings:**
- Build Command: `next build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

**Root Directory:** `./` (default)

### 3. Add Environment Variables

Before first deployment:

1. Click "Environment Variables"
2. Add `MONGODB_URI`:
   - **Key:** `MONGODB_URI`
   - **Value:** MongoDB Atlas connection string
   - **Environment:** Select **Production** and **Preview**
3. Click "Add"

### 4. Initial Deploy

1. Click "Deploy"
2. Wait for completion (2-3 minutes)
3. Vercel will provide URL like: `https://brightflow-digital.vercel.app`

### 5. Configure Production Branch

1. Go to **Settings** → **Git**
2. Find "Production Branch"
3. Set `main` as production branch
4. Save

Final configuration:
- **Production:** `main` branch → https://brightflow-digital.vercel.app
- **Preview:** `develop` branch → https://brightflow-digital-git-develop.vercel.app

### 6. Enable Vercel Analytics

1. Go to **Analytics** in project dashboard
2. Click "Enable Analytics"
3. Integration is already in code (`@vercel/analytics`)

## GitHub Configuration

### 1. Protect Main Branch

1. Go to **Settings** → **Branches** in repository
2. Click "Add rule"
3. Configure:
   - **Branch name pattern:** `main`
   - Require pull request reviews before merging
   - Require status checks to pass before merging
     - Select: `lint`, `test`, `build`
   - Require branches to be up to date before merging
4. Save

### 2. Verify Secrets for CI/CD

GitHub Actions workflow is already configured. Optionally, for coverage report:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add `CODECOV_TOKEN` (if using Codecov)
3. Add `MONGODB_URI_CI` for CI tests:
   ```
   mongodb://localhost:27017/brightflow_test
   ```

## Automatic Deployment

### GitFlow Workflow

Project uses GitFlow with automatic deployment:

```
main (production)     ─────●───────●──────●─────>
                            │       │      │
                         merge   merge  merge
                            │       │      │
develop (preview)     ──●───●───●───●──●───●────>
                        │       │      │
                    feature-1  │   feature-2
                              fix
```

### Development Process

1. **Create feature branch from develop:**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/feature-name
   ```

2. **Develop and commit:**
   ```bash
   git add .
   git commit -m "feat: feature description"
   git push origin feature/feature-name
   ```

3. **Create Pull Request:**
   - From `feature/feature-name` to `develop`
   - Vercel will automatically create preview deployment
   - GitHub Actions will run: lint, test, build

4. **After approval, merge to develop:**
   ```bash
   git checkout develop
   git merge feature/feature-name
   git push origin develop
   ```
   - Automatic deployment to **Preview** environment
   - URL: `https://brightflow-digital-git-develop.vercel.app`

5. **Release to production:**
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```
   - Automatic deployment to **Production** environment
   - URL: `https://brightflow-digital.vercel.app`

### Deployment Types

| Event | Branch | Environment | URL |
|--------|--------|----------|-----|
| Push to `main` | main | Production | brightflow-digital.vercel.app |
| Push to `develop` | develop | Preview | brightflow-digital-git-develop.vercel.app |
| Pull Request | feature/* | Temporary | brightflow-digital-git-feature-*.vercel.app |

## Environment Variables

### Local Development

File `.env.local` (do not commit):
```env
# Local MongoDB (Docker)
MONGODB_URI=mongodb://admin:dev_password_123@localhost:27017/brightflow?authSource=admin

# Or MongoDB Atlas
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/brightflow?retryWrites=true&w=majority
```

### Production (Vercel)

Configured on Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Environments |
|----------|-------|--------------|
| `MONGODB_URI` | `mongodb+srv://...` | Production, Preview |

### Best Practices

- Never commit `.env.local` to repository
- Use `.env.example` to document required variables
- Use different values for Production and Preview
- Rotate passwords periodically
- Use MongoDB Atlas IP Whitelist if possible

## Pre-Deploy Testing

Before every production deployment:

### 1. Local Tests

```bash
# Lint and Type Check
npm run lint
npm run type-check

# Test Suite
npm test

# Coverage Report
npm run test:coverage

# Local Build
npm run build
npm start
```

### 2. Verification Checklist

- [ ] All tests pass (14/14)
- [ ] Coverage > 80%
- [ ] Build completed without errors
- [ ] Type check without errors
- [ ] Lint without warnings
- [ ] Application works locally (http://localhost:3000)
- [ ] MongoDB Atlas accessible
- [ ] Environment variables configured on Vercel

### 3. CI/CD Pipeline

GitHub Actions workflow automatically runs:

1. **Lint & Type Check**
2. **Unit Tests** (10 tests for Service model)
3. **Integration Tests** (4 tests for API endpoints)
4. **Build Next.js**
5. **Upload Artifacts**

If pipeline fails, Vercel deployment will still occur, but you'll receive a warning.

## Post-Deploy Monitoring

### Vercel Dashboard

1. **Deployments:**
   - Status of each deployment (Success/Failed)
   - Build logs
   - Runtime logs

2. **Analytics:**
   - Page views
   - Unique visitors
   - Top pages
   - Real User Monitoring

3. **Functions:**
   - Invocations count
   - Execution duration
   - Error rate
   - Memory usage

### MongoDB Atlas

1. **Metrics:**
   - Operations per second
   - Connections
   - Network usage
   - Storage size

2. **Performance Advisor:**
   - Slow query suggestions
   - Index recommendations

### Health Checks

After each deployment, verify:

```bash
# Homepage responds
curl https://brightflow-digital.vercel.app

# API endpoint responds
curl https://brightflow-digital.vercel.app/api/services

# Security headers present
curl -I https://brightflow-digital.vercel.app
```

Verify headers include:
- `Strict-Transport-Security`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`

## Rollback Procedures

Vercel provides instant rollback capabilities to quickly revert to a previous stable deployment in case of issues.

### When to Perform a Rollback

Consider rollback when:
- Critical bugs discovered in production
- Performance degradation detected
- Security vulnerabilities introduced
- Database migration issues
- Breaking changes affecting users

**Note:** For minor issues, prefer hotfixes (quick patches) over rollbacks.

### Method 1: Vercel Dashboard (Recommended - Instant)

**Fastest method for emergency rollbacks:**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `brightflow-digital`
3. Click **Deployments** tab
4. Find the last stable deployment (marked with green checkmark)
5. Click the three dots menu (...) on that deployment
6. Select **"Promote to Production"**
7. Confirm the action

**Result:** Instant rollback to selected deployment (< 10 seconds)

**Advantages:**
- Instant (no rebuild required)
- No code changes needed
- All deployments preserved
- Can rollback to any previous deployment

**Limitations:**
- Environment variables must match
- Database schema must be compatible

### Method 2: Vercel CLI

**For scripted or automated rollbacks:**

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   vercel login
   ```

2. **List recent deployments:**
   ```bash
   vercel ls brightflow-digital
   ```

3. **Promote specific deployment to production:**
   ```bash
   vercel promote <deployment-url> --scope=<team-name>
   ```

   Example:
   ```bash
   vercel promote brightflow-digital-abc123.vercel.app
   ```

4. **Verify rollback:**
   ```bash
   curl https://brightflow-digital.vercel.app
   ```

**Advantages:**
- Scriptable and automatable
- Can integrate with monitoring alerts
- Precise control over target deployment

### Method 3: Git Revert

**For permanent code rollback with new deployment:**

1. **Identify problematic commit:**
   ```bash
   git log --oneline -10
   ```

2. **Create revert commit:**
   ```bash
   # Revert single commit
   git revert <commit-hash>

   # Revert range of commits
   git revert <older-commit>..<newer-commit>
   ```

3. **Push to main:**
   ```bash
   git push origin main
   ```

4. **Vercel automatically deploys the revert**

**Advantages:**
- Creates permanent fix in git history
- Maintains audit trail
- Triggers full CI/CD validation

**Disadvantages:**
- Slower (requires rebuild: 2-3 minutes)
- May cause merge conflicts
- Requires CI/CD to pass

### Method 4: Git Reset (Use with Caution)

**For forcefully reverting to previous state:**

```bash
# Reset to previous commit (local only)
git reset --hard HEAD~1

# Force push to main (requires branch protection override)
git push origin main --force
```

**WARNING:** Only use in emergencies. This:
- Destroys commit history
- Can cause issues for other developers
- Bypasses CI/CD checks
- Requires admin permissions

### Rollback Decision Tree

```
Critical issue in production?
│
├─ YES → Use Vercel Dashboard (Method 1)
│        └─ Rollback in < 10 seconds
│
└─ NO → Minor issue or planned revert?
         │
         ├─ Need quick fix → Use Vercel CLI (Method 2)
         │
         └─ Permanent fix → Use Git Revert (Method 3)
                            └─ Full CI/CD validation
```

### Post-Rollback Actions

After performing a rollback:

1. **Verify application works:**
   ```bash
   curl https://brightflow-digital.vercel.app
   curl https://brightflow-digital.vercel.app/api/services
   ```

2. **Check Vercel Analytics:**
   - Monitor error rates
   - Verify traffic normalization
   - Check Core Web Vitals

3. **Notify stakeholders:**
   - Team members
   - End users (if necessary)
   - Document incident

4. **Root cause analysis:**
   - Identify what caused the issue
   - Document in post-mortem
   - Update tests to prevent recurrence

5. **Plan forward fix:**
   - Create hotfix branch
   - Fix the issue properly
   - Deploy through normal CI/CD

### Rollback Best Practices

**Before Rollback:**
- Verify the issue is not caused by external factors (DNS, CDN, database)
- Check if environment variables changed
- Review recent deployments timeline
- Identify last known good deployment

**During Rollback:**
- Use Vercel Dashboard for fastest rollback
- Document which deployment you're rolling back to
- Notify team immediately
- Monitor metrics during rollback

**After Rollback:**
- Keep problematic deployment for analysis
- Don't delete failed deployments
- Create post-mortem document
- Update monitoring/alerts if needed

### Testing Rollback (Staging)

Practice rollback on preview environment:

1. **Deploy to develop branch:**
   ```bash
   git checkout develop
   git push origin develop
   ```

2. **Trigger intentional "issue":**
   - Deploy with breaking change
   - Note the deployment URL

3. **Practice rollback:**
   - Use Vercel Dashboard to promote previous preview
   - Verify preview environment recovers

4. **Document the process:**
   - Time taken
   - Steps followed
   - Issues encountered

### Rollback Monitoring

After rollback, monitor these metrics for 15-30 minutes:

**Vercel Analytics:**
- Error rate (should decrease)
- Page load time (should normalize)
- 404/500 errors (should reduce)

**Application Health:**
```bash
# Continuous monitoring
watch -n 5 'curl -s -o /dev/null -w "%{http_code}\n" https://brightflow-digital.vercel.app'
```

**Database Connectivity:**
```bash
# Test API endpoint
curl https://brightflow-digital.vercel.app/api/services | jq '.success'
```

### Emergency Contacts

In case of rollback issues:

1. **Vercel Support:** support@vercel.com
2. **GitHub Support:** support@github.com
3. **MongoDB Atlas:** https://support.mongodb.com

### Rollback Checklist

**Pre-Rollback:**
- [ ] Issue confirmed in production
- [ ] Last stable deployment identified
- [ ] Team notified
- [ ] Stakeholders informed (if needed)
- [ ] Rollback method chosen

**During Rollback:**
- [ ] Rollback initiated via chosen method
- [ ] New deployment URL verified
- [ ] Basic functionality tested
- [ ] API endpoints responding
- [ ] Database connectivity confirmed

**Post-Rollback:**
- [ ] Full application testing completed
- [ ] Analytics checked (error rates normal)
- [ ] Users notified (if applicable)
- [ ] Incident documented
- [ ] Root cause analysis scheduled
- [ ] Forward fix planned

## Troubleshooting

### Problem: Build Fails on Vercel

**Error:** `Type error: Cannot find module '@/lib/mongodb'`

**Solution:**
```bash
# Verify tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Problem: MongoDB Connection Fails

**Error:** `MongoServerError: bad auth`

**Solution:**
1. Verify username and password in connection string
2. Check that user exists in MongoDB Atlas → Database Access
3. Ensure password doesn't contain unencoded special characters

**Encoding special characters:**
```javascript
// Password: p@ssw0rd!
// Encoded: p%40ssw0rd%21
```

### Problem: Environment Variables Not Loaded

**Error:** `MONGODB_URI is undefined`

**Solution:**
1. Vercel Dashboard → Settings → Environment Variables
2. Verify `MONGODB_URI` is present for Production/Preview
3. **Important:** After adding variables, trigger new deployment (Redeploy)

### Problem: IP Not Whitelisted

**Error:** `MongoServerError: not authorized on admin to execute command`

**Solution:**
1. MongoDB Atlas → Network Access
2. Add `0.0.0.0/0` (all IPs)
3. Vercel Edge Functions use dynamic IPs

### Problem: Slow Deployment or Timeout

**Symptom:** Build > 5 minutes or timeout

**Solution:**
```json
// vercel.json
{
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 10
    }
  }
}
```

### Problem: ISR Not Working

**Symptom:** Content not updating after 1 hour

**Verify:**
```typescript
// src/app/page.tsx
export const dynamic = 'force-static';
export const revalidate = 3600; // Must be present
```

**Force manual revalidation:**
```bash
# Trigger revalidation via API (if implemented)
curl -X POST https://brightflow-digital.vercel.app/api/revalidate
```

## Additional Resources

### Documentation

- [Vercel Deployment Docs](https://vercel.com/docs/deployments/overview)
- [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

### Useful Commands

```bash
# Vercel CLI
npm i -g vercel
vercel login
vercel --prod  # Deploy to production
vercel env ls  # List environment variables

# MongoDB CLI
mongosh "mongodb+srv://cluster.mongodb.net" --username user

# Git Flow
git flow init
git flow feature start name
git flow feature finish name
```

## Deployment Checklist

### Initial Setup

- [ ] GitHub repository created
- [ ] MongoDB Atlas cluster created
- [ ] Database user configured
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string obtained
- [ ] Database populated with seed
- [ ] Vercel account created
- [ ] Project imported on Vercel
- [ ] Environment variables configured
- [ ] Branch protection configured on GitHub
- [ ] CI/CD pipeline working

### Pre-Deploy

- [ ] Local tests pass (npm test)
- [ ] Local build works (npm run build)
- [ ] Type check OK (npm run type-check)
- [ ] Lint OK (npm run lint)
- [ ] MongoDB connection string tested
- [ ] Commit pushed to develop
- [ ] CI/CD pipeline green

### Production Deploy

- [ ] Merge develop → main
- [ ] Push to main
- [ ] Vercel deployment completed
- [ ] Production URL accessible
- [ ] API endpoint works
- [ ] MongoDB connected
- [ ] Analytics enabled
- [ ] Security headers present
- [ ] Performance optimal (<2s LCP)

### Post-Deploy

- [ ] Monitoring active
- [ ] Logs verified
- [ ] No runtime errors
- [ ] Database metrics normal
- [ ] Documentation updated

---

**Guide by Francesco di Biase** | Version 1.0 - February 2026

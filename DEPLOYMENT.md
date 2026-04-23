# TaskFlow Deployment Guide

This guide walks you through deploying TaskFlow to production on Vercel.

## Prerequisites

- GitHub account with your code repository
- Supabase account with a PostgreSQL project
- Vercel account (free tier available)

## Step-by-Step Deployment

### Step 1: Prepare Your Supabase Database

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in project details
   - Wait for project initialization

2. **Run Database Migrations**
   - Go to SQL Editor in Supabase console
   - Copy the content from `scripts/01-setup-database.sql`
   - Paste into the SQL Editor
   - Click "Run"

3. **Get Your Credentials**
   - Go to Settings > API
   - Copy these values:
     - Project URL (NEXT_PUBLIC_SUPABASE_URL)
     - anon public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
     - Service role key (SUPABASE_SERVICE_ROLE_KEY)
   - Go to Settings > Database to get JWT Secret (SUPABASE_JWT_SECRET)

### Step 2: Push Code to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: TaskFlow application"

# Add remote (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/taskflow.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. **Connect GitHub**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

2. **Configure Project**
   - Framework Preset: Next.js (should auto-detect)
   - Root Directory: ./ (default)
   - Click "Configure Project"

3. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key
   SUPABASE_SERVICE_ROLE_KEY = your_service_role_key
   SUPABASE_JWT_SECRET = your_jwt_secret
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - Wait for deployment to complete

5. **Access Your App**
   - Vercel will provide a URL (e.g., taskflow-seven.vercel.app)
   - Click to visit your deployed application

### Step 4: Setup Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Continuous Deployment

After initial deployment, your application will automatically deploy when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically builds and deploys
```

## Monitoring and Troubleshooting

### Check Deployment Logs

1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments"
4. Click on the deployment to see logs

### Common Issues

**Issue: Environment variables not found**
- Solution: Verify all environment variables are added in Vercel settings
- Make sure variable names match exactly

**Issue: Database connection fails**
- Solution: Check Supabase project is running
- Verify database URL and credentials are correct
- Test connection in local environment first

**Issue: Build fails with TypeScript errors**
- Solution: Check TypeScript compilation locally
- Run `npm run build` locally to reproduce the issue

### Database Backups

Supabase provides automatic daily backups. To manually backup:

1. Go to Supabase dashboard
2. Select your project
3. Click "Backups"
4. Click "Request a new backup"

## Performance Monitoring

### Vercel Analytics

1. Enable Analytics in Vercel project settings
2. View performance metrics in the dashboard
3. Identify bottlenecks

### Database Performance

Monitor your Supabase database:

1. Go to Supabase dashboard
2. Click "Logs"
3. Check slow queries
4. Optimize as needed

## Security Checklist

- [ ] All environment variables are set in Vercel
- [ ] JWT secret is strong and random
- [ ] Database is not publicly accessible
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Middleware is protecting private routes
- [ ] RLS policies are enabled in Supabase
- [ ] Backup strategy is in place

## Scaling Considerations

### Database
- Supabase scales automatically
- Monitor database size and connections
- Upgrade plan if needed

### Application
- Vercel handles auto-scaling
- Monitor resource usage
- Upgrade plan if needed

### API Rate Limiting
- Implement rate limiting for APIs
- Monitor API usage
- Consider implementing caching

## Updating Your Application

To update your application after deployment:

1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Vercel automatically deploys

## Rollback

If something goes wrong after deployment:

1. Go to Vercel project > Deployments
2. Find the previous working deployment
3. Click the three dots menu
4. Select "Promote to Production"

## Support and Documentation

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## Contact

For deployment issues, contact support@taskflow.app

---

Happy deploying! 🚀

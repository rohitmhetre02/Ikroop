# 🚀 Deploy Alumni Portal to Vercel

## Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Vercel account (free)

## Step-by-Step Deployment Guide

### 1. Reorganize Your Project Structure

First, run the reorganization script to move files to the proper structure:

```bash
# Make the script executable
chmod +x reorganize-project.sh

# Run the reorganization
./reorganize-project.sh
```

### 2. Test Locally

Ensure everything works locally before deploying:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000 to test
```

### 3. Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Alumni Portal ready for deployment"
```

### 4. Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/alumni-portal.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 5. Deploy to Vercel

#### Option A: Automatic Deployment (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. Click "Deploy"
6. Your site will be live in 1-2 minutes!

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: alumni-portal
# - Directory: ./
# - Overwrite settings? N
```

### 6. Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## 🔧 Build Configuration

Your project includes these configuration files:

### `vercel.json`
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### `vite.config.ts`
- Optimized build settings
- Code splitting for better performance
- Tailwind CSS v4 integration

### `package.json`
- All required dependencies
- Build scripts for Vercel
- Node.js 18+ requirement

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails - Missing Dependencies**
   ```bash
   npm install
   npm run build
   ```

2. **Tailwind Styles Missing**
   - Ensure `@tailwindcss/vite` is in devDependencies
   - Check `vite.config.ts` includes tailwindcss plugin

3. **Import Errors**
   - Verify all files are in `src/` directory
   - Check import paths are correct

4. **TypeScript Errors**
   ```bash
   npx tsc --noEmit
   ```

### Environment Variables

The project doesn't require environment variables for basic functionality. If you need to add any:

1. Create `.env.local` file (gitignored)
2. Add variables in Vercel dashboard: Settings → Environment Variables

## 📊 Performance Optimization

Your build includes:

- **Code Splitting**: Vendor chunks for better caching
- **Tree Shaking**: Unused code elimination  
- **Asset Optimization**: Automatic image and CSS optimization
- **CDN**: Global edge network delivery

## 🔄 Continuous Deployment

Once connected to GitHub:

- Every push to `main` triggers automatic deployment
- Pull requests get preview deployments
- Rollback capability to previous versions

## 📈 Monitoring

Monitor your deployment:

1. **Vercel Analytics**: Built-in analytics
2. **Function Logs**: Real-time log monitoring
3. **Performance Insights**: Core Web Vitals tracking

## 🎉 Next Steps After Deployment

1. **Custom Domain**: Add your domain for professional branding
2. **Analytics**: Set up detailed analytics tracking
3. **SEO**: Add meta tags and sitemap
4. **PWA**: Enable Progressive Web App features
5. **API Integration**: Connect real backend when needed

Your Alumni Portal is now live and ready to serve your alumni community! 🎓
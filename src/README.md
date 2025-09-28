# Alumni Portal

A comprehensive digital platform for centralized alumni data management and engagement built with React, TypeScript, Tailwind CSS v4, and modern UI components.

## 🚀 Live Demo

Deploy this project instantly to Vercel: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/alumni-portal)

## ✨ Features

- **📊 Dashboard**: Key metrics and recent activities overview with data visualization
- **👥 Alumni Directory**: Search and filter alumni with detailed profiles and contact management
- **📅 Event Management**: Create, manage, and track alumni events with RSVP functionality
- **📈 Analytics Dashboard**: Data visualization for engagement trends and demographics
- **🎨 Modern UI**: Clean, professional design with sidebar navigation
- **📱 Responsive**: Fully responsive design that works on all devices
- **🚫 No Auth Required**: Simplified experience with mock data system

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: Shadcn/ui component library
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel

## 🚀 Quick Start

### Option 1: Direct Deployment
1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Your app will be live in minutes!

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd alumni-portal
   ```

2. **Reorganize project structure (if needed)**
   ```bash
   chmod +x reorganize-project.sh
   ./reorganize-project.sh
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
alumni-portal/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/           # Shadcn/ui components
│   │   ├── figma/        # Figma-specific components
│   │   ├── AlumniDashboard.tsx
│   │   ├── AlumniDirectory.tsx
│   │   ├── EventManagement.tsx
│   │   ├── AnalyticsDashboard.tsx
│   │   └── AlumniPortalSidebar.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   ├── useAlumni.ts
│   │   ├── useEvents.ts
│   │   └── useAnalytics.ts
│   ├── lib/
│   │   ├── mockData.ts
│   │   ├── database.types.ts
│   │   └── supabase.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tsconfig.json
└── vercel.json
```

## 🎨 Design System

The project uses a custom design system built with Tailwind CSS v4:

- **Colors**: Professional blue and gray palette with dark mode support
- **Typography**: Consistent font sizes and weights across components
- **Spacing**: Harmonious spacing scale for consistent layouts
- **Components**: Reusable UI components following modern design patterns

## 📊 Mock Data System

The application includes a comprehensive mock data system that simulates:

- **Alumni Profiles**: 50+ realistic alumni profiles with various industries and graduation years
- **Events**: Upcoming and past events with attendance tracking
- **Analytics**: Engagement metrics, demographic data, and trend analysis
- **Activities**: Recent activities and interactions

## 🌟 Key Components

### Alumni Dashboard
- Overview metrics and KPIs
- Recent activities feed
- Quick action buttons
- Event highlights

### Alumni Directory
- Searchable and filterable alumni list
- Detailed profile cards
- Industry and graduation year filters
- Contact information management

### Event Management
- Event creation and editing
- RSVP tracking
- Event analytics
- Calendar integration

### Analytics Dashboard
- Alumni engagement trends
- Geographic distribution
- Industry breakdown
- Interactive charts and graphs

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the settings
   - Deploy!

### Environment Variables
No environment variables are required for the basic setup. The app uses mock data by default.

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Recharts](https://recharts.org/) for the charting library
- [Lucide](https://lucide.dev/) for the icon set

---

Built with ❤️ for alumni communities worldwide.
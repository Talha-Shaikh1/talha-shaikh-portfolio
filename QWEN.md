# Talha Shaikh Portfolio - Project Context

## Project Overview

This is a modern, AI-enhanced personal portfolio website for **Talha Shaikh**, a full-stack developer based in Pakistan. The portfolio showcases his skills, projects, and provides interactive features including an AI-powered chatbot assistant.

### Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4, CSS custom properties |
| **Animations** | Framer Motion |
| **Icons** | Lucide React, React Icons |
| **Theme** | next-themes (light/dark mode) |
| **UI Components** | shadcn/ui (New York style) |
| **AI Integration** | OpenAI SDK via OpenRouter API |
| **Email** | Resend API |
| **Linting** | ESLint 9 (Next.js config) |

### Architecture

```
talha-shaikh-portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts      # AI chatbot endpoint (OpenRouter)
│   │   │   └── contact/route.ts   # Contact form handler (Resend)
│   │   ├── globals.css            # Tailwind + custom CSS variables
│   │   ├── layout.tsx             # Root layout with ThemeProvider
│   │   └── page.tsx               # Main single-page portfolio
│   └── components/
│       ├── Navbar.tsx             # Navigation header
│       ├── Hero.tsx               # Hero section with animations
│       ├── About.tsx              # About section
│       ├── Skills.tsx             # Skills showcase
│       ├── Projects.tsx           # Project gallery
│       ├── Contact.tsx            # Contact form
│       ├── ChatWidget.tsx         # AI chatbot floating widget
│       └── theme-provider.tsx     # Theme context wrapper
├── components/ui/                 # shadcn/ui primitives
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   └── textarea.tsx
├── lib/
│   └── utils.ts                   # Utility functions (cn helper)
└── public/                        # Static assets (SVGs)
```

## Building and Running

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens [http://localhost:3000](http://localhost:3000) with hot reload.

### Production Build

```bash
npm run build    # Build for production
npm run start    # Start production server
```

### Linting

```bash
npm run lint
```

### Environment Variables

Create a `.env.local` file:

```env
# AI Chatbot (OpenRouter - free tier available)
OPENROUTER_API_KEY=your_openrouter_api_key

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key
MY_EMAIL=your_personal_email@example.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Key Features

### 1. Animated Hero Section
- Particle field canvas background
- Glitch text effect on name
- Typewriter effect for role descriptions
- 3D card tilt effect on mouse movement
- Animated gradient blobs

### 2. AI Chatbot Widget
- Floating action button (FAB) with pulse animation
- Contextual AI assistant powered by OpenRouter's free LLM
- Pre-configured system prompt with portfolio information
- Suggestion chips for common questions
- Typing indicators and smooth animations
- Theme-aware styling (light/dark mode)

### 3. Contact Form
- Server-side validation
- Dual email delivery via Resend:
  - Notification to Talha with styled HTML email
  - Auto-reply confirmation to sender
- Professional email templates with gradient headers

### 4. Design System
- **Color Palette**: Purple/violet primary (`#7c3aed`, `#8b5cf6`) with pink accents
- **Typography**: Syne (headings), DM Sans (body), Inter (fallback)
- **Theme**: Light/dark mode with CSS custom properties
- **Animations**: Framer Motion throughout with spring physics
- **Glass morphism**: Backdrop blur effects on cards and overlays

## Development Conventions

### Code Style
- **TypeScript**: Strict mode enabled
- **Imports**: Path aliases (`@/*` → root directory)
- **Components**: Functional components with hooks
- **Styling**: Tailwind-first with inline styles for dynamic values

### Component Patterns
- All interactive components use `'use client'` directive
- Theme-aware components use `useTheme()` hook with mounted state check
- Animations use Framer Motion's `motion` components
- Custom fonts loaded via Google Fonts with inline `<style>` tags

### File Naming
- Components: PascalCase (e.g., `ChatWidget.tsx`)
- Routes: lowercase with segments (e.g., `api/chat/route.ts`)
- Styles: globals.css with CSS custom properties

## API Endpoints

### POST /api/chat
AI chatbot endpoint using OpenRouter API.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "What is Talha's tech stack?" }
  ]
}
```

**Response:**
```json
{
  "message": "Talha specializes in Next.js, TypeScript, React..."
}
```

### POST /api/contact
Contact form handler using Resend.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true
}
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Environment-Specific Configs

- **Development**: Localhost with hot reload
- **Production**: Optimized build with `next build`

## Common Tasks

### Adding a New Section
1. Create component in `src/components/`
2. Import and add to `src/app/page.tsx`
3. Ensure responsive design with Tailwind breakpoints

### Updating AI Chatbot Knowledge
Edit the `SYSTEM_PROMPT` constant in `src/app/api/chat/route.ts`

### Customizing Theme
Modify CSS custom properties in `src/app/globals.css`:
- `--primary`: Main brand color
- `--background` / `--foreground`: Base colors
- `.dark` class overrides for dark mode

## Troubleshooting

### Chat not working
- Verify `OPENROUTER_API_KEY` is set
- Check OpenRouter account has available credits/free model access

### Email not sending
- Verify `RESEND_API_KEY` is valid
- Ensure sender domain is verified in Resend dashboard
- Check `MY_EMAIL` environment variable

### Build errors
- Run `npm run lint` to catch TypeScript/ESLint issues
- Clear `.next` folder and rebuild

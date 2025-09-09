# Jose's Portfolio - Claude Code Context

## Project Overview
Personal portfolio website for Jose Luis Sanchez, Lead Product Designer specializing in banking/fintech solutions. Deployed at https://jose.run

## Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: TailwindCSS with custom CSS variables
- **Animations**: Framer Motion  
- **i18n**: react-i18next (English/Spanish)
- **Images**: react-lazy-load-image-component
- **Deployment**: GitHub Pages
- **Domain**: jose.run (custom domain configured)

## Development Approach
- **Design**: Mobile-first responsive design
- **Testing**: None configured (explicitly no testing framework)
- **Linting**: ESLint only (no Prettier)
- **Performance**: Lazy loading for videos and images
- **State**: React hooks only (no external state management)

## Project Structure
```
/src
  /components
    - Header.jsx (navigation with i18n)
    - Hero.jsx (main section with parallax effect)
    - Jobs.jsx (projects showcase with masonry grid)
    - Highlights.jsx (about section)
    - Footer.jsx (contact info)
    - CustomCursor.jsx (custom cursor effects)
  /locales
    - en.json (English translations)
    - es.json (Spanish translations)
  /assets
    - Media files and images
  /hooks
    - useResumeLink.js (resume functionality)
```

## Deployment Workflow
1. Build the app: `npm run build`
2. Copy build files from `/dist` to root directory of project
3. Push to GitHub (deploys automatically to GitHub Pages)

## Key Features
- **Bilingual**: EN/ES with dropdown language selector (desktop only)
- **Custom Cursor**: Interactive cursor effects throughout
- **Parallax Effects**: Hero section image moves on scroll
- **Video Portfolio**: Project showcase with lazy-loaded videos
- **Responsive Grid**: Masonry-style project layout
- **Custom Fonts**: TT Norms Pro font family
- **Performance**: Intersection Observer for video loading

## Content Strategy
- **Projects**: Videos and content change as development progresses
- **Languages**: Only English and Spanish (no plans for additional languages)
- **Assets**: Various video formats (V1.mp4, R1.mp4, etc.) and design elements

## Design System
- **Colors**: CSS custom properties (primary, secondary, tertiary, background, etc.)
- **Typography**: TT Norms Pro with various weights (400, 800, 1000)
- **Components**: Consistent styling with backdrop blur effects
- **Animations**: Custom keyframes for float and fadeInUp effects

## Development Notes
- **No SEO strategy** currently implemented
- **No testing framework** - avoid suggesting test implementations
- **Component patterns**: Functional components with hooks
- **Video handling**: Custom LazyVideo component with intersection observer
- **Styling approach**: TailwindCSS with custom CSS variables for theming

## Files to Watch
- Package.json dependencies may change during development
- Jobs.jsx has recent modifications (per git status)
- Design folder contains footer assets (about me.png, linkedin.svg, etc.) - **NOT YET IMPLEMENTED** (future development phase)

## Development Phases
- **Current Phase**: Core portfolio functionality
- **Future Phase**: Footer enhancement with design assets from /design folder
- **Approach**: Working in stages - will be notified when ready for next phase

## Performance Considerations
- Videos are lazy-loaded using Intersection Observer
- Images use react-lazy-load-image-component with blur effect
- Parallax effects use requestAnimationFrame for smooth performance
- Mobile-first responsive design prioritizes mobile performance
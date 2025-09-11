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

## Recent Session Completed (Sept 9, 2025)
**Major updates and bug fixes implemented:**

### Footer Redesign (COMPLETED)
- Two-section footer: dark floating island + light bottom section
- Dark section: 3-column grid (Contact title | Links & Resume | Navigation with divider)
- Light section: Centered logo + copyright + language selector
- Added interactive language switching in resume description text
- Fixed "Resume - Españo" typo to proper translations

### UX/UI Enhancements (COMPLETED)
- **Project Tags**: Centered technology tags in all project cards (bottom-center positioning)
- **Navigation**: Fixed home link with smooth scroll to top functionality  
- **Hero Image**: Adjusted positioning to prevent jump on scroll (parallax alignment)
- **Language Switching**: Moved from hero to header, unified typography
- **CTA Improvements**: Full-width mobile support, blue glow effects on secondary CTAs

### Translation System (COMPLETED)
- Fixed resume text translations: "Hoja de vida - Español" (ES) / "Resume - English" (EN)
- Added interactive language links in footer descriptions with underline styling
- Updated job CTA with two-line formatting and HTML rendering support

### Content Updates (COMPLETED)
- Updated project technologies in both EN/ES locale files
- Enhanced project descriptions with proper HTML formatting
- Added proper spacing normalization across all sections (py-16 lg:py-40)

### Resume Files Management (COMPLETED)
- Updated resume PDFs: `JoseSanchez_CV_ENG_run@jose.run.pdf` & `JoseSanchez_CV_ESP_run@jose.run.pdf`
- Proper deployment workflow: public/Content → build → root/Content → GitHub Pages
- Fixed development server conflicts by ensuring proper index.html src references

## Current State
- **Status**: Production-ready and deployed at https://jose.run
- **Last Deploy**: Sept 9, 2025 (commit: 90a8652)
- **Resume Files**: Latest versions successfully deployed
- **Known Issues**: None - all reported bugs fixed

## Development Environment
- **Dev Server**: Run `npm run dev` for development (port 5173)
- **Build Process**: `npm run build` → copy dist/* to root → copy public/* to root → git push
- **Important**: Always ensure index.html points to `/src/main.jsx` for dev, gets updated to production assets during build

## Performance Considerations
- Videos are lazy-loaded using Intersection Observer
- Images use react-lazy-load-image-component with blur effect
- Parallax effects use requestAnimationFrame for smooth performance
- Mobile-first responsive design prioritizes mobile performance

## Files to Watch
- Resume PDFs in `public/Content/` and root `Content/` must stay synchronized
- Jobs.jsx project technologies updated with latest content
- Footer.jsx has complex two-section layout with interactive elements
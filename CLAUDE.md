# Gold Center - AI Development Guide

## Tech Stack
- **Framework:** Next.js 15.3.5 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4.x (stable version for Windows compatibility)
- **Database:** PostgreSQL via Supabase
- **MCP Integration:** PostgreSQL MCP server for direct database access
- **Authentication:** Supabase Auth
- **State Management:** Zustand (client), React Server Components (server)
- **UI Components:** Shadcn/UI built on Radix UI
- **Forms:** React Hook Form + Zod validation
- **Payments:** Stripe
- **Email:** Resend
- **Deployment:** Vercel

## Project Structure
```
src/
├── app/                  # Next.js App Router pages and layouts
│   ├── (admin)/          # Admin panel routes
│   ├── (shop)/           # Customer-facing routes
│   ├── api/              # API route handlers
│   └── globals.css       # Global styles and Tailwind directives
├── components/           # React components
│   ├── features/         # Feature-specific components
│   ├── layout/           # Layout components (Navbar, Footer)
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions and database helpers
│   ├── db.ts             # Supabase client
│   ├── utils.ts          # General utilities (cn, formatPrice)
│   └── validators.ts     # Zod schemas
├── styles/               # Additional styles (rarely used)
└── types/                # TypeScript type definitions
```

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler
- `npm run test` - Run tests (when implemented)

## Code Style

### TypeScript
- Use strict mode - never use `any`, use `unknown` instead
- Explicit types for all function parameters and return values
- Use `type` for component props and object shapes
- Prefer type assertions over type casting

### React/Next.js
- **Server Components First:** All components are Server Components by default
- Only use `"use client"` when absolutely necessary (user interactions, hooks)
- Data fetching in Server Components with async/await
- Use proper loading and error boundaries
- **Next.js 15 Async Params:** Always use `await params` in page components for route params

### Styling
- **Tailwind CSS only** - no custom CSS files or modules
- Use `cn` utility from `@/lib/utils` for conditional classes
- Define custom values in `tailwind.config.ts` theme.extend
- No arbitrary values like `className="top-[13px]"`
- Sort classes with prettier-plugin-tailwindcss

### File Naming
- Components: `PascalCase.tsx` (e.g., `ProductCard.tsx`)
- Other files: `kebab-case.ts` (e.g., `db-utils.ts`)
- Folders: `kebab-case`

## Database Guidelines
- Use Supabase client from `@/lib/db.ts`
- Never write raw SQL queries
- Trust RLS policies for security
- Use MCP PostgreSQL server for direct database operations when needed
- Follow schema patterns from `documentation/01_database_schema/`

## Development Workflow
1. Always reference `documentation/` before coding
2. Break tasks into manageable steps
3. Use Server Components by default
4. Implement proper error handling
5. Test thoroughly before committing
6. Follow conventional commit messages
7. **Update TODO.md after every completed task** - Mark completed tasks with [x] and update progress status

## Key Patterns
- Use `cn()` for conditional styling
- Implement proper loading states
- Handle errors gracefully
- Use Zod for validation
- Follow the established component patterns
- Maintain consistency with existing code

## Do Not
- Create custom CSS files
- Use `any` type
- Bypass TypeScript strict mode
- Write raw SQL queries
- Skip error handling
- Ignore existing patterns
- Edit files in `documentation/` without explicit permission
- Use `@apply` outside of `globals.css`
- Create components without proper TypeScript types

## MCP Integration
This project uses PostgreSQL MCP server integration for direct database access. The MCP server provides:
- Direct SQL query execution
- Database schema inspection
- Migration management
- Real-time database monitoring

When using MCP tools, always ensure proper security practices and follow the established database access patterns.

## CSS Setup & Known Issues

### Tailwind CSS Configuration
- **Version:** 3.4.x (stable, Windows compatible)
- **Reason:** Tailwind CSS 4.x has LightningCSS Windows compatibility issues
- **PostCSS Config:** Standard Tailwind CSS 3.x setup with autoprefixer
- **Custom Variables:** Gold theme colors defined in `globals.css` `:root` section

### CSS Problem Resolution
If CSS stops working:
1. Ensure Tailwind CSS 3.x is installed (not 4.x)
2. Check PostCSS config uses `tailwindcss: {}` format
3. Verify `@tailwind` directives in `globals.css`
4. For Windows: Avoid Tailwind CSS 4.x due to LightningCSS binary issues

### Build & Development
- **Development:** `npm run dev` (standard Next.js, no Turbopack by default)
- **Production:** `npm run build` - fully functional with type checking
- **Linting:** ESLint configured for React and TypeScript strict mode

## Current Phase
**Phase 1 MVP:** Basic product catalog with WhatsApp integration
- ✅ CSS and build system fully functional
- ✅ Next.js 15 compatibility achieved
- ✅ TypeScript strict mode enforced
- Focus on product display and catalog functionality
- WhatsApp-based ordering system
- Basic responsive design
- Core e-commerce foundations

Refer to `TODO.md` for detailed development roadmap and `documentation/00_project_overview.md` for comprehensive project context.
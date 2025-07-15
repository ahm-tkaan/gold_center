import { z } from 'zod'

const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Supabase configuration
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),

  // Optional database direct connection (for connection pooling)
  DATABASE_URL: z.string().optional(),

  // Vercel deployment
  VERCEL_URL: z.string().optional(),
  VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional(),

  // Feature flags
  ENABLE_ANALYTICS: z.string().default('false').transform((val: string) => val === 'true'),
  ENABLE_ERROR_REPORTING: z.string().default('false').transform((val: string) => val === 'true'),
})

export type Environment = z.infer<typeof envSchema>

let cachedEnv: Environment | null = null

export function getEnvironment(): Environment {
  if (cachedEnv) {
    return cachedEnv
  }

  try {
    const env = envSchema.parse(process.env)
    cachedEnv = env
    return env
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:')
      error.issues.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`)
      })
      
      throw new Error('Environment validation failed. Please check your environment variables.')
    }
    
    throw error
  }
}

export function validateEnvironment(): boolean {
  try {
    getEnvironment()
    return true
  } catch {
    return false
  }
}

export function isDevelopment(): boolean {
  return getEnvironment().NODE_ENV === 'development'
}

export function isProduction(): boolean {
  return getEnvironment().NODE_ENV === 'production'
}

export function isVercelDeployment(): boolean {
  return !!getEnvironment().VERCEL_URL
}

export function getSupabaseConfig() {
  const env = getEnvironment()
  
  return {
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    databaseUrl: env.DATABASE_URL
  }
}

export function getDeploymentInfo() {
  const env = getEnvironment()
  
  return {
    environment: env.NODE_ENV,
    isVercel: isVercelDeployment(),
    vercelEnv: env.VERCEL_ENV,
    vercelUrl: env.VERCEL_URL
  }
}

// Startup validation
if (typeof window === 'undefined') {
  // Only validate on server-side
  try {
    validateEnvironment()
    console.log('✅ Environment validation passed')
  } catch (error) {
    console.error('❌ Environment validation failed during startup')
    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    }
  }
}
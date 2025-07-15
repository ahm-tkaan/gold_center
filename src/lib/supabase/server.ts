import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseConfig } from '@/lib/env-validation'
import { DatabaseError, logError } from '@/lib/error-handling'

export async function createClient() {
  // Don't cache client during static generation
  // Each request should get a fresh client

  try {
    const cookieStore = await cookies()
    const config = getSupabaseConfig()

    if (!config.url || !config.anonKey) {
      throw new DatabaseError(
        'SUPABASE_CONFIG_ERROR',
        'Supabase configuration is missing or invalid',
        'critical',
        { url: !!config.url, anonKey: !!config.anonKey }
      )
    }

    const client = createServerClient(
      config.url,
      config.anonKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch (error) {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
              logError(new DatabaseError(
                'COOKIE_SET_ERROR',
                'Failed to set cookies in server component',
                'low',
                { error: error instanceof Error ? error.message : 'Unknown error' }
              ))
            }
          },
        },
        global: {
          headers: {
            'X-Client-Info': 'gold-center-server',
          },
        },
      }
    )

    // Test connection only if not in production to avoid extra overhead
    if (process.env.NODE_ENV !== 'production') {
      try {
        const { error } = await client.from('categories').select('count', { count: 'exact' }).limit(1)
        if (error) {
          throw new DatabaseError(
            'DATABASE_CONNECTION_TEST_FAILED',
            `Database connection test failed: ${error.message}`,
            'high',
            { supabaseError: error }
          )
        }
      } catch (testError) {
        logError(new DatabaseError(
          'DATABASE_CONNECTION_TEST_ERROR',
          'Failed to test database connection',
          'medium',
          { error: testError instanceof Error ? testError.message : 'Unknown error' }
        ))
      }
    }

    return client

  } catch (error) {
    if (error instanceof DatabaseError) {
      logError(error)
      throw error
    }
    
    const dbError = new DatabaseError(
      'SUPABASE_CLIENT_CREATION_ERROR',
      'Failed to create Supabase client',
      'critical',
      { error: error instanceof Error ? error.message : 'Unknown error' }
    )
    
    logError(dbError)
    throw dbError
  }
}

export async function healthCheck(): Promise<{ status: 'healthy' | 'unhealthy', details?: unknown }> {
  try {
    const client = await createClient()
    const { error } = await client.from('categories').select('count', { count: 'exact' }).limit(1)
    
    if (error) {
      return {
        status: 'unhealthy',
        details: { error: error.message }
      }
    }
    
    return {
      status: 'healthy',
      details: { connectionTest: 'passed' }
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      details: { error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}
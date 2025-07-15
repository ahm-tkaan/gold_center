import { NextRequest, NextResponse } from 'next/server'
import { healthCheck } from '@/lib/supabase/server'
import { getDeploymentInfo } from '@/lib/env-validation'
import { handleApiError } from '@/lib/error-handling'

export async function GET(request: NextRequest) {
  try {
    const deploymentInfo = getDeploymentInfo()
    const dbHealth = await healthCheck()
    
    const healthStatus = {
      status: dbHealth.status === 'healthy' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      environment: deploymentInfo.environment,
      deployment: {
        isVercel: deploymentInfo.isVercel,
        vercelEnv: deploymentInfo.vercelEnv,
        vercelUrl: deploymentInfo.vercelUrl
      },
      database: {
        status: dbHealth.status,
        details: dbHealth.details
      },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version
    }

    const status = healthStatus.status === 'healthy' ? 200 : 503
    
    return NextResponse.json(healthStatus, { status })
  } catch (error) {
    return handleApiError(error, request)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Deep health check - can be triggered manually
    const dbHealth = await healthCheck()
    
    const deepHealthCheck = {
      status: dbHealth.status === 'healthy' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      checks: {
        database: dbHealth,
        environment: {
          status: 'healthy',
          details: { configurationValid: true }
        },
        memory: {
          status: process.memoryUsage().heapUsed < 100 * 1024 * 1024 ? 'healthy' : 'warning',
          details: process.memoryUsage()
        }
      }
    }

    const status = deepHealthCheck.status === 'healthy' ? 200 : 503
    
    return NextResponse.json(deepHealthCheck, { status })
  } catch (error) {
    return handleApiError(error, request)
  }
}
import { NextRequest, NextResponse } from 'next/server'

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical'

export interface AppError {
  code: string
  message: string
  severity: ErrorSeverity
  context?: Record<string, unknown>
  timestamp: Date
  userAgent?: string
  url?: string
}

export class DatabaseError extends Error {
  public readonly code: string
  public readonly severity: ErrorSeverity
  public readonly context?: Record<string, any>

  constructor(
    code: string,
    message: string,
    severity: ErrorSeverity = 'high',
    context?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'DatabaseError'
    this.code = code
    this.severity = severity
    this.context = context
  }
}

export class ValidationError extends Error {
  public readonly code: string
  public readonly severity: ErrorSeverity
  public readonly context?: Record<string, any>

  constructor(
    code: string,
    message: string,
    severity: ErrorSeverity = 'medium',
    context?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'ValidationError'
    this.code = code
    this.severity = severity
    this.context = context
  }
}

export class ExternalServiceError extends Error {
  public readonly code: string
  public readonly severity: ErrorSeverity
  public readonly context?: Record<string, any>

  constructor(
    code: string,
    message: string,
    severity: ErrorSeverity = 'medium',
    context?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'ExternalServiceError'
    this.code = code
    this.severity = severity
    this.context = context
  }
}

export function logError(error: AppError | Error, request?: NextRequest): void {
  const errorData: AppError = error instanceof Error ? {
    code: error.name || 'UNKNOWN_ERROR',
    message: error.message,
    severity: 'high',
    context: error instanceof DatabaseError || error instanceof ValidationError || error instanceof ExternalServiceError 
      ? error.context 
      : undefined,
    timestamp: new Date(),
    userAgent: request?.headers.get('user-agent') || undefined,
    url: request?.url || undefined
  } : error

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('🚨 Application Error:', {
      code: errorData.code,
      message: errorData.message,
      severity: errorData.severity,
      context: errorData.context,
      timestamp: errorData.timestamp,
      userAgent: errorData.userAgent,
      url: errorData.url
    })
  }

  // In production, you would send to monitoring service
  // Example: Sentry, LogRocket, etc.
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to monitoring service
    console.error('Production Error:', errorData)
  }
}

export function handleApiError(error: unknown, request?: NextRequest): NextResponse {
  let appError: AppError

  if (error instanceof DatabaseError) {
    appError = {
      code: error.code,
      message: error.message,
      severity: error.severity,
      context: error.context,
      timestamp: new Date(),
      userAgent: request?.headers.get('user-agent') || undefined,
      url: request?.url || undefined
    }
  } else if (error instanceof ValidationError) {
    appError = {
      code: error.code,
      message: error.message,
      severity: error.severity,
      context: error.context,
      timestamp: new Date(),
      userAgent: request?.headers.get('user-agent') || undefined,
      url: request?.url || undefined
    }
  } else if (error instanceof Error) {
    appError = {
      code: 'INTERNAL_SERVER_ERROR',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      severity: 'critical',
      timestamp: new Date(),
      userAgent: request?.headers.get('user-agent') || undefined,
      url: request?.url || undefined
    }
  } else {
    appError = {
      code: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred',
      severity: 'critical',
      timestamp: new Date(),
      userAgent: request?.headers.get('user-agent') || undefined,
      url: request?.url || undefined
    }
  }

  logError(appError, request)

  const statusCode = getStatusCodeFromError(appError)
  
  return NextResponse.json(
    {
      error: {
        code: appError.code,
        message: appError.message,
        timestamp: appError.timestamp
      }
    },
    { status: statusCode }
  )
}

function getStatusCodeFromError(error: AppError): number {
  switch (error.code) {
    case 'VALIDATION_ERROR':
    case 'INVALID_INPUT':
      return 400
    case 'UNAUTHORIZED':
      return 401
    case 'FORBIDDEN':
      return 403
    case 'NOT_FOUND':
      return 404
    case 'CONFLICT':
      return 409
    case 'RATE_LIMIT_EXCEEDED':
      return 429
    case 'DATABASE_CONNECTION_ERROR':
    case 'DATABASE_TIMEOUT':
    case 'EXTERNAL_SERVICE_ERROR':
      return 503
    default:
      return 500
  }
}

// Removed - using React Error Boundary component instead

export function withErrorHandling<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  errorCode: string = 'FUNCTION_ERROR'
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args)
    } catch (error) {
      if (error instanceof DatabaseError || error instanceof ValidationError || error instanceof ExternalServiceError) {
        throw error
      }
      
      throw new DatabaseError(
        errorCode,
        error instanceof Error ? error.message : 'Unknown error occurred',
        'high',
        { originalError: error }
      )
    }
  }
}
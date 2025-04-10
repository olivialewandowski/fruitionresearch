import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Detailed health check endpoint that includes database connectivity
 *
 * This endpoint:
 * 1. Checks basic application health
 * 2. Verifies Supabase database connectivity
 * 3. Returns detailed health information
 *
 * @returns NextResponse with detailed health status
 */
export async function GET() {
  // Initialize response object
  const healthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    services: {
      database: {
        status: 'unknown',
        latency: 0,
        error: null,
      },
    },
  };

  // Check Supabase connectivity if credentials are available
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const startTime = Date.now();

      // Initialize Supabase client
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );

      // Perform a simple query to check connectivity
      const { error } = await supabase.from('_health_check').select('count').limit(1);

      // Calculate latency
      const latency = Date.now() - startTime;

      if (error) {
        // Database error
        healthCheck.services.database = {
          status: 'error',
          latency,
          error: error.message,
        };

        // If database is down, mark overall status as degraded
        healthCheck.status = 'degraded';
      } else {
        // Database is healthy
        healthCheck.services.database = {
          status: 'ok',
          latency,
          error: null,
        };
      }
    } catch (error) {
      // Unexpected error during health check
      healthCheck.services.database = {
        status: 'error',
        latency: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };

      // If database is down, mark overall status as degraded
      healthCheck.status = 'degraded';
    }
  } else {
    // No database credentials available
    healthCheck.services.database = {
      status: 'skipped',
      latency: 0,
      error: 'Database credentials not configured',
    };
  }

  // Determine HTTP status code based on health status
  let statusCode = 200;
  if (healthCheck.status === 'degraded') {
    statusCode = 503; // Service Unavailable
  }

  // Return response with appropriate status code
  return NextResponse.json(healthCheck, {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}

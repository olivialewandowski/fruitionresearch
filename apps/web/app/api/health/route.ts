import { NextResponse } from 'next/server';

/**
 * Health check endpoint for Docker and monitoring systems
 *
 * This endpoint:
 * 1. Returns a 200 OK status when the application is running correctly
 * 2. Includes basic application information
 * 3. Can be extended to include more detailed health metrics
 *
 * @returns NextResponse with health status and application info
 */
export async function GET() {
  // Basic health check response
  const healthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
  };

  // Return 200 OK with health check data
  return NextResponse.json(healthCheck, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}

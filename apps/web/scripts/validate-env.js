const requiredEnvVars = {
  // Public variables (available in browser)
  NEXT_PUBLIC_SUPABASE_URL: 'Supabase project URL',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'Supabase anonymous key',

  // Private variables (server-side only)
  SUPABASE_SERVICE_ROLE_KEY: 'Supabase service role key',
  SUPABASE_JWT_SECRET: 'Supabase JWT secret',
};

function validateEnv() {
  const missingVars = [];
  const invalidVars = [];

  // Check for missing variables
  for (const [key, description] of Object.entries(requiredEnvVars)) {
    if (!process.env[key]) {
      missingVars.push(`${key} (${description})`);
    }
  }

  // Validate URL format for Supabase URL
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://')
  ) {
    invalidVars.push('NEXT_PUBLIC_SUPABASE_URL must be a valid HTTPS URL');
  }

  // Report any issues
  if (missingVars.length > 0 || invalidVars.length > 0) {
    console.error('Environment validation failed:');
    if (missingVars.length > 0) {
      console.error('Missing required environment variables:');
      missingVars.forEach(v => console.error(`  - ${v}`));
    }
    if (invalidVars.length > 0) {
      console.error('Invalid environment variables:');
      invalidVars.forEach(v => console.error(`  - ${v}`));
    }
    process.exit(1);
  }

  console.log('Environment validation passed');
}

validateEnv();

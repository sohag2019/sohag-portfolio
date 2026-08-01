import { createClient } from '@supabase/supabase-js';
import {
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_URL,
  isSupabaseAdminConfigured,
} from './config';

/**
 * Service-role client for trusted server contexts only (scheduled jobs,
 * the GitHub stats recompute cron). NEVER import this into client components.
 */
export function createSupabaseAdminClient() {
  if (!isSupabaseAdminConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY // Using service role key instead of anon key

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

export const clearTable = async (tableName: string) => {
  const { error } = await supabase.from(tableName).delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (error) console.error(`Error clearing ${tableName}:`, error)
}

export { supabase }

import { createClient } from '@supabase/supabase-js'

// These will be automatically populated by Lovable's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export const createTables = async () => {
  // Students table
  const { error: studentsError } = await supabase.rpc('create_students_table')
  if (studentsError) console.log('Students table might already exist')

  // Fee payments table
  const { error: paymentsError } = await supabase.rpc('create_payments_table')
  if (paymentsError) console.log('Payments table might already exist')

  // Transcripts table
  const { error: transcriptsError } = await supabase.rpc('create_transcripts_table')
  if (transcriptsError) console.log('Transcripts table might already exist')
}
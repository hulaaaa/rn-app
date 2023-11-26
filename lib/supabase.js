import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://waotqiccymmikmwadsdl.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indhb3RxaWNjeW1taWttd2Fkc2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3Njk5MzMsImV4cCI6MjAxNjM0NTkzM30.gebTHsX7r3ccziLmgUShNbDa9LzTg1pfVdO1j3GAfzo"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
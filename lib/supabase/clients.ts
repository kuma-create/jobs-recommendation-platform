import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/database" // ← 次章参照

export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
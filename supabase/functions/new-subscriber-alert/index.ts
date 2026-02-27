// supabase/functions/new-subscriber-alert/index.ts
// Standard Deno import for Supabase Edge Functions
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Get the API key from Supabase Secrets
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    // 1. Primanje podataka iz Database Webhook-a
    // Supabase webhook šalje JSON koji sadrži 'record' (novi red u bazi)
    const { record } = await req.json()

    // 2. Slanje maila tebi (Adminu) preko Resend API-ja
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'System <onboarding@resend.dev>',
        to: 'ahalvadzija@proton.me',
        subject: '🔔 Novi Pretplatnik!',
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
            <h3 style="color: #4a90e2;">Neko se upravo prijavio!</h3>
            <p><strong>Ime:</strong> ${record.name || 'Nije navedeno'}</p>
            <p><strong>Email:</strong> ${record.email}</p>
            <p><strong>Datum:</strong> ${new Date(record.created_at).toLocaleString()}</p>
            <hr>
            <p style="font-size: 12px; color: #888;">Poslano sa Supabase Edge funkcije.</p>
          </div>
        `,
      }),
    })

    const result = await res.json()
    
    return new Response(JSON.stringify(result), { 
      headers: { "Content-Type": "application/json" },
      status: 200 
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
})
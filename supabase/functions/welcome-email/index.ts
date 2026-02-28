// supabase/functions/welcome-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Retrieve the API key from Supabase Edge Function secrets
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    // The 'record' object contains the row data inserted into your database
    const { record } = await req.json()

    // Sending the email via Resend API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Adnan <onboarding@resend.dev>', // Use your verified domain once set up
        to: record.email,
        subject: 'Welcome to my Newsletter!',
        html: `
          <h1>Hi ${record.name}!</h1>
          <p>Thanks for subscribing to my newsletter. I'm excited to share updates about Java, systems engineering, and my latest projects with you.</p>
          <p>Stay tuned!</p>
          <br>
          <p>Best regards,<br>Adnan Halvadžija</p>
        `,
      }),
    })

    const data = await res.json()
    
    return new Response(JSON.stringify(data), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    })

  } catch (error) {
    // Basic error handling for the Edge Function
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    })
  }
})
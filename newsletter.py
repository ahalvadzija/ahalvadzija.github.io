import resend
from supabase import create_client
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration from environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY") # Ensure this is the secret service role key
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
MY_EMAIL = "ahalvadzija@proton.me"

# Initialize clients
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
resend.api_key = RESEND_API_KEY

def notify_me():
    """
    Fetches all subscribers from Supabase and sends a summary report via Resend.
    """
    try:
        # Fetch subscribers from the database
        # We only take the necessary fields: name, email, and join date
        response = supabase.table("newsletter_subscribers") \
            .select("email, name, created_at") \
            .execute()
        
        subscribers = response.data

        if not subscribers:
            print("Status: No subscribers found in the database.")
            return

        # Build HTML list for the email body
        sub_list_items = ""
        for sub in subscribers:
            sub_list_items += f"<li><strong>{sub['name']}</strong> ({sub['email']}) - Joined: {sub['created_at']}</li>"
        
        # Prepare and send the email via Resend
        email_payload = {
            "from": "Newsletter System <onboarding@resend.dev>",
            "to": MY_EMAIL,
            "subject": f"Newsletter Report: {len(subscribers)} Subscribers",
            "html": f"""
                <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                    <h2>Newsletter Statistics</h2>
                    <p>You currently have <strong>{len(subscribers)}</strong> subscribers in your database.</p>
                    <ul style="background: #f4f4f4; padding: 20px; border-radius: 8px; list-style: none;">
                        {sub_list_items}
                    </ul>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #888;">
                        <i>This is an automated report from your portfolio backend system.</i>
                    </p>
                </div>
            """
        }

        resend.Emails.send(email_payload)
        print(f"✓ Success: Notification sent to {MY_EMAIL}")

    except Exception as e:
        print(f"✗ Error: Failed to process notification: {e}")

if __name__ == "__main__":
    notify_me()
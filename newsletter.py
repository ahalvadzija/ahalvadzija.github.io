import resend
from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
RESEND_API_KEY = os.getenv("RESEND_API_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
resend.api_key = RESEND_API_KEY

def notify_me():
    response = supabase.table("newsletter_subscribers").select("email, name, created_at").execute()
    subscribers = response.data

    if not subscribers:
        print("No subscribers found.")
        return

    sub_list_html = "<ul>"
    for sub in subscribers:
        sub_list_html += f"<li><strong>{sub['name']}</strong> ({sub['email']}) - Joined: {sub['created_at']}</li>"
    sub_list_html += "</ul>"

    try:
        resend.Emails.send({
            "from": "Newsletter System <onboarding@resend.dev>",
            "to": "ahalvadzija@proton.me",
            "subject": f"Status Report: {len(subscribers)} Subscribers",
            "html": f"""
                <h1>Newsletter Stats</h1>
                <p>Trenutno imaš {len(subscribers)} pretplatnika u bazi.</p>
                {sub_list_html}
                <hr>
                <p><i>Ovo je automatski izvještaj sa tvog backend sistema.</i></p>
            """
        })
        print("✓ Notification sent to your Proton mail!")
    except Exception as e:
        print(f"✗ Failed to send notification: {e}")

if __name__ == "__main__":
    notify_me()
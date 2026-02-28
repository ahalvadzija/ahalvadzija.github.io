/* assets/js/newsletter.js */

// First, we check if the global 'supabaseConfig' object exists and has the necessary properties.
const config = window.supabaseConfig || {};

// Init Supabase client if config is valid, otherwise set to null
// Using a conditional check to ensure we don't attempt to initialize with missing config
const _supabase = (typeof supabase !== 'undefined' && config.url && config.key) 
    ? supabase.createClient(config.url, config.key) 
    : null;

async function handleSubscription() {
    // If _supabase is null, it means initialization failed due to missing config
    if (!_supabase) {
        console.error("Supabase klijent nije spreman. Provjeri ključeve!");
        return;
    }

    const nameInput = document.getElementById('sub-name');
    const emailInput = document.getElementById('sub-email');
    const btn = document.getElementById('sub-button');
    const msg = document.getElementById('form-msg');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    // Reset styles
    [nameInput, emailInput].forEach(el => el.style.borderColor = 'var(--border)');
    msg.classList.add('hidden');

    // Validation 
    if (name.length < 2) { showError(nameInput, "Please enter your name"); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { showError(emailInput, "Please enter a valid email address"); return; }

    btn.disabled = true;
    const originalText = btn.innerText;
    btn.innerText = "Wait...";

    try {
        // Now we can safely use _supabase, knowing it's initialized
        const { error } = await _supabase.from('newsletter_subscribers').insert([
            { name: name, email: email }
        ]);

        if (error) throw error;

        msg.innerText = "✓ Welcome to the list!";
        msg.style.color = "#3182ce";
        msg.classList.remove('hidden');
        document.getElementById('newsletter-form').reset();
        btn.innerText = "Done!";

    } catch (err) {
        if (err.code === '23505') {
            msg.innerText = "✗ You're already on the list! ✨";
        } else {
            msg.innerText = "✗ Error: " + (err.message || "Something went wrong");
        }
        msg.style.color = "#ef4444";
        msg.classList.remove('hidden');
        btn.disabled = false;
        btn.innerText = originalText;
    }
}

function showError(inputElement, message) {
    const msg = document.getElementById('form-msg');
    inputElement.style.borderColor = '#ef4444';
    inputElement.focus();
    msg.innerText = "✗ " + message;
    msg.style.color = "#ef4444";
    msg.classList.remove('hidden');
}
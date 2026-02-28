/* assets/js/newsletter.js */

/**
 * Newsletter Subscription Handler
 * Uses Supabase for data persistence
 */

// Retrieve configuration from HTML data attributes (cleaner than global variables)
const configEl = document.getElementById('supabase-config');
const { url, key } = configEl ? configEl.dataset : {};

// Initialize Supabase client
// We check for both the library availability and valid config credentials
const _supabase = (typeof supabase !== 'undefined' && url && key) 
    ? supabase.createClient(url, key) 
    : null;

/**
 * Main function to handle the subscription process
 */
async function handleSubscription() {
    // Safety check if Supabase failed to initialize
    if (!_supabase) {
        console.error("Supabase client not initialized. Check your configuration!");
        return;
    }

    // DOM Elements
    const nameInput = document.getElementById('sub-name');
    const emailInput = document.getElementById('sub-email');
    const btn = document.getElementById('sub-button');
    const msg = document.getElementById('form-msg');
    const form = document.getElementById('newsletter-form');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    // Reset UI state before validation
    [nameInput, emailInput].forEach(el => el.classList.remove('border-red-500'));
    msg.classList.add('hidden');
    msg.classList.remove('text-stei-blue', 'text-red-500');

    // Basic Input Validation
    if (name.length < 2) { 
        showError(nameInput, "Please enter your name"); 
        return; 
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { 
        showError(emailInput, "Please enter a valid email address"); 
        return; 
    }

    // Update button state during processing
    btn.disabled = true;
    const originalText = btn.innerText;
    btn.innerText = "Processing...";

    try {
        // Insert subscriber data into Supabase table
        const { error } = await _supabase.from('newsletter_subscribers').insert([
            { name: name, email: email }
        ]);

        if (error) throw error;

        // Success State UI
        msg.innerText = "✓ Welcome to the list!";
        msg.classList.add('text-stei-blue');
        msg.classList.remove('hidden');
        form.reset();
        btn.innerText = "Subscribed!";

    } catch (err) {
        // Error Handling (specifically checking for duplicate emails)
        if (err.code === '23505') {
            msg.innerText = "✗ You're already on the list! ✨";
        } else {
            msg.innerText = "✗ " + (err.message || "Something went wrong");
        }
        
        msg.classList.add('text-red-500');
        msg.classList.remove('hidden');
        
        // Restore button state on error
        btn.disabled = false;
        btn.innerText = originalText;
    }
}

/**
 * Helper to display validation errors
 * @param {HTMLElement} inputElement - The invalid input field
 * @param {string} message - Error message to display
 */
function showError(inputElement, message) {
    const msg = document.getElementById('form-msg');
    inputElement.classList.add('border-red-500');
    inputElement.focus();
    msg.innerText = "✗ " + message;
    msg.classList.add('text-red-500');
    msg.classList.remove('hidden');
}
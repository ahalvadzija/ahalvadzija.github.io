/* assets/js/newsletter.js */

/**
 * Newsletter Subscription Handler
 * Uses Supabase for data persistence
 */

// Initialize the Supabase client variable globally so functions can access it
let _supabase = null;

/**
 * Main function to handle the subscription process
 */
async function handleSubscription() {
    // Safety check: ensure the Supabase client exists before proceeding
    if (!_supabase) {
        console.error("Supabase client not initialized. Check your configuration and library!");
        const msg = document.getElementById('form-msg');
        if (msg) {
            msg.innerText = "✗ Backend connection failed.";
            msg.className = "mt-4 text-[10px] font-mono uppercase tracking-widest text-red-500";
            msg.classList.remove('hidden');
        }
        return;
    }

    // Capture DOM Elements
    const nameInput = document.getElementById('sub-name');
    const emailInput = document.getElementById('sub-email');
    const btn = document.getElementById('sub-button');
    const msg = document.getElementById('form-msg');
    const form = document.getElementById('newsletter-form');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    // Reset UI state and remove error borders before validation
    [nameInput, emailInput].forEach(el => el.classList.remove('border-red-500'));
    msg.classList.add('hidden');

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

    // Update button state to provide visual feedback during network request
    btn.disabled = true;
    const originalText = btn.innerText;
    btn.innerText = "Processing...";

    try {
        // Attempt to insert subscriber data into the Supabase table
        const { error } = await _supabase.from('newsletter_subscribers').insert([
            { name: name, email: email }
        ]);

        if (error) throw error;

        // Success State UI: provide confirmation to the user
        msg.innerText = "✓ Welcome to the list!";
        msg.className = "mt-4 text-[10px] font-mono uppercase tracking-widest text-stei-blue";
        msg.classList.remove('hidden');
        form.reset();
        btn.innerText = "Subscribed!";

    } catch (err) {
        // Error Handling: check for unique constraint violations (duplicate emails)
        if (err.code === '23505' || (err.message && err.message.includes('unique'))) {
            msg.innerText = "✗ You're already on the list! ✨";
        } else {
            msg.innerText = "✗ " + (err.message || "Something went wrong");
        }

        msg.className = "mt-4 text-[10px] font-mono uppercase tracking-widest text-red-500";
        msg.classList.remove('hidden');

        // Re-enable the button so the user can try again
        btn.disabled = false;
        btn.innerText = originalText;
    }
}

/**
 * Helper to display validation errors
 * @param {HTMLElement} inputElement - The field that failed validation
 * @param {string} message - Descriptive error message
 */
function showError(inputElement, message) {
    const msg = document.getElementById('form-msg');
    inputElement.classList.add('border-red-500');
    inputElement.focus();
    msg.innerText = "✗ " + message;
    msg.className = "mt-4 text-[10px] font-mono uppercase tracking-widest text-red-500";
    msg.classList.remove('hidden');
}

/**
 * Initialization Block
 * We wrap the logic in DOMContentLoaded to ensure HTML elements exist before access
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch configuration from the hidden data attributes in the DOM
    const configEl = document.getElementById('supabase-config');

    // Check if both the config element and the Supabase library are available
    if (configEl && typeof supabase !== 'undefined') {
        const { url, key } = configEl.dataset;

        if (url && key) {
            // Instantiate the global Supabase client
            _supabase = supabase.createClient(url, key);
            console.log("✅ Supabase client initialized.");
        } else {
            console.error("❌ Missing Supabase URL or Key in data attributes.");
        }
    } else {
        console.error("❌ Supabase library not loaded or config element missing.");
    }

    // 2. Attach the submit event listener to the form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            // Prevent default HTML form submission to handle it via AJAX/JavaScript
            e.preventDefault();
            handleSubscription();
        });
    }
});
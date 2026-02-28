# Adnan Halvadžija | Software Engineer

A high-performance, minimalist portfolio built with the **Hugo** framework, focusing on speed, SEO, and event-driven architectures. This project showcases the integration of static site generation with serverless backend logic.



## System Architecture

Unlike traditional static sites, this portfolio utilizes a serverless backend to handle dynamic interactions:

- **Frontend**: Hugo (Static Site Generator) with Tailwind CSS for Atomic styling.
- **Backend-as-a-Service**: Supabase (PostgreSQL) for data persistence.
- **Serverless Logic**: Deno-based **Supabase Edge Functions** for handling business logic (e.g., newsletter subscriptions).
- **Communication**: Resend API for transactional email delivery.
- **CI/CD**: GitHub Actions for automated testing and deployment.

## Key Features & Engineering Highlights

### Event-Driven Newsletter System
The newsletter system is designed to be completely decoupled from the frontend:
1. User submits an email via a customized HTML form.
2. The request is processed by a **Supabase Edge Function** (TypeScript/Deno).
3. The function validates the payload and interacts with the **Resend API** to trigger a welcome sequence.
4. Subscriber data is stored in a secured PostgreSQL table with RLS (Row Level Security) enabled.


### Design & Performance
- **Zero-Flash Theme Switching**: Custom JavaScript implementation for persistent Light/Dark mode with system preference detection.
- **Performance**: Optimized asset pipeline (CSS purging, image minification) achieving 100/100 Lighthouse scores.
- **Clean Git History**: Maintained via `orphan` branch resets and strict `.gitignore` policies to ensure a clean production-ready repository.

## 💻 Local Development

To run this project locally, ensure you have Hugo and Node.js installed.

```bash
# Clone the repository
git clone [https://github.com/ahalvadzija/ahalvadzija.github.io.git](https://github.com/ahalvadzija/ahalvadzija.github.io.git)

# Install dependencies (Deterministic build)
npm ci

# Run the Hugo server with drafts enabled
hugo server -D
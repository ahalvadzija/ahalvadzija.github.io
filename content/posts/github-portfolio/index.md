---
title: "Building a High-Performance Full-Stack Portfolio: Hugo, Supabase & Deno"
date: 2026-03-08
tags: ["Hugo", "Supabase", "Deno", "GitHub Actions", "Python", "TailwindCSS"]
summary: "A deep dive into building an event-driven, serverless portfolio using Hugo, Supabase Edge Functions, and GitHub Actions."
---

When engineers build their portfolios, they often choose between two extremes: a simple static page or an over-engineered Single Page Application (SPA). For my portfolio, I chose a third path: a **modular, event-driven architecture** that combines the speed of a static site with the power of a serverless backend.

## Architectural Philosophy
The primary goal was to achieve a **100/100 Lighthouse score** while maintaining dynamic features such as a newsletter system and automated reporting.

### Tech Stack:
* **Frontend**: [Hugo](https://gohugo.io/) (Static Site Generator) + **Tailwind CSS 4.0**.
* **Search**: **Pagefind** (static search on the client side).
* **Backend-as-a-Service**: **Supabase** (PostgreSQL + Edge Functions).
* **Runtime**: **Deno** (TypeScript) for serverless business logic.
* **Automation**: **GitHub Actions** (CI/CD + Cron jobs).


## Engineering Highlights

### 1. Event-Driven Newsletter System
Instead of a traditional API server, I utilized **Supabase Edge Functions** built on the Deno runtime. 

**The Workflow:**
1. User submits an email via a custom HTML form (zero-dependency JS).
2. The Edge Function validates the payload and communicates with the **Resend API**.
3. Subscriber data is stored in PostgreSQL with **Row Level Security (RLS)** policies enabled, ensuring user data is protected even if the anonymous API key is exposed.

### 2. Hybrid CI/CD Pipeline
My GitHub Actions workflow manages three different runtimes in a single pass, demonstrating a highly flexible deployment strategy:
* **Node.js**: Compiles Tailwind CSS and generates the Pagefind search index.
* **Python**: Executes a `newsletter.py` script to generate reports directly from the database.
* **Hugo**: Generates the final static production build.

```yml
# Snippet from the deployment workflow
- name: Run Newsletter Report
  env:
    SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
    RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
  run: python newsletter.py

```

### 3. Resource Optimization (The "Keep-Alive" Pulse)

Free-tier cloud services often "pause" databases after a period of inactivity. To prevent this, I implemented a **Pulse** workflow using a GitHub Action cron job (every day at midnight) to perform a small `PATCH` request to the database, keeping the Supabase instance active.

Bash

```yml
# GitHub Action ping (Keep-Alive)
curl -f -X PATCH "${{ secrets.SUPABASE_URL }}/rest/v1/keep_alive?id=eq.1" \
     -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}" \
     -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}" \
     -H "Content-Type: application/json" \
     -d "{\"last_ping\": \"$(date -u +'%Y-%m-%dT%H:%M:%SZ')\"}"

```

----------

## Design & Performance

-   **Tailwind 4.0**: Utilizing the latest `@tailwindcss/cli` for ultra-fast builds and a minimal CSS footprint.
    
-   **Zero-Flash Theme Switching**: A custom JavaScript implementation prevents the "white flash" during page loads if a user prefers Dark Mode.
    
-   **Asset Pipeline**: Hugo handles minification and fingerprinting for all resources, allowing for aggressive caching on the CDN (GitHub Pages).
    

## Local Development

The project is designed to be deterministic. By using `npm ci`, I ensure that all dependencies (such as Lucide icons or Swup for smooth transitions) are identical in both local and production environments.

Bash

```bash
# Clone the repository
git clone [https://github.com/ahalvadzija/ahalvadzija.github.io.git](https://github.com/ahalvadzija/ahalvadzija.github.io.git)

# Install dependencies
npm ci

# Run the Hugo development server
npm run dev

```

----------

## Conclusion

This portfolio is not just a showcase of my work; it is proof that modern web tools allow for the creation of complex, full-stack systems without the need for expensive infrastructure. The focus on **Type Safety (TypeScript)**, **Automation (Python/Actions)**, and **Performance (Hugo)** forms the core of my engineering approach.

View the full source code: [ahalvadzija.github.io](https://github.com/ahalvadzija/ahalvadzija.github.io)
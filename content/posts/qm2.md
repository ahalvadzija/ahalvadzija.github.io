---
title: "Building QM2: A Modern, Dockerized CLI Quiz Engine with 330+ Tests"
date: 2026-02-17
tags: ["Python", "CLI Engineering", "Docker"]
summary: "A high-performance CLI engine built with Python. Engineered with a focus on reliability and speed, featuring 86% test coverage."
---

<div class="flex flex-wrap gap-2 mb-6 justify-start">
  <a href="https://badge.fury.io/py/qm2"><img alt="PyPI version" src="https://img.shields.io/pypi/v/qm2?color=blue&label=pypi%20package"></a>
  <a href="https://pypi.org/project/qm2/"><img alt="Python versions" src="https://img.shields.io/pypi/pyversions/qm2.svg?color=green"></a>
  <a href="https://opensource.org/licenses/MIT"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
  <a href="https://github.com/ahalvadzija/qm2"><img alt="Tests Coverage" src="https://img.shields.io/badge/coverage-86%25-brightgreen.svg"></a>
  <a href="https://github.com/ahalvadzija/qm2/actions/workflows/pipeline.yml"><img alt="CI/CD Pipeline" src="https://github.com/ahalvadzija/qm2/actions/workflows/pipeline.yml/badge.svg"></a>
</div>

![QM2 - Modern Python CLI Quiz Maker application main menu featuring ASCII art and interactive terminal UI on a green gradient background](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vnca41nd14nel655msdt.png)

### The Mission

Most quiz applications are web-based, but I wanted something that lives where I spend most of my time: the terminal. I built QM2 — a robust, interactive quiz engine designed for developers and power users who value speed, efficiency, and a clean "brutalist" UI.

### The Tech Stack

To make a CLI feel like a professional product, I relied on some of the best libraries in the Python ecosystem:

- **Rich**: For the beautiful, colored interface and real-time feedback.
- **Questionary**: To handle complex interactive prompts and menus.
- **Platformdirs**: Ensuring data is stored correctly whether you are on Windows, macOS, or Linux.
- **Docker**: For those who want to run the engine in a completely isolated environment.


![QM2 - Modern Python CLI Quiz Maker application main menu featuring ASCII art and interactive terminal UI on a green gradient background](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gefd7kjp6nh422f0lz8t.png)

### Engineered for Reliability

As a developer, I believe that if it's not tested, it's broken.

- **330 Individual Tests**: Ensuring the core logic remains rock-solid as the project grows.
- **86% Coverage**: Backed by a strict CI/CD pipeline.
- **OIDC Publishing**: Secure, token-less deployment to PyPI via GitHub Actions.


![QM2 - Modern Python CLI Quiz Maker application - passing 330 tests](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/is51nvrsx2b0et30jez9.png)


### Key Features

- **4 Question Types**: Multiple Choice, True/False, Fill-in-the-blank, and Matching.
- **Flashcards Mode**: Stress-free learning without the pressure of a timer.
- **Data Portability**: Full support for bidirectional CSV ↔ JSON conversion. You can even import quizzes directly from a URL!
- **Category Management**: Organize your learning into hierarchical structures (e.g., programming/python/basics).


![QM2 - Modern Python CLI Quiz Maker application main menu featuring ASCII art and interactive terminal UI on a green gradient background](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gsevpqyl5er640xskev1.png)


### Installation & Quick Start

You can get up and running in seconds:

```bash {title="Terminal"}
pip install qm2
qm2
```

Or via Docker to keep your system clean:

```bash {title="Terminal"}
docker build -t qm2 .
docker run -it -v qm2_data:/root/.local/share/qm2 qm2
```

### Deep Dive into Data

I designed the question format to be as human-readable as possible. Whether you prefer JSON for precision or CSV for bulk editing in Excel, QM2 handles both:

**JSON**

```json {title="quiz-schema.json"}
[
    {
        "type": "multiple",
        "question": "What is the capital of France?",
        "correct": "Paris",
        "wrong_answers": ["Rome", "Berlin", "Madrid"]
    },
    {
        "type": "truefalse",
        "question": "Python is a programming language.",
        "correct": "True",
        "wrong_answers": ["False"]
    },
    {
        "type": "fillin",
        "question": "The capital of Japan is ______.",
        "correct": "Tokyo",
        "wrong_answers": []
    },
    {
        "type": "match",
        "question": "Match programming languages with their types",
        "pairs": {
            "left": ["Python", "JavaScript", "C++"],
            "right": ["Interpreted", "Web scripting", "Compiled"],
            "answers": { "a": "1", "b": "2", "c": "3" }
        }
    }
]
```

**CSV**

```csv {title="quiz-schema.csv"}
type,question,correct,wrong_answers,left,right,answers
multiple,What is the capital of France?,Paris,"Rome,Berlin,Madrid",,,
truefalse,The Sun is a star.,True,False,,,
fillin,The capital of Japan is ______.,Tokyo,,,,
match,Match technologies,,,Python|HTML,Programming language|Markup language,"a:1,b:2"
```
    
### What's Next?

"With the release of v1.0.25, QM2 has officially moved out of beta. The core is now stable, and I am shifting focus towards expanding the ecosystem."

- **AI Integration**: Generating quizzes automatically from your documentation.
- **Plugin System**: Allowing the community to build their own extensions.

### Links & Support

If you're a CLI enthusiast, I'd love for you to try it out and give me your feedback!


<div class="not-prose space-y-2 my-6 font-mono text-sm">
  <div class="flex items-center gap-3">
    <span class="text-stei-blue font-bold">~</span>
    <span class="text-[var(--muted)] w-16">PyPI:</span>
    <a href="https://pypi.org/project/qm2" class="text-stei-blue hover:underline">pypi.org/project/qm2</a>
  </div>
  <div class="flex items-center gap-3">
    <span class="text-stei-blue font-bold">~</span>
    <span class="text-[var(--muted)] w-16">GitHub:</span>
    <a href="https://github.com/ahalvadzija/qm2" class="text-stei-blue hover:underline">ahalvadzija/qm2</a>
  </div>
  <div class="flex items-center gap-3">
    <span class="text-stei-blue font-bold">~</span>
    <span class="text-[var(--muted)] w-16">Docs:</span>
    <a href="https://ahalvadzija.github.io/qm2" class="text-stei-blue hover:underline">ahalvadzija.github.io/qm2</a>
  </div>
</div>

If you find this useful, a ⭐ on GitHub would mean a lot!

I’m curious — what is your favorite library for building CLI tools in Python? Let's discuss in the comments!
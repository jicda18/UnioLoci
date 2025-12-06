# ADR 003: AI Technology Choice for UnioLoci

**Status:** Accepted  
**Date:** 2025-11-17

---

## Context

UnioLoci incorporates AI features to enhance the user experience:

- Creating events from natural language.
- Interpreting ambiguous or incomplete sentences.
- Suggesting schedules, categories, or reminders.
- (Future) Smart classification, conversational assistants, summaries.

AI is not the core of the project, but it is a **key differentiator**.  
Additionally, there is a goal to **practice advanced AI integration**, especially using modern structured formats like **TOON (Token-Oriented Object Notation)** to obtain clean, reliable, and processable data.

Technologies considered:

- OpenAI API
- Google Gemini
- Anthropic Claude
- Open-source models (Llama, Mixtral, Qwen, etc.)
- Local models
- Do not use AI

---

## Alternatives

### 1. OpenAI API

**Pros:**

- Excellent semantic understanding.
- Very high accuracy in generating responses in **TOON** format.
- Mature SDKs and easy integration with NestJS.
- Active community and extensive tooling.
- Excellent capabilities for interpreting natural language related to calendars.

**Cons:**

- Dependency on an external provider.
- Variable cost per use.
- Need to handle rate limits and security.

---

### 2. Google Gemini

**Pros:**

- Strong models in multimodal reasoning.
- Good ecosystem if using Google infrastructure.

**Cons:**

- Lower stability when producing structured formats like TOON.
- Less polished Node SDK.
- Less accurate interpretation for calendar data.

---

### 3. Anthropic Claude

**Pros:**

- Great clarity and reasoning.
- Excellent for long instructions.

**Cons:**

- TOON is less stable than with OpenAI.
- More limited ecosystem.
- Worse performance in extracting event data.

---

### 4. Open-Source Models

**Pros:**

- Full control; no external dependency.
- Privacy and predictable costs.
- Ability to customize models.

**Cons:**

- Complex infrastructure to maintain.
- Worse accuracy with TOON without fine-tuning.
- Fails much more often than OpenAI with ambiguous sentences.

---

## Decision

**We choose the OpenAI API as the primary AI technology.**

- **Model:** GPT-4.x or equivalent.
- **Output Format:** **TOON (Token-Oriented Object Notation)** for structured data.

---

## Reason

OpenAI offers:

- The highest accuracy in interpreting natural language.
- Excellent performance in generating reliable data in **TOON**, which reduces errors in event creation.
- Smooth integration with the stack (NestJS + Flutter + React).
- A mature, stable, and well-documented ecosystem.
- The best balance between capability, simplicity, and productivity.

Furthermore, it allows practicing exactly the type of modern AI we want to integrate: semantic extraction and conversion to robust structured formats.

---

## Consequences

### Pros (+)

- Highly accurate extraction in TOON.
- Saves time when validating calendar data.
- Easy integration and maintenance.
- Solid foundation for future smart features.
- Consistent and predictable responses.

### Cons (-)

- Dependency on an external provider.
- Variable cost.
- Need to manage keys and usage policies.
- Less overall control than a 100% self-hosted solution.

---

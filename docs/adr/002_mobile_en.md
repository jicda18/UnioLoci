# ADR 002: Mobile Technology Choice for UnioLoci

**Status:** Accepted  
**Date:** 2025-11-17

---

## Context

UnioLoci needs a **mobile application** that allows users to:

- Create and manage events.
- Receive real-time notifications.
- Synchronize changes with the backend.
- Maintain a fluid, modern, and consistent interface with the rest of the ecosystem.

Additionally, there is a clear goal:  
**to practice and master a modern mobile technology that allows for the development of high-quality apps without the usual limitations of React Native.**

The alternatives considered were:

- React Native
- Flutter
- Native Development (Swift/Kotlin)
- Capacitor/Ionic
- No mobile app (PWA only)

---

## Alternatives

### 1. React Native

**Pros:**

- Conceptual reuse from React (hooks, state, components).
- Huge community.
- Wide ecosystem of libraries.

**Cons:**

- Library fragmentation and inconsistent quality.
- Strong dependency on the JavaScript–Native bridge.
- Less predictable long-term maintenance.
- UI not always as stable as in native technologies.

---

### 2. Flutter

**Pros:**

- Consistent and highly customizable UI.
- Near-native performance.
- Fast development with true hot reload.
- Mature and growing ecosystem.
- Clear integration with external APIs and sockets.
- Makes it easy to create a solid visual experience without the typical problems of RN.

**Cons:**

- Requires learning Dart (part of the goal).
- Larger initial bundle size.

---

### 3. Native Development (Swift/Kotlin)

**Pros:**

- Maximum quality and full control.
- Perfect integration with hardware.

**Cons:**

- Two codebases, two architectures, double the effort.
- Not cross-platform.
- Higher learning curve.

---

## Decision

**We choose Flutter as the mobile technology.**

- **Mobile:** Flutter (Dart)
- **Communication:** REST API + WebSockets (NestJS)
- **Integrations:** Push notifications

---

## Reason

Flutter offers the best balance between performance, visual flexibility, and user experience. Furthermore:

- It allows building complex interfaces (like a calendar) without friction.
- It integrates very well with WebSockets for real-time synchronization.
- It avoids common React Native issues (fragmentation, UI inconsistencies).
- It provides a consistent and modern mobile experience with a single codebase.
- Practicing Dart is part of the project's goal.

---

## Consequences

### Pros (+)

- Fluid and native-like UX.
- Fast development with a single codebase.
- Stable ecosystem with a good future.
- Ideal for rich and interactive interfaces.
- Provides valuable learning.

### Cons (-)

- Larger initial bundle.
- Requires extra effort for a highly polished design.

---

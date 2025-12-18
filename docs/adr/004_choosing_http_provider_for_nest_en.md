# ADR 004: Choosing Http Provider for Nest

**Status:** Accepted
**Date:** 2025-12-17

## Context

NestJS allows the use of different HTTP adapters, such as Express.js or Fastify. The project requires optimizing backend performance for better response times and scalability. Express.js is the default adapter but has performance limitations, while Fastify offers superior speed, making it preferable for NestJS applications aiming for high performance.

## Alternatives

- **Express.js**

  - The default HTTP adapter for NestJS, a minimal Node.js framework.
  - _Pros:_ Easy integration with NestJS, large community, familiar middleware.
  - _Cons:_ Lower performance, higher latency in high-load scenarios.

- **Fastify**
  - A high-performance HTTP adapter alternative for NestJS.
  - _Pros:_ Significantly faster request handling, low overhead, built-in validation.
  - _Cons:_ Less mature integration with some NestJS features, smaller ecosystem.

## Decision

We will use Fastify as the HTTP adapter for NestJS instead of Express.js.

**Reason:** Fastify provides better performance benchmarks, with faster request processing that aligns with our goal of a quicker backend, enhancing user experience and handling increased loads more efficiently.

## Consequences

### Pros (+)

- Improved backend speed and reduced response times.
- Better scalability for high-traffic applications.
- Enhanced validation and serialization features from Fastify.

### Cons (-)

- Potential compatibility issues with certain Express-specific middlewares.
- Need for team adaptation to Fastify's API differences.
- Slightly smaller community support compared to Express.

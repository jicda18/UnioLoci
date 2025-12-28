# ADR 005: Choosing Database Integration for Nest

**Status:** Accepted
**Date:** 2025-12-27

## Context

We need to select a database integration library (ORM or Query Builder) for our NestJS application. The goal is to have a robust, type-safe, and maintainable way to interact with our database. We need a solution that integrates well with the NestJS ecosystem and supports our development workflow.

## Alternatives

- **TypeORM**
  - The most common ORM used with NestJS.
  - _Pros:_ Excellent integration with NestJS (official package), extensive documentation, active community, supports many databases, supports both Active Record and Data Mapper patterns.
  - _Cons:_ Can be verbose, some complex queries might be harder to construct than raw SQL.

- **Prisma**
  - A modern next-generation ORM.
  - _Pros:_ Type-safe database access, auto-generated queries, intuitive API.
  - _Cons:_ Requires a separate binary, schema management is different from standard TypeScript classes.

- **Sequelize**
  - A promise-based Node.js ORM.
  - _Pros:_ Mature, widely used in the Node.js ecosystem.
  - _Cons:_ TypeScript support is not as native as TypeORM or Prisma, less "Nest-native" feel compared to TypeORM.

- **MikroORM**
  - TypeScript-first ORM based on Data Mapper, Unit of Work, and Identity Map patterns.
  - _Pros:_ DDD-friendly, performance.
  - _Cons:_ Smaller community than TypeORM in the NestJS context (though growing).

## Decision

We have decided to use **TypeORM**.

**Reason:** TypeORM is the default and most widely supported ORM in the NestJS ecosystem. It provides robust integration, excellent TypeScript support, and fits well with the modular architecture of NestJS. Given the requirement to use TypeORM, this choice aligns with standard practices for NestJS applications.

## Consequences

### Pros (+)

- Native integration with NestJS via `@nestjs/typeorm`.
- Strong community support and abundance of learning resources.
- Supports migrations, relations, and advanced database features out of the box.
- TypeScript support ensures type safety relative to entities.

### Cons (-)
- Learning curve for decorators and specific TypeORM patterns.
- Performance overhead compared to raw SQL (acceptable for our use case).

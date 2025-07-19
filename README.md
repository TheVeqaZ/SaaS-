# SaaS BI Boilerplate

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```
2. Generate Prisma client and seed demo data:
   ```
   npm --workspace backend run prisma:generate
   npm --workspace backend run prisma:migrate
   npm --workspace backend run seed
   ```
3. Start development servers:
   ```
   docker-compose up
   ```

GraphQL API will be available at `http://localhost:4000/graphql` and the frontend at `http://localhost:3000`.

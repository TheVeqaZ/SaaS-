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

## Microsoft Graph Integration

Set the following environment variables to allow the backend to access Microsoft Graph using an Azure AD app registration:

```
AZURE_TENANT_ID=<your-tenant-id>
AZURE_CLIENT_ID=<app-client-id>
AZURE_CLIENT_SECRET=<app-client-secret>
```

After starting the backend, query the `m365Usage` field to retrieve aggregated and detailed usage information for users within the tenant.

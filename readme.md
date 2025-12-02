# Project description:
to start this project, I first install these:

## npm init -y
Create package.json and initiate project.
## npm install express cors dotenv
Install related dependencies to start working project use of them to create server etc.
## npm install -D nodemon
Nodemon will watch changes and update the code or render without stoping and running it again.

## Then create /src folder and subfolders (/models, /controllers, /routes)
With main app.js file /models, /controllers, /routes - which we used to store information related to that folder and file.
src/
  app.js
  config/
    db.js
  routes/
    authRoutes.js
  controllers/
    authController.js
  middleware/
    authMiddleware.js
  models/
    userModel.js

# 3. Build 3 Core APIs

API 1 — Register User
 - email
 - password
 - name

API 2 — Login
 - JWT token

API 3 — Get Profile (protected)
 - Uses JWT middleware

This teaches:
- routing
- controllers
- middleware
- env variables
- JWT
- error handling
- best practices

# 4. Put it in Docker
Create:
- Dockerfile
- docker-compose.yml

Why?
- Because DevOps + Backend = hot combo for hiring.

# 5. Add PostgreSQL with Prisma
Install Prisma:
- npm install prisma @prisma/client
- npx prisma init
This teaches:
- migrations
- models
- schema design
- Skill companies love.

# 6. Add GitHub Actions CI/CD (basic pipeline)
Create:
- .github/workflows/ci.yml
- Pipeline should:
- run tests
- build image
- lint
- type-check (later when you move to TS)

# 7. Deploy to AWS EC2

Not fancy.
Simple.
You will:
- create EC2 instance
- install Docker
- pull your API
- run it
- expose port
- set up environment variables

This is enough to say in interviews:
*“I deployed production-ready API with CI/CD and Docker on AWS.”*

That statement gets attention.

# 8. After this (next step)

We will move to:
- Terraform
- Kubernetes
- Monitoring
- Logging
- Scaling
- Incident response basics

But first — finish the API.
---------------------------
## Brief roadmap for PostgreSQL + Prisma integration:

Install Prisma:
- npm install @prisma/client
- npm install -D prisma


Initialize Prisma:
- npx prisma init

Define User model in prisma/schema.prisma:
- model User {
  - id       Int     @id @default(autoincrement())
  - name     String
  - email    String  @unique
  - password String
- }

Run migration:
- npx prisma migrate dev --name init

Replace your user model functions to use Prisma queries.

## CONNECT EXISTING DATABASE:
- 1. Configure your DATABASE_URL in prisma.config.ts
- 2. Run prisma db pull to introspect your database.

## CREATE NEW DATABASE:
- Local: npx prisma dev (runs Postgres locally in your terminal)
- Cloud: npx create-db (creates a free Prisma Postgres database)

Then, define your models in prisma/schema.prisma and run prisma migrate dev to apply your schema.


## Fix steps:

Run this command to generate Prisma client after editing your schema:

- npx prisma generate


If you haven’t migrated your schema yet, run:

- npx prisma migrate dev --name init


This runs migrations and generates the client automatically.

After running these, restart your server (npm run dev).

## Summary:

Always run prisma generate after changing schema or on fresh install.

prisma migrate dev runs migrations and generates client.

## Downgrade Prisma version if latest not working
-- npm install prisma@4.16.2 --save-dev
-- npm install @prisma/client@4.16.2
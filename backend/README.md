# Task Management System API

A production-ready RESTful API for a Task Management System built with Node.js, Express, TypeScript, and MySQL.

## Prerequisites
- Node.js (v18+)
- MySQL

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root of the backend folder using the provided `.env` as a reference, or use the generated one. Be sure to replace `DATABASE_URL` with your actual MySQL database credentials.
   ```
   PORT=5000
   DATABASE_URL="mysql://username:password@localhost:3306/task_mana_sys"
   JWT_ACCESS_SECRET="your_access_secret"
   JWT_REFRESH_SECRET="your_refresh_secret"
   ```

3. **Database Migration (Prisma)**
   Run the following command to create tables based on the Prisma schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Running the App**
   To start the development server:
   ```bash
   npm run dev
   ```

   To build and start for production:
   ```bash
   npm run build
   npm start
   ```

## Tech Stack
- Node.js + Express
- TypeScript
- Prisma ORM + MySQL
- JSON Web Token (JWT) + bcrypt
- Zod for Validation

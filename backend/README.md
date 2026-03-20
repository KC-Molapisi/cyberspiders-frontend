# BOCRA Backend API

> **Hackathon:** Cyberspiders Team — Backend Service
> **Developer:** Backend Lead
> **Stack:** Node.js · Express · Prisma · Supabase (PostgreSQL)

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [API Reference](#api-reference)
   - [Auth](#auth-apiauthx)
   - [Licensing](#licensing-apilicensingx)
   - [Complaints](#complaints-apicomplaintsx)
   - [Dashboard](#dashboard-apidashboardx)
   - [Content](#content-apicontentx)
   - [Contact](#contact-apicontactx)
6. [Environment Variables](#environment-variables)
7. [Getting Started](#getting-started)
8. [Frontend Integration Notes](#frontend-integration-notes)

---

## Overview

This is the REST API backend for the BOCRA (Botswana Communications Regulatory Authority) hackathon website. It powers:

- User authentication (register / login / session)
- License application and verification
- Consumer complaint submission and tracking
- Admin dashboard analytics
- Site content (notices, services, about)
- Contact / enquiry form submission

Base URL (local): `http://localhost:5000/api`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js v20+ |
| Framework | Express.js v4 |
| ORM | Prisma v5 |
| Database | Supabase (PostgreSQL) |
| Authentication | JWT + bcryptjs |
| Validation | express-validator |
| Security | helmet, cors |
| Logging | morgan |
| Dev server | nodemon |

---

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma          # Database models
├── src/
│   ├── config/
│   │   └── env.js             # Environment variable validation
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── complaints.controller.js
│   │   ├── content.controller.js
│   │   ├── contact.controller.js
│   │   ├── dashboard.controller.js
│   │   └── licensing.controller.js
│   ├── middleware/
│   │   ├── auth.js            # JWT verify + role guard
│   │   └── errorHandler.js    # Global error handler
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── complaints.routes.js
│   │   ├── content.routes.js
│   │   ├── contact.routes.js
│   │   ├── dashboard.routes.js
│   │   └── licensing.routes.js
│   └── server.js              # Express entry point
├── .env                       # Secret config (NOT committed)
├── .env.example               # Config template (committed)
├── .gitignore
└── package.json
```

---

## Database Schema

### `User`

| Column | Type | Notes |
|---|---|---|
| id | String (uuid) | Primary key |
| name | String | Full name |
| email | String | Unique |
| password_hash | String | bcrypt hash |
| role | Enum | `CITIZEN` · `OPERATOR` · `ADMIN` |
| created_at | DateTime | Auto |

### `Complaint`

| Column | Type | Notes |
|---|---|---|
| id | String (uuid) | Primary key |
| user_id | String | FK → User |
| title | String | Short summary |
| description | String | Full complaint text |
| category | Enum | `CONSUMER_PROTECTION` · `LICENSING` · `SPECTRUM` · `POSTAL` · `BROADCASTING` |
| status | Enum | `PENDING` · `IN_REVIEW` · `RESOLVED` · `REJECTED` |
| reference_number | String | Unique, auto-generated (e.g. `CMP-20240001`) |
| created_at | DateTime | Auto |
| updated_at | DateTime | Auto-updated |

### `LicenseApplication`

| Column | Type | Notes |
|---|---|---|
| id | String (uuid) | Primary key |
| user_id | String | FK → User |
| license_type | Enum | `OPERATOR` · `TYPE_APPROVAL` · `SPECTRUM` · `POSTAL` · `BROADCASTING` |
| business_name | String | Applicant business name |
| contact_name | String | Contact person |
| contact_email | String | Contact email |
| status | Enum | `PENDING` · `UNDER_REVIEW` · `APPROVED` · `REJECTED` |
| reference_number | String | Unique, auto-generated (e.g. `LIC-20240001`) |
| submitted_at | DateTime | Auto |
| updated_at | DateTime | Auto-updated |

---

## API Reference

All protected routes require the header:
```
Authorization: Bearer <token>
```

All responses follow this shape:
```json
{ "data": ..., "message": "..." }
```
Errors:
```json
{ "error": "Descriptive message" }
```

---

### Auth `/api/auth/*`

#### `POST /api/auth/register`
Create a new user account.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "CITIZEN"
}
```
> `role` is optional — defaults to `CITIZEN`. Valid values: `CITIZEN`, `OPERATOR`, `ADMIN`

**Response `201`:**
```json
{
  "message": "Account created successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CITIZEN"
  }
}
```

---

#### `POST /api/auth/login`
Log in and receive a JWT token.

**Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response `200`:**
```json
{
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "CITIZEN"
    }
  }
}
```

---

#### `GET /api/auth/me`
Get the currently authenticated user. **Protected.**

**Response `200`:**
```json
{
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CITIZEN",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Licensing `/api/licensing/*`

#### `POST /api/licensing/verify`
Check if a business/operator holds a valid licence. **Public.**

**Body:**
```json
{
  "business_name": "Mascom Wireless"
}
```

**Response `200`:**
```json
{
  "data": {
    "found": true,
    "business_name": "Mascom Wireless",
    "license_type": "OPERATOR",
    "status": "APPROVED",
    "reference_number": "LIC-20240001"
  }
}
```

---

#### `POST /api/licensing/applications`
Submit a new licence application. **Protected.**

**Body:**
```json
{
  "license_type": "OPERATOR",
  "business_name": "My Telecom Ltd",
  "contact_name": "Jane Smith",
  "contact_email": "jane@mytelecom.co.bw"
}
```

**Response `201`:**
```json
{
  "message": "Application submitted successfully",
  "data": {
    "id": "uuid",
    "reference_number": "LIC-20240002",
    "status": "PENDING",
    "submitted_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### `GET /api/licensing/applications`
List licence applications. **Protected.**
- Regular users see only their own applications.
- Admins see all applications.

**Response `200`:**
```json
{
  "data": [
    {
      "id": "uuid",
      "license_type": "OPERATOR",
      "business_name": "My Telecom Ltd",
      "status": "PENDING",
      "reference_number": "LIC-20240002",
      "submitted_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### `GET /api/licensing/applications/:id`
Get a single application by ID. **Protected.**

---

#### `PATCH /api/licensing/applications/:id/status`
Update application status. **Admin only.**

**Body:**
```json
{
  "status": "APPROVED"
}
```

---

### Complaints `/api/complaints/*`

#### `POST /api/complaints`
Submit a new complaint. **Protected.**

**Body:**
```json
{
  "title": "No signal for 3 days",
  "description": "My internet has been down since Monday...",
  "category": "CONSUMER_PROTECTION"
}
```

**Response `201`:**
```json
{
  "message": "Complaint submitted",
  "data": {
    "id": "uuid",
    "reference_number": "CMP-20240001",
    "status": "PENDING",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### `GET /api/complaints`
List complaints. **Protected.**
- Regular users see only their own.
- Admins see all.

---

#### `GET /api/complaints/:id`
Get a single complaint. **Protected.**

---

#### `PATCH /api/complaints/:id/status`
Update complaint status. **Admin only.**

**Body:**
```json
{
  "status": "IN_REVIEW"
}
```

---

### Dashboard `/api/dashboard/*`

#### `GET /api/dashboard/stats`
Get aggregate statistics. **Protected.**

**Response `200`:**
```json
{
  "data": {
    "total_licenses": 142,
    "pending_licenses": 18,
    "approved_licenses": 110,
    "total_complaints": 87,
    "resolved_complaints": 65,
    "complaints_by_category": {
      "CONSUMER_PROTECTION": 34,
      "LICENSING": 20,
      "SPECTRUM": 15,
      "POSTAL": 10,
      "BROADCASTING": 8
    }
  }
}
```

---

### Content `/api/content/*`

These endpoints serve static/seeded site content used by the frontend.

#### `GET /api/content/notices`
Returns live notice strip items.

**Response `200`:**
```json
{
  "data": [
    {
      "id": 1,
      "text": "Public notice: spectrum allocation deadline extended to 30 April 2024.",
      "type": "REGULATORY"
    }
  ]
}
```

---

#### `GET /api/content/services`
Returns the services hub cards.

**Response `200`:**
```json
{
  "data": [
    {
      "title": "Licensing & Authorisations",
      "text": "Licence applications, renewals, categories and verification entry points.",
      "category": "LICENSING"
    }
  ]
}
```

---

#### `GET /api/content/about`
Returns BOCRA about/profile slides.

**Response `200`:**
```json
{
  "data": [
    {
      "kicker": "Profile",
      "heading": "A simpler public-facing BOCRA profile",
      "body": "..."
    }
  ]
}
```

---

### Contact `/api/contact/*`

#### `POST /api/contact`
Submit a general enquiry. **Public.**

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Licensing enquiry",
  "message": "I would like to know more about..."
}
```

**Response `201`:**
```json
{
  "message": "Enquiry received. We will respond within 2 business days."
}
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values.

```env
# Supabase → Project Settings → Database → URI (connection pooling)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres

# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_long_random_secret_here
JWT_EXPIRES_IN=7d

PORT=5000
NODE_ENV=development

# Update once frontend is deployed
FRONTEND_URL=http://localhost:5173
```

> **Never commit `.env` to Git.**

---

## Getting Started

### Prerequisites
- Node.js v20+
- A [Supabase](https://supabase.com) project created (free tier is fine)

### Steps

```bash
# 1. Navigate into the backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Then edit .env with your Supabase URL and JWT secret

# 4. Generate Prisma client & push schema to Supabase
npx prisma generate
npx prisma migrate dev --name init

# 5. Start the dev server
npm run dev
```

Server runs at: `http://localhost:5000`

### Useful Commands

| Command | Description |
|---|---|
| `npm run dev` | Start with auto-reload (nodemon) |
| `npm start` | Start without auto-reload |
| `npm run db:migrate` | Run pending migrations |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:studio` | Open Prisma Studio (visual DB browser) |

---

## Frontend Integration Notes

The frontend (`frontend/`) is a **React + Vite** app. It connects to this backend via:

```js
// frontend/src/api/client.js
baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
```

To run both together locally:

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm install && npm run dev
```

Frontend URL: `http://localhost:5173`
Backend URL: `http://localhost:5000/api`

### Frontend API calls already wired up:

| Frontend call | Backend route |
|---|---|
| `POST /licensing/verify` | `POST /api/licensing/verify` |
| `POST /licensing/applications` | `POST /api/licensing/applications` |
| `GET /content/notices` | `GET /api/content/notices` |
| `GET /content/services` | `GET /api/content/services` |
| `GET /content/about` | `GET /api/content/about` |
| `POST /contact` | `POST /api/contact` |

> Auth headers (JWT) will need to be added to the frontend axios client once the login flow is wired in.

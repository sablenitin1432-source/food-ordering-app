# Online Food Ordering Web Application

A full-stack food ordering application with a customer storefront, an administration interface, and an Express API. Customers can browse the menu, manage a cart, submit delivery details, and place orders using Stripe checkout. Administrators can manage food items and update order statuses.

## Features

- User registration and login
- Browse food items and filter by category
- Add, update, and remove cart items
- Enter delivery details and place orders
- Stripe checkout integration
- View order history
- Admin food item management
- Admin order listing and status management

## Tech Stack

- **Frontend:** React.js, Vite, React Router, Axios
- **Admin:** React.js, Vite, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT and bcrypt
- **Media:** Cloudinary
- **Payments:** Stripe
- **Frontend deployment:** Vercel

## Project Structure

```text
.
├── admin/       # Admin interface
├── backend/     # Express API, database models, and integrations
└── frontend/    # Customer-facing React application
```

## Local Setup

Use three terminals from the repository root.

### 1. Backend

```bash
cd backend
npm install
npm run server
```

The backend listens on port `4000`. Configure the backend environment variables listed below in `backend/.env` before starting it.

### 2. Customer frontend

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_BACKEND_URL` in `frontend/.env` to the local backend base URL.

### 3. Admin interface

```bash
cd admin
npm install
npm run dev
```

The admin interface currently uses `http://localhost:4000` as its backend URL.

## Environment Variables

Set credentials and values in local environment files; do not commit secrets.

**Backend (`backend/.env`):**

- `MONGO_URI`
- `JWT_SECRET`
- `STRIPE_SECRET_KEY`
- `CLOUDINARY_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_SECRET_KEY`

**Customer frontend (`frontend/.env`):**

- `VITE_BACKEND_URL`

## Deployment

The frontend includes Vercel SPA rewrite configuration in `frontend/vercel.json`. The repository does not include backend deployment configuration, so a backend hosting provider and its environment setup must be configured separately before deploying the API.

## Future Improvements

- Add automated tests for API endpoints and customer flows
- Add form validation and accessible feedback throughout the interfaces
- Configure environment-based API URLs for the admin interface
- Document backend hosting and production environment setup

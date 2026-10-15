# TS SALES MART — Drive Your Dreams

Website and inventory system for TS SALES MART (cars and vans, Uduvil, Chunnakam, Sri Lanka).

- `client/` — React + Vite + Tailwind CSS v4 storefront and staff dashboard
- `server/` — Node.js + Express + MongoDB (Mongoose) REST API
- `assets/` — original logo and promotional posters (copies live in `client/public/assets`)

## Run locally (Windows PowerShell)

Requires Node.js 20+.

```powershell
# 1. API
cd server
npm install
copy .env.example .env      # then edit .env (see below)
npm run dev                 # http://localhost:5000

# 2. Website (new terminal)
cd client
npm install
npm run dev                 # http://localhost:5173
```

The client proxies `/api` to `http://localhost:5000` in development.

## Configuration (`server/.env`)

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string. Database name defaults to `tssalesmart` (override with `MONGODB_DB`). |
| `JWT_SECRET` | Long random string. Generate: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `CLIENT_URL` | Allowed website origin for CORS |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` | First admin account (password 12+ characters) |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Vehicle photo uploads |

**MongoDB Atlas:** create a free cluster, add a database user, allow your IP under *Network Access*, then *Connect > Drivers* to copy the connection string.

**Cloudinary:** the cloud name is shown at the top of the Cloudinary dashboard (it is often not the same as your account name).

**Create the admin:** set the two `SEED_ADMIN_*` values and run `npm run seed` in `server/`. No demonstration vehicles are created; add real stock from `/admin`.

## Tests

```powershell
cd server
npm test
```

Integration tests use a separate `tssalesmart_test` database (created and dropped automatically) on the cluster in `MONGODB_URI`.

## Security notes

- Passwords hashed with bcrypt; JWT in an HTTP-only cookie.
- CSRF double-submit token required for every state-changing authenticated request.
- Staff-only routes enforce roles on the server; registration always creates customers.
- Helmet, rate limiting, CORS restricted to `CLIENT_URL`, validated input (Zod), generic error messages.
- Never commit `server/.env`.

## Deployment outline

1. Deploy `server/` to a Node host (Render, Railway, etc.). Set all environment variables, `NODE_ENV=production`, and `CLIENT_URL` to the site URL.
2. Deploy `client/` (`npm run build`, publish `dist/`) to a static host. Set `VITE_API_URL` to the API URL + `/api` before building.
3. Cross-site cookies in production need HTTPS on both sites (the server sets `SameSite=None; Secure` when `NODE_ENV=production`). Hosting both under one domain is simplest.
4. Add the host's outbound IP to Atlas Network Access.

## Status

Done: storefront, filters, vehicle details, enquiries, auth, staff dashboard (vehicles, status, featured, archive, enquiries), image upload code.
Not yet built: customer favourites, promotional content management, contact-detail editing, Tamil language option.

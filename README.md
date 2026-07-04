# Todo App

A simple todo app with a **Django REST API** backend and a **React + Vite** frontend.

## Backend (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

API runs at **http://localhost:8000**

- `GET /api/todos/` — list todos
- `POST /api/todos/` — create todo (`{ "title": "..." }`)
- `PATCH /api/todos/{id}/` — update todo
- `DELETE /api/todos/{id}/` — delete todo

## Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

App runs at **http://localhost:5173**

Make sure the Django server is running first so the frontend can fetch todos.

To point the frontend at a deployed backend, create `frontend/.env`:

```
VITE_API_URL=https://your-app.up.railway.app/api/todos/
```

## Deploy backend to Railway

1. Push your code to GitHub.

2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**.

3. Select your repo, then set the **Root Directory** to `backend`.

4. Add a **PostgreSQL** database:
   - Click **+ New** → **Database** → **PostgreSQL**
   - Railway auto-sets `DATABASE_URL` on your Django service.

5. In your Django service **Variables**, add:

   | Variable | Value |
   |----------|-------|
   | `DEBUG` | `False` |
   | `SECRET_KEY` | a long random string |
   | `CORS_ALLOWED_ORIGINS` | your frontend URL, e.g. `https://your-frontend.vercel.app` |

   `ALLOWED_HOSTS` is set automatically from Railway's domain.

6. Click **Deploy**. Railway will install deps, run migrations, collect static files, and start Gunicorn.

7. Open your service **Settings** → **Networking** → **Generate Domain** to get a public URL like `https://your-app.up.railway.app`.

8. Test the API: `https://your-app.up.railway.app/api/todos/`

9. Update your frontend `.env` with the Railway URL and restart `npm run dev`.


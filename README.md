# Todo App

A simple todo app with a **Django REST API** backend and a **React + Vite** frontend.

## Problem This Project Solves

This project provides a simple way to create, view, update, and delete todo items from one place. It solves the problem of managing daily tasks through a clear web interface backed by a REST API, making the app easy to use and ready to extend.

## Future Upgrades

- Add user authentication with **JWT (JSON Web Tokens)**.
- Give each authenticated user their own private todo list.
- Restrict todo creation, editing, and deletion to the user who owns each todo.

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

## Deploy Backend To Railway

1. Push this repo to GitHub.

2. In Railway, create a project from the GitHub repo.

3. Set the backend service **Root Directory** to:

```text
backend
```

4. Add a PostgreSQL database service.

5. In the backend service variables, add:

```env
DEBUG=False
SECRET_KEY=<generate-a-long-random-string>
ALLOWED_HOSTS=<your-railway-domain>.up.railway.app
CORS_ALLOWED_ORIGINS=https://<your-vercel-domain>.vercel.app
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

6. Generate a public Railway domain, then test:

```text
https://<your-railway-domain>.up.railway.app/api/todos/
```

## Deploy Frontend To Vercel

1. Import the same GitHub repo in Vercel.

2. Set the frontend **Root Directory** to:

```text
frontend
```

3. Vercel should detect Vite automatically:

```text
Build Command: npm run build
Output Directory: dist
```

4. Add this frontend environment variable in Vercel:

```env
VITE_API_URL=https://<your-railway-domain>.up.railway.app/api/todos/
```

5. Deploy the frontend, then copy the Vercel URL into Railway's `CORS_ALLOWED_ORIGINS`.

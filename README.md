# Todo App – Full-Stack Task Management Application

A full-stack Todo application built using **Django REST Framework** and **React + Vite**. The application provides a simple and intuitive interface for managing daily tasks through a RESTful API.

Users can create, view, update, complete and delete tasks through the frontend, with Django handling the backend operations and database management.

## 🚀 Live Demo

url = https://to-do-app-phi-sepia.vercel.app/

## ✨ Features

### Task Management
- Create new tasks.
- Retrieve and display all tasks.
- Update existing tasks.
- Mark tasks as completed or pending.
- Delete tasks.
- Display tasks in chronological order.

### Backend
- RESTful API development using Django REST Framework.
- CRUD operations using ModelViewSet.
- ModelSerializer for data serialization and validation.
- Django ORM for database operations.
- Organized backend architecture.

### Frontend
- React-based user interface.
- API integration with Django REST Framework.
- Dynamic task management.
- Real-time interface updates after task operations.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| Django | Backend framework |
| Django REST Framework | REST API development |
| React | Frontend development |
| Vite | Frontend build tool |
| JavaScript / TypeScript | Frontend programming |
| SQLite | Database |
| Render | Backend deployment |
| Vercel | Frontend deployment |
| Git & GitHub | Version control |

## 🏗️ Project Architecture

The application follows a client-server architecture.

```text
       React + Vite Frontend
                |
                | HTTP Requests
                | REST API
                |
                v
       Django REST Framework
                |
             ViewSets
                |
           Serializers
                |
             Django ORM
                |
                v
             SQLite
```

The React frontend communicates with the Django backend through HTTP requests. Django REST Framework processes requests, validates incoming data, interacts with the database and returns JSON responses.

## 📡 API Endpoints

Base URL:

```text
http://localhost:8000/api/
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/todos/` | Retrieve all tasks |
| POST | `/todos/` | Create a new task |
| GET | `/todos/{id}/` | Retrieve a specific task |
| PUT | `/todos/{id}/` | Update a task |
| PATCH | `/todos/{id}/` | Partially update a task |
| DELETE | `/todos/{id}/` | Delete a task |

### Example API Request

Create a new Todo:

```http
POST /api/todos/
Content-Type: application/json
```

Request body:

```json
{
    "title": "Learn Django REST Framework",
    "completed": false
}
```

Example response:

```json
{
    "id": 1,
    "title": "Learn Django REST Framework",
    "completed": false,
    "created_at": "2026-11-11T10:30:00Z"
}
```

## ⚙️ Installation and Setup

### Prerequisites

- Python 3.10+
- Node.js and npm
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_NAME
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

Backend API:

```text
http://localhost:8000/
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000/api/todos/
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173/
```

Make sure the Django backend is running before using the frontend.

## ☁️ Deployment

The application is deployed using **Render for the Django backend** and **Vercel for the React frontend**.

### Backend Deployment – Render

1. Push the project to GitHub.
2. Create a new Web Service on Render.
3. Connect your GitHub repository.
4. Set the Root Directory to:

```text
backend
```

5. Configure the build and start commands according to your Django project setup.
6. Add the required environment variables, including:

```env
DEBUG=False
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=your-render-domain.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

7. Deploy the backend.

Backend API:

```text
https://your-render-domain.onrender.com/api/
```

### Frontend Deployment – Vercel

1. Import your GitHub repository into Vercel.
2. Set the Root Directory to:

```text
frontend
```

3. Configure the build settings:

```text
Build Command: npm run build
Output Directory: dist
```

4. Add the production environment variable:

```env
VITE_API_URL=https://your-render-domain.onrender.com/api/todos/
```

5. Deploy the frontend.

Make sure the frontend URL is included in the backend's CORS configuration.

## 🔮 Future Improvements

- Implement user registration and login.
- Integrate JWT authentication using Simple JWT.
- Associate Todo tasks with individual users.
- Restrict task access based on ownership.
- Migrate from SQLite to PostgreSQL.
- Implement task categories and priorities.
- Add task deadlines and reminders.
- Introduce automated backend testing.

## 🎯 Key Technical Concepts Demonstrated

- RESTful API development.
- CRUD operations.
- Django ModelViewSet.
- ModelSerializer and data validation.
- Database modelling using Django ORM.
- React and Django integration.
- HTTP communication between frontend and backend.
- Environment configuration.
- Full-stack application deployment.

## 👨‍💻 Author

**Your Name**

Software Engineering Student | Aspiring Backend / Full-Stack Developer

- GitHub: [Your GitHub Profile](YOUR_GITHUB_PROFILE_URL)
- LinkedIn: [Your LinkedIn Profile](YOUR_LINKEDIN_URL)
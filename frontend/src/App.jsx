import { useEffect, useState } from 'react'
import { getTodos, createTodo, updateTodo, deleteTodo } from './api'

const FILTERS = ['all', 'active', 'completed']

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Could not load todos. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    if (!title.trim()) return
    setError('')
    try {
      const todo = await createTodo(title.trim())
      setTodos([todo, ...todos])
      setTitle('')
    } catch {
      setError('Could not add todo. Make sure the backend is running on port 8000.')
    }
  }

  async function handleToggle(todo) {
    setError('')
    try {
      const updated = await updateTodo(todo.id, { completed: !todo.completed })
      setTodos(todos.map((t) => (t.id === todo.id ? updated : t)))
    } catch {
      setError('Could not update todo.')
    }
  }

  async function handleDelete(id) {
    setError('')
    try {
      await deleteTodo(id)
      setTodos(todos.filter((t) => t.id !== id))
    } catch {
      setError('Could not delete todo.')
    }
  }

  async function clearCompleted() {
    const completed = todos.filter((t) => t.completed)
    if (completed.length === 0) return
    setError('')
    try {
      await Promise.all(completed.map((t) => deleteTodo(t.id)))
      setTodos(todos.filter((t) => !t.completed))
    } catch {
      setError('Could not clear completed tasks.')
    }
  }

  const active = todos.filter((t) => !t.completed)
  const completed = todos.filter((t) => t.completed)
  const progress = todos.length ? Math.round((completed.length / todos.length) * 100) : 0

  const filtered = todos.filter((todo) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed)
    const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="page">
      <nav className="nav">
        <div className="nav-brand">
          <span className="nav-logo">✓</span>
          <span>TaskFlow</span>
        </div>
        <span className="nav-date">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </nav>

      <main className="app">
        <section className="hero">
          <p className="hero-greeting">{getGreeting()} 👋</p>
          <h1>Stay on top of your day</h1>
          <p className="hero-sub">
            Add tasks, track progress, and clear your list when you are done.
          </p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span className="stat-label">Total</span>
            <span className="stat-value">{todos.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Active</span>
            <span className="stat-value accent">{active.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Done</span>
            <span className="stat-value success">{completed.length}</span>
          </div>
          <div className="stat-card wide">
            <div className="stat-row">
              <span className="stat-label">Progress</span>
              <span className="stat-value small">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        <section className="panel">
          <h2 className="panel-title">New task</h2>
          <form onSubmit={handleAdd} className="form">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Buy groceries, finish report..."
              className="input"
            />
            <button type="submit" className="btn-add">
              + Add Task
            </button>
          </form>
        </section>

        {error && <p className="error">{error}</p>}

        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Your tasks</h2>
            {completed.length > 0 && (
              <button onClick={clearCompleted} className="btn-clear">
                Clear completed
              </button>
            )}
          </div>

          <div className="toolbar">
            <div className="filters">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  <span className="filter-count">
                    {f === 'all' ? todos.length : f === 'active' ? active.length : completed.length}
                  </span>
                </button>
              ))}
            </div>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="search"
            />
          </div>

          <ul className="list">
            {loading && (
              <li className="empty">
                <span className="empty-icon">⏳</span>
                <p>Loading your tasks...</p>
              </li>
            )}

            {!loading && todos.length === 0 && (
              <li className="empty">
                <span className="empty-icon">📝</span>
                <p className="empty-title">No tasks yet</p>
                <p className="empty-hint">Type something above and hit Add Task to get started.</p>
              </li>
            )}

            {!loading && todos.length > 0 && filtered.length === 0 && (
              <li className="empty">
                <span className="empty-icon">🔍</span>
                <p className="empty-title">No matching tasks</p>
                <p className="empty-hint">Try a different filter or search term.</p>
              </li>
            )}

            {filtered.map((todo) => (
              <li key={todo.id} className={`item ${todo.completed ? 'item-done' : ''}`}>
                <label className="checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo)}
                  />
                  <span className="checkmark" />
                </label>
                <div className="item-body">
                  <span className={`title ${todo.completed ? 'done' : ''}`}>
                    {todo.title}
                  </span>
                  <span className="item-date">{formatDate(todo.created_at)}</span>
                </div>
                <button onClick={() => handleDelete(todo.id)} className="btn-delete" title="Delete">
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="tips">
          <h3>Quick tips</h3>
          <ul>
            <li>Click the checkbox to mark a task complete</li>
            <li>Use filters to focus on active or done items</li>
            <li>Search helps you find tasks quickly in a long list</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>TaskFlow — built with React & Django</p>
      </footer>
    </div>
  )
}

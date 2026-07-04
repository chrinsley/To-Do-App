const API_URL = import.meta.env.VITE_API_URL || '/api/todos/'

async function request(url, options = {}) {
  const res = await fetch(url, options)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Request failed (${res.status})`)
  }
  if (res.status === 204) return null
  return res.json()
}

export async function getTodos() {
  return request(API_URL)
}

export async function createTodo(title) {
  return request(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, completed: false }),
  })
}

export async function updateTodo(id, data) {
  return request(`${API_URL}${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export async function deleteTodo(id) {
  return request(`${API_URL}${id}/`, { method: 'DELETE' })
}

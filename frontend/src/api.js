const API_URL = import.meta.env.VITE_API_URL ?? ''

/**
 * Small fetch wrapper. Sends/receives JSON and throws on non-2xx responses.
 */
export async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    credentials: 'include', // send/receive cookies (session auth)
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()
  const data = text ? safeJson(text) : null

  if (!res.ok) {
    const message = (data && (data.error || data.message)) || `HTTP ${res.status}`
    throw new Error(message)
  }
  return data
}

function safeJson(text) {
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

// Endpoints expected from the API (adjust paths once backend exists)
export const login = (email, password) =>
  request('/api/auth/login', { method: 'POST', body: { email, password } })

export const register = (email, username, password) =>
  request('/api/auth/register', { method: 'POST', body: { email, username, password } })

export const logout = () => request('/api/auth/logout', { method: 'POST' })

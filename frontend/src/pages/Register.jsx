import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api.js'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(email, username, password)
      navigate('/login', { replace: true, state: { registered: true } })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h1>Register</h1>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        autoComplete="username"
        required
        minLength={3}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="error" role="alert">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating account…' : 'Create account'}
      </button>

      <p className="switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  )
}

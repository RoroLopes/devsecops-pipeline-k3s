import { useNavigate } from 'react-router-dom'
import { logout } from '../api.js'
import { useAuth } from '../auth.jsx'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  async function handleLogout() {
    try {
      await logout()
    } catch {
      // ignore: clear local state anyway
    }
    setUser(null)
    navigate('/login', { replace: true })
  }

  return (
    <div className="card">
      <h1>Hello, {user.username ?? user.email}!</h1>

      <dl>
        {Object.entries(user).map(([key, value]) => (
          <div key={key}>
            <dt>{key}</dt>
            <dd>{String(value)}</dd>
          </div>
        ))}
      </dl>

      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

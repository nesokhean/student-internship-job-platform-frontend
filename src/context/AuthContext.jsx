import { createContext, useState, useEffect } from 'react'
import api, { TOKEN_KEY, recordOf } from '../services/api.js'

export const AuthContext = createContext(null)

const USER_KEY = 'kc_user'

/* Endpoint that exchanges a Google ID token for our own session. */
const GOOGLE_AUTH_PATH = import.meta.env.VITE_GOOGLE_AUTH_PATH || '/auth/google'

const read = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return value ?? fallback
  } catch {
    return fallback
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(() => read(USER_KEY, null))
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem(TOKEN_KEY)))
  const [saved, setSaved] = useState(() => read('kc_saved', []))
  const [apps, setApps] = useState(() => read('kc_apps', []))

  useEffect(() => { localStorage.setItem('kc_saved', JSON.stringify(saved)) }, [saved])
  useEffect(() => { localStorage.setItem('kc_apps', JSON.stringify(apps)) }, [apps])

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) return
    let active = true
    api.get('/me')
      .then(res => { if (active) setUser(recordOf(res)) })
      .catch(() => {
        if (!active) return
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        setToken(null)
        setUser(null)
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  function remember(nextUser, nextToken) {
    if (nextToken) localStorage.setItem(TOKEN_KEY, nextToken)
    if (nextUser) localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
    setToken(nextToken ?? null)
    setUser(nextUser ?? null)
    return nextUser
  }

  async function login(email, password) {
    const res = await api.post('/login', { email, password })
    return remember(res.data?.user, res.data?.token)
  }

  async function register(form) {
    const res = await api.post('/register', {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.confirm,
      role: form.role,
    })
    if (res.data?.token) return remember(res.data?.user, res.data.token)
    return login(form.email, form.password)
  }

  /* Google Identity Services hands us an ID token (JWT). The API verifies it
     with Google and replies with the same { user, token } shape as /login. */
  async function loginWithGoogle(credential, role) {
    const res = await api.post(GOOGLE_AUTH_PATH, role ? { credential, role } : { credential })
    return remember(res.data?.user, res.data?.token)
  }

  async function logout() {
    try {
      await api.post('/logout')
    } catch {
      // the local session is cleared even when the API call fails
    }
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }

  async function updateProfile(payload) {
    const path = user?.role === 'company' ? '/company/profile' : '/student/profile'
    const res = await api.put(path, payload)
    const merged = { ...user, ...(res.data?.user ?? res.data) }
    setUser(merged)
    localStorage.setItem(USER_KEY, JSON.stringify(merged))
    return merged
  }

  const isSaved = (kind, id) => saved.some(s => s.kind === kind && s.id === id)
  const toggleSave = (kind, id) => setSaved(s => (isSaved(kind, id) ? s.filter(x => !(x.kind === kind && x.id === id)) : [...s, { kind, id }]))
  const hasApplied = (kind, id) => apps.some(a => a.kind === kind && a.id === id)
  const apply = (kind, id) => { if (!hasApplied(kind, id)) setApps(a => [{ kind, id, date: new Date().toISOString().slice(0, 10), status: 'Pending' }, ...a]) }

  const value = {
    user, token, loading, isAuthenticated: Boolean(user),
    login, register, loginWithGoogle, logout, updateProfile,
    saved, isSaved, toggleSave, apps, hasApplied, apply,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


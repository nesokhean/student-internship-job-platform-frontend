import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import FormInput from '../../components/FormInput.jsx'
import GoogleAuthButton from '../../components/GoogleAuthButton.jsx'
import Alert from '../../components/ui/Alert.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { errorsOf, messageOf } from '../../services/api.js'
import { roleHome } from '../../utils/helpers.js'

export default function Login() {
  const { login, loginWithGoogle } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)

  const change = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    const found = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = 'Enter a valid email address.'
    if (form.password.length < 6) found.password = 'Password must be at least 6 characters.'
    setErrors(found)
    if (Object.keys(found).length) return
    setBusy(true)
    try {
      const user = await login(form.email, form.password)
      nav(roleHome(user?.role), { replace: true })
    } catch (error) {
      setErrors({ ...errorsOf(error), form: messageOf(error) })
    } finally {
      setBusy(false)
    }
  }

  const google = async credential => {
    setErrors({})
    setBusy(true)
    try {
      const user = await loginWithGoogle(credential)
      nav(roleHome(user?.role), { replace: true })
    } catch (error) {
      setErrors({ ...errorsOf(error), form: messageOf(error) })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="card p-7 shadow-lift sm:p-8">
      <h1 className="font-display text-3xl font-extrabold text-heading">Welcome back</h1>
      <p className="mt-1.5 text-sm text-muted">Log in to track applications and manage your account.</p>

      <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
        {errors.form && <Alert tone="error">{errors.form}</Alert>}
        <FormInput
          label="Email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={change}
          error={errors.email}
        />
        <FormInput
          label="Password"
          name="password"
          type={show ? 'text' : 'password'}
          required
          autoComplete="current-password"
          value={form.password}
          onChange={change}
          error={errors.password}
          adornment={
            <button
              type="button"
              aria-label={show ? 'Hide password' : 'Show password'}
              className="text-muted transition hover:text-primary"
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
        <button className="btn-primary btn-lg w-full" disabled={busy}>
          {busy ? 'Logging in…' : <>Log in <ArrowRight size={17} /></>}
        </button>
      </form>

      <GoogleAuthButton
        className="mt-6"
        dividerLabel="or"
        label="Log in with Google"
        text="signin_with"
        busy={busy}
        onCredential={google}
        onError={msg => setErrors({ form: msg })}
      />

      <p className="mt-6 text-sm text-muted">
        New here?{' '}
        <Link to="/register" className="font-semibold text-primary hover:underline">Create an account</Link>
      </p>
    </div>
  )
}

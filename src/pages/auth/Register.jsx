import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Sparkles } from 'lucide-react'
import FormInput from '../../components/FormInput.jsx'
import GoogleAuthButton from '../../components/GoogleAuthButton.jsx'
import Alert from '../../components/ui/Alert.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { errorsOf, messageOf } from '../../services/api.js'
import { roleHome } from '../../utils/helpers.js'

export default function Register() {
  const { register, loginWithGoogle } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'student' })
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)

  const change = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    const found = {}
    if (form.name.trim().length < 2) found.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = 'Enter a valid email address.'
    if (form.password.length < 6) found.password = 'Password must be at least 6 characters.'
    if (form.confirm !== form.password) found.confirm = 'Passwords do not match.'
    setErrors(found)
    if (Object.keys(found).length) return
    setBusy(true)
    try {
      const user = await register({ ...form, name: form.name.trim() })
      nav(roleHome(user?.role), { replace: true })
    } catch (error) {
      setErrors({ ...errorsOf(error), form: messageOf(error) })
    } finally {
      setBusy(false)
    }
  }

  const toggle = (
    <button
      type="button"
      aria-label={show ? 'Hide password' : 'Show password'}
      className="text-muted transition hover:text-primary"
      onClick={() => setShow(!show)}
    >
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  )

  const google = async (credential, role = 'student') => {
    setErrors({})
    setBusy(true)
    try {
      const user = await loginWithGoogle(credential, role)
      nav(roleHome(user?.role), { replace: true })
    } catch (error) {
      setErrors({ ...errorsOf(error), form: messageOf(error) })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="card p-7 shadow-lift sm:p-8">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
        <Sparkles size={13} />Free forever
      </span>
      <h1 className="mt-4 font-display text-3xl font-extrabold text-heading">Create your account</h1>
      <p className="mt-1.5 text-sm text-muted">Free for students. It takes under two minutes.</p>

      <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
        {errors.form && <Alert tone="error">{errors.form}</Alert>}
        <FormInput
          label="Full name"
          name="name"
          required
          placeholder="Sokha Chan"
          autoComplete="name"
          value={form.name}
          onChange={change}
          error={errors.name}
        />
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
          autoComplete="new-password"
          value={form.password}
          onChange={change}
          error={errors.password}
          hint="At least 6 characters."
          adornment={toggle}
        />
        <FormInput
          label="Confirm password"
          name="confirm"
          type={show ? 'text' : 'password'}
          required
          autoComplete="new-password"
          value={form.confirm}
          onChange={change}
          error={errors.confirm}
          adornment={toggle}
        />
        <button className="btn-primary btn-lg w-full" disabled={busy}>
          {busy ? 'Registering…' : 'Create account'}
        </button>
      </form>

      <GoogleAuthButton
        className="mt-6"
        dividerLabel="or"
        label="Sign up with Google"
        text="signup_with"
        busy={busy}
        onCredential={credential => google(credential, 'student')}
        onError={msg => setErrors({ form: msg })}
      />

      <p className="mt-6 text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">Log in</Link>
      </p>
    </div>
  )
}

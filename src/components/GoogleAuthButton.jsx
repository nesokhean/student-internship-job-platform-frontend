import { useEffect, useRef, useState } from 'react'

const SCRIPT_SRC = 'https://accounts.google.com/gsi/client'
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

let scriptPromise = null

/* Inject the Google Identity Services script once, shared by every mount. */
function loadGoogle() {
  if (window.google?.accounts?.id) return Promise.resolve()
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    const el = document.createElement('script')
    el.src = SCRIPT_SRC
    el.async = true
    el.defer = true
    el.onload = () => resolve()
    el.onerror = () => {
      scriptPromise = null
      reject(new Error('Could not reach Google sign-in. Please try again.'))
    }
    document.head.appendChild(el)
  })
  return scriptPromise
}

/* Official four-colour Google "G". */
function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-[18px] w-[18px]" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

export default function GoogleAuthButton({
  onCredential,
  onError,
  label = 'Continue with Google',
  text = 'continue_with',
  dividerLabel,
  className = '',
  busy = false,
}) {
  const holder = useRef(null)
  const credential = useRef(onCredential)
  const failed = useRef(onError)
  const [ready, setReady] = useState(false)
  const configured = Boolean(CLIENT_ID)

  const notConfigured = () =>
    failed.current?.('Google sign-in is not set up yet. Add VITE_GOOGLE_CLIENT_ID to your .env file.')

  useEffect(() => { credential.current = onCredential }, [onCredential])
  useEffect(() => { failed.current = onError }, [onError])

  useEffect(() => {
    if (!CLIENT_ID) {
      if (import.meta.env.DEV) console.warn('[GoogleAuthButton] Add VITE_GOOGLE_CLIENT_ID to .env to enable Google sign-in.')
      return
    }
    let alive = true
    loadGoogle()
      .then(() => {
        if (!alive || !window.google?.accounts?.id) return
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          auto_select: false,
          cancel_on_tap_outside: true,
          callback: res => { if (res?.credential) credential.current?.(res.credential) },
        })
        const node = holder.current
        if (!node) return
        node.innerHTML = ''
        window.google.accounts.id.renderButton(node, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          shape: 'pill',
          text,
          logo_alignment: 'center',
          width: Math.min(Math.max(node.offsetWidth || 320, 200), 400),
        })
        setReady(true)
      })
      .catch(err => { if (alive) failed.current?.(err.message) })
    return () => { alive = false }
  }, [text])

  const divider = dividerLabel ? (
    <div className="mb-6 flex items-center gap-3">
      <span className="h-px flex-1 bg-line" />
      <span className="text-xs font-semibold uppercase tracking-wider text-muted">{dividerLabel}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  ) : null

  return (
    <div className={className}>
      {divider}

      <div className="relative">
        <button
          type="button"
          tabIndex={configured ? -1 : 0}
          aria-hidden={configured || undefined}
          disabled={busy}
          onClick={configured ? undefined : notConfigured}
          title={configured ? undefined : 'Add VITE_GOOGLE_CLIENT_ID to .env to enable Google sign-in'}
          className="btn-ghost w-full"
        >
          <GoogleMark />
          {busy ? 'Connecting…' : label}
        </button>
        {configured && (
          <div
            ref={holder}
            className={`google-signin absolute inset-0 z-10 overflow-hidden rounded-full opacity-0 ${ready && !busy ? '' : 'pointer-events-none'}`}
          />
        )}
      </div>

      {!configured && import.meta.env.DEV && (
        <p className="mt-2 text-center text-xs text-muted">
          Google sign-in is disabled — add <code className="font-semibold">VITE_GOOGLE_CLIENT_ID</code> to <code className="font-semibold">.env</code>.
        </p>
      )}
    </div>
  )
}

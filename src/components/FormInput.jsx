export default function FormInput({ label, name, error, hint, required, options, rows, adornment, className = '', ...props }) {
  const invalid = error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/60' : ''
  const pad = adornment ? 'pr-10' : ''
  const control = options ? (
    <select id={name} name={name} className={`input ${invalid}`} required={required} {...props}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  ) : rows ? (
    <textarea id={name} name={name} rows={rows} className={`input ${pad} ${invalid}`} required={required} {...props} />
  ) : (
    <input id={name} name={name} className={`input ${pad} ${invalid}`} required={required} {...props} />
  )
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="label">
          {label}{required && <span className="text-red-500"> *</span>}
        </label>
      )}
      {adornment ? <div className="relative">{control}<span className="absolute inset-y-0 right-3 flex items-center">{adornment}</span></div> : control}
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
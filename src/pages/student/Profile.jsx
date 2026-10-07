import { useEffect, useState } from 'react'
import { Camera } from 'lucide-react'
import FormInput from '../../components/FormInput.jsx'
import Loading from '../../components/Loading.jsx'
import Avatar from '../../components/ui/Avatar.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Alert from '../../components/ui/Alert.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import api, { errorsOf, messageOf, recordOf } from '../../services/api.js'

export default function StudentProfile() {
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', phone: '', university: '', major: '', bio: '', skills: '' })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState('')

  const fill = profile => {
    const p = profile || {}
    setForm({
      name: p.name || '',
      email: p.email || '',
      phone: p.phone || '',
      university: p.university || '',
      major: p.major || '',
      bio: p.bio || '',
      skills: Array.isArray(p.skills) ? p.skills.join(', ') : (p.skills || ''),
    })
    setPreview(p.profile_image_url || p.profile_image || '')
  }

  useEffect(() => {
    let active = true
    api.get('/student/profile')
      .then(res => { if (active) fill(recordOf(res)) })
      .catch(error => { if (active) { setErrors({ form: messageOf(error) }); fill(user) } })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const change = e => setForm({ ...form, [e.target.name]: e.target.value })

  const pick = e => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return setErrors({ image: 'Choose an image file (JPG or PNG).' })
    if (file.size > 2 * 1024 * 1024) return setErrors({ image: 'The image must be 2 MB or smaller.' })
    setErrors({})
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const submit = async e => {
    e.preventDefault()
    if (form.name.trim().length < 2) return setErrors({ name: 'Enter your full name.' })
    setErrors({})
    setSaved('')
    setSaving(true)
    try {
      const data = new FormData()
      data.append('_method', 'PUT')
      data.append('name', form.name.trim())
      data.append('phone', form.phone)
      data.append('university', form.university)
      data.append('major', form.major)
      data.append('bio', form.bio)
      form.skills.split(',').map(s => s.trim()).filter(Boolean).forEach(s => data.append('skills[]', s))
      if (image) data.append('profile_image', image)
      const merged = await updateProfile(data)
      if (merged?.profile_image_url) setPreview(merged.profile_image_url)
      setImage(null)
      setSaved('Your profile has been saved.')
    } catch (error) {
      setErrors({ ...errorsOf(error), form: messageOf(error) })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loading label="Loading your profile…" />

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Student"
        title="My profile"
        description="Companies see this information when you apply."
      />

      <form onSubmit={submit} className="card space-y-5 p-6" noValidate>
        {errors.form && <Alert tone="error">{errors.form}</Alert>}
        {saved && <Alert tone="success">{saved}</Alert>}

        <div className="flex flex-wrap items-center gap-4">
          {preview ? (
            <img src={preview} alt="" className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-line" />
          ) : (
            <Avatar name={form.name || 'Student'} size="h-20 w-20" initialsClassName="text-2xl" />
          )}
          <label className="btn-ghost cursor-pointer">
            <Camera size={16} />{image ? image.name : 'Change photo'}
            <input type="file" accept="image/*" hidden onChange={pick} />
          </label>
          {errors.image && <Alert tone="error" className="w-full">{errors.image}</Alert>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput label="Full name" name="name" required value={form.name} onChange={change} error={errors.name} />
          <FormInput label="Email" name="email" type="email" value={form.email} readOnly hint="Contact support to change your email." />
          <FormInput label="Phone" name="phone" value={form.phone} onChange={change} error={errors.phone} placeholder="+855 12 345 678" />
          <FormInput label="University" name="university" value={form.university} onChange={change} error={errors.university} placeholder="Royal University of Phnom Penh" />
          <FormInput label="Major" name="major" value={form.major} onChange={change} error={errors.major} placeholder="Computer Science" />
          <FormInput label="Skills" name="skills" value={form.skills} onChange={change} error={errors.skills} hint="Separate skills with commas." placeholder="React, SQL, English" />
        </div>

        <FormInput label="Short bio" name="bio" rows={4} value={form.bio} onChange={change} error={errors.bio} placeholder="Tell companies what you are looking for." />

        <div className="flex flex-wrap gap-2">
          <button className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
          <button type="button" className="btn-ghost" onClick={() => fill(user)} disabled={saving}>Reset</button>
        </div>
      </form>
    </div>
  )
}

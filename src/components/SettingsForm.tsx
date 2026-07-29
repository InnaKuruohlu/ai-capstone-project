import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckboxInput, SelectInput, TextInput } from './FormField'
import {
  defaultSettingsValues,
  settingsSchema,
  timezoneOptions,
  type SettingsFormValues,
} from '../schemas/settingsSchema'

type SettingsFormProps = {
  onSubmit?: (values: SettingsFormValues) => void | Promise<void>
}

export function SettingsForm({ onSubmit }: SettingsFormProps) {
  const [savedMessage, setSavedMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultSettingsValues,
    mode: 'onBlur',
  })

  const notifications = watch('notifications')

  const handleFormSubmit = handleSubmit(async (values) => {
    setSavedMessage(null)

    const payload: SettingsFormValues = {
      ...values,
      bio: values.bio?.trim() ?? '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }

    if (onSubmit) {
      await onSubmit(payload)
    } else {
      await new Promise((resolve) => setTimeout(resolve, 600))
    }

    reset(payload)
    setSavedMessage('Settings saved successfully.')
  })

  const handleReset = () => {
    reset(defaultSettingsValues)
    setSavedMessage(null)
  }

  return (
    <form className="settings-form" onSubmit={handleFormSubmit} noValidate>
      <header className="settings-form__header">
        <h1>Settings</h1>
        <p>Manage your profile, preferences, and security.</p>
      </header>

      <section className="settings-form__section" aria-labelledby="profile-heading">
        <h2 id="profile-heading">Profile</h2>

        <TextInput
          id="displayName"
          label="Display name"
          placeholder="Jane Doe"
          autoComplete="name"
          error={errors.displayName}
          {...register('displayName')}
        />

        <TextInput
          id="email"
          label="Email"
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
          error={errors.email}
          {...register('email')}
        />

        <div className="form-field">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            rows={3}
            maxLength={200}
            placeholder="Tell us a little about yourself"
            aria-invalid={Boolean(errors.bio)}
            aria-describedby={errors.bio ? 'bio-error' : 'bio-hint'}
            className="form-input form-input--textarea"
            {...register('bio')}
          />
          <p id="bio-hint" className="form-field__hint">
            Optional. Max 200 characters.
          </p>
          {errors.bio && (
            <p id="bio-error" className="form-field__error" role="alert">
              {errors.bio.message}
            </p>
          )}
        </div>
      </section>

      <section className="settings-form__section" aria-labelledby="preferences-heading">
        <h2 id="preferences-heading">Preferences</h2>

        <SelectInput
          id="theme"
          label="Theme"
          error={errors.theme}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' },
          ]}
          {...register('theme')}
        />

        <SelectInput
          id="language"
          label="Language"
          error={errors.language}
          options={[
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' },
            { value: 'de', label: 'German' },
          ]}
          {...register('language')}
        />

        <SelectInput
          id="timezone"
          label="Timezone"
          error={errors.timezone}
          options={timezoneOptions.map((tz) => ({ value: tz, label: tz }))}
          {...register('timezone')}
        />

        <fieldset className="form-fieldset">
          <legend>Notifications</legend>
          <CheckboxInput
            id="notifications-email"
            label="Email notifications"
            checked={notifications.email}
            onChange={(checked) =>
              setValue('notifications.email', checked, { shouldDirty: true, shouldValidate: true })
            }
          />
          <CheckboxInput
            id="notifications-push"
            label="Push notifications"
            checked={notifications.push}
            onChange={(checked) =>
              setValue('notifications.push', checked, { shouldDirty: true, shouldValidate: true })
            }
          />
          <CheckboxInput
            id="notifications-marketing"
            label="Marketing emails"
            checked={notifications.marketing}
            onChange={(checked) =>
              setValue('notifications.marketing', checked, { shouldDirty: true, shouldValidate: true })
            }
          />
        </fieldset>
      </section>

      <section className="settings-form__section" aria-labelledby="security-heading">
        <h2 id="security-heading">Security</h2>
        <p className="settings-form__section-note">
          Leave password fields blank to keep your current password.
        </p>

        <TextInput
          id="currentPassword"
          label="Current password"
          type="password"
          autoComplete="current-password"
          error={errors.currentPassword}
          {...register('currentPassword')}
        />

        <TextInput
          id="newPassword"
          label="New password"
          type="password"
          autoComplete="new-password"
          hint="At least 8 characters with one uppercase letter and one number."
          error={errors.newPassword}
          {...register('newPassword')}
        />

        <TextInput
          id="confirmPassword"
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword}
          {...register('confirmPassword')}
        />
      </section>

      {savedMessage && (
        <p className="settings-form__success" role="status">
          {savedMessage}
        </p>
      )}

      <div className="settings-form__actions">
        <button type="button" className="btn btn--secondary" onClick={handleReset} disabled={isSubmitting}>
          Reset
        </button>
        <button type="submit" className="btn btn--primary" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? 'Saving…' : 'Save settings'}
        </button>
      </div>
    </form>
  )
}

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckboxInput, SelectInput, TextInput } from './FormField'
import {
  defaultSettingsValues,
  getTimezoneOptions,
  settingsSchema,
  type SettingsFormValues,
} from '../../schemas/settingsSchema'

export function SettingsForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultSettingsValues,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const timezoneOptions = getTimezoneOptions().map((timezone) => ({
    value: timezone,
    label: timezone,
  }))

  const onSubmit = handleSubmit((values) => {
    setSuccessMessage(null)
    reset(values)
    setSuccessMessage('Settings saved successfully.')
  })

  return (
    <form onSubmit={onSubmit} noValidate>
      <h1>Settings</h1>

      <TextInput
        id="name"
        label="Name"
        autoComplete="name"
        error={errors.name}
        {...register('name')}
      />

      <TextInput
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email}
        {...register('email')}
      />

      <SelectInput
        id="timezone"
        label="Timezone"
        error={errors.timezone}
        options={timezoneOptions}
        {...register('timezone')}
      />

      <CheckboxInput
        id="newsletter"
        label="Subscribe to newsletter"
        error={errors.newsletter}
        {...register('newsletter')}
      />

      {successMessage && (
        <p role="status">{successMessage}</p>
      )}

      <button type="submit" disabled={!isValid || isSubmitting}>
        Save settings
      </button>
    </form>
  )
}
